from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class CheckIn(db.Model):
    __tablename__ = "check_ins"

    # Associate with the schema
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255), nullable=True)
    rating = db.Column(db.Float, nullable=True)
    image_url = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    beer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('beers.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # Relationships
    beer = db.relationship('Beer', back_populates="check_ins")
    user = db.relationship('User', back_populates="check_ins")
    comments = db.relationship('Comment', back_populates="check_in", cascade="all, delete")
