from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, SubmitField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class CheckInForm(FlaskForm):
    body = StringField("body", validators=[Length(min=0, max=255)])
    rating = IntegerField("rating", validators=[NumberRange(min=1, max=5)])
    image_url = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
