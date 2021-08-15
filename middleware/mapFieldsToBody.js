module.exports.mapFieldsToBody = (req, res, next) => {
    if(req.fields){
        req.body = req.fields;
    }
    next()
};
