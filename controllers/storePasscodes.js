const pool = require("../db/pool");
exports.storePasscode = async(memberhash, adminhash) =>{
    
    const {rows} = await pool.query("SELECT * from secretcodes");
    if ( rows.length === 0 ){
        //hasnt been stored yet. 
        await pool.query(`INSERT INTO secretcodes(code_type, code_hash)
            VALUES ('membership', $1)`, [memberhash]);
        await pool.query(`INSERT INTO secretcodes(code_type, code_hash)
            VALUES ('admin', $1)`, [adminhash]);
            return;
    }
    console.log("passcodes already exist in database.");
    return;
}