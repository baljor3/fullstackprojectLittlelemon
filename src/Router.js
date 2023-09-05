const datecontoller =require('./Controller')
const express = require('express')
const router = express.Router()

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

router.post('/logininsert', async (req, res) => {
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

module.exports = router;