const dateService =require("./Service");

const getDates =  (done) =>{
    dateService.getDates(done);
};

const saveDatesDetails = (dateDetails, done) =>{
    
    dateService.saveDatesDetails(dateDetails,done);
}
module.exports = {
    getDates,
    saveDatesDetails
}