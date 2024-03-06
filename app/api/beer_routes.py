from flask import Blueprint, request
from flask_login import current_user, login_required
from ..forms.beer_form import BeerForm
from ..forms.check_in_form import CheckInForm
from ..forms.comment_form import CommentForm
from app.models import Beer, CheckIn, Comment, db
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

    return {"message": "Beer Not Found"}, 404


#Create a Beer
@login_required
@beer_routes.route("", methods=["POST"])
def create_beer():
    user_id = current_user.id

    # return {"message": "hi"}
    form = BeerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        url = "https://i.ibb.co/qChdf5n/default-beer.jpg"
        orig_url = "No File Chosen"
        image = form.data["image_url"]

        if image is not None:
            orig_url = image.filename
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)

            if "url" not in upload:
                return {"message": "Image upload failed"}, 500

            url = upload["url"]

        params = {
            "name": form.data["name"],
            "abv": float(form.data["abv"]),
            "ibu": int(form.data["ibu"]),
            "style": form.data["style"],
            "description": form.data["description"],
            "orig_image_url": orig_url,
            "image_url": url,
            "creator_id": user_id,
            "brewery_id": form.data["brewery_id"]
        }

        new_beer = Beer(**params)
        db.session.add(new_beer)
        db.session.commit()

        return new_beer.to_dict()

    return form.errors, 400


# Update a Beer
@login_required
@beer_routes.route("/<int:id>", methods=["PUT"])
def update_beer(id):
    beer = Beer.query.get(id)

    if not beer:
        return {"message": "Beer not found"}, 404

    form = BeerForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if beer.creator_id == current_user.id:
        if form.validate_on_submit:
            image = form.data["image_url"]

            if image:
                if beer.image_url:
                    removed = remove_file_from_s3(beer.image_url)
                orig_url = image.filename
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                print(upload)

                if "url" not in upload:
                    return {"message": "Image upload failed"}, 500

                url = upload["url"]
                beer.image_url = url
                beer.orig_image_url = orig_url

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


# Delete a Beer
@login_required
@beer_routes.route("/<int:id>", methods=["DELETE"])
def delete_beer(id):
    beer = Beer.query.get(id)

    if not beer:
        return {"message": "Beer could not be found"}, 404

    if beer.creator_id == current_user.id:
        remove_file_from_s3(beer.image_url)
        db.session.delete(beer)
        db.session.commit()

        return {"message": "Success"}, 200

    return { "message": "User unauthorized"}, 401


# Get all check-ins for a beer
@beer_routes.route("/<int:id>/check-ins")
def get_check_ins_by_beer(id):
    beer = Beer.query.get(id)

    if beer:
        check_ins = [check_in.to_dict() for check_in in beer.check_ins]
        return {"CheckIns": check_ins}

    return {"message": "Beer could not be found"}, 404


# Create check-in for a beer
@login_required
@beer_routes.route("/<int:id>/check-ins", methods=["POST"])
def create_check_in(id):
    curr_beer = Beer.query.get(id)

    if not curr_beer:
        return {"message": "Beer could not be found"}, 404

    brewery_id = curr_beer.brewery_id

    form = CheckInForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        url = ""
        image = form.data["image_url"]

        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)

            if "url" not in upload:
                return {"message": "Image upload failed"}, 500

            url = upload["url"]

        params = {
            "body": form.data["body"],
            "rating": form.data["rating"],
            "image_url": url,
            "beer_id": id,
            "brewery_id": brewery_id,
            "user_id": current_user.id
        }

        new_check_in = CheckIn(**params)
        db.session.add(new_check_in)
        db.session.commit()

        return new_check_in.to_dict()

    return form.errors, 400

# Delete a check-in for a beer
@login_required
@beer_routes.route("/<int:id>/check-ins/<int:check_in_id>", methods=["DELETE"])
def delete_check_in(id, check_in_id):
    check_in = CheckIn.query.get(check_in_id)

    if not check_in:
        return {"message": "Check In could not be found"}, 404

    if check_in.user_id == current_user.id:
        if check_in.image_url:
            remove_file_from_s3(check_in.image_url)
        db.session.delete(check_in)
        db.session.commit()

        return {"message": "Success"}, 200

    return { "message": "User unauthorized"}, 401


# Create a comment on a Check-In
@login_required
@beer_routes.route("/<int:beer_id>/check-ins/<int:check_in_id>/comments", methods=["POST"])
def create_comment(beer_id, check_in_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        params = {
            "body": form.data["body"],
            "check_in_id": check_in_id,
            "user_id": current_user.id
        }

        new_comment = Comment(**params)
        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()

    return form.errors, 400


# Update a comment on a Check-In
@login_required
@beer_routes.route("/<int:id>/check-ins/<int:check_in_id>/comments/<int:comment_id>", methods=["PUT"])
def update_comment(id, check_in_id, comment_id):
    comment = Comment.query.get(comment_id)

    if not comment:
        return {"message": "Comment not found"}, 404

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if comment.user_id == current_user.id:
        if form.validate_on_submit():
            comment.body = form.data["body"]

            db.session.commit()

            return comment.to_dict()

        return form.errors, 400

    return { "message": "User unauthorized"}, 401



# Delete a comment on a Check-In
@login_required
@beer_routes.route("/<int:id>/check-ins/<int:check_in_id>/comments/<int:comment_id>", methods=["DELETE"])
def delete_comment(id, check_in_id, comment_id):
    comment = Comment.query.get(comment_id)

    if not comment:
        return {"message": "Comment not found"}, 404

    if comment.user_id == current_user.id:
        db.session.delete(comment)
        db.session.commit()

        return {"message": "Success"}, 200

    return { "message": "User unauthorized"}, 401
