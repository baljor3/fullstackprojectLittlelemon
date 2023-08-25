const fs = require('fs');

const getDates = function(done){
     fs.readFile('src/dates.json',(err,fileContent)=>{
      if(err){
        return done("error has occured getting dates detail")
      }else{
        try{
        const productdata = JSON.parse(fileContent);
        return done(undefined,productdata)
        }catch(err){
        return done("error has occured getting dates details")
        }
      }
     })

}

const saveDates = function (DatesDetails, done) {

    fs.readFile('src/dates.json',(err,fileContent)=>{
      if(err){
        return done("error has occured getting date detail")
      }else{
        try{
        const product = JSON.parse(fileContent);
        product.push(DatesDetails);
        fs.writeFile('src/dates.json',JSON.stringify(product), (err,updatecontent)=>{
          if(err){
            return done("error has occured during updating content")
          }
          return done(undefined, updatecontent)
        })
        }catch(err){
        return done("error has occured updating date details")
        }
      }
     })

}

module.exports ={
    getDates,
    saveDates
}
