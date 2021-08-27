const PlaceOfDeath = require('../models/PlaceOfDeath');
const data = [
    {
        name:"place 1",
        nameAr:"مكان 1"
    }
];

module.exports = async () => {
    const occ = await PlaceOfDeath.findOne();

    if(occ == null){
        await PlaceOfDeath.insertMany(data);
        await PlaceOfDeath.save();
    }
}
