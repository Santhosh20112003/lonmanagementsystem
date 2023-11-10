import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "./Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MonthlyDue, TotalAmount } from "../calculate";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    type: "",
    Repayment: "",
  });
  const [details] = useContext(Context);
  
  const [errors, setErrors] = useState({});
  const [calculated, setCalculated] = useState({
    Repayment: 0,
    type: "",
    interest: 0.0,
    monthlyDue: 0,
    totalDue: 0,
  });

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
   
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (formData.amount <= 0 || formData.amount > 5000000) {
      newErrors.amount = "Amount must be a number between 0 and 5000000";
    }

    if (!formData.type) {
      newErrors.type = "Loan Type is required";
    }

    if (!formData.Repayment) {
      newErrors.Repayment = "Repayment is required";
    } else if (formData.Repayment <= 0 || formData.Repayment > 10) {
      newErrors.Repayment = "Repayment must be a number between 0 and 10";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    if (validateForm()) {
      const { amount, type, Repayment } = formData;
      const amountInt = parseInt(amount);
      const RepaymentInt = parseInt(Repayment);
      let interestRate = 0;

      if (type === "gold") {
        interestRate = 0.07;
      } else if (type === "personal") {
        interestRate = 0.05;
      } else if (type === "assert") {
        interestRate = 0.02;
      }

      const totalAmount = TotalAmount(amountInt,RepaymentInt,interestRate);
      const monthlyDue =  MonthlyDue(amountInt,RepaymentInt,interestRate); 
      
      interestRate = parseInt(interestRate*100);
      setCalculated({
        Repayment: RepaymentInt,
        type: type,
        interest: interestRate,
        monthlyDue: monthlyDue.toFixed(2),
        totalDue: totalAmount.toFixed(2),
      });
    }
  };

  const handleRequestLoan = () => {
    if (validateForm()) {
      const check = window.confirm("Are you sure you want to Request Loan?");
      if (check) {
        calculate();  
        const data = {
          total: calculated.totalDue,
          interest: calculated.interest,
          type: calculated.type,
          Repayment: calculated.Repayment,
          borrower: details.name,
          borroweremail: details.email,
          proof: details.bankdetails,
          amount:formData.amount
        };
        console.log(data)
        axios
          .post("http://localhost:5000/loanrequest", data)
          .then((res) => {
            if (res.status === 201) {
              alert("Loan Requested Successfully. Check your Mail");
              setFormData({ amount: "", type: "", Repayment: "" });
              setShowModal(false);
            }
          })
          .catch((err) => {
            alert("Error on Sending Data From Frontend to Backend");
            console.error(err);
          });
      } else {
        calculate();
      }
    }
  };

  return (
    <>
      <button
        className="px-3 py-2 active:scale-110 transition-transform rounded shadow-lg bg-indigo-500 text-white"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Request New Loan
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden backdrop-blur-md overflow-y-auto">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg relative flex flex-col">
              <div className="flex items-center justify-between p-5 rounded-t">
                <h3 className="text-2xl font-semibold">Request Loan</h3>
                <FontAwesomeIcon
                  icon="times"
                  className="text-slate-500 text-2xl opacity-70 cursor-pointer"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="px-6 py-3 flex-auto">
                <form>
                  <div className="mb-4">
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={`mt-1 block w-full lg:w-60 md:w-52 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3 sm:text-sm ${
                        errors.type ? "border-red-500" : ""
                      }`}
                    >
                      <option hidden value="">
                        Loan Type
                      </option>
                      <option value="gold">Gold Loan</option>
                      <option value="personal">Personal Loan</option>
                      <option value="assert">Assert Loan</option>
                    </select>
                    {errors.type && (
                      <p className="text-red-500 text-xs mt-1 text-start ms-2">
                        {errors.type}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <input
                      name="amount"
                      value={formData.amount}
                      type="number"
                      placeholder="Loan Amount"
                      onChange={(e) => {
                        const { value } = e.target;
                        if (value >= 0 && value <= 1000000) {
                          handleChange(e);
                        }
                      }}
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (
                          (charCode > 31 && (charCode < 48 || charCode > 57)) ||
                          charCode === 46
                        ) {
                          e.preventDefault();
                        }
                      }}
                      className={`mt-1 block w-full lg:w-60 py-2 px-3 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border ${
                        errors.amount ? "border-red-500" : ""
                      }`}
                    />
                    {errors.amount && (
                      <p className="text-red-500 text-xs mt-1 text-start ms-2">
                        {errors.amount}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <input
                      name="Repayment"
                      value={formData.Repayment}
                      type="number"
                      placeholder="Repayment Timeperiod (In Years)"
                      onChange={(e) => {
                        const { value } = e.target;
                        if (value >= 0 && value <= 10) {
                          handleChange(e);
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
                      className={`mt-1 block w-full lg-w-60 py-2 px-3 md:w-52 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border ${
                        errors.Repayment ? "border-red-500" : ""
                      }`}
                    />
                    {errors.Repayment && (
                      <p className="text-red-500 text-xs mt-1 text-start ms-2">
                        {errors.Repayment}
                      </p>
                    )}
                  </div>

                  {calculated.monthlyDue > 0 && 
                    <div className="w-full text-xl text-start ms-2 my-4 ">
                      <p className="mb-2">Monthly Due: ₹{calculated.monthlyDue}</p>
                      <p className="mb-2">Total Due: ₹{calculated.totalDue}</p>
                      <span>
                      Documents : Uploaded <FontAwesomeIcon icon="fas fa-circle-check" className="text-green-600 text-sm  "/>
                      </span>
                    </div>
                  }

                  <div className="flex items-center w-full justify-evenly py-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={calculate}
                    >
                      Calculate
                    </button>
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleRequestLoan}
                    >
                      Request Loan
                    </button>
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
