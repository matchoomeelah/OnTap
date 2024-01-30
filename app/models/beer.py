from .db import db, environment, SCHEMA, add_prefix_for_prod

class Beer(db.Model):
    __tablename__ = "beers"

    # Associate with the schema
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    abv = db.Column(db.Float, nullable=False)
    ibu = db.Column(db.Integer, nullable=False)
    style = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False, default="A fine beer")
    image_url = db.Column(db.Text, nullable=False, default="https://i.ibb.co/DCBFCfb/No-image-available.png")
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    brewery_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('breweries.id')), nullable=False)

    # Relationships
    creator = db.relationship('User', back_populates="beers", cascade="all, delete")
    brewery = db.relationship('Brewery', back_populates="beers", cascade="all, delete")
    lists = db.relationship("List", secondary="beers_lists", back_populates="beers")
