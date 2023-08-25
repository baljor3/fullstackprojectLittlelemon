import './App.css';
import  React from "react"

import Header from"./Sectionfiles/Header"
import Nav from "./Sectionfiles/Nav"
import Main from "./Sectionfiles/Main"
import Footer from "./Sectionfiles/Footer"
import BookingPage from "./Sectionfiles/Booking"
import { BrowserRouter,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <main>
      <BrowserRouter><Nav></Nav>
      <Routes>
    <Route path="/" element={<Main />}></Route>
    <Route path="/booking" element={<BookingPage />}></Route>
    </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </main>
  );
}

export default App;
