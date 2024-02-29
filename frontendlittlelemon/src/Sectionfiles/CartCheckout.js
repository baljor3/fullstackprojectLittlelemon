import 'reactjs-popup/dist/index.css';
import '../Css/Popup.css'
import React, { useState } from 'react';
import Cookies from "js-cookie";

export default function PopupGfg({closeCheckout, data, effect}) {
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [email, setEmail] =useState();
    const [load, setLoading] = useState(false);
    const [thankscreen, setThankScreen] = useState(false)

    const jwtToken = Cookies.get('jwt_authorization')

    const handleCreditCardChange = (e) => {
        const formattedCreditCardNumber = e.target.value
            .replace(/[^\d]/g, '') // Remove non-digit characters
            .replace(/(.{4})/g, '$1-') // Add a dash every four characters
            .slice(0, 19); // Limit to 19 characters (4 digits + 3 dashes)
        setCreditCardNumber(formattedCreditCardNumber);
    };

    const handleExpiryDateChange = (e) => {
        const formattedExpiryDate = e.target.value
            .replace(/[^\d]/g, '') // Remove non-digit characters
            .replace(/(.{2})/, '$1/'); // Add a slash after the first two characters (MM/YY)
        setExpiryDate(formattedExpiryDate);
    };

    const handleCvvChange = (e) => {
        const formattedCvv = e.target.value.replace(/[^\d]/g, '').slice(0, 3); // Keep only the first three digits
        setCvv(formattedCvv);
    };
    const sendMessage =async(email) =>{
        await fetch('http://localhost:8080/api/sendMessage',{
            method:'POST',
            body: JSON.stringify({
                "email":email,
                "items":data
            }),
            headers:{
                "token":jwtToken,
                'Content-type':'application/json',
            }
        }).catch(err =>{
            console.log(err)
        })
    }

    const finish = async(e) =>{
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    await sendMessage(email);
    closeCheckout(); // Close the checkout popup
    effect(); // Update the cart data
    setThankScreen(prev => !prev); // Toggle the state
    console.log("Thankscreen value:", thankscreen); // Check the value of thankscreen
    setLoading(false);
    }



    const ThankyouWindow = () =>{
        <div className='popupContainer'>
             <span className="closeButton"
            onClick={setThankScreen(false)}>
                X</span>
                <p>Order has been processed</p>

        </div>
    }

    const LoadingScreen = ({})=>{
    return(
        <div className='loadContainer'>
           <div>Loading...</div>
           <div className='loading'></div>

        </div>
    )
    }

    return (
            <div>
                {thankscreen && <ThankyouWindow/>}
                { load
                ?
                <LoadingScreen />
                :

                 <div className="popupContainer" >
            <span className="closeButton"
            onClick={closeCheckout}>
                X</span>
            <form className="popupForm" onSubmit={finish}>
                <div className="nameContainer">
                    <div>
                        <label className='label-popup'>First Name</label>
                        <input type="text" className='input-popup'
                        />
                    </div>
                    <div>
                        <labe className='label-popup'l>Last Name</labe>
                        <input type="text"  className='input-popup'/>
                    </div>
                </div>
                <labe className='label-popup'l>Email</labe>
                <input type="text" className='input-popup' 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required/>
                <div className='creditCardContainer'>
                    <div className="labelRow">
                        <label className='label-popup'>Credit Card</label>
                    </div>
                    <div className="inputRow">
                        <input
                            type="text"
                            className='input-popup'
                            value={creditCardNumber}
                            onChange={handleCreditCardChange}
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            style={{ width: '23ch' }}
                            maxLength="19"
                        />
                    </div>
                    <div className="labelRow">
                        <label className='label-popup'>Expiry Date</label>
                    </div>
                    <div className="inputRow">
                        <input
                            type="text"
                            className='input-popup'
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            placeholder="MM/YY"
                            style={{ width: '8ch' }}
                            maxLength="5"
                        />
                    </div>
                    <div className="labelRow">
                        <label className='label-popup'>CVV</label>
                    </div>
                    <div className="inputRow">
                        <input
                            type="text"
                            className='input-popup'
                            value={cvv}
                            onChange={handleCvvChange}
                            placeholder='XXX'
                            style={{ width: '6ch' }}
                            maxLength="3"
                        />
                    </div>
                </div>
                <input type="submit"  className='input-popup-submit'/>
            </form>

        </div>
}
            </div>
    )
};