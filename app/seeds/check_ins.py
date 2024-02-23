from app.models import db, CheckIn, environment, SCHEMA
from sqlalchemy.sql import text

# Add seed data
def seed_check_ins():
    demo_seeds = [
    CheckIn(
        body="This beer is pretty dang good. I think I'll drink it now!",
        rating=5,
        image_url="https://i.ibb.co/hf54n1M/Lagunitas-IPA-lifestyle-1.jpg",
        beer_id=1,
        brewery_id=1,
        user_id=1
    ),
    CheckIn(
        body="I may be a demo user, but this ain't no demo beer!",
        rating=4,
        image_url="https://i.ibb.co/jW025Dx/ex-beer-2.jpg",
        beer_id=2,
        brewery_id=1,
        user_id=1
    ),
    CheckIn(
        body="It's real good and also fake good.",
        rating=4,
        image_url="https://i.ibb.co/LRGvGsP/space-dust-check1.jpg",
        beer_id=4,
        brewery_id=4,
        user_id=2
    )]

    fry_seeds = [
    CheckIn(
        body="The Fighting Mongooses out celebrating!",
        rating=4,
        image_url="https://i.ibb.co/JypmmVm/space-dust-check5.jpg",
        beer_id=1,
        brewery_id=1,
        user_id=2
    ),
    CheckIn(
        body="Slurm is better.",
        rating=4,
        image_url="https://i.ibb.co/LRGvGsP/space-dust-check1.jpg",
        beer_id=4,
        brewery_id=4,
        user_id=2
    )]

    bender_seeds = [
    CheckIn(
        body="Bite my shiny golden beer glass!",
        rating=4,
        image_url="https://i.ibb.co/fF05Ht2/space-dust-check2.jpg",
        beer_id=4,
        brewery_id=4,
        user_id=3
    ),
    ]

    leela_seeds = [
    CheckIn(
        body="It's like I have a 2nd eyeball!",
        rating=4,
        image_url="https://i.ibb.co/RhxHdng/space-dust-check3.jpg",
        beer_id=4,
        brewery_id=4,
        user_id=4
    ),
    ]

    amy_seeds = [
    CheckIn(
        body="Spluh buh dubba doo",
        rating=4,
        image_url="https://i.ibb.co/9V04fYy/space-dust-check4.jpg",
        beer_id=4,
        brewery_id=4,
        user_id=5
    ),
    ]

    # fill_psych = [
    # CheckIn(
    #     body="Spluh buh dubba doo",
    #     rating=4,
    #     image_url="https://i.ibb.co/4MtwFpc/IMG-20190427-182516060-HDR.jpg",
    #     beer_id=3,
    #     brewery_id=3,
    #     user_id=6
    # ),
    # CheckIn(
    #     body="I may be a demo user, but this ain't no demo beer!",
    #     rating=4,
    #     image_url="https://i.ibb.co/ZdfxN0Z/psych3.jpg",
    #     beer_id=3,
    #     brewery_id=3,
    #     user_id=5
    # ),
    # CheckIn(
    #     body="I may be a demo user, but this ain't no demo beer!",
    #     rating=4,
    #     image_url="https://i.ibb.co/jW025Dx/ex-beer-2.jpg",
    #     beer_id=3,
    #     brewery_id=3,
    #     user_id=4
    # ),
    # CheckIn(
    #     body="I may be a demo user, but this ain't no demo beer!",
    #     rating=4,
    #     image_url="https://i.ibb.co/tpJKy09/image-99ea41ab-378a-4f93-955b-daa6d6ae97a4-600x.webp",
    #     beer_id=3,
    #     brewery_id=3,
    #     user_id=3
    # ),
    # CheckIn(
    #     body="I may be a demo user, but this ain't no demo beer!",
    #     rating=4,
    #     image_url="https://i.ibb.co/yqDfQJB/madtree-psychopathy-og.webp",
    #     beer_id=3,
    #     brewery_id=3,
    #     user_id=2
    # ),
    # CheckIn(
    #     body="I may be a demo user, but this ain't no demo beer!",
    #     rating=4,
    #     image_url="https://i.ibb.co/5G0WpKj/psychopathy1.jpg",
    #     beer_id=3,
    #     brewery_id=3,
    #     user_id=1
    # ),
    # CheckIn(
    #     body="I may be a demo user, but this ain't no demo beer!",
    #     rating=4,
    #     image_url="https://i.ibb.co/fNj843Y/0085833600425-A.webp",
    #     beer_id=3,
    #     brewery_id=3,
    #     user_id=3
    # ),
    # CheckIn(
    #     body="It's just like the story of the grasshopper and the octopus. All year long, the grasshopper kept burying acorns for the winter, while the octopus mooched off his girlfriend and watched TV. But then the winter came, and the grasshopper died, and the octopus ate all his acorns.",
    #     rating=5,
    #     image_url="https://i.ibb.co/HtTwC82/DSC-0012-1024x683.jpg",
    #     beer_id=3,
    #     brewery_id=3,
    #     user_id=2
    # ),
    # CheckIn(
    #     body="More pleeeaaase.",
    #     rating=5,
    #     image_url="https://i.ibb.co/GxHsJMm/ex-beer-5.webp",
    #     beer_id=3,
    #     brewery_id=3,
    #     user_id=1
    # ),
    # ]



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
