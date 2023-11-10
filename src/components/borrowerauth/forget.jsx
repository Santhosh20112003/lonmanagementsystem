import axios from 'axios';
import React, { useState } from 'react';

export function BForget() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpVerified,setOtpverified] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [strength, setStrength] = useState('Password Strength: ');


  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if(!password && !confirmPassword){
      setMessage('Password and Confirm Password Required');
    }
    else if(!password){
      setMessage('Password Required');
    } 
    else if(!confirmPassword){
      setMessage('Confirm Password Required');
    }
    else if (password === confirmPassword) { 
      setMessage('');
        
        const strongCriteria = {
          minLength: 8,
          hasUppercase: /[A-Z]/,
          hasLowercase: /[a-z]/,
          hasNumber: /\d/,
          hasSpecialChar: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/,
        };
    
        // Calculate the strength of the password
        let currentStrength = 'Password Strength: Weak';
    
        if (password.length >= strongCriteria.minLength && password.match(strongCriteria.hasNumber) &&
        password.match(strongCriteria.hasSpecialChar)) {
          currentStrength = 'Password Strength: Moderate';
        }
    
        if (
          password.match(strongCriteria.hasUppercase) &&
          password.match(strongCriteria.hasLowercase) &&
          password.match(strongCriteria.hasNumber) &&
          password.match(strongCriteria.hasSpecialChar)
        ) {
          currentStrength = 'Password Strength: Strong';
        }
    
       
        if(currentStrength=="Password Strength: Strong" || currentStrength=="Password Strength: Moderate"){
          const formdata = {
            email:email,
            password:password
          }
          setStrength(currentStrength);
          axios.post('http://localhost:5000/changepassword',formdata)
          .then((res)=>{
            if(res.status==200){
              alert("Password Changed")
              window.location.href="/blogin";
            }
            else if(res.status==201){
              setMessage("Already used password")
            }
            else if(res.status==500){
               alert("Password not changed Error Occured");
            }
          })
          .catch((err)=>{
            alert("Error occured while changing your password",err);
          })
        }
        setStrength(currentStrength);
    } else {
      setMessage('Passwords do not match. Please try again.');
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    let newErrors = {};
    if (!email) {
      newErrors.email = "*Email is Required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      
      const historyData = {
        email: email,
        resend:false
      };

      axios.post("http://localhost:5000/generateotp", historyData)
        .then((res) => {
          if (res.status === 200) {
            setEmailVerified(true);
            alert("Email Verified. Please check your email for OTP.");
          } else if (res.status === 201) {
            newErrors.invalidEmail = "*Account Does not exist";
            setErrors(newErrors);
          }
          else if(res.status==226){
            newErrors.invalidEmail = "*Email Already send to your Mail";
            setEmailVerified(true);
            setErrors(newErrors);
          }
        })
        .catch((error) => {
            
            console.log("Error", error);
            newErrors.invalidEmail = "*Something went wrong";
            newErrors.resend = "Resend email";
            setErrors(newErrors);
          
        });
    }
  };

  const handleResendOTPSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    let newErrors = {};
    if (!email) {
      newErrors.email = "*Email is Required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      
      const historyData = {
        email: email,
        resend:true
      };
      if(window.confirm("Sure you want to resend")){
      axios.post("http://localhost:5000/generateotp", historyData)
      .then((res) => {
        if (res.status === 200) {
          setEmailVerified(true);
          alert("Email Verified. Please check your email for OTP.");
        } else if (res.status === 201) {
          newErrors.invalidEmail = "*Account Does not exist";
          setErrors(newErrors);
        }
        else if(res.status==226){
          newErrors.invalidEmail = "*Email Already send to your Mail";
          setEmailVerified(true);
          setErrors(newErrors);
        }
      })
      .catch((error) => {
          
          console.log("Error", error);
          newErrors.invalidEmail = "*Something went wrong";
          newErrors.resend = "Resend email";
          setErrors(newErrors);
        
      });}
      
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    let newErrors = {};
    if (!otp) {
      newErrors.otp = "*Enter the OTP";
      setErrors(newErrors);
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
   const otpdata = {
    email:email,
    otp:otp
   }    

    axios.post("http://localhost:5000/checkotp",otpdata)
    .then((res)=>{
      if(res.status==200){
         setOtpverified(true);
      }
      else if(res.status==201){
          newErrors.otp ="Invalid OTP";
          setErrors(newErrors);
      }
      else if(res.status==202){
          newErrors.otp ="Invalid Email";
          setErrors(newErrors);
      }
    })
    .catch((err)=>{
      console.log('err', err);
      alert(err)
    })
  };
}

  return (
    <div className='w-100 bg-slate-200 h-screen flex items-center justify-center'>
      {otpVerified ? 
      <div className=" flex items-center border border-gray-50 rounded-xl justify-center bg-gray-50 shadow-lg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Confirm Your Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handlePasswordSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
               {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <p>{strength}</p>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Change Password
            </button>
          </div>
        </form>
        {message && (
          <p className="mt-2 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div> :
    <form onSubmit={handleSubmit} className="mt-10 bg-gray-50 sm:mx-auto sm:w-full sm:max-w-sm border border-gray-50 p-7 shadow-lg rounded-lg font-medium">
        <span>
          <h1 className="text-2xl font-bold text-gray-950">Reset your Password</h1>
          <p className="text-slate-500 mt-2 text-sm leading-none">If the account exists, we'll email you instructions to reset the password.</p>
        </span>
        <div className="mt-5 flex flex-col">
          <label htmlFor="email" className='text-md text-gray-700 font-medium'>Enter your Email id</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='block w-full rounded-md border-0 mt-2 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
          {errors.email && <p className="text-red-500 ms-2 mt-2 text-xs ">{errors.email}</p>}
          {errors.invalidEmail && <p className="text-red-500 ms-2 mt-2 text-xs ">{errors.invalidEmail} </p>}
        </div>
        {emailVerified && (
          <div className="mt-5 flex flex-col">
            <label htmlFor="otp" className='text-md text-gray-700 font-medium'>Enter OTP</label>
            <input
              id="otp"
              name="otp"
              type="text"
              onChange={(e) => setOtp(e.target.value)}
              className='block w-full rounded-md border-0 mt-2 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            {errors.otp && <p className="text-red-500 ms-2 mt-2 text-xs ">{errors.otp}</p>}
            <div className='flex gap-3 items-center justify-center mt-5'>
              <button type="submit" className='w-44 rounded-md shadow-sm active:scale-105 transition-transform bg-indigo-500 py-2 text-base text-white font-medium' onClick={handleOTPSubmit}>
                Verify OTP
              </button>
              {emailVerified ? <button type="submit" className='w-44 rounded-md shadow-sm active:scale-105 transition-transform bg-indigo-500 py-2 text-base text-white font-medium' onClick={handleResendOTPSubmit}>
                Resend Otp
              </button>: null}
            </div>
          </div>
        )}
        <div className='flex items-center justify-center mt-5'>
        {emailVerified ? null : <button type='submit' className='w-44 rounded-md shadow-sm active:scale-105 transition-transform bg-indigo-500 py-2 text-base text-white font-medium'>Send OTP via Email</button>}
          
        </div>
      </form>}
    </div>
  );
}
