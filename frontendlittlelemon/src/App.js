import './App.css';
import  React,{lazy,Suspense} from "react"
import Nav from "./Sectionfiles/Nav"
import Main from "./Sectionfiles/Main"
import Footer from "./Sectionfiles/Footer"
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Review from './Sectionfiles/Review';
import { AuthProvider } from './Sectionfiles/auth';

const Menu = lazy(()=>{import('./Sectionfiles/Menu')})
const BookingPage= lazy(() =>{import('./Sectionfiles/Booking')})
const Login = lazy(()=> {import('./Sectionfiles/Login')})
const Register = lazy(()=>{import('./Sectionfiles/Register')})
const Cart = lazy(()=>{import('./Sectionfiles/Cart')})

function App() {
  return (
    <main>
     <AuthProvider>
      <Nav/>
      <Routes>
    <Route path="/" element={<Main />}></Route>

    <Route path="/booking" element={
      <Suspense>
    <BookingPage />
    </Suspense>}></Route>

    <Route path="/login" element ={
      <Suspense>
    <Login/>
    </Suspense> }> 
    </Route>
    
    <Route path="/register" element ={
      <Suspense>
    <Register/>
    </Suspense>
    }></Route>
    
    <Route path = "/menu" element ={
    <Suspense fallback = {<div>Loading Menu...</div>}>
      <Menu/>
    </Suspense>}></Route>
    
    <Route path = "/cart" element = {
    <Suspense>
    <Cart/>
    </Suspense>
    }> </Route>
    <Route path = "/review/:itemId" element= {<Review/>}></Route>
    </Routes>
      </AuthProvider>
    </main>
  );
}

export default App;
