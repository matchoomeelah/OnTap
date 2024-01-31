from flask import Blueprint, request
from flask_login import current_user, login_required
from ..forms.brewery_form import BreweryForm
from app.models import Brewery, db
from app.api.aws_helpers import (
    upload_file_to_s3, get_unique_filename)


brewery_routes = Blueprint("breweries", __name__)

# Get all Breweries
@brewery_routes.route("")
def get_breweries():
    breweries = Brewery.query.all()
    return {"Breweries": [brewery.to_dict() for brewery in breweries]}


# Get a specific Brewery by id
@brewery_routes.route("/<int:id>")
def get_brewery_by_id(id):
    brewery = Brewery.query.get(id)

    if brewery:
        return {"Brewery": brewery.to_dict()}

    return {"errors": { "message": "Brewery Not Found" } }, 404


# Get all breweries checked in for???


# Create a Brewery
@login_required
@brewery_routes.route("", methods=["POST"])
def create_brewery():
    user_id = current_user.id

    form = BreweryForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image_url = form.data["image_url"]

        image_url.filename = get_unique_filename(image_url.filename)
        upload = upload_file_to_s3(image_url)
        print(upload)

        if "url" not in upload:
            return {"errors": {"message": "Image upload failed"}}

        url = upload["url"]

        params = {
            "name": form.data["name"],
            "type": form.data["type"],
            "city": form.data["city"],
            "state_province": form.data["state_province"],
            "country": form.data["country"],
            "description": form.data["description"],
            "image_url": url,
            "website_url": form.data["website_url"],
            "creator_id": user_id
        }

        new_brewery = Brewery(**params)
        db.session.add(new_brewery)
        db.session.commit()

        return new_brewery.to_dict()

    return form.errors, 400

# Update a Brewery
@login_required
@brewery_routes.route("/<int:id>", methods=["PUT"])
def update_brewery(id):
    brewery = Brewery.query.get(id)

    if not brewery:
        return {"errors": {"message": "Brewery not found"}}

    form = BreweryForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if brewery.creator_id == current_user.id:
        if form.validate_on_submit:
            image_url = form.data["image_url"]
            print(image_url.filename)

            if image_url.filename != brewery.image_url:
                image_url.filename = get_unique_filename(image_url.filename)
                upload = upload_file_to_s3(image_url)
                print(upload)

                if "url" not in upload:
                    return {"errors": {"message": "Image upload failed"}}

                url = upload["url"]
                brewery.image_url = url

            brewery.name = form.data["name"]
            brewery.type = form.data["type"]
            brewery.city = form.data["city"]
            brewery.state_province = form.data["state_province"]
            brewery.country = form.data["country"]
            brewery.description = form.data["description"]
            brewery.website_url = form.data["website_url"]

            db.session.commit()

            return brewery.to_dict()

        return form.errors, 400

    return { "message": "User unauthorized"}, 401




# Delete a Brewery
@brewery_routes.route("/<int:id>", methods=["DELETE"])
def delete_brewery(id):
    pass
