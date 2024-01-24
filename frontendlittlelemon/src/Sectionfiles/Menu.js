import React, { useEffect, useState, useCallback } from "react";
import "../Css/Main.css"
import greek from "../asset/greek salad.jpg"
import bruchetta from "../asset/bruchetta.png"
import lemonDessert from "../asset/lemon dessert.jpg"
import Cookies from "js-cookie";
import {Link }from 'react-router-dom';
import EllipsisTextContainer from './EllipsisTextContainer';
import ButtonsAPIS from "../APIS/ButtonAPIS";
import GetAPIS from "../APIS/GetAPIS";



const Menu=() => {
    const [productList, setProductList] = useState([])
    const jwtToken = Cookies.get('jwt_authorization')
    const [updateEffect,setUpdateEffect] = useState(false);
    const [numberData, setNumeberData] = useState([]);
    var count = 0;
    const buttonsAPI = new ButtonsAPIS();
    const getAPI = new GetAPIS();


    useEffect( ()=>{
        const dope = async() =>{ 
        try{
           const result = await getAPI.getCart(jwtToken)
           console.log("these are the result",result)
           if(result !== undefined){
           setNumeberData(result)
           }
        }catch (err){
            console.log(err)
        }
        }
        dope()
},[updateEffect])

    useEffect(()=>{
        fetch('http://localhost:8080/api/getProducts',{
            method: "GET"
        }).then((response)=>response.json())
        .then((data)=>{
            setProductList(data)
        })
    },[])

    const updateNumber = (num,arrayProductid,productid) =>{
       if(num){
        var number = num[count]
        var pro = arrayProductid[count]
       }
       if(productid === pro){
        count = count +1
       }

        const handleAddItem = async(e) => {
            try {
              await buttonsAPI.additem(e.target.value, jwtToken);
              setUpdateEffect(prev => !prev);
            } catch (error) {
              console.error('Error:', error);
            }
          };
        const handleMinusItem = async(e) => {
            try{
            await buttonsAPI.minusitem(e.target.value,jwtToken)
            setUpdateEffect(prev => !prev)
            }catch(error){
                console.error('Error',error)
            }}

        if( !number || number.length ===0 || productid !== pro ){
            return(<button value ={productid} className="addButton" onClick={handleAddItem}>
                + Add
                </button>)

        }else{
          return(
          <div>
            <button value = {productid} onClick={handleMinusItem} className="lefthalfCircle">-</button>
            <button className="greenPill">{number}</button>
            <button value = {productid} onClick={handleAddItem} className="righthalfCircle">+</button>
            </div>)
        }
    }


    const findPicture = (productid) =>{

        if(productid ===1){
            return(<img key ={productid} alt =""className="specialImage"src = {greek} height = "70px" width= "70px"></img>)
        } else if(productid === 4){
            return(<img key ={productid} alt =""className="specialImage"src = {bruchetta} height = "70px" width= "70px"></img>)
        }else{
            return(<img key ={productid} alt =""className="specialImage"src = {lemonDessert} height = "70px" width= "70px"></img>)
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
                        text = {item.description}
                        width = "200px"
                        height ="60px">
                    </EllipsisTextContainer>
                    {updateNumber(
                        numberData.map((item)=>{return(item.numberofitems)}),
                        numberData.map((item)=>{return(item.productid)}),
                        item.productid
                        )}
                    <br></br><Link to={`/review/${item.productid}`}>Reviews</Link>
                    </div>
                )
            })}
            </div>
        </main>
    )
}

export default Menu;