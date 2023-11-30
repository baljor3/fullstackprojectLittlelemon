import {React, useEffect, useState, useCallback} from "react"
import Cookies from "js-cookie";
import bruchetta from "../asset/bruchetta.png"


const Cart=()=>{
    var [data, setData] = useState([])
    const jwtToken = Cookies.get('jwt_authorization')
    const [updateEffect,setUpdateEffect] = useState(false);


    const additem = useCallback(async (productid) => {
        try {
          const response = await fetch('http://localhost:8080/api/additem', {
            method: "POST",
            body: JSON.stringify({
              "productid": 1
            }),
            headers: {
              "token": jwtToken,
              'Content-type': 'application/json'
            }
          });
          setUpdateEffect(true)
          const data = await response.json();
          console.log(data);
        } catch (err) {
          console.error(err);
        }
      },[jwtToken]);

    const deleteitem = useCallback( async(productid) =>{
        await fetch('http://localhost:8080/api/deleteitem',{
            method: "POST",
            body: JSON.stringify({
                "productid": 1
            }),
            headers:{
                "token":jwtToken,
                'Content-type':'application/json'
            }
        }).then((data)=>{
            setUpdateEffect(true)
            console.log(data)
        })
    },[jwtToken])

    // TODO:UseEffect is called mutiple times instead of once, hence creating mutiple re-renders.
    useEffect( () =>{
         fetch('http://localhost:8080/api/getCart',{
            headers:{
                "token":Cookies.get('jwt_authorization')
            }
        })
        .then((response)=>response.json())
        .then((wdata)=>{
            setUpdateEffect(false)
            setData(wdata)
            console.log(data)
        }).catch((err)=>{
            console.log(err.message);
        });
    },[updateEffect])

    function getImage(num) {
        if(num ===1){
            return(<img  src = {bruchetta} alt ="MarioA" width= "200px" height="200px" />)
        }
    }

    function listItems(data){
        console.log("before render")
        console.log(data.length)
        console.log(data)
        if(data === undefined || data.length === 0  || data === "undefined"){
            return(<p>No items in the cart</p>)
        }else{
            console.log(data[0]["total"])
            return(data.map((item)=>{
                return(<li key={item.orderid}>{item.name} {item.price} {item.total} {item.numberofItems} 
                    <button onClick={()=>additem(item.productid)}>add</button> 
                    <button onClick={ ()=>deleteitem(item.productid)}>delete</button>
                    {getImage(item.productid)}
                    </li>)
        }))
            }
        }
    

    return(
        <body>
            <ul>
                {listItems(data)}
            </ul>
        </body>
    )
    
}

export default Cart;