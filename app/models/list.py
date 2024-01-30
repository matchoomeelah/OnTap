from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class List(db.Model):
    __tablename__ = "lists"

    # Associate with the schema
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False, default="A list of beers.")
    user_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    beers = db.relationship("Beer", secondary="beers_lists", back_populates="lists")
