
import React, { useState, useRef, useEffect } from "react";
import { json } from "stream/consumers";



const BookingForm  = () =>{

    const [date, setDate] = useState();
    const [time,setTime] = useState();
    const [guest, setGuest]  =useState();
    const [occasion, setOccasion] = useState();
    const [apidata, setData] = useState();
    const [availableTimes, setAvailableTimes] = useState(['17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',]);

   useEffect(() =>{
        fetch('http://localhost:8080/api/dates/getDates')
        .then((response)=>response.json())
        .then((data)=>{
            setData(data)
        }).catch((err)=>{
            console.log(err.message);
        });
    },[])

    function updatedate(datevalue){
        var temptime = []
        for(let i  =0; i< apidata["data"].length; i++){
            if(datevalue === apidata["data"][i]["date"]
            && apidata["data"][i]["time"] != null
            && apidata["data"][i]["time"] !== ""){
                temptime.push( apidata["data"][i]["time"])

            }
        }
        console.log(temptime)
        const temp = ['17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',];
        console.log("here is the temp " + temp)
        for(let i  =0; i <temptime.length; i++){
           for(let j = 0; j<temp.length; j++){
            if(temp[j] === temptime[i]){
                temp.splice(j,1)
            }
           }
        }
        setAvailableTimes(temp)
        }
    const addDates = async(date,time,guest,occasion) =>{
    await fetch('http://localhost:8080/api/dates/saveDates',{
        method: 'POST',
        body: JSON.stringify({
           "date": date,
           "time": time,
           "guest":guest,
           "occasion":occasion
        }),
        headers: {
           'Content-type': 'application/json',
        },
        mode :"cors",
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addDates(date, time,guest,occasion);
     };


    const ChangeDate = (e) => {
    updatedate(e.target.value)
    setDate(e.target.value);
     };

    return(
    <form style={{"display": 'grid', "max-width": 200, "gap": 20}} onSubmit={handleSubmit}>
        <label for="res-date" >Choose a Date</label>

        <input type = "date"
        id="res-date"
        onChange={ChangeDate}
         ></input>

        <label for ="res-time">Choose a Time</label>

        <select id = "res-time"
        onClick={(e)=>{setTime(e.target.value)}}>
        {availableTimes.map((time) =>(
            <option>{time}</option>
        ))}
        </select>

        <label for="guests" >Number of guests</label>

        <input type="number" placeholder="1" min="1" max="10" id="guests"
        onClick={(e)=> {setGuest(e.target.value)}}></input>

        <label for="occasion">Occasion</label>

        <select id="occasion"
        onClick={(e)=> {setOccasion(e.target.value)}} >
            <option>Birthday</option>
            <option>Anniversary</option>
        </select>

        <input type="submit" value="Make Your reservation"></input>
    </form>)

}


export default BookingForm;