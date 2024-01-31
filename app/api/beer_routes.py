from flask import Blueprint, request
from flask_login import current_user, login_required
from ..forms.beer_form import BeerForm
from app.models import Beer, db
from app.api.aws_helpers import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3)


beer_routes = Blueprint("beers", __name__)


# Get all Beers
@beer_routes.route("")
def get_beers():
    beers = Beer.query.all()
    return {"Beers": [beer.to_dict() for beer in beers]}


#Get a specific Beer by id
@beer_routes.route("<int:id>")
def get_beer_by_id(id):
    beer = Beer.query.get(id)

    if beer:
        return {"Beer": beer.to_dict()}

    return {"errors": { "message": "Beer Not Found" } }, 404


# Get all beers checked in for???


#Create a Beer
@login_required
@beer_routes.route("", methods=["POST"])
def create_beer():
    user_id = current_user.id
    # brewery_id = request.get_json()["brewery_id"]
    print("I MADE IT TO THE ROUTE")

    # return {"message": "hi"}
    form = BeerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        url = "https://i.ibb.co/DCBFCfb/No-image-available.png"
        image_url = form.data["image_url"]

        if image_url is not None:
            image_url.filename = get_unique_filename(image_url.filename)
            upload = upload_file_to_s3(image_url)
            print(upload)

            if "url" not in upload:
                return {"errors": {"message": "Image upload failed"}}

            url = upload["url"]

        params = {
            "name": form.data["name"],
            "abv": float(form.data["abv"]),
            "ibu": int(form.data["ibu"]),
            "style": form.data["style"],
            "description": form.data["description"],
            "image_url": url,
            "creator_id": user_id,
            "brewery_id": form.data["brewery_id"]
        }

        new_beer = Beer(**params)
        db.session.add(new_beer)
        db.session.commit()

        return new_beer.to_dict()

    print("ERRORS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", form.errors)
    return form.errors, 400


# Update a Beer
@login_required
@beer_routes.route("/<int:id>", methods=["PUT"])
def update_beer(id):
    beer = Beer.query.get(id)

    if not beer:
        return {"errors": {"message": "Beer not found"}}

    form = BeerForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if beer.creator_id == current_user.id:
        if form.validate_on_submit:
            image_url = form.data["image_url"]

            if image_url is not None and image_url.filename != beer.image_url:
                removed = remove_file_from_s3(beer.image_url)
                image_url.filename = get_unique_filename(image_url.filename)
                upload = upload_file_to_s3(image_url)
                print(upload)

                if "url" not in upload:
                    return {"errors": {"message": "Image upload failed"}}

                url = upload["url"]
                beer.image_url = url

            beer.name = form.data["name"]
            beer.abv = form.data["abv"]
            beer.ibu = form.data["ibu"]
            beer.style = form.data["style"]
            beer.description = form.data["description"]
            beer.brewery_id = form.data["brewery_id"]

            db.session.commit()

            return beer.to_dict()

        return form.errors, 400

    return { "message": "User unauthorized"}, 401
