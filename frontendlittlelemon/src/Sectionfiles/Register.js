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

    function hasWhiteSpace(str) {
        b = false;
            for (let i = 0; i < str.length; i++) {
              if (str[i] === ' ' || str[i] === '\t' || str[i] === '\n' || str[i] === '\r') {
                return b = true; // Found a white space character
            }
        }
        return false; // No white space character found
    }
        
    const checkUserName = (username) => {
        const bool = false;
        bool = hasWhiteSpace(username)
        if(bool === true){
            setErrorPass("there is whitespace in your username")
            return bool = true;
        }
        if(username.length < 4){
            setErrorUser("Username is too short")
            return bool = true;
        }
        else{
            setErrorUser("")
        }
    }

    const checkEmail = (email) => {
        const bool = false;
        
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        bool = hasWhiteSpace(email)
        if(bool === true){
            setErrorPass("there is whitespace in your email")
            return bool = true;
        }

        if (!emailRegex.test(email)) {
            setErrorEmail("Incorrect Email format")
            return bool = true;
        }else{
            setErrorEmail("")
        }

    }

    const checkPassword = (p) => {
        const bool = false;
        bool = hasWhiteSpace(p, bool)
        if(bool === true){
            setErrorPass("there is whitespace in your password")
            return bool = true;
        }

        if(p.length < 4){
            setErrorPass("Password too short")
            return bool = true;
        }else{
            setErrorPass("")
        }
        
    }

    const submitdata =(e)=>{
        e.preventDefault();
        const bool = false;
        bool =checkUserName(username)
        bool =checkEmail(email,bool)
        bool = checkPassword(password,bool)
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
            <span >  {errorUser}  </span>

            <label>Email</label>
            <input id ="email"
            onChange={(e)=> setEmail(e.target.value)}></input>
            <span  >  {errorEmail}  </span>

            <label>Password</label>
            <input id="password"
            onChange={(e)=> setPassword(e.target.value)}></input>
            <span >  {errorPass}  </span>


            <button type="submit">Register</button>
            <button>Login</button>
    </form>
    )
}

export default Register;