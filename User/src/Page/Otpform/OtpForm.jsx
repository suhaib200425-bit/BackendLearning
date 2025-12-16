import React, { useRef, useState } from "react";
import "./otp.css";
import { AuthScreen } from "../../assets/assets.js";
import axios from "axios";
import { BASEURL } from "../../variable/variables.js";
import { useParams } from "react-router-dom";

function OtpForm() {
    
  const { email } = useParams();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef([]);
    const [message, setmessage] = useState('')

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputsRef.current[index + 1].focus();
        } 
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlesubmit = async(e) => {
        const otpValue = otp.join("")
        if (otpValue.length < 6) {
            setmessage('6 digit number to be enter')
        }else{
            setmessage('')
            const res= await axios.post(`${BASEURL}/user/verifyOtp`,{'otp':Number(otpValue),'email':email})
            console.log(res.data);
            
        }

    }

    return (
        <div className="Auth row">
            <div className="col-6 p-5 image_auth_screen">
                <img src={AuthScreen} alt="" />
            </div>

            <div className="col-6 image_auth_screen">
                <div className="head head_border pb-2">
                    <h1>Enter The OTP</h1>
                </div>

                <div className="otp-container mt-5">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputsRef.current[index] = el)}
                            type="text"
                            maxLength="1"
                            className="otp-input"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>
                <div className="message">{message}</div>
                <button type='submit' className="btn_me  col-4" onClick={(e) => handlesubmit(e)}><h5>Register</h5></button>

            </div>
        </div>
    );
}

export default OtpForm;
