from .db import db

beers_lists = db.Table(
    "beers_lists",
    db.Column(
        "list_id",
        db.Integer,
        db.ForeignKey("lists.id"),
        primary_key=True
    ),
    db.Column(
        "beer_id",
        db.Integer,
        db.ForeignKey("beers.id"),
        primary_key=True
    )
)
