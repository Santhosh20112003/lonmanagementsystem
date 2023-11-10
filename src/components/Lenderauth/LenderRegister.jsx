import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import login from "../asserts/loanlenderregister.jpg";
import hero from "../asserts/logodark.svg";
import { validfullname,validemail,validphnumber,validpenalty,validbankdetails } from '../regex';

function BorrowerRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [intrest, setintrest] = useState('');
  const [penalty, setpenalty] = useState('');
  const [Repayment, setRepayment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bankDetails, setBankDetails] = useState(null);
  const [bankdetailssize,setbankdetailssize] = useState(0);
  const [SecurityAgreement, setSecurityAgreement] = useState(null);
  const [SecurityAgreementsize,setSecurityAgreementsize] = useState(0);
  const [otpVerified, setOtpverified] = useState(false);
  const [otp, setOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [registerpage, setregisterpage] = useState(true);
  const [values, setValues] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    intrest: '',
    penalty: '',
    Repayment: '',
    bankDetails: '',
    SecurityAgreement: '',
    password: '',
    confirmPassword: '',
  });
  const strongCriteria = {
    minLength: 8,
    hasUppercase: /[A-Z]/,
    hasLowercase: /[a-z]/,
    hasNumber: /\d/,
    hasSpecialChar: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/,
  };
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};
    if (!name) {
      newErrors.name = "Name is required";
    }
    else if(!validfullname.test(name)){
      newErrors.name = "Full Name sholud not contain special chars and digits";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if(!validemail.test(email)){
      newErrors.email = "Enter the proper Email address";
    }
    if (!phoneNumber || phoneNumber.length !== 13) {
      newErrors.phoneNumber = "Phone number must be 10 digits with +91";
    }  else if(!validphnumber.test(phoneNumber)){
      newErrors.phoneNumber = "Enter the proper phone number with +91";
    }
    if (!intrest) {
      newErrors.intrest = "Interest Rate is required";
    }
    if (!penalty) {
      newErrors.penalty = "Penalty is required";
    }
    else if(penalty < 0){
      newErrors.penalty = "Enter valid penalty amount ";
    }
    else if(!validpenalty.test(penalty)){
      newErrors.income = "Enter the proper Penalty Amount";
    }
    if (!Repayment ) {
      newErrors.Repayment = "Repayment is required";
    }
    else  if(Repayment<2 || Repayment>24){
      newErrors.Repayment= 'time period should be in 2 - 24 months';
    }
    if (!bankDetails) {
      newErrors.bankDetails = "Bank details are required within 500KB";
    }else if(!validbankdetails.test(bankDetails)){
      newErrors.bankDetails = "Upload the proper document in .pdf , .docx format";
    } else if(bankdetailssize > 500){
      newErrors.bankDetails = "document size should be within 500KB";
    }
    if (!SecurityAgreement) {
      newErrors.SecurityAgreement = "Security Agreement is required  within 500KB";
    }else if(!validbankdetails.test(SecurityAgreement)){
      newErrors.SecurityAgreement = "Upload the proper document in .pdf , .docx format";
    }else if(SecurityAgreementsize > 500){
      newErrors.SecurityAgreement = "document size should be within 500KB";
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
      newErrors.password = 'Enter Strong Password with one Uppercase , one Lowercase , one digit';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }



    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      
      const formData = {
        name:name,
        email:email,
        phoneNumber:phoneNumber,
        intrest:intrest,
        penalty:penalty,
        Repayment:Repayment,
        bankDetails:bankDetails,
        SecurityAgreement:SecurityAgreement,
        password:password,
      };

      console.log(formData);
      
      axios.post('http://localhost:5000/lenderregister', formData)
      .then((res) => {
        if(res.status == 201){
          setregisterpage(false);
        }
        else if(res.status == 200){
          alert("The Account is Already Present with same Email id");
          setregisterpage(false);
        }
        else{
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
        email:email,
        otp:otp
       }  

      axios.post("http://localhost:5000/checklendersignupotp",otpdata)
    .then((res)=>{
      if(res.status==200){
         setOtpverified(true);
         alert("Your Account Registered Successfully");
         window.location.href = '/llogin';
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
    }
  };

  const ResendOtpSubmit = (e) => {
    e.preventDefault();
      
      const otpdata = {
        email:email,
        otp:otp
       }  

      axios.post("http://localhost:5000/resendlendersignupotp",otpdata)
    .then((res)=>{
      if(res.status==200){
         alert("Otp resend to your email kindly check that");
      }
    })
    .catch((err)=>{
      console.log('err', err);
      alert("Error Occured while Resending Otp");
    })
    
  };


  return (
    <div className="md:flex overflow-y-scroll md:flex-col lg:flex-row h-screen w-full lg:overflow-y-hidden items-center bg-gray-100">
      <div className="hidden lg:block w-full lg:w-1/2 h-full min-h-screen sticky left-0">
        <img src={login} alt="" className="brightness-75 w-full h-screen object-cover" />
      </div>
      {registerpage ?
      <div className="flex flex-col items-center justify-center lg:items-start min-h-screen overflow-y-scroll w-full lg:w-1/2 px-6 py-12  lg:px-8">
      <div class="sm:mx-auto mb-4 sm:w-full sm:max-w-sm ">
        <img class="mx-auto h-10 w-auto" src={hero} alt="Your Company" />
        <h2 class="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Signup for Lender Account</h2>
      </div>
      <form className="w-full flex items-center justify-center flex-col" onSubmit={handleSubmit}>
        <div className="md:grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">Full Name <span className='text-red-600'>*</span></label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => {
                const charCode = e.which ? e.which : e.keyCode;
                const char = String.fromCharCode(charCode);
                const regex = /^[a-zA-Z0-9\s\/\-\.,&]+$/; 
                const previousChar = e.target.value.slice(-1);
                if (!regex.test(char) || (char === '/' && previousChar === '/') || (char === '-' && previousChar === '-') || (char === '.' && previousChar === '.') || (char === ',' && previousChar === ',') || (char === '&' && previousChar === '&') || (char === ' ' && previousChar === ' ')) {
                  e.preventDefault();
                }
              }}
              className={`mt-1 block w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 h-7 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className=" text-red-500 text-xs mt-1">{errors.name}</p>}
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
              className={`mt-1 block w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 h-7 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className=" text-red-500 text-xs mt-1">{errors.email}</p>}
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
            {errors.phoneNumber && <p className=" text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>
          <div>
            <label htmlFor="intrest" className="block text-sm font-medium leading-5 text-gray-700">Interest Rate <span className='text-red-600'>*</span></label>
            <select
              id="intrest"
              name="intrest"
              value={intrest}
              onChange={(e) => setintrest(e.target.value)}
              className={`mt-1 block w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 h-7 sm:text-sm ${errors.intrest ? 'border-red-500' : ''}`}
            >
              <option value="">Select Interest Rate</option>
              <option value="2">2%</option>
              <option value="5">5%</option>
              <option value="7">7%</option>
            </select>
            {errors.intrest && <p className=" text-red-500 text-xs mt-1">{errors.intrest}</p>}
          </div>
          <div>
  <label htmlFor="penalty" className="block text-sm font-medium leading-5 text-gray-700">Penalty Amount (within 5000)<span className='text-red-600'>*</span></label>
  <input
    id="penalty"
    name="penalty"
    type="number"
    value={penalty}
    onChange={(e) => {
      const { value } = e.target;
      if (value > 0 && value <= 5000) {
        setpenalty(value);
      }
    }}
    onKeyPress={(e) => {
      const charCode = e.which ? e.which : e.keyCode;
      const char = String.fromCharCode(charCode);
      const regex = /^[0-9]+$/;
      if (!regex.test(char)) {
        e.preventDefault();
      }
    }}
    className={`mt-1 block w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 h-7 sm:text-sm ${errors.penalty ? 'border-red-500' : ''}`}
  />
  {errors.penalty && <p className=" text-red-500 text-xs mt-1">{errors.penalty}</p>}
</div>
          <div>
            <label htmlFor="Repayment" className="block text-sm font-medium leading-5 text-gray-700">Repayment Schedule (in months)<span className='text-red-600'>*</span></label>
            <input
              id="Repayment"
              name="Repayment"
              type="number"
              value={Repayment}
              onChange={(e) => {
                const { value } = e.target;
                  if(value >= 0 && value <= 24){
                    setRepayment(value);
                  }
              }}
              onKeyPress={(e) => {
                const charCode = e.which ? e.which : e.keyCode;
                const char = String.fromCharCode(charCode);
                const regex = /^[0-9]+$/;
                if (!regex.test(char)) {
                  e.preventDefault();
                }
              }}
              className={`mt-1 block w-full lg:w-60 md:w-52 rounded-md h-7 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 sm:text-sm ${errors.Repayment ? 'border-red-500' : ''}`}
            />
            {errors.Repayment && <p className=" text-red-500 text-xs mt-1">{errors.Repayment}</p>}
          </div>
          <div>
            <label class="w-60 flex my-5 md:my-0 flex-col items-center px-4 py-2 hover:bg-white  rounded-lg border border-indigo-500 cursor-pointer bg-indigo-500 text-white hover:text-black transition-colors">
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
                  var size =e.target.files[0].size;
                  setBankDetails(e.target.value);
                  setbankdetailssize(Math.round(size / 1024) );}}
                className={`mt-1  hidden w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 min-h-7 sm:text-sm ${errors.bankDetails ? 'border-red-500' : ''}`} />
            </label>
            {errors.bankDetails && <p className=" text-red-500 text-xs mt-1">{errors.bankDetails}</p>}
          </div>
          <div>
            <label class="w-60 flex my-5 md:my-0 flex-col items-center px-4 py-2 hover:bg-white  rounded-lg border border-indigo-500 cursor-pointer bg-indigo-500 text-white hover:text-black transition-colors">
              <svg class=" h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="mt-2">Upload Security Agreement</span>
              <input
                type='file'
                id="SecurityAgreement"
                name="SecurityAgreement"
                accept=".pdf"
                onChange={(e) => {
                  var size =e.target.files[0].size;
                  setSecurityAgreement(e.target.value);
                  setSecurityAgreementsize(Math.round(size / 1024) );}}
                className={`mt-1  hidden w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 min-h-7 sm:text-sm ${errors.SecurityAgreement ? 'border-red-500' : ''}`} />
            </label>
            {errors.SecurityAgreement && <p className=" text-red-500 text-xs mt-1">{errors.SecurityAgreement}</p>}
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
              className={`mt-1 block w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 h-7 sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className=" text-red-500 text-xs mt-1">{errors.password}</p>}
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
              className={`mt-1 block w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 h-7 sm:text-sm ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            {errors.confirmPassword && <p className=" text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>
        <div className='flex items-center mt-5 justify-center'>
          <button type="submit" className="w-full lg:w-60 md:w-52 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Account</button>
        </div>
        <p class="mt-3 text-center text-sm text-gray-500">
        By creating an account you agree to our Terms of Service and Privacy Policy. <br /> Already Have Account?
          <a href="/llogin" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login</a>
        </p>
      </form>
    </div> : <div className="flex flex-col items-center justify-center  min-h-screen overflow-y-scroll w-full lg:w-1/2 px-6 py-12  lg:px-8">
 <h1 className='text-center text-xl pb-10'>We've send otp to <br /> {email}</h1>
          <form onSubmit={OtpSubmit} className="w-60 ">
            <label htmlFor="otp" className='text-md text-gray-700 font-medium'>Enter OTP</label>
            <input
              id="otp"
              name="otp"
              type="text"
              onChange={(e) => setOtp(e.target.value)}
              onKeyPress={(e) => {
                const regex = /^[0-9\b]+$/;
                if (!regex.test(e.key)) {
                  e.preventDefault();
                }
              }}
              maxLength={4}
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
