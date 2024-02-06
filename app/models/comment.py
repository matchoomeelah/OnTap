from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = "comments"

    # Associate with the schema
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    check_in_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('check_ins.id')), nullable=False)

    user = db.relationship('User', back_populates="comments")
    check_in = db.relationship('CheckIn', back_populates="comments")

    def to_dict(self):
        return {
            "body": self.body,
            "user": {
                "first_name": self.user.first_name,
                "last_name": self.user.last_name,
                "username": self.user.username,
            },
            "user_id": self.user_id,
            "check_in_id": self.check_in_id
        }
