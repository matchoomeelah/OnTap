from .db import db, environment, SCHEMA, add_prefix_for_prod

class Brewery(db.Model):
    __tablename__ = "breweries"

    # Associate with the schema
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    type = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state_province = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False, default="A brewer of beer.")
    image_url = db.Column(db.Text, nullable=False, default="https://i.ibb.co/DCBFCfb/No-image-available.png")
    website_url = db.Column(db.String(255), nullable=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # Relationships
    creator = db.relationship('User', back_populates="breweries", cascade="all, delete")
    beers = db.relationship('Beer', back_populates="brewery")
