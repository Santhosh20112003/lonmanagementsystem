import React, { useEffect, useState } from "react";
import { Context } from "./Dashboard";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Payment(props) {
  const regex = /^(?!.*--)(?![a-zA-Z])[0-9]{1,4}$/;
  const [showModal, setshowModal] = useState(false);
  const [details, setDetails] = React.useContext(Context);
  const [amount, setAmount] = useState(props.paymentamount);
  const [errors, setErrors] = useState({});
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  
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
  },[]);

  const setdetailandclose = () =>{
    setAmount(props.paymentamount);
    setshowModal(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    let newErrors = {};

    if (!amount) {
      newErrors.amount = "Amount is required";
    }else if (amount <= 0 || amount > props.details.amount) {
      newErrors.amount = `Amount must be between 0 and ${props.details.amount}`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
		const userConfirmed = window.confirm(
			"Are you sure you want to pay?"
		  );
      if(userConfirmed){
		const formData = {
			loanid: props.details.loanid,
			borroweremail: details.email,
			amount: props.details.amount-amount,
      paid:amount
		  };
		  axios
			.post("http://localhost:5000/loanrepayment", formData)
			.then((res) => {
			  if (res.status === 200) {
				setAmount("");
        window.location.href = "https://cosmofeed.com/vp/652a34f2de6af5001d43a039";
				setdetailandclose(false);
			  }
			})
			.catch((err) => {
			  toast.error('Error on Sending Data From Frontend to Backend', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
			  console.log(err);
			});
	  }
	  else{
		
	  }
    }
  };

  return (
    <>
      <button
        className="bg-indigo-500 px-4 py-2 active:scale-110 transition-all shadow-lg text-white rounded-md"
        type="button"
        onClick={() => setshowModal(true)}
      >
        Pay
      </button>
      {showModal ? (
        <>
          <div className="justify-center dropdown items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-md">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex flex-col items-start justify-between p-5 rounded-t">
                  <h3 className="text-2xl font-semibold">Loan Repayment</h3>
                  <p className="text-xl">To Pay ₹{props.paymentamount}</p>
                </div>
                <div className="relative px-6 py-3 flex-auto">
                  <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mb-4 flex items-start flex-col">
                      <input
                        id="amount"
                        name="amount"
                        value={amount}
                        type="number"
                        placeholder="Loan Amount"
                        onChange={(e) => {
                          const { value } = e.target;
                        if (value >= 0 && value <= props.details.amount) {
                          setAmount(value);
                        }
                        }}
                        onKeyPress={(e) => {
                          const charCode = e.which ? e.which : e.keyCode;
                          const char = String.fromCharCode(charCode);
                          const value = e.target.value + char;
                          if (!/^\d+$/.test(char)) {
                            e.preventDefault();
                          }
                        }}
                        className={`mt-1 block w-full lg:w-60 py-2 px-3 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ps-2 sm:text-sm border  ${
                          errors.amount ? "border-red-500" : ""
                        }`}
                      />
                      {errors.amount && (
                        <p className="text-red-500 text-xs mt-1 text-center">
                          {errors.amount}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-end px-6 pt-6  rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {

                          const userConfirmed = window.confirm(
                            "Are you sure you want to close the form without submitting?"
                          );
                          if (userConfirmed) {
                            setdetailandclose(false);
                          }
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                        onClick={() => setConfirmSubmit(true)}
                      >
                        Pay
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <ToastContainer />
    </>
  );
}