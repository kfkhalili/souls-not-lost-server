const CauseOfDeath = require('../models/CauseOfDeath');
const data = [
    {
        name: "reason 1",
        nameAr: "السبب الاول"
    }
]

module.exports = async () => {
    const cause = await CauseOfDeath.findOne();

    if(cause == null){
        await CauseOfDeath.insertMany(data);
        await CauseOfDeath.save();
    }
}
