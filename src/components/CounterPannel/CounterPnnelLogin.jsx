import React, { useState, useRef, useEffect } from 'react';
import { TextField } from '@mui/material';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CounterRegistrationApis from '../Api_Services/CounterRegistrationApis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Menu from './MenuItems';

function CounterPanelLogin() {
  const [values, setValues] = useState({ mobileno: '' });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState('Send OTP');
  const [timer, setTimer] = useState(30);
  const [attempts, setAttempts] = useState(0);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [showOTP, setShowOTP] = useState('');
  const [verifyotp, setVerifyOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [data, setData] = useState('');
  const otpInputs = useRef([]);

  useEffect(()=>{
    sessionStorage.clear();
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const sendOTP = async(e) => {
    e.preventDefault();
    if (values.mobileno.length !== 10) {
      setValidationErrors({ mobileno: 'Enter a valid 10-digit mobile number' });
      return;
    }
    else{
        try {
            const response = await CounterRegistrationApis.counterogin(values.mobileno);
            console.log(response);
            if(response.status === 200)
            {
            
              setValidationErrors({});
                setButtonDisabled(true);
                setShowOTPInput(true);
                setShowOTP('OTP Sent Successfully');
                let count = 30;
                const interval = setInterval(() => {
                count--;
                setTimer(count);
                if (count === 0) {
                    clearInterval(interval);
                    setButtonDisabled(false);
                    setButtonText('Resend OTP');
                    setAttempts(attempts + 1);
                }
                }, 1000);

            }
        } catch (error) {
            // console.log(error.response.data.message);
        }
    
    }
  };

  const handleOtpInputChange = (index, value) => {
    if (value.length === 1 && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleVerifyMobileNoOtp = (e) => {
    e.preventDefault();
    const otpEntered = otpInputs.current.map((input) => input.value).join('');
    if (otpEntered === '1234') { 
    //   setVerifyOtp('Verified Successfully');
    toast.success("Login Successfull..!", {
        position: "top-right",
        autoClose: 5000, // Closes after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    navigate('/CounterPannel/MenuItems');
   sessionStorage.setItem('mobieNo',values.mobileno);

    } else {
      setVerifyOtp('Invalid OTP...!');
    }
  };

  return (
    <div>
      <div className='p-5'>
        <form className='form-inline border rounded  me-lg-4 shadow mt-5'>
          <div className='text-center fw-bold  rounded'>
            <h3>
              Customer Login <AccountCircleSharpIcon className='fs-2' />
            </h3>
          </div>
          <div className='mx-lg-2 my-3 px-2'>
            <h3 className='fw-semibold'>Hello Counter,</h3>
            <TextField
              className='col-lg-7 col-md-7 col-10'
              id='outlined-basic'
              label='Mobile No.'
              placeholder='Enter Your Mobile No.'
              name='mobileno'
              onChange={handleChange}
              value={values.mobileno}
              inputProps={{ maxLength: 10 }}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <span>
              <button
                className='btn btn-success rounded fw-bold shadow mt-2 mx-1 ms-3 py-2'
                onClick={sendOTP}
                disabled={buttonDisabled}
              >
                {buttonDisabled ? (attempts < 3 ? `Resend OTP in ${timer}s` : 'Try Later') : buttonText}
              </button>
            </span>
            <h3 className='text-success'>{showOTP}</h3>
            {validationErrors.mobileno && <span className='text-danger'>{validationErrors.mobileno}</span>}
            <h6 className='text-danger mt-1'>{errorMessage}</h6>
            {data === 'Mobile number is not exists' && <h4 className='text-danger mt-2 ms-lg-3'>{data}</h4>}
            {showOTPInput && (
              <div className='ms-2 mt-2'>
                <small className='text-success'>OTP sent to your mobile No.</small>
                <form className='w-75 d-flex flex-nowrap pt-3'>
                  {[...Array(4)].map((_, index) => (
                    <input
                      key={index}
                      type='text'
                      autoFocus={index === 0}
                      ref={(input) => (otpInputs.current[index] = input)}
                      onChange={(e) => handleOtpInputChange(index, e.target.value)}
                      className='w-25 border ps-lg-3 fw-semibold rounded'
                      maxLength={1}
                      style={{ marginRight: '8px' }}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  ))}
                  <button className='btn btn-info text-nowrap fw-bold shadow ms-1' onClick={handleVerifyMobileNoOtp}>
                    Login <LoginSharpIcon className='text-dark' />
                  </button>
                </form>
                {verifyotp === 'Invalid OTP...!' && <h4 className='text-danger ms-2 mt-2'>{verifyotp}</h4>}
              </div>
            )}
            {verifyotp === 'Verified Successfully' && (
              <h4 className='text-success mt-lg-3 ms-2'>
                {verifyotp} <CheckCircleOutlineIcon />
              </h4>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CounterPanelLogin;