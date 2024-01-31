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
            "abv": form.data["abv"],
            "ibu": form.data["ibu"],
            "style": form.data["style"],
            "description": form.data["description"],
            "image_url": url,
            "creator_id": user_id,
            "brewery_id":
        }

        new_beer = Beer(**params)
        db.session.add(new_beer)
        db.session.commit()

        return new_beer.to_dict()

    return form.errors, 400
