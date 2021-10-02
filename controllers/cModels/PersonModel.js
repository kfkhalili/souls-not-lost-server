const { extractQuery } = require("../helpers/mapper");

class personModel{
    name
    birth
    death
    nationality
    occupation
    causeOfDeath
    url
    picture
    image
}

module.exports.personModel = extractQuery(new personModel())
