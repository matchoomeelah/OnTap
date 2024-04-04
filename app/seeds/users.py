from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Demo", last_name="Lition", username='Demo', email='demo@aa.io', password='password')
    fry = User(
        first_name="Phillip J.", last_name="Fry", username='fry', email='fry@aa.io', password='password', profile_pic='https://i.ibb.co/7JJG7yp/fry-pic.jpg')
    bender = User(
        first_name="Bender", last_name="Rodriguez", username='bender', email='bender@aa.io', password='password', profile_pic='https://i.ibb.co/N7rgq3b/bender-pic.jpg')
        # first_name="Bender", last_name="Rodriguez", username='bender', email='bender@aa.io', password='password', profile_pic='https://i.ibb.co/N7rgq3b/bender-pic.jpg')
    leela = User(
        first_name="Turanga", last_name="Leela", username='leela', email='leela@aa.io', password='password', profile_pic='https://i.ibb.co/cgKfL4h/leela-pic.jpg')
    amy = User(
        first_name="Amy", last_name="Wong", username='amy', email='amy@aa.io', password='password', profile_pic='https://i.ibb.co/PNZY32R/amy-pic.webp')
    farnsworth = User(
        first_name="Hubert", last_name="Farnsworth", username='hubert', email='hubert@aa.io', password='password')
    zoidberg = User(
        first_name="Dr.", last_name="Zoidberg", username='zoidberg', email='zoidberg@aa.io', password='password')
    hermes = User(
        first_name="Hermes", last_name="Conrad", username='hermes', email='hermes@aa.io', password='password')
    zapp = User(
        first_name="Zapp", last_name="Brannigan", username='zapp', email='zapp@aa.io', password='password')



    db.session.add(demo)
    db.session.add(fry)
    db.session.add(bender)
    db.session.add(leela)
    db.session.add(amy)
    db.session.add(farnsworth)
    db.session.add(zoidberg)
    db.session.add(hermes)
    db.session.add(zapp)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
