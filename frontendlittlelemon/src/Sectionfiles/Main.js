import React, {useState, useReducer, useEffect} from "react"
import {Link }from 'react-router-dom';
import "../Css/Main.css"
import bruchetta from  "../asset/bruchetta.png"
import greek from "../asset/greek salad.jpg"
import lemondessert from  "../asset/lemon dessert.jpg"
import MarioA from "../asset/Mario and Adrian A.jpg"
import EllipsisTextContainer from './EllipsisTextContainer';
import Cookies from "js-cookie";
import GetAPIS from "../APIS/GetAPIS";
import AddDeleteButton from "../components/AddDeleteButton";
import FindPicture from "../components/FindPicture";



const  Main = () =>{
    var [numberData, setNumeberData] = useState([]);
    var [reviewData, setreviewData] = useState([]);
    const [updateEffect,setUpdateEffect] = useState(false);
    const jwtToken = Cookies.get('jwt_authorization')
    const getAPI = new GetAPIS();


    useEffect( ()=>{
      const Cart = async() =>{
      try{
         const result = await getAPI.getCart(jwtToken)
         if(result !== undefined){
         setNumeberData(result)
         }
      }catch (err){
          console.log(err)
      }
      }
      Cart()
},[updateEffect])



    useEffect(()=>{
        fetch('http://localhost:8080/api/getTopReviews')
        .then((response)=>response.json())
        .then((data)=>{
            setreviewData(data)
        })

    },[])


    const TestimonialsReviews = () => {
        if (reviewData.length === 0 || reviewData.length === undefined) {
          return null; // Instead of an empty string, return null when there are no reviews.
        } else {
          return (

            <div className="grid-container-testimonials"style={{backgroundColor: "#5C7600"}}>
              <div className="testHeading">testimonials</div>
              {reviewData.map((item, index) => (
                <div key={index} className="card">
                  <div>
                    {item.Name} {item.rating}/5
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <FindPicture
                          style={{float:"left", padding:0,margin:0}}
                       productid= {item.productid}
                       height= "70px"
                       width="70px"/>
                       </td>
                      </tr>
                      <tr>
                        <td>
                          <EllipsisTextContainer
                            text={item.description}
                            maxHeight="43px"
                            maxWidth="200px"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          );
        }
      };

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
                    <AddDeleteButton
                        number = {numberData
                        .filter((item)=> item.productid === 3)
                        .map((item)=>item.numberofitems)}
                        productid = { numberData.map((item)=>item.productid)}
                        jwtToken ={jwtToken}
                        setUpdateEffect = {setUpdateEffect}
                        />
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
                       <AddDeleteButton
                        number = {numberData
                        .filter((item)=> item.productid === 1)
                        .map((item)=> item.numberofitems)}
                        productid = { numberData.map((item)=>item.productid)}
                        jwtToken ={jwtToken}
                        setUpdateEffect = {setUpdateEffect}
                        />
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
                       <AddDeleteButton
                        number = {numberData
                        .filter((item)=> item.productid === 2)
                        .map((item)=>item.numberofitems)}
                        productid = { numberData.map((item)=> item.productid)}
                        jwtToken ={jwtToken}
                        setUpdateEffect = {setUpdateEffect}
                        />
            </div>
        </div>

            {TestimonialsReviews()}

    </main>);
};

export default Main;