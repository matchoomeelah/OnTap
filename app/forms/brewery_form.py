from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length
from app.api.aws_helpers import ALLOWED_EXTENSIONS
from app.models import Brewery


def name_is_unique(form, field):
    # Check if brewery name already exists
    name = field.data
    brewery = Brewery.query.filter(Brewery.name == name).first()

    if brewery:
        raise ValidationError('A Brewery with this name already exists')




class BreweryForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(min=1, max=60), name_is_unique])
    type = StringField("Type", validators=[DataRequired()])
    city = StringField("City", validators=[DataRequired(), Length(min=1, max=40)])
    state_province = StringField("State or Province", validators=[DataRequired(), Length(min=1, max=40)])
    country = StringField("Country", validators=[DataRequired(), Length(min=1, max=50)])
    description = StringField("Description", validators=[DataRequired(), Length(min=1, max=1000)])
    image_url = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    website_url = StringField("Website URL", validators=[(Length(min=0, max=120))])
    submit = SubmitField("Create Brewery")
