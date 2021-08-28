const Person = require("../models/Person");
const Nationality = require("../models/Nationality");
const {personModel} = require("./cModels/PersonModel");

//getProfiles function to get all profiles
const getPeople = async (req, res) => {
    const page = req.query.pageNumber || 0;
    const pageSize = req.query.pageSize || 0;
    const users = await Person.find({})
        .select(personModel)
        .populate("causeOfDeath occupation nationality deathPlace birthplace createdBy")
        .sort({createdAt: -1})
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    const total = await Person.find({}).countDocuments();

    res.status(200).json({
        entities: users,
        page: page,
        pageSize: pageSize,
        totalCount: total,
    });
};

//createProfile function to create new name
const createAndUpdatePerson = async (req, res) => {
    if (req.body._id > " ") {
        const profile = await Person.findOne({name: name, _id: {$ne: req.body._id}});
        if (profile) {
            return res.status(409).send(`Person with name ${name} already exists`);
        }
        person = await Person.findOne({_id: req.body._id});
        person.overwrite(req.body)
        await person.save();
        res.send({
            data: person,
            message: "Person updated"
        });
    } else {
        const profile = await Person.findOne({name: req.body.name});
        if (profile) {
            return res.status(409).send(`Person with name ${req.body.name} already exists`);
        }
        const newProfile = new Person(req.body);
        await newProfile.save();
        res.send({
            data: newProfile,
            message: "Person added"
        });
    }
};

const removePerson = async (req, res) => {
    const result = await Person.deleteOne({_id: req.body._id});

    if (result.deletedCount > 0) {
        res.send({
            data: deletedCount,
            message: "Person deleted"
        });
    }else{
        res.status(500).send({
            data: 0,
            message: "Person not deleted"
        });
    }
}

module.exports = {
    getPeople,
    createAndUpdatePerson,
    removePerson
};
