import './App.css';
import  React from "react"
import Nav from "./Sectionfiles/Nav"
import Main from "./Sectionfiles/Main"
import Menu from "./Sectionfiles/Menu"
import Footer from "./Sectionfiles/Footer"
import BookingPage from "./Sectionfiles/Booking"
import Login  from "./Sectionfiles/Login"
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Register from './Sectionfiles/Register';

function App() {
  return (
    <main>
      <BrowserRouter><Nav></Nav>
      <Routes>
    <Route path="/" element={<Main />}></Route>
    <Route path="/booking" element={<BookingPage />}></Route>
    <Route path="/login" element ={<Login/>}> </Route>
    <Route path="/register" element ={<Register/>}></Route>
    <Route path = "/menu" element ={<Menu/>}></Route>
    </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </main>
  );
}

export default App;
