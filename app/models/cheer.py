from .db import db, environment, SCHEMA, add_prefix_for_prod

cheers = db.Table(
    "cheers",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        primary_key=True
    ),
    db.Column(
        "check_in_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('check_ins.id')),
        primary_key=True
    )
)
if environment == "production":
    cheers.schema = SCHEMA
