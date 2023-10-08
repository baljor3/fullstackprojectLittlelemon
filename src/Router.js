const datecontoller =require('./Controller')
const express = require('express')
const router = express.Router()
const db = require('../db');
const jwt  = require('jsonwebtoken')

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

    var token = req.headers.token
    token =JSON.parse(token)["token"] 
  
    if(token){
        const decode = jwt.verify(token,'secretKey')
        var userid = decode.id
    }else{
        res.status(401).json({error:"Unauthorized request"})
    }
    
    const {productid} = req.body
    const sql = 'INSERT INTO cart(userid, productid) VALUES (?, ?)'

    const values = [userid,productid]
    


    db.query(sql,values,(err,result)=>{
        if(err){
            
            res.status(500).json({error:"Query Failed"})
        }else{
            
            res.status(200).json({message:"values inserted"})
        }
    })
    
})


module.exports = router;