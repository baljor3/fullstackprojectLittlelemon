const express = require("express");
const app = express();
const cors = require("cors")
const db = require("./db")
require("dotenv").config()


//create db
app.get('/createdb',(req, res )=>{
  let sql = 'CREATE DATABASE nodemysql';

  db.query(sql,(err,result)=>{
    if(err){
      console.log(err)
      throw err;
    }
  })
  console.log("db created")
})

app.get('/createOrder',(req,res)=>{
  let sql = `CREATE TABLE orders ( id UUID, 
    item VARCHAR(255)[], 
  price NUMERIC[], 
  Quantity int[], 
  total NUMERIC[],
  taxes NUMERIC,
  grandtotal NUMERIC,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`

  db.query(sql,(err,result)=>{
    if(err){
      throw err;
    }
    console.log(result)
    res.send("order table created")
  })
})

// create table
app.get('/createlogintable', (req,res)=>{
  let sql = 'CREATE TABLE login(id int AUTO_INCREMENT, username VARCHAR(255), email VARCHAR(255) ,password VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err,result)=>{
    if(err){
      throw err;
    }
    console.log(result)
    res.send("login table created")
  })
})

//create cart
app.get('/createCart',(req,res)=>{
  let sql = 'CREATE TABLE cart(orderid int AUTO_INCREMENT, userid int, productid int, PRIMARY KEY (orderid), FOREIGN KEY (userid) REFERENCES login(id), FOREIGN KEY (productid) REFERENCES product(productid))'

    db.query(sql, (err,result)=>{
      if(err){
        throw err;
      }
      console.log(result)
      res.send("cart table created")
    })
})

//create product
app.get('/createProduct',(req,res)=>{
  let sql = 'CREATE TABLE product(productid int AUTO_INCREMENT, name VARCHAR(255), Description TEXT,  price double(3,2), PRIMARY KEY(productid))'
  db.query(sql, (err,result)=>{
    if(err){
      throw err;
    }
    res.send("product table created")
  })
})

app.get('/updateProductPrice',(req,res)=>{
  let sql = "ALTER TABLE product MODIFY COLUMN price DOUBLE(8,2)"

  db.query(sql,(err,result)=>{
    if(err){
      throw err;
    }
    res.send("table changed")
  })

})
/*
INSERT INTO nodemysql.product(name,Description,price) VALUES 
("Bruchetta", "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",15),
("LemonDessert", "This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",8);
*/
app.get('/createReview',(req,res)=>{
  let sql = 'CREATE TABLE review(reviewid int AUTO_INCREMENT, rating int ,username VARCHAR(255),userid int, productid int, Description TEXT,FOREIGN KEY (userid) REFERENCES login(id), FOREIGN KEY (productid) REFERENCES product(productid), PRIMARY KEY(reviewid))'
  db.query(sql, (err,result)=>{
    if(err){
      throw err;
    }
    res.send("review created")
  })
})

//TODO: made reservation table
app.get('/reservations',(req,res)=>{

  let sql = `CREATE TABLE reservations(
    date DATE NOT NULL,
    time VARCHAR(20) NOT NULL,
    Noguests INT NOT NULL,
    OCCASION VARCHAR(20) NOT NULL
  )
`


})

app.get('/changeReviewTable',(req,res)=>{
  let sql = "ALTER TABLE review ADD date DATE"

  db.query(sql,(err,result)=>{
    if(err){
      throw err;
    }

    res.send("review table change")
  })

})
app.use(
  cors({
  origin:'*'
}));

const DatesRouter = require("./src");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", DatesRouter);




const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
