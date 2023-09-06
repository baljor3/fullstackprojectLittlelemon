import React from "react"
import {Link }from 'react-router-dom';


const Login = () => {
    return(
    <form style={{"display": 'grid', "max-width": 200, "gap": 20}}>
            <label>Username</label>
            <input id = "username"></input>
            <label>Password</label>
            <input id="password"></input>
            <button>Login</button>
            <Link to="/register"><button>Register</button> </Link>
    </form>
    )
}

export default Login;