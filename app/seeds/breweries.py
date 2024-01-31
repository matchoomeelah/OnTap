from app.models import db, Brewery, environment, SCHEMA
from sqlalchemy.sql import text

# Add seed data
def seed_breweries():
    lagunitas = Brewery(
        name='Lagunitas Brewing Co.',
        type='Macro Brewery',
        city='Petaluma',
        state_province='California',
        country='United States',
        description="From points distant and beyond we all converged on Petaluma in 1993 and \'94 with an unenunciated desire to be more than we were before. The core of Lagunitas came from Chicago, St Louis, Memphis, Walker Creek, and the highlands of Quincy. The Chicago contingent initiated the brewing and the gravitational effect of its suchness did the rest. We all loved the beer but the mission was larger than the ordinary joy of a hoppy-sweet quaff. It was driven unseen by an urge to communicate with people, to find our diasporidic tribe, and to connect with other souls adrift on a culture that had lost its center and spun its inhabitants to the four winds to wander lost and bereft with a longing to re-enter the light. Beer, we have learned, has always been a good lubricant for social intercourse! The Lagunitas Brewing Co. was not so much an act of ordinary \'foundling\' as it was willed into being by the unspoken desire of supportive beer-lovers in Northern California after which they continued to nurture their creation and urged us forward to fulfill the unifying needs of that same beer-loving diaspora from coast to coast and beyond. It is good to have friends!",
        image_url='https://i.ibb.co/TbK0brF/lagunitas-logo.png',
        website_url='https://lagunitas.com/',
        creator_id=1
        )
    four_o_five = Brewery(
        name='405 Brewing Co',
        type='Micro Brewery',
        city='Norman',
        state_province='Oklahoma',
        country='United States',
        description="Norman, Oklahoma's first brewery est. 2013. Beer built by hand, Liquid Art!",
        image_url='https://i.ibb.co/fk3TMbn/405-brewing-logo.jpg',
        website_url='https://405brewing.com/',
        creator_id=1
        )

    madtree = Brewery(
        name='MadTree Brewing 2.0',
        type='Regional Brewery',
        city='Cincinnati',
        state_province='Ohio',
        country='United States',
        description="MadTree puts purpose in every pour. Founded in 2013, MadTree has always been driven to craft great beer - but more importantly - to build something bigger than themselves and the high-quality beer they produce. Since the beginning, MadTree has cared deeply about creating meaningful connections with their communities. They embrace their namesake and work to celebrate and protect nature while reducing their impact on the environment. They are proud members of 1% for the Planet, with a commitment to donate 1% of sales to non-profits focused on environmental sustainability. The craftspeople at MadTree wake up every day to connect people to nature and each other. MadTree. Inspiring Madness. Rooted in Purpose.",
        image_url='https://i.ibb.co/BrnwhF1/madtree-logo.jpg',
        website_url="http://www.madtreebrewing.com",
        creator_id=2
        )
    elysian = Brewery(
        name='Elysian Brewing Company',
        type='Macro Brewery',
        city='Seattle',
        state_province='Washington',
        country='United States',
        description="We opened our doors in 1996 when bold art and music defined Seattle. Over the past 25 years, we've carried this same spirit in the way we brew our beer - shaking up classic styles, using unusual ingredients, and learning from experimentation. Come chase down the rabbit hole with us.",
        image_url='https://on-tap-bucket.s3.us-west-1.amazonaws.com/Elysian-logo.jpg',
        website_url="https://www.elysianbrewing.com",
        creator_id=2
        )

    db.session.add(lagunitas)
    db.session.add(four_o_five)
    db.session.add(madtree)
    db.session.add(elysian)
    db.session.commit()



# Remove seed data
def undo_breweries():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.breweries RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM breweries"))

    db.session.commit()
