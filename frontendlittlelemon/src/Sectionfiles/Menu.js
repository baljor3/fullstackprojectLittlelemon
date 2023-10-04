import React from "react";
import "../Css/Main.css"
import greek from "../asset/greek salad.jpg"
import Cookies from "js-cookie";

const Menu=() => {
    const jwtToken = Cookies.get('jwt_authorization')
    const additem = async(successfully) =>{
        await fetch('http://localhost:8080/api/additem',{
        method: "POST",
        body: JSON.stringify({
            "token": jwtToken 
        }),
        headers:{
            'Content-type':'application/json'
        }
        }).then((res)=> res.json())
        .then((data)=>{
            console.log(data)
        })
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
                    <form onSubmit={additem}>
                    <button type="submit">Order a delivery</button>
                    </form>
            </div>
        </div>
        </main>
    )
}

export default Menu;