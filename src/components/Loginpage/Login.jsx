import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OdigosOffice from '../../assets/loginoffice.fc3cc41959874daf9718.jpg';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../../Context/AuthContext';
import { BaseUrl } from '../../BaseURL';

const Login = () => {

  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [message,setMessage]=useState(null);
  const [status, setStatus] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate =useNavigate();

  const Token = localStorage.getItem("Token");
  const {login,isLogin,setIsLogin,setModal}=useAuth();

  useEffect(() => {
    if (Token) {
       navigate('/user');
   }
  }, []);
  
 
  const toggalePage=()=>{
    setModal(false);
  }
  const handleLoginSuccess = () =>{
    if(isLogin){
    setIsLogin(true);
    
    }
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(sanitizedValue);
  };
  
  const handleOtpChange = (e) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/\D/g, '').slice(0,4);
    setOtp(sanitizedValue);
  };
  
  const SubmitHandler = async (e) => {
    e.preventDefault();
    
 if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      setMessage('Invalid mobile number');
      return;
    }
    try {
      setResendDisabled(true);

      const response = await axios.post(BaseUrl+`/users/login`,{
        mobileNumber: mobileNumber,
      });

      const data = response.data;
      console.log(data);
      if (data.Status === 1) {
        setStatus(1);
        setMessage('OTP sent Successfully');
        setTimer(30);
        startResendTimer()
      } else {
        setMessage('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending mobile number:', error);
      setMessage('Error sending mobile number');
    }
  };
  const startResendTimer = () => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(intervalId);
          setResendDisabled(false);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };



  const handleOtpSubmit = async (e) => {
    e.preventDefault();

   if (!/^\d{4}$/.test(otp)) {
      setMessage('Invalid OTP');
      return;
    }
  try{
    
   const response= await axios.post(BaseUrl+`/users/login/verifyotp`, {
        mobileNumber: mobileNumber,
        OTP: otp
      });
      const data = response.data;
      console.log(data);
      if (data.Status === 1) {
        localStorage.setItem('Token', data.Token)
        localStorage.setItem('userId',data.userDetails.userId)
        console.log(data);
        console.log(localStorage)
        setStatus(1);
        setMessage('Login Successful');
        handleLoginSuccess();
        navigate("/user");
        toggalePage();
      } else{
        console.error('Login failed');
        setMessage('Incorrect OTP');
      }
    }catch(error){
      console.error('Incorrect OTP:', error);
      setMessage('Incorrect OTP');
    }
}; 

  return (
    <div>
        <div className="Login-model">
       <div className="modal-content">
         <img src={OdigosOffice} alt='Login image'/>
         <div className='Login'>
         <form >
         <h2>Login</h2>
           {
           status === 0 ? ( 
          <>
              <input type="text" value={mobileNumber} placeholder=' Enter mobile number '
              onChange={handleMobileNumberChange}/>
              <p>{message }</p>
              <button onClick={SubmitHandler}>Send OTP</button>
             
             
           </>):( <>
            <input type="text" value={mobileNumber} disabled placeholder=' Enter mobile number '
              onChange={(e) => setMobileNumber(e.target.value)}/>
              <input type="text" value={otp} placeholder=' Enter OTP '
             onChange={handleOtpChange}/>
              <p>{message }</p>
              <button onClick={(e)=>{handleOtpSubmit(e)}}>Login</button>
              <button className='resend' onClick={SubmitHandler} disabled={resendDisabled}>
          Resend OTP {resendDisabled && `in (${timer})s`}
        </button>
           </>)
           }
           </form>
         </div>
       </div>
     </div>
   </div>
  );
};

export default Login;
