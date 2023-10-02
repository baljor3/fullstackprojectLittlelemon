import React from "react";
import "../Css/Main.css"
import greek from "../asset/greek salad.jpg"

const Menu=() => {


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
                    <button>Order a delivery</button>
            </div>
        </div>
        </main>
    )
}

export default Menu;