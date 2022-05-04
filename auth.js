require("dotenv").config();
const { argv } = require("yargs");


module.exports = {
  email: "email" in argv ? argv.email : process.env.NEUROSITY_EMAIL,
  password:
    "password" in argv ? argv.password : process.env.NEUROSITY_PASSWORD
};