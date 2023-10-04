import React, {useState} from "react"
import {Link }from 'react-router-dom';
import Cookies from "universal-cookie"


const Login = () => {
    
    const cookies = new Cookies();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [errorLogin, setErrorrLogin] = useState();
    
    const login = async(user, pass) =>{
        await fetch('http://localhost:8080/api/login',{
            method: 'POST',
            body: JSON.stringify({
               "username":user,
               "password":pass
            }), 
            headers: {
                'Content-type': 'application/json'
            }
            })

            .then((res) => res.json())
            .then((data) => {
              if(data === false){
                setErrorrLogin("Incorrect password or username")
                cookies.set("jwt_authorization","")
                console.log(cookies)
              }else{
              setErrorrLogin("")
              cookies.set("jwt_authorization",data)
              }
            })
            .catch(error =>{
                console.log(error)
            })
        }
    
   
    const k=(e) =>{
        e.preventDefault()
        console.log(username,password)
        login(username, password)
        
    }
    
    return(
    <form style={{"display": 'grid', "max-width": 200, "gap": 20}} onSubmit={k}> 
            <label>Username</label>

            <input id = "username"
            onChange={(e)=> setUserName(e.target.value)}
            required></input>

            <label>Password</label>

            <input id="password"
            onChange={(e)=> setPassword(e.target.value)} required></input>

            <span>{errorLogin}</span>
            <button type="submit">Login</button>
            <Link to="/register"><button>Register</button> </Link>
    </form>
    )
}

export default Login;