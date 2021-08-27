const Nationality = require('../models/Nationality');
const data = require('../routes/General/nationalities.json');

module.exports = async () => {
    const occ = await Nationality.findOne();

    if(occ == null){
        await Nationality.insertMany(data);
        await Nationality.save();
    }
}
