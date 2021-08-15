//Require Mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9]+$/, "is invalid"],
            index: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, "is invalid"],
            index: true,
        },
        password: {type: String, required: true, trim: true},
        status: {
            type: String,
            enum: ["Pending", "Active"],
            default: "Pending",
        },
        userType: {
            type: String,
            enum: ["client", "admin"],
            default: "client",
        },
        canUpload: {
            type: Boolean,
            default: false
        },
        confirmationCode: {
            type: String,
            unique: true,
        },
        isSuspended: {
            type: Boolean,
            unique: true,
        },
    },
    {timestamps: true}
);
userSchema.index({ username:1 }, { unique: true })
userSchema.index({ email:1 }, { unique: true })

// Compile model from schema
module.exports = mongoose.model("User", userSchema);
