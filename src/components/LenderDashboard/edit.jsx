import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";

export default function Edit({ details }) {
  const [showModal, setShowModal] = useState(false);
  const [borrower, setBorrower] = useState(details.borrowername);
  const [borrowerEmail, setBorrowerEmail] = useState(details.borrower);
  const [interest, setInterest] = useState(details.interest);
  const [duration, setDuration] = useState(details.timeperiod);
  const [type, setType] = useState(details.type); 
  const [status, setStatus] = useState(details.status); 
  const [totalAmount, setTotalAmount] = useState(details.total);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setdetailsandclose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);
 
  const setdetailsandclose=()=>{
	setBorrower(details.borrowername);
	setBorrowerEmail(details.borrower);
	setInterest(details.interest);
	setDuration(details.timeperiod);
	setType(details.type);
	setStatus(details.status);
	setTotalAmount(details.total);
	const consent = window.confirm("Are you sure want to exit?");
	if(consent){
		setShowModal(false);
	}
	
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!borrower) {
      validationErrors.borrower = "Borrower name is required";
    }
    if (!borrowerEmail) {
      validationErrors.borrowerEmail = "Borrower email is required";
    }
    if (!duration) {
      validationErrors.duration = "Loan Duration is required";
    }
    if (!totalAmount) {
      validationErrors.totalAmount = "Total Loan Amount is required";
    }
    if (!type) {
      validationErrors.type = "Please select a Loan Type";
    }
    if (!interest) {
      validationErrors.interest = "Please select a Loan Interest";
    }
    if (!status) {
      validationErrors.status = "Please select a Loan Status";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
	  	
	  axios.post("http://localhost:5000/updateborrowerdetails",{
		loanid:details.loanid,
		borrower:borrower,
		borrowerEmail:borrowerEmail,
		duration:duration,
		totalAmount:totalAmount,
		type:type,
		interest:interest,
		status:status
	  })
	  .then((res)=>{
         if(res.status==200){
      toast.success('Details Updated 👍', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
		 }
	  })
	  .catch((err)=>{
		    console.log(err);
      toast.error('Update Failed', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
	  })
    }
  };

  return (
    <>
      <FontAwesomeIcon
        icon={"fas fa-pen"}
        onClick={() => {
			setShowModal(true)
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
                    setdetailsandclose();
                  }}
                  icon="fas fa-xmark"
                  className="text-lg text-slate-500"
                />
              </div>
              <div className="relative px-6 py-3 flex-auto">
                <form onSubmit={handleSubmit} className="flex gap-5 flex-wrap justify-center">
                  <div className="text-start">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Borrower
                      </label>
                      <input
                        type="text"
                        className={`${
                          errors.borrower ? 'border-red-500' : 'border'
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={borrower}
                        onChange={(e) => setBorrower(e.target.value)}
                      />
                      {errors.borrower && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.borrower}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Borrower Email
                      </label>
                      <input
                        type="email"
                        className={`${
                          errors.borrowerEmail ? 'border-red-500' : 'border'
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={borrowerEmail}
                        onChange={(e) => setBorrowerEmail(e.target.value)}
                      />
                      {errors.borrowerEmail && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.borrowerEmail}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Loan Duration
                      </label>
                      <input
                        type="number"
                        className={`${
                          errors.duration ? 'border-red-500' : 'border'
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                      {errors.duration && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.duration}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Total Loan Amount
                      </label>
                      <input
                        type="number"
                        className={`${
                          errors.totalAmount ? 'border-red-500' : 'border'
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                      />
                      {errors.totalAmount && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.totalAmount}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-start w-40">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Loan Type
                      </label>
                      <select
                        className={`${
                          errors.type ? 'border-red-500' : 'border'
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="">Select an option</option>
                        <option value="gold">Gold</option>
                        <option value="personal">Personal</option>
                        <option value="assert">Assert</option>
                      </select>
                      {errors.type && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.type}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Loan Interest
                      </label>
                      <select
                        className={`${
                          errors.interest ? 'border-red-500' : 'border'
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                      >
                        <option value="">Select an option</option>
                        <option value="7">7%</option>
                        <option value="5">5%</option>
                        <option value="2">2%</option>
                      </select>
                      {errors.interest && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.interest}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Loan Status
                      </label>
                      <select
                        className={`${
                          errors.status ? 'border-red-500' : 'border'
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">Select an option</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      {errors.status && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.status}
                        </p>
                      )}
                    </div>
                    <div className="mt-11">
                      <button
                        type="submit"
                        className="bg-indigo-500 w-full text-white p-2 rounded"
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
      <ToastContainer />
    </>
  );
}
