function convertBrewery(brewery) {
    const var_name = "var_" + brewery.name.split(" ").join("");

    result = `${var_name} = Brewery(
        name='${brewery.name}',
        type
    )`
}


// sierra_nevada = Brewery(
//     name='Sierra Nevada',
//     type='Macro Brewery',
//     city='Seattle',
//     state_province='Washington',
//     country='United States',
//     description="We opened our doors in 1996 when bold art and music defined Seattle. Over the past 25 years, we've carried this same spirit in the way we brew our beer - shaking up classic styles, using unusual ingredients, and learning from experimentation. Come chase down the rabbit hole with us.",
//     orig_image_url="Elysian-logo.jpg",
//     image_url='https://on-tap-bucket.s3.us-west-1.amazonaws.com/OnTap+Images/Elysian-logo.jpg',
//     website_url="https://www.elysianbrewing.com",
//     creator_id=2
//     )
