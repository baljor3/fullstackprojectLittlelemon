const express = require("express");
const app = express();
const cors = require("cors")
const mysql = require("mysql")

//create db
app.get('/createdb',(req, res )=>{
  let sql = 'CREATE DATABASE nodemysql';

  db.query(sql,(err,result)={
    
    if(err){
      throw err;
    }

  })
  console.log("db created")
})

// Create Connection
const db = mysql.createConnection({
  host: " localhost",
  usser: "root",
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


app.use(
  cors({
  origin:'*'
}));

const DatesRouter = require("./src");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/dates", DatesRouter);




const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
