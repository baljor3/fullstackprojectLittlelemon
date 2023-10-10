import React from "react"
import { Box} from "@chakra-ui/react";
import "../Css/Nav.css"
import logo from "../asset/logo.png"
import { Link } from 'react-router-dom';
import Home from "./Main"


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
return (
    <nav>
        <Box maxW = "sm" maxH = "sm">
        <div class = "flex-container" >
        <img src= {logo} alt = "Logo" />
        {navlinks.map((navlink, index) => (
            <Link to={navlink.link} className="flex-item"> {navlink.name}</Link>
        ))}
        </div>
        </Box>
    </nav>
);

};
export default Nav;