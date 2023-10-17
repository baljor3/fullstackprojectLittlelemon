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
        }else{
           
            if (result === undefined || result.length ==0){
                res.json(false)
            }
            const user = result
            const token = jwt.sign({ id: user[0].id},
                'secretKey',
                { expiresIn: '1h' }, (err,token) =>{
                if(err){
                    res.status(500).json({error: "error when creating token"})
                }else{
                
                res.send({token})
                }
            })
        }
    })
})

router.post('/additem',(req,res)=>{

    const IdorNot= getUserID(req.headers.token)

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
    const IdorNot= getUserID(req.headers.token)

    const {productid} = req.body
    const values = [IdorNot, productid]

    const sql = 'DELETE FROM  cart where cart.userid = ? and cart.productid = ? LIMIT 1'


    db.query(sql, values, (err,result)=>{
        if(err){
            res.status(500).json({error:"Query failed"})
        }else{
            res.status(200).json({message:"values inserted"})
        }
    })

})

router.get('/getCart',(req,res)=>{
   const IdorNot= getUserID(req.headers.token)
   const sql = 'SELECT cart.productid, product.name, product.price, SUM(product.price) AS total,COUNT(cart.productid) as numberofItems FROM cart JOIN product ON cart.productid = product.productid where userid = ? AND cart.productid IS NOT NULL GROUP BY cart.productid'

   db.query(sql, IdorNot,(err,result)=>{
    if(err){
        console.log(err)
        res.status(500).json({error:"Query failed"})
    }else{
        res.send(result)
    }
   })
})



function getUserID(TokenHeader){
    var token = TokenHeader
    token =JSON.parse(token)["token"] 
  
    if(token){
        const decode = jwt.verify(token,'secretKey')
        return decode.id
    }else{
        return res.status(401).json({error:"Unauthorized request"})
    }
}
module.exports = router;