import {React, useEffect} from "react"
import Cookies from "js-cookie";

const Cart=()=>{
    var dataarray =[]
    useEffect(() =>{
        fetch('http://localhost:8080/api/getCart',{
            headers:{
                "token":Cookies.get('jwt_authorization')
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            dataarray = data
            console.log(dataarray)
        }).catch((err)=>{
            console.log(err.message);
        });
    },[])


    return(
        <body>
            <ul>
                <li></li>
            </ul>
        </body>
    )
    
}

export default Cart;