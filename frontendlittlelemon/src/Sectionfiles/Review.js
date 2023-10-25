import React, {useEffect, useState} from "react";
import greek from "../asset/greek salad.jpg"
import Cookies from "js-cookie";

const Review = ()=>{

    const [review, setReview] = useState()
    const [rating, setRating] = useState(1)
    const [reviewArray, setReviewArray] = useState([])

    const jwtToken = Cookies.get('jwt_authorization')

    useEffect(() => {
        // Define a function to fetch reviews
        const fetchReviews = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/getReviews', {
              method: 'POST',
              body: JSON.stringify({
                productid: '1'
              }),
              headers: {
                'Content-type': 'application/json'
              }
            });
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setReviewArray(data);
          } catch (error) {
            console.error('Error fetching reviews:', error);
          }
        };
    
        // Call the fetchReviews function when the component mounts
        fetchReviews();
      }, []); // The empty dependency array ensures this runs only on component mount
    


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
        console.log(reviewArray)
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
       {reviewArray.map((item)=>{
        return(<div>
            {item.name} {item.description} {item.rating}
        </div>)
       })}
    </div>
   

</main>)

}

export default Review