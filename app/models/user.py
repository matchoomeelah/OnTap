from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    # Associate with the schema
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    #Columns
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.Text, nullable=True)
    banner_pic = db.Column(db.Text, nullable=True)

    # Relationships
    breweries = db.relationship('Brewery', back_populates="creator", cascade="all, delete")
    beers = db.relationship('Beer', back_populates="creator", cascade="all, delete")
    check_ins = db.relationship('CheckIn', back_populates="user", cascade="all, delete")
    comments = db.relationship('Comment', back_populates="user", cascade="all, delete")
    lists = db.relationship('List', back_populates="user", cascade="all, delete")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'profile_pic': self.profile_pic,
            'beers': [beer.to_dict() for beer in self.beers],
            'breweries': [brewery.to_dict() for brewery in self.breweries],
            'check_ins': [check_in.to_dict() for check_in in self.check_ins]
            # 'comments': [comment.to_dict() for comment in self.comments],
            # 'lists': [list.to_dict() for list in self.lists],
        }
