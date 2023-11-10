import React, { useEffect, useState } from 'react';
import login from "../asserts/loanborrowerregister.jpg";
import hero from "../asserts/logodark.svg";
import axios from 'axios';
import { validfullname, validemail, validphnumber, validincome, validbankdetails } from '../regex';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

function BorrowerRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [employment, setEmployment] = useState('');
  const [income, setIncome] = useState('');
  const [dob, setdob] = useState(null);

  const [bankDetails, setBankDetails] = useState(null);
  const [purpose, setPurpose] = useState('');
  const [password, setPassword] = useState('');
  const [bankdetailssize, setbankdetailssize] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [otpVerified, setOtpverified] = useState(false);
  const [otp, setOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [registerpage, setregisterpage] = useState(true);
  const [aadharNumber,setaadharNumber] = useState('');

  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [countryname, setCountryname] = useState(0);
  const [statename, setstatename] = useState(0);
  const [cityname, setcityname] = useState(0);


  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';

      const result = window.confirm("Are you sure you want to proceed?");
      if (result) {
        window.location.reload();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  const strongCriteria = {
    minLength: 8,
    hasUppercase: /[A-Z]/,
    hasLowercase: /[a-z]/,
    hasNumber: /\d/,
    hasSpecialChar: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    let newErrors = {};
    if (!name) {
      newErrors.name = "Name is required";
    }
    else if (!validfullname.test(name)) {
      newErrors.name = "Full Name sholud not contain special chars and digits";
    }
    if (!email) {
      newErrors.email = "Email is required";
    }
    else if (!validemail.test(email)) {
      newErrors.email = "Enter the proper Email address";
    }
    if (!phoneNumber || phoneNumber.length !== 13) {
      newErrors.phoneNumber = "Phone number must be 10 digits with +91";
    } else if (!validphnumber.test(phoneNumber)) {
      newErrors.phoneNumber = "Enter the proper phone number";
    }
    if (!employment) {
      newErrors.employment = "Employment is required";
    }
    if (!income || income < 50000) {
      newErrors.income = "Annual Income is must be greater than 50000";
    } else if (!validincome.test(income)) {
      newErrors.income = "Enter the proper Annual Income";
    }
    if(!aadharNumber){
      newErrors.aadharnumber = "Aadhar Details is Required";
    }
    if (!dob) {
      newErrors.dob = "Dob is required with age above 18 years.";
    }
    console.log(dob)
    const today = new Date();
    const selectedDate = new Date(dob);
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    const isOver18 = age > 18 || (age === 18 && monthDiff > 0);
    if (!isOver18) {
      newErrors.dob = "You must be at least 18 years old."
    } 
    
    if (!countryname) {
      newErrors.countryname = "Country name is required";
    }
    if (!statename) {
      newErrors.statename = "State name is required";
    }
    if (!cityname) {
      newErrors.cityname = "City name is required";
    }
    if (!bankDetails) {
      newErrors.bankDetails = "Bank details are required within 500KB";
    } else if (!validbankdetails.test(bankDetails)) {
      newErrors.bankDetails = "Upload the proper document in .pdf , .docx format";
    } else if (bankdetailssize > 500) {
      newErrors.bankDetails = "document size should be within 500KB";
    }
    if (!purpose) {
      newErrors.purpose = "Purpose for loan is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    else if (
      !password.match(strongCriteria.hasUppercase) ||
      !password.match(strongCriteria.hasLowercase) ||
      !password.match(strongCriteria.hasNumber) ||
      !password.match(strongCriteria.hasSpecialChar) ||
      !password.length >= strongCriteria.minLength
    ) {
      newErrors.password = 'Enter Password with atleast OneUppercase ,OneLowercase ,Onedigit and OneSpecialChars';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords mis match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {

      const formData = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        employment: employment,
        income: income,
        country: countryname,
        state: statename,
        city: cityname,
        bankDetails: bankDetails,
        purpose: purpose,
        password: password,
        aadharnumber:aadharNumber,
        dob:dob
      };

      console.log(formData);

      axios.post('http://localhost:5000/borrowerregister', formData)
        .then((res) => {
          if (res.status == 201) {
            setregisterpage(false);
          }
          else if (res.status == 200) {
            alert("The Account is Already Present with same Email id");
            setregisterpage(false);
          }
          else {
            alert("Error in registering please try again later!")
          }
        })
        .catch((err) => {
          alert("Error on Sending Data From Frontend to Backend")
          console.log(err);
        });
    }
  };

  const OtpSubmit = (e) => {
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
        email: email,
        otp: otp
      }

      axios.post("http://localhost:5000/checkborrowersignupotp", otpdata)
        .then((res) => {
          if (res.status == 200) {
            setOtpverified(true);
            alert("Your Account Registered Successfully");
            window.location.href = '/blogin';
          }
          else if (res.status == 201) {
            newErrors.otp = "Invalid OTP";
            setErrors(newErrors);
          }
          else if (res.status == 202) {
            newErrors.otp = "Invalid Email";
            setErrors(newErrors);
          }
        })
        .catch((err) => {
          console.log('err', err);
          alert(err)
        })
    }
  };

  const ResendOtpSubmit = (e) => {
    e.preventDefault();

    const otpdata = {
      email: email,
      otp: otp
    }

    axios.post("http://localhost:5000/resendborrowersignupotp", otpdata)
      .then((res) => {
        if (res.status == 200) {
          alert("Otp resend to your email kindly check that");
        }
      })
      .catch((err) => {
        console.log('err', err);
        alert("Error Occured while Resending Otp");
      })

  };




  return (
    <div className="md:flex  md:flex-col lg:flex-row md:h-screen w-full  items-center bg-gray-100">
      <div className="hidden lg:block w-full lg:w-1/2 h-full min-h-screen sticky left-0">
        <img src={login} alt="" className="brightness-75 w-full h-screen object-cover" />
      </div>
      {registerpage ?
        <div className="h-screen lg:items-start overflow-y-auto w-full lg:w-1/2 px-6 py-6 lg:px-8">
          <form  encType='multipart/form-data' className="w-full flex items-center justify-center flex-col " onSubmit={handleSubmit}>
          <div class="sm:mx-auto mb-4 sm:w-full sm:max-w-sm ">
            <img class="mx-auto h-10 w-auto" src={hero} alt="Your Company" />
            <h2 class="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Signup for Borrower Account</h2>
          </div>
            <div className="md:grid gap-5 md:grid-cols-2 ">
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">FullName <span className='text-red-600'>*</span></label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={(e) => {
                    const inputValue = e.target.value;
                    const charCode = e.which ? e.which : e.keyCode;
                    const hasSpace = inputValue.includes(" ");

                    if (charCode === 32 && hasSpace) {
                      e.preventDefault();
                    } else if (
                      charCode >= 48 && charCode <= 57
                      || (charCode >= 33 && charCode <= 47)
                      || (charCode >= 58 && charCode <= 64)
                      || (charCode >= 91 && charCode <= 96)
                      || (charCode >= 123 && charCode <= 126)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  className={`mt-1 block w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-7 ps-2 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 w-60">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">Email <span className='text-red-600'>*</span></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => {
                    const charCode = e.which ? e.which : e.keyCode;
                    const char = String.fromCharCode(charCode);
                    if (char === ' ') {
                      e.preventDefault();
                    }
                  }}
                  className={`mt-1 block   w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 h-7 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 w-60">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium leading-5 text-gray-700">Phone Number (Indian)<span className='text-red-600'>*</span></label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyPress={(e) => {
                    const charCode = e.which ? e.which : e.keyCode;
                    const char = String.fromCharCode(charCode);
                    if (
                      (!phoneNumber && char !== '+')
                      || (phoneNumber && !/^[0-9]+$/.test(char))
                      || phoneNumber.length >= 13
                    ) {
                      e.preventDefault();
                    }
                  }}
                  maxLength={13}
                  className={`mt-1 block w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 h-7 sm:text-sm ${errors.phoneNumber ? 'border-red-500' : ''}`}
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1 w-60">{errors.phoneNumber}</p>}
              </div>
              <div>
                <label htmlFor="employment" className="block text-sm font-medium leading-5 text-gray-700">Employment <span className='text-red-600'>*</span></label>
                <select
                  id="employment"
                  name="employment"
                  value={employment}
                  onChange={(e) => setEmployment(e.target.value)}
                  className={`mt-1 block   w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 h-7 sm:text-sm ${errors.employment ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Employment</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                </select>
                {errors.employment && <p className="text-red-500 text-xs mt-1 w-60">{errors.employment}</p>}
              </div>
              <div>
                <label htmlFor="income" className="block text-sm font-medium leading-5 text-gray-700">Annual Income <span className='text-red-600'>*</span></label>
                <input
                  id="income"
                  name="income"
                  type="text"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  onKeyPress={(e) => {
                    const charCode = e.which ? e.which : e.keyCode;
                    const char = String.fromCharCode(charCode);
                    if (!/^\d+$/.test(char)) {
                      e.preventDefault();
                    }
                  }}
                  maxLength={13}
                  className={`mt-1 block w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 h-7 sm:text-sm ${errors.income ? 'border-red-500' : ''}`}
                />
                {errors.income && <p className="text-red-500 text-xs mt-1 w-60">{errors.income}</p>}
              </div>

              <div>
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">Country <span className='text-red-600'>*</span></label>
                <CountrySelect
                  showFlag={true}
                  onChange={(e) => {
                    setCountryid(e.id);
                    setCountryname(e.name)
                  }}
                  placeHolder="Select Country"
                />
                {errors.countryname && <p className="text-red-500 text-xs mt-1 w-60">{errors.countryname}</p>}
              </div>
              <div>

              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">State <span className='text-red-600'>*</span></label>
                <StateSelect
                  countryid={countryid}
                  onChange={(e) => {
                    setstateid(e.id);
                    setstatename(e.name)
                  }}
                  placeHolder="Select State"
                />
                {errors.statename && <p className="text-red-500 text-xs mt-1 w-60">{errors.statename}</p>}
              </div>
              <div>
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">City <span className='text-red-600'>*</span></label>
                <CitySelect
                  countryid={countryid}
                  stateid={stateid}
                  onChange={(e) => {
                    setcityname(e.name)
                  }}
                  placeHolder="Select City"
                />
              {errors.cityname && <p className="text-red-500 text-xs mt-1 w-60">{errors.cityname}</p>}
              </div>
              <div>
        <label htmlFor="aadhar" className="block text-sm font-medium leading-5 text-gray-700">
          Aadhar Card Number <span className="text-red-600">*</span>
        </label>
        <input
          id="aadhar"
          name="aadhar"
          type="text"
          value={aadharNumber}
          onChange={(e) => {
            setaadharNumber(e.target.value)
          }}
          maxLength={12}
          pattern="[0-9]{12}"
          title="Aadhar card number must be 12 digits"
          className={`mt-1 block w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 h-7 sm:text-sm ${errors.aadharnumber ? 'border-red-500' : ''}`}
        />
        {errors.aadharnumber && <p className="text-red-500 text-xs mt-1 w-60">{errors.aadharnumber}</p>}
      </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-medium leading-5 text-gray-700">Date of Birth <span className='text-red-600'>*</span></label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setdob(e.target.value)}
                  maxLength={13}
                  className={`mt-1 block w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 h-7 sm:text-sm ${errors.dob ? 'border-red-500' : ''}`}
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1 w-60">{errors.dob}</p>}
              </div>
              <div>
                <label class="w-60 flex flex-col my-5 md:my-0 lg:my-0 items-center px-4 py-2 hover:bg-white  rounded-lg border border-indigo-500 cursor-pointer bg-indigo-500 hover:text-black text-white transition-colors">
                  <svg class=" h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span class="mt-2">Upload Bank Details</span>
                  <input
                    type='file'
                    id="bankDetails"
                    name="bankDetails"
                    accept=".pdf"
                    onChange={(e) => {
                      var size = e.target.files[0].size;
                      var file = e.target.files[0];
                      setBankDetails(file.name);
                      setbankdetailssize(Math.round(size / 1024));
                    }}
                    className={`mt-1  hidden  w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 min-h-7 sm:text-sm ${errors.bankDetails ? 'border-red-500' : ''}`}
                  />
                </label>
                {errors.bankDetails && <p className="text-red-500 text-xs mt-1 w-60">{errors.bankDetails}</p>}
              </div>
              <div>
                <label htmlFor="purpose" className="block text-sm font-medium leading-5 text-gray-700">Purpose <span className='text-red-600'>*</span></label>
                <textarea
                  id="purpose"
                  name="purpose"
                  rows="2"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  onKeyPress={(e) => {
                    const charCode = e.which ? e.which : e.keyCode;
                    const char = String.fromCharCode(charCode);
                    const regex = /^[a-zA-Z0-9\s.,]+$/;
                    const previousChar = e.target.value.slice(-1);
                    if (!regex.test(char) || (char === ' ' && previousChar === ' ') || (char === ',' && previousChar === ',') || (char === '.' && previousChar === '.')) {
                      e.preventDefault();
                    }
                  }}
                  className={`mt-1 block w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 sm:text-sm ${errors.purpose ? 'border-red-500' : ''}`}
                ></textarea>
                {errors.purpose && <p className="text-red-500 text-xs mt-1 w-60">{errors.purpose}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">Password <span className='text-red-600'>*</span></label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => {
                    const charCode = e.which ? e.which : e.keyCode;
                    if (charCode === 32) {
                      e.preventDefault();
                    }
                  }}
                  className={`mt-1 block   w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 h-7 sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
                />
                {errors.password && <p className="text-red-500  text-xs mt-1">{errors.password}</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-5 text-gray-700">Confirm Password <span className='text-red-600'>*</span></label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="text"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={(e) => {
                    const charCode = e.which ? e.which : e.keyCode;
                    if (charCode === 32) {
                      e.preventDefault();
                    }
                  }}
                  className={`mt-1 block   w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 h-7 sm:text-sm ${errors.confirmPassword ? 'border-red-500' : ''}`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 w-60">{errors.confirmPassword}</p>}
              </div>
            </div>
            <div className='flex items-center mt-5 justify-center'>
              <button type="submit" className="w-full lg:w-60 md:w-52 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Account</button>
            </div>
            <p class="mt-3 text-center text-sm text-gray-500">
              By creating an account you agree to our Terms of Service and Privacy Policy. <br />Already Have Account?
              <a href="/blogin" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login</a>
            </p>
          </form>
        </div> :
        <div className="flex flex-col items-center justify-center  min-h-screen overflow-y-scroll w-full lg:w-1/2 px-6 py-12  lg:px-8">
          <h1 className='text-center text-xl pb-10'>We've send otp to <br /> {email}</h1>
          <form onSubmit={OtpSubmit} className="w-60 ">
            <label htmlFor="otp" className='text-md text-gray-700 font-medium'>Enter OTP</label>
            <input
              id="otp"
              name="otp"
              type="text"
              onChange={(e) => setOtp(e.target.value)}
              maxLength={4}
              onKeyPress={(e) => {
                const regex = /^[0-9\b]+$/;
                if (!regex.test(e.key)) {
                  e.preventDefault();
                }
              }}
              className='block w-full rounded-md border-0 mt-2 py-1.5 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            {errors.otp && <p className="text-red-500 ms-2 mt-2 text-xs ">{errors.otp}</p>}
            <div className='flex gap-3 items-center justify-center mt-5'>
              <button type="submit" className='w-44 rounded-md shadow-sm active:scale-105 transition-transform bg-indigo-500 py-2 text-base text-white font-medium'>
                Verify OTP
              </button>
              <button type="button" className='w-44 rounded-md shadow-sm active:scale-105 transition-transform bg-indigo-500 py-2 text-base text-white font-medium' onClick={ResendOtpSubmit} >
                Resend Otp
              </button>
            </div>
          </form>


        </div>}
    </div>
  );
}

export default BorrowerRegister;                  
