import React, { useState } from "react";
import "../Css/Main.css"
import greek from "../asset/greek salad.jpg"
import Cookies from "js-cookie";
import {Link }from 'react-router-dom';


const Menu=() => {
    const [productid, setProductID] = useState()
    const jwtToken = Cookies.get('jwt_authorization')

    
    const additem = async(productid) =>{
        await fetch('http://localhost:8080/api/additem',{
        method: "POST",
        body: JSON.stringify({
            "productid":1
        }),
        headers:{
            "token":jwtToken,
            'Content-type':'application/json'
        }
        }).then((res)=> res.json())
        .then((data)=>{
            console.log(data)
        }).catch(err =>{
            alert("Login to order items")
        })
    }

    const addToCart =(e)=>{
        e.preventDefault()
        additem()
    }
    

    return(
        <main>
        <div className="grid-container-main">
            <div className="SpecialHeading">Special</div>
            <div></div>
            <div className="card">
                <img src= {greek} alt = "greeksalad" className="specialImage"></img>
                    <p style={{"margin-top":0, "margin-bottom":0}}><span style={{"float":"left"}}>Greek Salad</span>  <span style={{"float":"right"}}>$12.99</span> </p>
                    <p className="text-container">The famous greek salad of crispy lettuce, peppers,
                    olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
                    <button onClick={()=>addToCart()}>Order a delivery</button><br></br>
                    <Link to= "/review/1">Reviews</Link>
            </div>
        </div>
        </main>
    )
}

export default Menu;