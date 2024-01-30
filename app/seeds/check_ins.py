from app.models import db, CheckIn, environment, SCHEMA
from sqlalchemy.sql import text

# Add seed data
def seed_check_ins():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')

    db.session.add(demo)
    db.session.commit()



# Remove seed data
def undo_check_ins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.check_ins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM check_ins"))

    db.session.commit()
