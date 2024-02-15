import 'reactjs-popup/dist/index.css';
import '../Css/Popup.css'
import { useState } from 'react';

export default function PopupGfg({closeCheckout}) {
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

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


    return (
        <div className="popupContainer" >
            <span className="closeButton" 
            onClick={closeCheckout}>
                X</span>
            <form className="popupForm">
                <div className="nameContainer">
                    <div>
                        <label>First Name</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type="text" />
                    </div>
                </div>
                <label>Email</label>
                <input type="text" />
                <div className='creditCardContainer'>
                    <div className="labelRow">
                        <label>Credit Card</label>
                    </div>
                    <div className="inputRow">
                        <input
                            type="text"
                            value={creditCardNumber}
                            onChange={handleCreditCardChange}
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            style={{ width: '23ch' }}
                            maxLength="19"
                        />
                    </div>
                    <div className="labelRow">
                        <label>Expiry Date</label>
                    </div>
                    <div className="inputRow">
                        <input
                            type="text"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            placeholder="MM/YY"
                            style={{ width: '8ch' }}
                            maxLength="5"
                        />
                    </div>
                    <div className="labelRow">
                        <label>CVV</label>
                    </div>
                    <div className="inputRow">
                        <input
                            type="text"
                            value={cvv}
                            onChange={handleCvvChange}
                            placeholder='XXX'
                            style={{ width: '6ch' }}
                            maxLength="3"
                        />
                    </div>
                </div>
                <input type="submit" />
            </form>
        </div>
    );
};