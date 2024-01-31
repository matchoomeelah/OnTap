from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class BreweryForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    type = StringField("Type", validators=[DataRequired()])
    city = StringField("City", validators=[DataRequired()])
    state_province = StringField("State or Province", validators=[DataRequired()])
    country = StringField("Country", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    website_url = StringField("Website URL")
