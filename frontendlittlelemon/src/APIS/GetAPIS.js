
class GetAPIS{

    async getCart(jwtToken) {
        try {
            const response = await fetch('http://localhost:8080/api/getCart', {
                headers: {
                    "token": jwtToken
                }
            });
            const wdata = await response.json();
            if (wdata.err === undefined) {
                return wdata;
            } else {
                return
            }
        } catch (err) {
            console.log(err.message);
            return
        }
    }

    async getProductList (){
        try{
        const response = await  fetch('http://localhost:8080/api/getProducts',{
            method: "GET"
        })
        const data = await response.json();

        return data

    }catch (err){
        console.log(err.message)
        return 

    }
    }
}



export default GetAPIS