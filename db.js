const pg = require('pg')

const { Pool } = pg;
const mysql = require("mysql")


const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'littlelemon',
  password: '159159',
  port: 5000
})


  //connect
  db.connect((err)=>{
    if(err){
      console.log(err)
      throw err;
    }
    console.log("Connected to postgres");
  });

  process.on('exit', () => {
    db.end();
  });
module.exports = db;