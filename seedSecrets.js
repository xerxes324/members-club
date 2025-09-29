require("dotenv").config();
const bcrypt = require("bcryptjs");
const controller = require("./controllers/storePasscodes");

exports.hashSecret = async() => {
    const memberhash = bcrypt.hash(process.env.MEMBERSHIP_PASSCODE, 10);
    const adminhash = bcrypt.hash(process.env.ADMIN_PASSCODE, 10);
    await controller.storePasscode(memberhash, adminhash);
}


 