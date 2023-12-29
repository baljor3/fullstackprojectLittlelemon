import React, { useContext, useEffect } from "react"
import { Box} from "@chakra-ui/react";
import "../Css/Nav.css"
import logo from "../asset/logo.png"
import { Link } from 'react-router-dom';
import Home from "./Main"
import Cookies from "js-cookie";
import { AuthContext } from './auth';

const navlinks = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "About",
        link: "/about",
    },
    {
        name:"Menu",
        link:"/menu",
    },
    {
        name:"Reservations",
        link:"/booking",
    },

    {
        name:"cart",
        link:"/cart",
    },

    {
        name: "Login",
        link: "/login",
    },

];

const image =[
    {
        source: "./Assets/images/Logo.png",
        name:  "Log",
    }
];

const Nav = () =>{
    const jwtToken = Cookies.get('jwt_authorization')
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(()=>{
        fetch("http://localhost:8080/api/getCookies",{
            headers:{
                "token": jwtToken,
                'Content-type': 'application/json'
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(new Date().getTime())
            console.log(data["time"]*1000)
        })
    },[])

return (
    <nav style = {{"background-color":"#D6D26D"}}>
        <Box maxW = "sm" maxH = "sm">
        <div class = "flex-container" >
        <img src= {logo} alt = "Logo" />
        {navlinks.map((navlink) => (
            <Link key = {navlink.name} to={navlink.link} className="flex-item"> {navlink.name}</Link>
        ))}
        <h1>{isLoggedIn ? 'Logged In' : 'Not Logged In'}</h1>
        </div>
        </Box>
    </nav>
);

};
export default Nav;