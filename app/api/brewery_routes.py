from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Brewery


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
@brewery_routes.route("/new", methods=["POST"])
def create_brewery():
    pass


# Update a Brewery
@brewery_routes.route("/<int:id>", methods=["PUT"])
def update_brewery(id):
    pass


# Delete a Brewery
@brewery_routes.route("/<int:id>", methods=["DELETE"])
def delete_brewery(id):
    pass
