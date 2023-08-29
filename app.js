const express = require("express");
const app = express();
const cors = require("cors")
const mysql = require("mysql")

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "159159",
});

//connect
db.connect((err)=>{
  if(err){
    throw err;
  }
  console.log("Connected to mysql");
});

//create db
app.get('/createdb',(req, res )=>{
  let sql = 'CREATE DATABASE nodemysql';

  db.query(sql,(err,result)=>{
    
    if(err){
      throw err;
    }
  })
  console.log("db created")
})

// create table
app.get('/createlogintable', (req,res)=>{
  let sql = 'CREATE TABLE login(id int AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err,result)=>{
    if(err){
      throw err;
    }
    console.log(result)
    res.send("login table created")
  })
})
// Create Connection



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
