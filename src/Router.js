const datecontoller =require('./Controller')
const express = require('express')
const router = express.Router()
const db = require('../db');
const jwt  = require('jsonwebtoken');
const { restart } = require('nodemon');
const nodemailer = require("nodemailer");




const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: "littlelemon589@outlook.com", // Use environment variable
        pass: "Ch159159!", // Use environment variable
    },
    tls: {
        ciphers:'SSLv3'
    }
});

router.post("/sendMessage", async (req, res) => {
    try {
        const { email } = req.body;
        let mailOptions = {
            from: 'littlelemon589@outlook.com',
            to: email,
            subject: 'Hello from Nodemailer',
            text: 'This is a test email sent from Nodemailer using Outlook SMTP'
        };
        console.log(mailOptions)

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.send({ message: "message sent" });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send({ error: 'An error occurred while sending the email' });
    }
});


router.post("/saveDate",(req,res) =>{
    const {date, time, noguests, occasion, email} = req.body
    let sql = `insert INTO reservations(date, time,noguests,occasion, email)
    VALUES ($1,$2,$3,$4,$5)`
    const values = [date,time,noguests,occasion,email]

    db.query(sql, values, (error,result) =>{
        if(error){
            res.send({Err:error})
        }else{
            res.send({message:"dates inserted"})
        }

    })
})



router.get("/getDate",(req,res)=>{
    let sql = "SELECT * FROM reservations"

    db.query(sql,(err,result)=>{
        if(err){
            res.send({Err:err})
        }else{
            res.send(result.rows)
        }
    })

})

router.get("/getDates",(req,res)=>{
    try{
        datecontoller.getDates((err,result)=>{
            if(err){
                res.status(400).send("dates object not found")
            }else{
                res.status(200).send({status:"Ok",data:result})
            }
        })
    }catch(err){
        res.status(500).send("reload api")
    }

})

router.post("/saveDates",(req,res)=>{

    try{

        const dateDetails = req.body;
        console.log(req.body);

        datecontoller.saveDatesDetails(dateDetails,(err,results)=>{
            if(err){
                res.status(400).send("could not save datesObject")
            }else{
                res.status(201).send({status:"OK",data:results})
            }
        });
    }catch(err){
        res.status(500).send("reload save details")
    }

});

router.post('/logininsert', (req, res) => {
  const { username, email,password } = req.body;
  const sql = 'INSERT INTO login (username, email,password) VALUES ($1, $2,$3)';
  const values = [username, email,password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting login data:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(201).json({ message: 'Login data inserted successfully' });
    }
  });
});

router.post('/login', (req,res)=>{

    const {username , password} = req.body;
    const sql = 'SELECT * FROM login WHERE username = $1 AND password = $2'
    const values = [username,password];

    console.log(values)


    db.query(sql, values, (err,result)=>{
        if(err){
            res.status(500).json({error:"Query failed"})
        }else {
            console.log(result.rows)
            if (result.rows && result.rows.length > 0) {
              const user = result.rows[0];
            jwt.sign(
                { id: user.id },
                'secretKey',
                { expiresIn: '1h' },
                (err, token) => {
                  if (err) {
                    res.status(500).json({ error: "Error when creating token" });
                  } else {
                    res.send({ token });
                  }
                }
              );
            } else {
              res.status(401).send(false);
            }
    }
})
})

router.post('/additem',(req,res)=>{

    try{
        var IdorNot = getUserID(req.headers.token)
    }catch(err){
        return res.status(401).json({err:err.message})
    }

    const {productid} = req.body
    const sql = 'INSERT INTO cart(userid, productid) VALUES ($1, $2)'
    const values = [IdorNot,productid]

    db.query(sql,values,(err,result)=>{
        if(err){
            res.status(500).json({error:"Query Failed"})
        }else{
            res.status(200).json({message:"values inserted"})
        }
    })
})

