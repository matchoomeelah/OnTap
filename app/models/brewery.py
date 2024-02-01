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
    orig_image_url = db.Column(db.Text, nullable=False, default="no_image_available.png")
    website_url = db.Column(db.String(255), nullable=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # Relationships
    creator = db.relationship('User', back_populates="breweries")
    beers = db.relationship('Beer', back_populates="brewery", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'city': self.city,
            'state_province': self.state_province,
            'country': self.country,
            'description': self.description,
            'image_url': self.image_url,
            'orig_image_url': self.orig_image_url,
            'website_url': self.website_url,
            'beers': [beer.to_dict() for beer in self.beers],
            'creator_id': self.creator_id
        }
