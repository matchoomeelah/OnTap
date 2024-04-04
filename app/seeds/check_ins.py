from app.models import db, CheckIn, environment, SCHEMA
from sqlalchemy.sql import text

# Add seed data
def seed_check_ins():
    demo_seeds = [
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=5,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/check-ins/Lagunitas+IPA+lifestyle(1).jpg",
        beer_id=1,
        brewery_id=1,
        user_id=1
    ),
    CheckIn(
        body="I may be a demo user, but this ain't no demo beer!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/example-beers/ex_beer_2.jpeg",
        beer_id=2,
        brewery_id=1,
        user_id=1
    ),
    CheckIn(
        body="It's real good and also fake good.",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/Space-Dust-Check-Ins/space_dust_check1.jpeg",
        beer_id=4,
        brewery_id=4,
        user_id=2
    )]

    fry_seeds = [
    CheckIn(
        body="The Fighting Mongooses out celebrating!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/Space-Dust-Check-Ins/space_dust_check5.jpeg",
        beer_id=1,
        brewery_id=1,
        user_id=2
    ),
    CheckIn(
        body="Slurm is better.",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/Space-Dust-Check-Ins/space_dust_check3.jpeg",
        beer_id=4,
        brewery_id=4,
        user_id=2
    )]

    bender_seeds = [
    CheckIn(
        body="Bite my shiny golden glass!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/Space-Dust-Check-Ins/space_dust_check2.jpeg",
        beer_id=4,
        brewery_id=4,
        user_id=3
    ),
    ]

    leela_seeds = [
    CheckIn(
        body="It's like I have a 2nd eyeball!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/Space-Dust-Check-Ins/space_dust_check3.jpeg",
        beer_id=4,
        brewery_id=4,
        user_id=4
    ),
    ]

    amy_seeds = [
    CheckIn(
        body="Spluh buh dubba doo",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/Space-Dust-Check-Ins/space_dust_check4.avif",
        beer_id=4,
        brewery_id=4,
        user_id=5
    ),
    ]

    fill_psych = [
    CheckIn(
        body="Spluh buh dubba doo",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/check-ins/IMG-20190427-182516060-HDR.jpg",
        beer_id=3,
        brewery_id=3,
        user_id=6
    ),
    CheckIn(
        body="I may be a demo user, but this ain't no demo beer!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/check-ins/psych3.jpg",
        beer_id=3,
        brewery_id=3,
        user_id=5
    ),
    CheckIn(
        body="I may be a demo user, but this ain't no demo beer!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/example-beers/ex_beer_2.jpeg",
        beer_id=3,
        brewery_id=3,
        user_id=4
    ),
    CheckIn(
        body="I may be a demo user, but this ain't no demo beer!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/check-ins/image-99ea41ab-378a-4f93-955b-daa6d6ae97a4-600x.webp",
        beer_id=3,
        brewery_id=3,
        user_id=3
    ),
    CheckIn(
        body="I may be a demo user, but this ain't no demo beer!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/check-ins/madtree-psychopathy-og-1.webp",
        beer_id=3,
        brewery_id=3,
        user_id=2
    ),
    CheckIn(
        body="I may be a demo user, but this ain't no demo beer!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/check-ins/psychopathy1.jpg",
        beer_id=3,
        brewery_id=3,
        user_id=1
    ),
    CheckIn(
        body="I may be a demo user, but this ain't no demo beer!",
        rating=4,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/check-ins/0085833600425-A.webp",
        beer_id=3,
        brewery_id=3,
        user_id=3
    ),
    CheckIn(
        body="It's like the story of the grasshopper and the octopus...",
        rating=5,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/check-ins/DSC-0012-1024x683.jpg",
        beer_id=3,
        brewery_id=3,
        user_id=2
    ),
    CheckIn(
        body="More pleeeaaase.",
        rating=5,
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/example-beers/ex_beer_5.webp",
        beer_id=3,
        brewery_id=3,
        user_id=1
    ),
    ]



    db.session.add_all(demo_seeds)
    db.session.add_all(fry_seeds)
    db.session.add_all(bender_seeds)
    db.session.add_all(leela_seeds)
    db.session.add_all(amy_seeds)
    db.session.add_all(fill_psych)
    db.session.commit()



# Remove seed data
def undo_check_ins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.check_ins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM check_ins"))

    db.session.commit()
