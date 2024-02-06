from flask.cli import AppGroup
from .users import seed_users, undo_users
from .breweries import seed_breweries, undo_breweries
from .beers import seed_beers, undo_beers
from .check_ins import seed_check_ins, undo_check_ins
from .comments import seed_comments, undo_comments

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_breweries()
        undo_beers()
        undo_check_ins()
        undo_comments()
    seed_users()
    seed_breweries()
    seed_beers()
    seed_check_ins()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_breweries()
    undo_beers()
    undo_check_ins()
    undo_comments()

    # Add other undo functions here
