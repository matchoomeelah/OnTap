from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text

# Add seed data
def seed_lists():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')

    db.session.add(demo)
    db.session.commit()



# Remove seed data
def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
