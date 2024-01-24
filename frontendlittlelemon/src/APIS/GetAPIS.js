
class GetAPIS{

    async getCart(jwtToken){
        await fetch('http://localhost:8080/api/getCart',{
            headers:{
                "token": jwtToken
            }
        })
        .then((response)=>response.json())
        .then((wdata)=>{
            console.log("this is the array",wdata)
            console.log("this is the error ",wdata.err)
            if(wdata.err === undefined){
            console.log("here")
            return wdata
            }else {
                return null
            }
        }).catch((err)=>{
            console.log(err.message);
        });

    }



}



export default GetAPIS