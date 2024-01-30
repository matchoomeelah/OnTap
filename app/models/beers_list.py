from .db import db, environment, SCHEMA, add_prefix_for_prod


beers_lists = db.Table(
    "beers_lists",
    db.Column(
        "list_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("lists.id")),
        primary_key=True
    ),
    db.Column(
        "beer_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("beers.id")),
        primary_key=True
    )
)

if environment == "production":
    beers_lists.schema = SCHEMA
