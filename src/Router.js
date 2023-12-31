const datecontoller =require('./Controller')
const express = require('express')
const router = express.Router()
const db = require('../db');
const jwt  = require('jsonwebtoken');
const { restart } = require('nodemon');

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
  const sql = 'INSERT INTO login (username, email,password) VALUES (?, ?,?)';
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

router.post('/login',(req,res)=>{
    
    const {username , password} = req.body;
    const sql = 'SELECT * FROM login WHERE username = ? AND password = ?'
    const values = [username,password];


    db.query(sql, values, (err,result)=>{
        if(err){
            res.status(500).json({error:"Query failed"})
        }else {
            if (result && result.length > 0) {
              const user = result[0]; 
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
    const sql = 'INSERT INTO cart(userid, productid) VALUES (?, ?)'

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
    const values = [IdorNot, productid]

    const sql = 'DELETE FROM cart where cart.userid = ? and cart.productid = ? LIMIT 1'


    db.query(sql, values, (err,result)=>{
        if(err){
            res.status(500).json({error:"Query failed"})
        }else{
            res.status(200).json({message:"values inserted"})
        }
    })

})
router.get('/getProducts',(req,res)=>{

    let sql = "SELECT * from product"

    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).json({error:"Query failed"})
        }else{
            res.send(result)
        }
    })
})
router.get('/getCart',(req,res)=>{
    try{
        var IdorNot = getUserID(req.headers.token)
    }catch(err){
        return res.status(401).json({err:err.message})
    }
   const sql = 'SELECT cart.productid, product.name, product.price, SUM(product.price) AS total,COUNT(cart.productid) as numberofItems FROM cart JOIN product ON cart.productid = product.productid where userid = ? AND cart.productid IS NOT NULL GROUP BY cart.productid ORDER BY cart.productid'

   db.query(sql, IdorNot,(err,result)=>{
    if(err){
        res.status(500).json({error:"Query failed"})
    }else{
        res.send(result)
    }
   })
})

router.get('/getTopReviews',(req,res)=>{
    const sql = 'SELECT rating, Description, productid FROM review LIMIT 5'

    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).json({error:"Query failed"})
        }else{
            res.send(result)
        }
    })


})

router.post('/getReviews',(req,res)=>{
    const {productid} = req.body;

    let sql = "SELECT rating, username, productid, description FROM review where productid = ?"

    db.query(sql,productid,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({error:"Query failed"})
        }else{
            console.log(result)
            res.send(result)
        }
    })
})

router.post('/writeReview',async (req,res)=>{
   

    try{
    var IdorNot = getUserID(req.headers.token)
    }catch(err){
        return res.status(401).json({err:err.message})
    }
    
    
    const username = await getUserName(IdorNot)
    const {rating, description, productid} = req.body
    const values = [IdorNot , username, rating , description , productid]
    
    const sql = 'INSERT INTO review(userid, username, rating, description, productid ) VAlUES (? , ? , ? , ? , ?)'

    
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
        const sql = 'SELECT username FROM login WHERE id = ?';
        db.query(sql, id, (err, result) => {
            if (err) {
                reject(new Error('Query failed'));
            } else {
                resolve(result[0].username);
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