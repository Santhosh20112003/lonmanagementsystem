import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MonthlyDue, TotalAmount } from "../calculate";

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(1);
  const [loanTerm, setLoanTerm] = useState(1);
  const [monthlyPayment, setMonthlyPayment] = useState(934);
  const [totalPayment, settotalPayment] = useState(11200);

  const calculateLoan = () => {
    const principal = loanAmount;
    const rate = interestRate/100; 
    const term = loanTerm; 

    const monthlyPayment =MonthlyDue(principal,term,rate);
    const totalpayment = TotalAmount(principal,term,rate);
    settotalPayment(totalpayment);
    setMonthlyPayment(monthlyPayment);
  };

  return (
    <div className="h-[90vh]">
      <div className="w-full min-w-[350px] h-full md:overflow-y-scroll flex flex-wrap  justify-start">
      <span className="lg:w-2/5 md:w-full min-w-[350px]  flex  items-center w-full justify-center md:h-[90vh]  py-8 ">
        <div className="bg-white min-w-[300px] w-4/5 p-8 rounded shadow-lg ">
        <h1 className="text-2xl font-semibold mb-4 text-indigo-600">Simple Loan Calculator</h1>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Loan Amount ($ {loanAmount})
          </label>
          <input
            type="range"
            min="1000"
            max="1000000"
            step="1000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full accent-indigo-500  h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg "
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Interest Rate ({interestRate}%)
          </label>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full accent-indigo-500 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg "
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Loan Term ({loanTerm} years)
          </label>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full accent-indigo-500 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg "
          />
        </div>
        <p className="my-4  text-indigo-500 text-sm">*Total Payment and monthly Emi will be calculated based on the Loaners</p>
        <button
          onClick={calculateLoan}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none w-full"
        >
          Calculate
        </button>
          <div className="mt-4 flex items-center justify-between">
            <span>
            <h2 className="text-lg font-semibold text-indigo-600">Monthly EMI</h2>
            <p className="text-xl font-bold text-gray-700">₹{monthlyPayment}.00</p>
            </span>
            <span>
            <h2 className="text-lg font-semibold text-indigo-600">Total Payment</h2>
            <p className="text-xl font-bold text-gray-700">₹{totalPayment}.00</p>
            </span>
          </div>
      </div>
      </span>
       <span className="lg:w-3/5 w-full flex items-center justify-center md:justify-start lg:h-[90vh]">
      <div class="grid grid-cols-1 gap-8 w-full h-fit p-4 lg:grid-cols-2 xl:grid-cols-2">  
          <span className="lg:w-80 h-fit  min-w-[250px]  rounded-md w-full p-5 bg-yellow-200">
            <h1 className="text-yellow-700 font-bold text-xl mb-3">Gold Loan</h1>
            <p className="text-yellow-600 text-base">A loan against your gold jewellery is known as a Gold Loan or a Jewel Loan. At Loaners, a customer can quickly avail a Gold Loan of any value</p>
            <span className="flex w-full items-center justify-between mt-5">
              <p className="text-lg text-yellow-800 font-medium">Intrest: 7%</p>
              <Link to="/borrowerdashboard/loans" className="capitalize text-yellow-800 px-4 py-2 rounded-lg bg-yellow-400">Apply now</Link>
            </span>
          </span>
          <span className="lg:w-80 h-fit  min-w-[250px]  rounded-md w-full p-5 bg-indigo-200">
            <h1 className="text-indigo-700 font-bold text-xl mb-3">Personal Loan</h1>
            <p className="text-indigo-600 text-base">Personal Loan is an unsecured loan that caters to all your financial needs such as travel, home renovation, applying online courses, medical emergency or wedding. </p>
            <span className="flex w-full items-center justify-between mt-5">
              <p className="text-lg text-indigo-800 font-medium">Intrest: 5%</p>
              <Link to="/borrowerdashboard/loans" className="capitalize text-indigo-800 px-4 py-2 rounded-lg bg-indigo-400">Apply now</Link>
            </span>
          </span>
          <span className="lg:w-80 h-fit  min-w-[250px]  rounded-md w-full p-5 bg-pink-200">
            <h1 className="text-pink-700 font-bold text-xl mb-3">Assert Loan</h1>
            <p className="text-pink-600 text-base">Use your assets such as property, securities and rental income, or even your salary account and credit card to get affordable and quick loans</p>
            <span className="flex w-full items-center justify-between mt-5">
              <p className="text-lg text-pink-800 font-medium">Intrest: 2%</p>
              <Link to="/borrowerdashboard/loans" className="capitalize text-pink-800 px-4 py-2 rounded-lg bg-pink-400">Apply now</Link>
            </span>
          </span>
          <span className="lg:w-80 h-fit blur-sm hover:blur-none transition-all min-w-[250px]  rounded-md w-full p-5 bg-purple-200">
            <h1 className="text-purple-700 inline-flex items-center justify-between w-full font-bold text-xl mb-3">Education Loan    </h1>
            <p className="text-purple-600 text-base">An education loan is a sum of money borrowed to finance post-secondary education or higher education-related expenses.</p>
            <span className="flex w-full items-center justify-between mt-5">
              <p className="text-lg text-purple-800 font-medium">Intrest: 3.5%</p>
              <span className="text-sm  bg-purple-300 py-2 px-3 rounded-full">comming soon</span>
            </span>
          </span>
        </div>
      </span>
    </div>
    </div>
  );
}

export default LoanCalculator;
