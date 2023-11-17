import React, {useState, useReducer} from "react"
import {Link }from 'react-router-dom';
import "../Css/Main.css"
import bruchetta from  "../asset/bruchetta.png"
import greek from "../asset/greek salad.jpg"
import lemondessert from  "../asset/lemon dessert.jpg"
import MarioA from "../asset/Mario and Adrian A.jpg"
import BookingForm from "./Booking"
import EllipsisTextContainer from './EllipsisTextContainer';


const  Main = () =>{

    
   
    return (<main>
        <div className="flex-container-main" style = {{"background-color":"#5C7600"}}>
            <div>
                <p className="headingOne" style = {{"color":"#D6D26D"}}> Little Lemon </p>
                    <p className="headingTwo"style = {{"color":"#D6D26D"}}>Chicago</p>
                <p style = {{"color":"#D6D26D"}}>
                Lorem ipsum dolor sit amet,<br></br> consectetur adipiscing elit, 
                sed do eiusmod tempor <br></br>incididunt ut labore et dolore magna aliqua.
                </p>
                <Link to="/register"><button className="blackbutton"> Reserve a table</button></Link>
            </div>
            <div style={{'padding-left':20}}>
                <img src = {MarioA} alt ="MarioA" width= "200px" height="200px"></img>
            </div>
        </div>
        <div className="grid-container-main" style = {{"background-color":"#D6D26D"}}>
            <div className="SpecialHeading">Special</div>
            <div><button>Online Menu</button></div>
            <div className="card">
                <img src= {greek} alt = "greeksalad" className="specialImage"></img>
                    <p style={{"margin-top":0, "margin-bottom":0}}><span style={{"float":"left"}}>Greek Salad</span>  <span style={{"float":"right"}}>$12.99</span> </p>
                    <EllipsisTextContainer
                    text ="The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons."
                    maxHeight="69px"
                    maxWidth="200px"
                    ></EllipsisTextContainer>
                    <button>Order a delivery</button>
            </div>
            <div className="card">
            <img src = {bruchetta} alt = "bruchetta" className="specialImage"></img>
                    <p style={{"margin-top":0, "margin-bottom":0}}><span style={{"float":"left"}}>Bruchetta </span>   <span style={{"float":"right"}}>$5.99</span></p>
                    <p className="text-container">Our Bruschetta is made 
                        from grilled bread that has been smeared with garlic and seasoned
                         with salt and olive oil.  </p>
                    <button>Order a delivery</button>
            </div>
            <div className="card">
            <img src = {lemondessert} alt = "lemondessert" className="specialImage"></img>
                    <p style={{ "margin-top":0, "margin-bottom":0}}><span style={{"float":"left"}}>Lemon Dessert</span>  <span style={{"float":"right"}}>$5.99</span></p>
                    <p className="text-container">This comes straight from grandma’s 
                        recipe book, every last ingredient has been sourced 
                        and is as authentic as can be imagined.  </p>
                    <button >Order a delivery</button>
            </div>
        </div>
        <div className="grid-container-testimonials" style = {{"background-color":"#5C7600"}}>
            <div className="testHeading">testimonials</div>
            <div>
                <p>rating</p>
                <img src = {bruchetta} alt = "bruchetta" className="testImages"></img>Bruchetta
                <p>review here</p>
            </div>
            <div>
                <p>rating</p>
                <img src = {bruchetta} alt = "bruchetta" className="testImages"></img>Bruchetta
                <p>review here</p>
            </div>
            <div>
                <p>rating</p>
                <img src = {bruchetta} alt = "bruchetta" className="testImages"></img>Bruchetta
                <p>review here</p>
            </div>
            <div>
                <p>rating</p>
                <img src = {bruchetta} alt = "bruchetta" className="testImages"></img>Bruchetta
                <p>review here</p>
            </div>
        </div>
    </main>);
};

export default Main;