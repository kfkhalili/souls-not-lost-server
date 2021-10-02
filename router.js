const admin = require("./routes/Admin/admin_routes");
const general = require("./routes/General/general");
const imageUpload = require("./routes/General/imageUpload");
const publicPerson = require("./routes/personRoutes");

module.exports = {
    admin,
    general,
    imageUpload,
    publicPerson
}
