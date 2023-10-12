import {React, useEffect, useState} from "react"
import Cookies from "js-cookie";


const Cart=()=>{
    var [data, setData] = useState([])
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
    },[])



    return(
        <body>
            <ul>
                {data.map((item)=>{
                    return(
                    <li key={item.orderid}>{item.name} {item.price}
                    <img 
                    src = "C:\Users\bobby\Desktop\projects\Coursera\fullstack\fullstackprojectLittlelemon\frontendlittlelemon\src\asset\bruchetta.png" // s3 bucket here
                    alt = "product"/>
                    </li>
                    )
                })}
            </ul>
        </body>
    )
    
}

export default Cart;