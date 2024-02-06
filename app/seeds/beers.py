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
        orig_image_url="elysian-space-dust.jpeg",
        creator_id=1,
        brewery_id=4
    )
    delicious = Beer(
        name="Delicious IPA",
        abv=7.7,
        ibu=75,
        style='American IPA',
        description="An intensely citrusy, beautifully bitter beer worthy of the simple-yet-lordly title of Stone Delicious IPA. Lemondrop and El Dorado hops combine to bring on a magnificent lemon candy-like flavor that's balanced by hop spice. Delicious is crafted to reduce gluten.",
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/stone_delicious.jpeg",
        orig_image_url="stone_delicious.jpeg",
        creator_id=1,
        brewery_id=5
    )
    hairy_eyeball = Beer(
        name="The Hairy Eyeball",
        abv=9.1,
        ibu=57,
        style='American Strong Ale',
        description="A roasty, toasty, malty, hangover-halting beer. Especially formulated for when you wake up feelin' like you need to shave your eyeballs to see the new day.",
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/hairy_eyeball.jpeg",
        orig_image_url="hairy_eyeball.jpeg",
        creator_id=1,
        brewery_id=1
    )
    cappuccino_stout = Beer(
        name="Cappuccino Stout",
        abv=9.3,
        ibu=29,
        style='Stout',
        description="Brewed with boatloads of roasted coffee in each batch for that extra Krunk… this Mondo Coffee Stout will leave you wondering whether you’re coming or going.",
        image_url="https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/cappuccino_stout.jpeg",
        orig_image_url="cappuccino_stout.jpeg",
        creator_id=1,
        brewery_id=1
    )
    db.session.add(lagunitas_IPA)
    db.session.add(lagunitas_little_sumpin)
    db.session.add(psychopathy)
    db.session.add(space_dust)
    db.session.add(delicious)
    db.session.add(hairy_eyeball)
    db.session.add(cappuccino_stout)

    db.session.commit()



# Remove seed data
def undo_beers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.beers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM beers"))

    db.session.commit()
