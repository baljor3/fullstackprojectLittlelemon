const datesDAO = require('./DAO');

const getDates = function(done){
    //call dao getproducts method and pass the parameter
    datesDAO.getDates(done)
  }

  const saveDatesDetails = function(DateDetails, done){
    //call dao saveProductDetails method and pass the parameter
    
    datesDAO.saveDates(DateDetails,done)
    
  }

module.exports ={
    getDates,
    saveDatesDetails
}