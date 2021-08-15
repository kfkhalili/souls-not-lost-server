const {extractQuery} = require("../helpers/mapper");
module.exports.userModel = extractQuery({
    username:"",
    email:"",
    status:"",
    userType:"",
    canUpload:"",
    isSuspended:"",
    createdAt:""
})
