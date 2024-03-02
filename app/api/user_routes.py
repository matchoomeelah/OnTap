from sqlite3 import IntegrityError
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, db
from ..forms.signup_form import SignUpForm
from app.api.aws_helpers import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3)


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
# @login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)

    if user:
        return user.to_dict()

    return {"errors": { "message": "User Not Found" } }, 404


# Get all of a users owned breweries
@user_routes.route('/<int:id>/breweries')
def get_user_breweries(id):
    user = User.query.get(id)

    if user:
        return {"Breweries": [brewery.to_dict() for brewery in user.breweries]}

    return {"errors": { "message": "User Not Found" } }, 404


# Get all check-ins for a user
@user_routes.route('/<int:id>/check-ins')
def get_user_check_ins(id):
    user = User.query.get(id)

    if user:
        check_ins = [check_in.to_dict() for check_in in user.check_ins]
        return {"CheckIns": check_ins}

    return {"errors": { "message": "User Not Found" } }, 404



# Update user info
@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_user_info(id):
    user = User.query.get(id)

    if not user:
        return {"errors": { "message": "User Not Found" } }, 404

    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if user.id == current_user.id:
        if form.validate_on_submit:
            image = form.data["profile_pic"]

            if image:
                if user.profile_pic:
                    removed = remove_file_from_s3(user.profile_pic)

                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)

                if "url" not in upload:
                    return {"errors": {"message": "Image upload failed"}}

                url = upload["url"]
                user.profile_pic = url


            user.first_name = form.data["first_name"]
            user.last_name = form.data["last_name"]
            user.email = form.data["email"]
            user.username = form.data["username"]
            if len(form.data["password"]) > 0:
                user.password = form.data["password"]

            try:
                db.session.commit()
            except Exception as e:
                if "email" in str(e):
                    return {"errors": {"email": "Email is in use by another user"}}, 400
                else:
                    return {"errors": {"username": "Username is in use by another user"}}, 400

            return user.to_dict()

        return form.errors, 400

    return { "message": "User unauthorized"}, 401