router.post('/deleteitem',(req,res)=>{
    try{
        var IdorNot = getUserID(req.headers.token)
    }catch(err){
        return res.status(401).json({err:err.message})
    }

    const {productid} = req.body
    const values = [productid,IdorNot ]

    const sql = `WITH rows AS (
        SELECT
          orderid,
       productid
        FROM
          cart
          where productid =$1 and userid = $2
        LIMIT 1
      )
      delete from cart
      where (orderid,productid) in (select orderid,productid from rows)`
        console.log("here")
    db.query(sql, values, (err,result)=>{
        if(err){
            console.log(err);
            res.status(500).json({error:"Query failed"})
        }else{
            console.log(result.rows)
            res.status(200).json({message:"values deleted"})
        }
    })

})
router.get('/getProducts',(req,res)=>{

    let sql = "SELECT * from product"

    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).json({error:"Query failed"})
        }else{
            res.send(result.rows)
        }
    })
})

router.get('/getProducts/:id',(req,res)=>{

    const productId = req.params.id; // Retrieve the product ID from the request parameters

    // Use placeholders in the SQL query to prevent SQL injection
    let sql = "SELECT * FROM product WHERE productid = $1";

    db.query(sql, [productId], (err, result) => {
        if (err) {
            console.error("Query failed:", err);
            res.status(500).json({ error: "Query failed" });
        } else {
            res.json(result.rows);
        }
    });
})

router.get('/getCart',(req,res)=>{
    try{
        var IdorNot = getUserID(req.headers.token)
    }catch(err){
        return res.status(401).json({err:err.message})
    }
   const sql = `SELECT cart.productid, SUM(product.price) AS total,
   COUNT(cart.productid) as numberofItems
   FROM cart JOIN product ON cart.productid = product.productid
   where userid = $1 AND cart.productid IS NOT NULL GROUP BY cart.productid ORDER BY cart.productid`
   db.query(sql, [IdorNot],(err,result)=>{
    if(err){
        res.status(500).json({error: err})
    }else{
        res.send(result.rows)
    }
   })
})

router.get('/getTopReviews',(req,res)=>{
    const sql = 'SELECT rating, Description, productid FROM review LIMIT 5'

    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).json({error:"Query failed"})
        }else{
            res.send(result.rows)
        }
    })


})

router.post('/getReviews',(req,res)=>{
    const {productid} = req.body;

    let sql = "SELECT rating, username, productid, description FROM review where productid = $1"

    db.query(sql,[productid],(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:"Query failed"})
        }else{
            
            res.send(result.rows)
        }
    })
})

router.post('/writeReview', async(req,res)=>{
   

    try{
    var IdorNot = getUserID(req.headers.token)
    }catch(err){
        return res.status(401).json({err:err.message})
    }
    
    
    const username =  await getUserName(IdorNot)
    const {rating, description, productid} = req.body
    const values = [IdorNot , username, rating , description , productid]
    
    const sql = `INSERT INTO review(userid, username, rating, description, productid )
     VAlUES ($1 , $2 , $3 , $4 , $5)`
     console.log(req.body)
    console.log(values)
    
    db.query(sql, values, (err, result)=>{
        if(err){

            res.status(500).json({error:"Query failed"})
        }else{
            res.status(200).json({message:"values inserted"})
        }
    })

})

router.get("/getCookies",(req,res)=>{
    try{
        token = req.headers.token
        token = JSON.parse(token)["token"]
        var time  = jwt.decode(token,'secretKey')
        const expirationDate = new Date(time.exp* 1000);

        res.status(200).send({"time": time.exp})
        }catch(err){
            return res.status(401).json({err:err.message})
    }
})

function getUserName(id){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT username FROM login WHERE id = $1';
        db.query(sql, [id], (err, result) => {
            if (err) {
                reject(new Error('Query failed'));
            } else {
                resolve(result.rows[0].username);
            }
        });
    });
}

function getUserID(TokenHeader){
    var token = TokenHeader
    token =JSON.parse(token)["token"]

     try{
        const result = jwt.verify(token,'secretKey')
        return result.id
    }catch(err){
            throw new Error('Unauthorized')
    }
}
module.exports = router;


