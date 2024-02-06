from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

# Add seed data
def seed_comments():
    demo_comments = [
        Comment(
            body="I like this one too!",
            user_id=1,
            check_in_id=1
        ),
        Comment(
            body="I'm glad you had it, this is a cool beer",
            user_id=1,
            check_in_id=3
        ),
        Comment(
            body="Are you sure you were drinking the right one? You're a nut!",
            user_id=1,
            check_in_id=5
        )
    ]

    fry_comments = [
        Comment(
            body="I like this one too!",
            user_id=2,
            check_in_id=3
        ),
        Comment(
            body="I'm glad you had it, this is a cool beer",
            user_id=2,
            check_in_id=5
        ),
        Comment(
            body="Are you sure you were drinking the right one? You're a nut!",
            user_id=2,
            check_in_id=4
        )
    ]

    bender_comments = [
        Comment(
            body="I like this one too!",
            user_id=3,
            check_in_id=7
        ),
        Comment(
            body="I'm glad you had it, this is a cool beer",
            user_id=3,
            check_in_id=2
        ),
        Comment(
            body="Are you sure you were drinking the right one? You're a nut!",
            user_id=3,
            check_in_id=1
        )
    ]

    leela_comments = [
        Comment(
            body="I like this one too!",
            user_id=4,
            check_in_id=6
        ),
        Comment(
            body="I'm glad you had it, this is a cool beer",
            user_id=4,
            check_in_id=2
        ),
        Comment(
            body="Are you sure you were drinking the right one? You're a nut!",
            user_id=4,
            check_in_id=3
        )
    ]


    db.session.add_all(demo_comments)
    db.session.add_all(fry_comments)
    db.session.add_all(bender_comments)
    db.session.add_all(leela_comments)
    db.session.commit()



# Remove seed data
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
