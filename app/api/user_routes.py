from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Brewery

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# Get all of a users owned breweries
@user_routes.route('/<int:id>/breweries')
def get_user_breweries(id):
    user = User.query.get(id)

    if user:
        return {"Breweries": [brewery.to_dict() for brewery in user.breweries]}

    return {"errors": { "message": "User Not Found" } }, 404
