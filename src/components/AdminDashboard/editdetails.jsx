import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Edit({ details }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(details.name);
  const [email, setEmail] = useState(details.email);
  const [phoneNumber, setPhoneNumber] = useState(details.phonenumber);
  const [employment, setEmployment] = useState(details.employment);
  const [income, setIncome] = useState(details.income);
  const [address, setAddress] = useState(details.address);
  const [bankDetails, setBankDetails] = useState(details.bankdetails);
  const [purpose, setPurpose] = useState(details.purpose);
  const [emailVerified, setEmailVerified] = useState(details.emailverified);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setDetailsAndClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const setDetailsAndClose = () => {
    setName(details.name);
    setEmail(details.email);
    setPhoneNumber(details.phonenumber);
    setEmployment(details.employment);
    setIncome(details.income);
    setAddress(details.address);
    setBankDetails(details.bankdetails);
    setPurpose(details.purpose);
    setEmailVerified(details.emailVerified);
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!name) {
      validationErrors.name = "Name is required";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!phoneNumber) {
      validationErrors.phoneNumber = "Phone number is required";
    }
    if (!employment) {
      validationErrors.employment = "Please select employment status";
    }
    if (!income) {
      validationErrors.income = "Income is required";
    }
    if (!address) {
      validationErrors.address = "Address is required";
    }
    if (!purpose) {
      validationErrors.purpose = "Purpose is required";
    }
    if (!emailVerified) {
      validationErrors.emailVerified = "Please select if email is verified";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      const consent = window.confirm("Are you Sure want to Update Borrower Details ?");
      if(consent){axios.post("http://localhost:5000/updategeneralborrowerdetails",{
        id:details.id,
        name:name,
        email:email,
        phonenumber:phoneNumber,
        employment:employment,
        income:income,
        address:address,
        bankdetails:bankDetails,
        emailverified:emailVerified})
	  .then((res)=>{
         if(res.status==200){
			alert("Details Updated");
		 }
	  })
	  .catch((err)=>{
		    console.log(err);
			alert("Update Failed");
	  })}
    
      
    }
  };

  return (
    <>
      <FontAwesomeIcon
        icon={"fas fa-pen"}
        title="Edit"
        onClick={() => {
          setShowModal(true);
        }}
        className="text-indigo-500 active:scale-110 transition-transform active:text-indigo-400"
      />
      {showModal && (
        <div className="justify-center dropdown items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-md">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex w-full items-center justify-between p-5  rounded-t">
                <h3 className="text-2xl font-semibold">Edit Borrower Details</h3>
                <FontAwesomeIcon
                  onClick={() => {
                    setDetailsAndClose();
                  }}
                  icon="fas fa-xmark"
                  className="text-lg text-slate-500"
                />
              </div>
              <div className="relative px-6 py-3 flex-auto">
                <form onSubmit={handleSubmit} className="flex gap-5 flex-wrap justify-center">
                  <div className="text-start">
                    {/* Name */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        className={`${
                          errors.name ? 'border-red-500' : 'border'
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    {/* Email */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`${
                          errors.email ? 'border-red-500' : 'border'
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    {/* Phone Number */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        className={`${
                          errors.phoneNumber ? 'border-red-500' : 'border'
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                    {/* Employment */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Employment
                      </label>
                      <select
                        className={`${
                          errors.employment ? 'border-red-500' : 'border'
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={employment}
                        onChange={(e) => setEmployment(e.target.value)}
                      >
                        <option value="">Select an option</option>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                      </select>
                      {errors.employment && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.employment}
                        </p>
                      )}
                    </div>
                    {/* Income */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Income
                      </label>
                      <input
                        type="number"
                        className={`${
                          errors.income ? 'border-red-500' : 'border'
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                      />
                      {errors.income && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.income}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-start w-40">
                    
                    {/* Address */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        className={`${
                          errors.address ? 'border-red-500' : 'border'
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.address}
                        </p>
                      )}
                    </div>
                    {/* Bank Details */}
                   <div className="mb-4">
                   <label className="block text-gray-700 text-sm font-bold mb-2">
                        Bank Details
                      </label>
                <label class=" flex flex-col my-4 md:my-0 lg:my-0 items-center px-4 py-1.5 hover:bg-white  rounded-lg border border-indigo-500 cursor-pointer bg-indigo-500 hover:text-black text-white transition-colors">
                  <span className="flex items-center justify-evenly w-full">
                  <svg class=" h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <p className="mt-1">Upload details</p>
                  </span>
                  <input
                    type='file'
                    id="bankDetails"
                    name="bankDetails"
                    accept=".pdf"
                    onChange={(e) => {
                      var file = e.target.files[0];
                      setBankDetails(file.name);}}
                    className={`mt-1  hidden  w-full lg:w-60 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 min-h-7 sm:text-sm ${errors.bankDetails ? 'border-red-500' : ''}`}
                  />
                </label>
                {errors.bankDetails && <p className="text-red-500 text-xs mt-1 w-60">{errors.bankDetails}</p>}
              </div>
                    {/* Purpose */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Purpose
                      </label>
                      <input
                        type="text"
                        className={`${
                          errors.purpose ? 'border-red-500' : 'border'
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                      />
                      {errors.purpose && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.purpose}
                        </p>
                      )}
                    </div>
                    {/* Email Verified */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email Verified
                      </label>
                      <select
                        className={`${
                          errors.emailVerified ? 'border-red-500' : 'border'
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={emailVerified}
                        onChange={(e) => setEmailVerified(e.target.value)}
                      >
                        <option value="">Select an option</option>
                        <option value="true">Verified</option>
                        <option value="false">Not Verified</option>
                      </select>
                      {errors.emailVerified && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.emailVerified}
                        </p>
                      )}
                    </div>
                    {/* Submit Button */}
                    <div className=" ">
                      <button
                        type="submit"
                        className="bg-indigo-500 right-0 -bottom-6 relative w-full text-white p-2 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
