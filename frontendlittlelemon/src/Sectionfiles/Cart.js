import {React, useEffect, useState} from "react"
import Cookies from "js-cookie";
import bruchetta from "../asset/bruchetta.png"


const Cart=()=>{
    var [data, setData] = useState([])
    const jwtToken = Cookies.get('jwt_authorization')


    const additem = async(productid) =>{
        await fetch('http://localhost:8080/api/additem',{
        method: "POST",
        body: JSON.stringify({
            "productid":productid
        }),
        headers:{
            "token":jwtToken,
            'Content-type':'application/json'
        }
        })
        .then((data)=>{
            console.log(data)
        })
    }

    const deleteitem = async(productid) =>{
        await fetch('http://localhost:8080/api/deleteitem',{
            method: "POST",
            body: JSON.stringify({
                "productid": productid
            }),
            headers:{
                "token":jwtToken,
                'Content-type':'application/json'
            }
        }).then((data)=>{
            console.log(data)
        })
    }

    useEffect(() =>{
        fetch('http://localhost:8080/api/getCart',{
            headers:{
                "token":Cookies.get('jwt_authorization')
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            setData(data)
        }).catch((err)=>{
            console.log(err.message);
        });
    },[additem, deleteitem])

    function getImage(num) {
        if(num ===1){
            return(<img  src = {bruchetta} alt ="MarioA" width= "200px" height="200px" />)
        }
    }


    

    return(
        <body>
            <ul>
                {data.map((item)=>{
                    return(
                    <li key={item.orderid}>{item.name} {item.price} {item.total} {item.numberofItems} 
                    <button onClick={()=>additem(item.productid)}>add</button> 
                    <button onClick={ ()=>deleteitem(item.productid)}>delete</button>
                    {getImage(item.productid)}
                    </li>
                    )
                })}
            </ul>
        </body>
    )
    
}

export default Cart;