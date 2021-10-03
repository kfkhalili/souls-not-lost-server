const Person = require("../models/Person");
const {personModel} = require("./cModels/PersonModel");
const fs = require("fs");
const {uploadImageByFormaidable} = require("../helpers/s3");
const {v4: uuidv4} = require("uuid");

//getProfiles function to get all profiles
const getPeople = async (req, res) => {
    const page = req.query.pageNumber || 0;
    const pageSize = req.query.pageSize || 0;
    const users = await Person.find({})
        .select(personModel)
        .populate("causeOfDeath nationality deathPlace birthplace deathPlace")
        .populate('createdBy', 'username email')
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

//getProfiles function to get all profiles
const getPersonById = async (req, res) => {
    const id = req.params.id;
    const person = await Person.findOne({_id: id})
        .select(personModel)
        .populate("causeOfDeath nationality deathPlace birthplace")
        .populate('createdBy', 'username email');

    res.status(200).json(person);
};

//createProfile function to create new name
const createAndUpdatePerson = async (req, res) => {
    let person;
    if (req.body._id > " ") {
        person = await Person.findOne({name: req.body.name, _id: {$ne: req.body._id}});
        if (person) {
            return res.status(409).send(`Person with name ${req.body.name} already exists`);
        }
        person = await Person.findOne({_id: req.body._id});
        person.overwrite(req.body)
    } else {
        person = await Person.findOne({name: req.body.name});
        if (person) {
            return res.status(409).send(`Person with name ${req.body.name} already exists`);
        }
        person = new Person(req.body);
    }

    if(req.files.picture){
        const bodyStream = fs.createReadStream(req.files.picture.path);
        const fileName = req.files.picture.name;
        person.image = [await uploadImageByFormaidable(bodyStream, `${uuidv4()}_${fileName}`)];
    }

    person.createdBy = req.user.id;
    await person.save();
    res.send({
        data: person,
        message: "Person updated sucessfully"
    });
};

const removePerson = async (req, res) => {
    const result = await Person.deleteOne({_id: req.params.id});

    if (result.deletedCount > 0) {
        res.send({
            data: result.deletedCount,
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
    removePerson,
    getPersonById
};
