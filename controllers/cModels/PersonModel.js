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
}

module.exports.personModel = extractQuery(new personModel())
