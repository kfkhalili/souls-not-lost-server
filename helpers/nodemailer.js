require("dotenv").config();
const nodemailer = require("nodemailer");

const user = process.env.USER_EMAIL;
const pass = process.env.USER_PASS;

const transporter = nodemailer.createTransport({
  name: "mail.khalidalkhalili.com",
  host: "mail.khalidalkhalili.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (username, email, confirmationCode) => {
  transporter
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${username}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:5001/api/auth/confirm/${confirmationCode}> Click here</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};
