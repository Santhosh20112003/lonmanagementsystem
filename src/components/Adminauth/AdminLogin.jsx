import React, { useState } from 'react';
import hero from "../asserts/logodark.svg";
import axios from 'axios';
import login from "../asserts/adminlogin.jpg";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function BorrowerLogin() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [message,setMessage] = useState('');
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    let newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {

     const formData = {   
        email: email,
        password:password
      };
      
      axios.post('http://localhost:5000/adminlogin', formData)
      .then((res) => {
         if(res.status==200){
          localStorage.setItem("tokenadmin", res.data.token);
          window.location.href="/admindashboard";
         }
         else if(res.status==201){
          setMessage("Incorrect Email or Password")
         }
         else if(res.status==203){
          setMessage("Email not verified email already send to your email address")
         }
      })
      .catch((err) => {
        setMessage("Invalid Email id and password");
        console.log(err);
      });
    }
  };

  return (
    <div className='flex h-[100vh] w-full'>
      <Link to="/home" className='fixed active:scale-105 transition-transform  px-3.5 py-2 top-5 left-5 rounded-full shadow-lg
     bg-indigo-500 w-fit h-fit'>
       <h1 className="text-xl mt-1 text-white fas fa-arrow-left font-bold"></h1>
    </Link>
      <div className="flex min-h-[100vh] w-full lg:w-1/2 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-14 w-auto" src={hero} alt="Your Company" />
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Admin Login</h2>
          <p className='text-center mt-5 text-red-500'>{message}</p>
        </div>
        
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form encType='multipart/form-data' className="space-y-6" onSubmit={handleSubmit}  >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" autoComplete="email" 
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => {
                  const charCode = e.which ? e.which : e.keyCode;
                  const char = String.fromCharCode(charCode);
                  if (char === ' ') {
                    e.preventDefault();
                  }
                }}
                className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                
              </div>
              <div className="mt-2 relative"> 
                <input id="password" 
                       name="password" 
                       type={isPasswordVisible ? "text" : "password"} 
                       autoComplete="current-password" 
                       onChange={(e) => setPassword(e.target.value)} 
                       className="block w-full rounded-md border-0 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <FontAwesomeIcon 
                    icon={isPasswordVisible ? faEyeSlash : faEye} 
                    onClick={togglePasswordVisibility} 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer" />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
            this login page is only dedicated for the Admin users
          </p>

            <div className="flex w-full items-center justify-center">
              <button type="submit" className="flex w-52 justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:block w-1/2 h-full">
        <img src={login} alt="" className="brightness-75 w-100 h-full object-cover" />
      </div>
    </div>
  );
}

export default BorrowerLogin;