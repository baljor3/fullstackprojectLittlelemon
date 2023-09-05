import React from "react"

const Login = () => {
    return(
    <form style={{"display": 'grid', "max-width": 200, "gap": 20}}>
            <label>Username</label>
            <input id = "username"></input>
            <label>Email</label>
            <input id = "email"></input>
            <label>Password</label>
            <input id="password"></input>
    </form>
    )
}

export default Login;