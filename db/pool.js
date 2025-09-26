const {Pool} = require('pg');
require("dotenv").config();

module.exports = new Pool({
    host: process.env.host,
    user : process.env.user,
    password : process.env.password,
    database : process.env.database,
    port : process.env.port
})
