import React, { useState } from "react";
import "../Css/Main.css"
import greek from "../asset/greek salad.jpg"
import Cookies from "js-cookie";

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
                    olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. </p>
                    <form onSubmit={addToCart}>
                    <input type = "hidden" onSubmit = {(e)=> setProductID(1)}></input>
                    <button type="submit">Order a delivery</button>
                    </form>
            </div>
        </div>
        </main>
    )
}

export default Menu;