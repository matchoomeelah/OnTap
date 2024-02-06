from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, SubmitField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class CommentForm(FlaskForm):
    body = StringField("body", validators=[Length(min=0, max=255)])
    # check_in_id = IntegerField("check_in_id", validators=[DataRequired()])
