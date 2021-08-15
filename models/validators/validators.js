const {body} = require("express-validator");
module.exports.getPeopleValidator = [];

module.exports.createAndUpdatePersonValidator = [
    body('name').exists().isString().custom(async (value,{req})=>{
        if (req.body._id > " ") {
            const profile = await Person.findOne({name: name, _id: {$ne: req.body._id}});
            if (profile) {
                return false;
            }
        } else {
            const profile = await Person.findOne({name});
            if (profile) {
                return false;
            }
        }
        return true
    }),
    body('birth').exists().isDate(),
    body('death').exists().isDate(),
    body('nationality').exists().isString(),
    body('occupation').exists().isString(),
    body('causeOfDeath').exists().isString(),
    body('url').exists(),
    body('picture').exists().isString(),
]

module.exports.removePersonValidator = [
    body('_id').not().isEmpty().custom(async (value)=>{
        const profile = await Person.findOne({_id: req.body._id});
        return !!profile
    }).withMessage("Person not found"),
]
