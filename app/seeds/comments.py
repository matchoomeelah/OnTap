from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

# Add seed data
def seed_comments():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')

    db.session.add(demo)
    db.session.commit()



# Remove seed data
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
