import React, {useState, useReducer, useEffect} from "react"
import {Link }from 'react-router-dom';
import "../Css/Main.css"
import bruchetta from  "../asset/bruchetta.png"
import greek from "../asset/greek salad.jpg"
import lemondessert from  "../asset/lemon dessert.jpg"
import MarioA from "../asset/Mario and Adrian A.jpg"
import BookingForm from "./Booking"
import EllipsisTextContainer from './EllipsisTextContainer';
import Cookies from "js-cookie";

const  Main = () =>{
    const [productid, setProductID] = useState()
    var [numberData, setNumeberData] = useState([])
    const [updateEffect,setUpdateEffect] = useState(false);
    const jwtToken = Cookies.get('jwt_authorization')

    const additem = async(productid) =>{
        try {
            if(jwtToken ==="" || jwtToken === undefined){
                alert("login to order items")
            }
            await fetch('http://localhost:8080/api/additem', {
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
        } catch (error) {
            console.error('Error:', error);
            alert("Login to order items");
        }
    }

    useEffect(()=>{
        fetch('http://localhost:8080/api/getCart',{
            headers:{
                "token":Cookies.get('jwt_authorization')
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            //setNumeberData(data)
            //console.log(numberData)
            for(let i = 0; i<data.length; i++){
                setNumeberData(prevData =>[...numberData, data[i]])
            }
        }).catch((err)=>{
            console.log(err.message);
        });
    },[updateEffect])


    const addToCart =(e)=>{
        additem()
    }
    
   
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
            <div><Link to="/menu"><button className="menubutton">Online Menu</button></Link></div>
            <div className="card">
                <img src= {greek} alt = "greeksalad" className="specialImage"></img>
                    <p style={{"margin-top":0, "margin-bottom":0}}><span style={{"float":"left"}}>Greek Salad</span>  <span style={{"float":"right"}}>$12.99</span> </p>
                    <EllipsisTextContainer
                    text ="The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons."
                    maxHeight="60px"
                    maxWidth="200px"
                    link="http://localhost:3000/review/1"
                    ></EllipsisTextContainer>
                    <button className="addButton" onClick={()=>addToCart()}>+ Add</button>
                    <button className="lefthalfCircle">-</button>
                    <button className="greenPill">{numberData.map((item)=>{
                        return(item.numberofItems)
                    })}</button>
                    <button className="righthalfCircle">+</button>

            </div>
            <div className="card">
            <img src = {bruchetta} alt = "bruchetta" className="specialImage"></img>
                    <p style={{"margin-top":0, "margin-bottom":0}}><span style={{"float":"left"}}>Bruchetta </span>   <span style={{"float":"right"}}>$5.99</span></p>
                    <EllipsisTextContainer
                    text ="Our Bruschetta is made 
                    from grilled bread that has been smeared with garlic and seasoned
                     with salt and olive oil."
                    maxHeight="60px"
                    maxWidth="200px"
                    link="http://localhost:3000/review/1"
                    ></EllipsisTextContainer>
                    <button>Order a delivery</button>
            </div>
            <div className="card">
            <img src = {lemondessert} alt = "lemondessert" className="specialImage"></img>
                    <p style={{ "margin-top":0, "margin-bottom":0}}><span style={{"float":"left"}}>Lemon Dessert</span>  <span style={{"float":"right"}}>$5.99</span></p>
                    <EllipsisTextContainer
                    text ="This comes straight from grandma’s 
                    recipe book, every last ingredient has been sourced 
                    and is as authentic as can be imagined."
                    maxHeight="60px"
                    maxWidth="200px"
                    link="http://localhost:3000/review/1"
                    ></EllipsisTextContainer>
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