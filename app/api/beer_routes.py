from flask import Blueprint, request
from flask_login import current_user, login_required
# from ..forms.beer_form import BeerForm
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
