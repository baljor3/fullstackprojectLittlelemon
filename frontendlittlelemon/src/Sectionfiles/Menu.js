import React, { useEffect, useState } from "react";
import "../Css/Main.css"
import greek from "../asset/greek salad.jpg"
import Cookies from "js-cookie";
import {Link }from 'react-router-dom';
import EllipsisTextContainer from './EllipsisTextContainer';



const Menu=() => {
    const [productid, setProductID] = useState()
    const [productList, setProductList] = useState([])
    const jwtToken = Cookies.get('jwt_authorization')

    useEffect(()=>{
        fetch('http://localhost:8080/api/getProducts',{
            method: "GET"
        }).then((response)=>response.json())
        .then((data)=>{
            setProductList(data)
        })
    })
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

    const findPicture = (productid) =>{
        if(productid ===1){
            return(<img style={{float:"left", padding:0,margin:0}}src = {greek} height = "70px" width= "70px"></img>)
        }
    }

    return(
        <main>
        <div className="grid-container-main">
            <div className="card">
                <img src= {greek} alt = "greeksalad" className="specialImage"></img>
                    <p style={{"margin-top":0, "margin-bottom":0}}><span style={{"float":"left"}}>Greek Salad</span>  <span style={{"float":"right"}}>$12.99</span> </p>
                    <p className="text-container">The famous greek salad of crispy lettuce, peppers,
                    olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
                    <button onClick={()=>additem()}>Order a delivery</button><br></br>
                    <Link to= "/review/1">Reviews</Link>
            </div>
            {productList.map((item)=>{
                return(
                    <div className="card">
                       {findPicture(item.productid)}
                       <p style={{"margin-top":0, "margin-bottom":0}}><span style={{"float":"left"}}>{item.name}</span>  <span style={{"float":"right"}}>{item.price}</span> </p>\
                    <EllipsisTextContainer
                        text = {item.Description}
                        width = "200px"
                        height ="60px">
                    </EllipsisTextContainer>
                    </div>
                )
            })}
            </div>
        </main>
    )
}

export default Menu;