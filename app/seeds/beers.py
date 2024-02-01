from app.models import db, Beer, environment, SCHEMA
from sqlalchemy.sql import text

# Add seed data
def seed_beers():
    lagunitas_IPA = Beer(
        name="IPA",
        abv=6.2,
        ibu=51,
        style='American IPA',
        description="This is our unique version of an ancient style. A style as old as the ocean trade routes of the last centuries of Great Ships. Not as old as the equator they had to cross twice enroute, nor as old as the 10,000 miles or so of Di-Hydrogen Oxide and Sodium upon which they sailed, but older than the Circulithium-4 Lentoid that binds the Lupulin Quartnate onto your taste buds. Weird. IPA has loads of “C” Hops balanced on a bed of fine English Crystal, Caramel & Munich Malts. Designed to pair well with food and pretty much everything else!",
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/lagunitas_ipa.jpeg",
        # image_url="https://i.ibb.co/y8Tpr4Y/lagunitas-ipa.jpg",
        orig_image_url="lagunitas-ipa.jpg",
        creator_id=1,
        brewery_id=1
    )
    lagunitas_little_sumpin = Beer(
        name="A Little Sumpin' Sumpin' Ale",
        abv=7.5,
        ibu=64,
        style='White/Wheat IPA',
        description="Way smooth and silky with a nice wheatly-esque-ish-ness. A truly unique style featuring a strong hop finish on a silky body. A hoppy pale wheat ale that is great for IPA fans but so smooth that the hefeweizen fans dig it too.",
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/lagunitas_little_sumpin.webp",
        # image_url="https://i.ibb.co/LCy0cX5/lagunitas-little-sumpin.jpg",
        orig_image_url="lagunitas-little-sumpin.jpg",
        creator_id=2,
        brewery_id=1
    )
    psychopathy = Beer(
        name="PsycHOPathy",
        abv=6.9,
        ibu=60,
        style='American IPA',
        description="Explore the blend of citrus, bright, and floral aromas. Additional citrus flavors follow alongside a smooth bitterness. It finishes with a medium body and a slightly sweet, malty backbone. Trust your senses.",
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/madtree_psychopathy.jpeg",
        # image_url="https://i.ibb.co/3BrF34f/madtree-psychopathy.jpg",
        orig_image_url="madtree-psychopathy.jpg",
        creator_id=2,
        brewery_id=3
    )
    space_dust = Beer(
        name="Space Dust IPA",
        abv=8.2,
        ibu=62,
        style='American IPA',
        description="Space Dust is out of this world, with 62 IBU, and 8.2% ABV. This citrus-forward IPA balances bitterness with a sweetness of hop flavors. Grapefruit, mango, and orange aromas with a medium body and a dry finish. (p.s. It's a hop, not an artichoke!)",
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/elysian-space-dust.jpeg",
        # image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/elysian-space-dust.jpeg",
        orig_image_url="elysian-space-dust.jpeg",
        creator_id=1,
        brewery_id=4
    )
    db.session.add(lagunitas_IPA)
    db.session.add(lagunitas_little_sumpin)
    db.session.add(psychopathy)
    db.session.add(space_dust)
    db.session.commit()



# Remove seed data
def undo_beers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.beers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM beers"))

    db.session.commit()
