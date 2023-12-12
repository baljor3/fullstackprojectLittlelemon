import React, { useEffect, useState } from "react";
import "../Css/Main.css"
import greek from "../asset/greek salad.jpg"
import bruchetta from "../asset/bruchetta.png"
import lemonDessert from "../asset/lemon dessert.jpg"
import Cookies from "js-cookie";
import {Link }from 'react-router-dom';
import EllipsisTextContainer from './EllipsisTextContainer';



const Menu=() => {
    const [productid, setProductID] = useState()
    const [productList, setProductList] = useState([])
    const jwtToken = Cookies.get('jwt_authorization')
    const [updateEffect,setUpdateEffect] = useState(false);
    var [numberData, setNumeberData] = useState([]);


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

    const minusitem = async(productid) =>{
        try {
            if(jwtToken ==="" || jwtToken === undefined){
                alert("login to order items")
            }
            await fetch('http://localhost:8080/api/deleteitem', {
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
        .then((wdata)=>{
            setUpdateEffect(false)
            if(wdata.err === undefined){
            setNumeberData(wdata)
            }
        }).catch((err)=>{
            console.log(err.message);
        });
    },[updateEffect])

    const updateNumber = (number) =>{
        if(!Array.isArray(number) || number.length === 0 || number.some(item => item === null || item < 1)){
            return(<button className="addButton" onClick={()=>additem()}>+ Add</button>)
        }else{
          return(  <div><button onClick={minusitem} className="lefthalfCircle">-</button><button className="greenPill">{number}</button><button onClick={additem} className="righthalfCircle">+</button></div>)
        }
       }

    useEffect(()=>{
        fetch('http://localhost:8080/api/getProducts',{
            method: "GET"
        }).then((response)=>response.json())
        .then((data)=>{
            setProductList(data)
        })
    })

    const findPicture = (productid) =>{
        if(productid ===1){
            return(<img className="specialImage"src = {greek} height = "70px" width= "70px"></img>)
        } else if(productid === 4){
            return(<img className="specialImage"src = {bruchetta} height = "70px" width= "70px"></img>)
        }else{
            return(<img className="specialImage"src = {lemonDessert} height = "70px" width= "70px"></img>)
        }
        
    }

    return(
        <main>
        <div className="grid-container-menu" style = {{"background-color":"#5C7600"}}>
            {productList.map((item)=>{
                return(
                    <div className="card">
                       {findPicture(item.productid)}
                       <p style={{"margin-top":0, "margin-bottom":0}}><span style={{"float":"left"}}>{item.name} </span>  <span style={{"float":"right"}}>{item.price}</span> </p>
                    <EllipsisTextContainer
                        text = {item.Description}
                        width = "200px"
                        height ="60px">
                    </EllipsisTextContainer>
                    {updateNumber(
                        numberData.map((item)=>{return(item.numberofItems)}
                        ))}
                    <br></br><Link to="/review/{item.productid}">Reviews</Link>
                    </div>
                )
            })}
            </div>
        </main>
    )
}

export default Menu;