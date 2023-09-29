import React, {useState} from "react"
import {Link }from 'react-router-dom';
import Cookies from "universal-cookie"
import jwtdecode from "jwt-decode"

const Login = () => {
    const cookies = new Cookies();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    
    const login = async(username, password) =>{
        await fetch('http://localhost:8080/api/login',{
            method: 'POST',
            body: JSON.stringify({
               "username":username,
               "password":password
            })})
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
              cookies.set("jwt_authorization",data)
            })
            .catch(error =>{
                console.log(error)
            })
        }
    
   
    const k=(e) =>{
        e.preventDefault()
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

            <button type="submit">Login</button>
            <Link to="/register"><button>Register</button> </Link>
    </form>
    )
}

export default Login;