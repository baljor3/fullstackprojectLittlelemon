import React, {useState} from "react";





const Register = () => {
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const addUser = async(username,email,password) =>{
        await fetch('http://localhost:8080/api/logininsert',{
            method: 'POST',
            body: JSON.stringify({
               "username": username,
               "email": email,
               "password":password,
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
        
    const submitdata =()=>{
       
        addUser(username,email,password)
        alert("the data was added")
    }
    return(
    <form style={{"display": 'grid', "max-width": 200, "gap": 20}} onSubmit={submitdata}>
            <label>Username</label>
            <input id = "username"
            onChange={(e)=> setUserName(e.target.value)}></input>

            <label>Email</label>
            <input id ="email"
            onChange={(e)=> setEmail(e.target.value)}></input>

            <label>Password</label>
            <input id="password"
            onChange={(e)=> setPassword(e.target.value)}></input>

            <button type="submit">Register</button>
            <button>Login</button>
    </form>
    )
}

export default Register;