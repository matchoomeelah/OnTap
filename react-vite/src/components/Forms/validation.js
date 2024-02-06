export function validateBreweryForm(name, type, city, state_province, country, description, image_url, website_url) {
    const errors = {}

    // Name
    if (name.trim().length <= 0) {
        errors.name = "This field is required";
    }

    // Type
    if (type.trim().length <= 0) {
        errors.type = "This field is required";
    }

    // City
    if (city.trim().length <= 0) {
        errors.city = "This field is required";
    }

    // State/Province
    if (state_province.trim().length <= 0) {
        errors.state_province = "This field is required";
    }

    // Country
    if (country.trim().length <= 0) {
        errors.country = "This field is required";
    }

    // Description
    if (description.trim().length <= 0) {
        errors.description = "This field is required";
    }

    // Website URL
    if (website_url && !validURL(website_url)) {
        errors.website_url = "The provided URL is not valid"
    }

    return errors;
}

export function validateBeerForm(name, abv, ibu, style, description, breweryId) {
    const errors = {}

    // Name
    if (name.trim().length <= 0) {
        errors.name = "This field is required";
    }

    // Brewery
    if (breweryId === 0) {
        errors.brewery_id = "This field is required";
    }

    // ABV
    if (abv.trim().length <= 0) {
        errors.abv = "This field is required";
    }

    if (abv.length > 5) {
        errors.abv = "ABV should only specify up to 2 decimal places"
    }

    if (isNaN(abv) || Number(abv) < 0 || Number(abv) > 100) {
        errors.abv = "ABV must be a number from 0 to 99.99... don't even try 100..."
    }

    if (Number(abv) === 100) {
        errors.abv = "This beer will kill you and is not allowed here"
    }


    // IBU
    if (ibu.trim().length <= 0) {
        errors.ibu = "This field is required";
    }

    if (isNaN(ibu) || Number(ibu) < 0 || Number(ibu) > 120 || ibu.indexOf(".") != -1) {
        errors.ibu = "IBU must be a whole number from 0 to 120... don't make 120"
    }

    // Style
    if (style.trim().length <= 0) {
        errors.style = "This field is required";
    }

    // Description
    if (description.trim().length <= 0) {
        errors.description = "This field is required";
    }

    return errors;
}

export function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}
