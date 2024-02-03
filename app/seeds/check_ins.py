from app.models import db, CheckIn, environment, SCHEMA
from sqlalchemy.sql import text

# Add seed data
def seed_check_ins():
    demo_seeds = [
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/ex_beer_1.jpeg",
        beer_id=1,
        user_id=1
    ),
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/ex_beer_2.jpeg",
        beer_id=2,
        user_id=1
    ),
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=5,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/ex_beer_4.jpeg",
        beer_id=3,
        user_id=1
    ),
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/Space-Dust-Check-Ins/space_dust_check5.jpeg",
        beer_id=4,
        user_id=1
    )]

    fry_seeds = [
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/Space-Dust-Check-Ins/space_dust_check1.jpeg",
        beer_id=1,
        user_id=2
    )]

    bender_seeds = [
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/Space-Dust-Check-Ins/space_dust_check2.jpeg",
        beer_id=4,
        user_id=3
    )]

    leela_seeds = [
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/Space-Dust-Check-Ins/space_dust_check3.jpeg",
        beer_id=4,
        user_id=4
    )]

    amy_seeds = [
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/Space-Dust-Check-Ins/space_dust_check4.avif",
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
