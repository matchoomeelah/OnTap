from app.models import db, CheckIn, environment, SCHEMA
from sqlalchemy.sql import text

# Add seed data
def seed_check_ins():
    demo_seeds = [
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=5,
        image_url="https://i.ibb.co/2q9Cp1L/ex-beer-1.jpg",
        beer_id=1,
        user_id=1
    ),
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=4,
        image_url="https://i.ibb.co/jW025Dx/ex-beer-2.jpg",
        beer_id=2,
        user_id=1
    ),
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=5,
        image_url="https://i.ibb.co/GxHsJMm/ex-beer-5.webp",
        beer_id=3,
        user_id=1
    ),
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=4,
        image_url="https://i.ibb.co/LRGvGsP/space-dust-check1.jpg",
        beer_id=4,
        user_id=1
    )]

    fry_seeds = [
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=4,
        image_url="https://i.ibb.co/JypmmVm/space-dust-check5.jpg",
        beer_id=1,
        user_id=2
    )]

    bender_seeds = [
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=4,
        image_url="https://i.ibb.co/fF05Ht2/space-dust-check2.jpg",
        beer_id=4,
        user_id=3
    )]

    leela_seeds = [
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=4,
        image_url="https://i.ibb.co/RhxHdng/space-dust-check3.jpg",
        beer_id=4,
        user_id=4
    )]

    amy_seeds = [
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=4,
        image_url="https://i.ibb.co/9V04fYy/space-dust-check4.jpg",
        beer_id=4,
        user_id=5
    )]


    db.session.add_all(demo_seeds)
    db.session.add_all(fry_seeds)
    db.session.add_all(bender_seeds)
    db.session.add_all(leela_seeds)
    db.session.add_all(amy_seeds)
    db.session.commit()



# Remove seed data
def undo_check_ins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.check_ins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM check_ins"))

    db.session.commit()
