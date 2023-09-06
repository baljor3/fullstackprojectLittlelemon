const mysql = require("mysql")

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "159159",
    database: "nodemysql"
  });
  
  //connect
  db.connect((err)=>{
    if(err){
      throw err;
    }
    console.log("Connected to mysql");
  });
  
module.exports = db;