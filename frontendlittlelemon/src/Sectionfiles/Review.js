import React, {useEffect, useState} from "react";
import greek from "../asset/greek salad.jpg"
import Cookies from "js-cookie";

const Review = ()=>{

    const [review, setReview] = useState()
    const [rating, setRating] = useState(1)

    const jwtToken = Cookies.get('jwt_authorization')




const writeReview = async(rating,review)=>{
    await fetch('http://localhost:8080/api/writeReview',{
    method: "POST",
    body: JSON.stringify({
        rating: rating,
        description: review,
        productid: "1"
    }),headers:{
        "token":jwtToken,
        'Content-type':'application/json'
    }
    })
    .then((data)=>{
        console.log(data)
    }).catch((error)=>{
        console.log(error)
    })
}

const ratingSelection = [
    {
        name:"1",
        value: "1"
    },
    {
        name:"2",
        value:"2"
    },
    {
        name:"3",
        value:"3"
    },
    {
        name:"4",
        value:"4"
    },
    {
        name:"5",
        value:"5"
    }
]


const fun = (e)=>{

    writeReview(rating,review)
    e.preventDefault();
}

return(
<main>
    <img src = {greek} alt = "Greek Salad" height="500px" width="500px"></img>
    <p>The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>

    <form onSubmit={fun}>
    <select name = "rating" onChange={(e)=>{setRating(e.target.value)}}>
        {ratingSelection.map((item)=>{
            return(<option value={item.name}>{item.value}</option>)
        })}
    </select>
    <textarea rows="4" cols = "50" onChange={(e)=>{setReview(e.target.value)}}></textarea>
    <button>Add a Review!</button>
    </form>

    <div>

    </div>
   

</main>)

}

export default Review