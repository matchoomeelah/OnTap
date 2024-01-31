from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, SubmitField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class BeerForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    brewery_id = IntegerField("Brewery", validators=[DataRequired()])
    abv = FloatField("ABV", validators=[DataRequired()])
    ibu = IntegerField("IBU", validators=[DataRequired()])
    style = StringField("Style", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    image_url = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Beer")
