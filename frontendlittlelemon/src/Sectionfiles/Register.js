import React, {useState} from "react";


const Register = () => {
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorUser, setErrorUser] = useState();
    const [errorEmail, setErrorEmail] = useState();
    const [errorPass, setErrorPass] = useState();

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
        
    const checkUserName = (username,bool) => {
        bool = false;
        if(username.length < 4){
            setErrorUser("Username is too short")
            return bool = true;
        }
        else{
            setErrorUser("")
        }
    }

    const checkEmail = (email,bool) => {

        const e = email.value.trim();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegex.test(e)) {
            setErrorEmail("Incorrect Email format")
            return bool = true;
        }else{
            setErrorEmail("")
        }

    }

    const checkPassword = (p, bool) => {

        
    }

    const submitdata =()=>{
        const bool = false;
        checkUserName(username,bool)
        checkEmail(email,bool)
        if(bool === true){
            return;
        }
        addUser(username,email,password)
        alert("the data was added")
    }
    return(
    <form style={{"display": 'grid', "max-width": 200, "gap": 20}} onSubmit={submitdata}>
            <label>Username</label>
            <input id = "username"
            onChange={(e)=> setUserName(e.target.value)}
            required></input>
            <span id="error" style="color: red;">{errorUser}</span>

            <label>Email</label>
            <input id ="email"
            onChange={(e)=> setEmail(e.target.value)}></input>
            <span id="error" style="color: red;">{errorEmail}</span>

            <label>Password</label>
            <input id="password"
            onChange={(e)=> setPassword(e.target.value)}></input>
            <span id="error" style="color: red;">{errorPass}</span>


            <button type="submit">Register</button>
            <button>Login</button>
    </form>
    )
}

export default Register;