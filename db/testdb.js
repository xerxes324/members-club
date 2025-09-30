const pool = require("./pool");

const query = async()=>{
    console.log(process.env.DATABASE_URL, "is the url");
    const {rows} = await pool.query("select * from users;");
    console.log(rows,"is the rows");
}

query();