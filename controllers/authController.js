require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const nodemailer = require("../helpers/nodemailer");

// register user by passing username, email, and hashing the password
const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const token = jwt.sign({email: email}, process.env.JWT_ENCODE_SECRET);
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashed,
            confirmationCode: token,
        });

        const user = await User.findOne({
            $or: [{username: username}, {email: email}],
        });
        if (user) {
            return res.status(409).send("username or email already taken");
        }

        newUser.save((err) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            // nodemailer.sendConfirmationEmail(
            //   newUser.username,
            //   newUser.email,
            //   newUser.confirmationCode
            // );

            res.send({
                message: "User was registered successfully! Please check your email",
            });
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

// use email or username with password to login
const login = async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({
        $or: [{username: username}, {email: username}],
    });
    if (!user) {
        return res.status(400).json({msg: "Incorrect account or password"});
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({msg: "Incorrect account or password"});
    }

    const payload = {id: user._id, username: user.username, userType: user.userType};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d",});

    res.status(200).json({
        userId: user._id,
        username: user.username,
        email: user.email,
        token: token,
    });
};

const verifyUser = (req, res) => {
    User.findOne({
        confirmationCode: req.params.confirmationCode,
    }).then((user) => {
        console.log(user);
        if (!user) {
            return res.status(404).send({message: "User Not found."});
        }
        user.status = "Active";
        user.save((err) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
        });
    })
        .catch((e) => console.log("error", e));
};

module.exports = {
    register,
    login,
    verifyUser
};
