import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from './Dashboard';
import Modal from './addloan';
import Payment from './payment';
import { MonthlyDue } from '../calculate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Loans() {
  const [loanDetails, setLoanDetails] = useState([]);
  const [details, setDetails] = useContext(Context);

  useEffect(() => {
      axios.post('http://localhost:5000/getloansbyborrower', {
          email: details.email,
        })
        .then((response) => {
          const newData = response.data.map((object) => ({
            loanid: object.loanid,
            amount: object.amount,
            lender: object.lender,
            borrower: object.borrower,
            interest: object.intrest,
            timeperiod: object.timeperiod,
            penalty: object.penalty,
            status: object.status,
            lendername: object.lendername,
            borrowername: object.borrowername,
            type:object.type,
            pamount:object.principalamount,
            total:object.totalamount
          }));
          setLoanDetails(newData);
        })
        .catch((err) => {
          console.log('Error fetching loan details:', err);
        });
    
  },[]);

  return (
    <div className="flex flex-col  h-[90vh] overflow-scroll items-center w-full">
      <div className='flex lg:w-4/5 w-full  pt-5 justify-between items-center'>
        <h1 className="text-2xl ms-3 font-medium "> Active Loans </h1>
        <button><Modal/></button>
      </div>
      <div className="flex lg:w-[95%] w-full lg:p-0  h-[90vh] flex-col">
        <table className="divide-y mt-6 divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Borrower
              </th>
              <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Lender
              </th>
              <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Amount
              </th>
              <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Intrest
              </th>
              <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Duration
              </th>
              <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
               Type
              </th>
              <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Balance
              </th>
              <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Overall&nbsp;Due
              </th>
              <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Monthly&nbsp;EMI
              </th>
              <th scope="col" className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {loanDetails.length <= 0 ? (<tr>
        <td colSpan="10" className='text-center py-4'>No Active Loans</td>
      </tr>): loanDetails.map((loan,index) => (
              <tr key={loan.loanid} className="transition-all hover:bg-gray-100 hover:shadow-lg">
                <td className="px-2 py-4 text-start whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full">
                      <p className="text-xl mt-1">{loan.borrowername.charAt(0)}</p>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{loan.borrowername} (Me)</div>
                      <div className="text-sm text-gray-500">{loan.borrower}</div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-4 text-start whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-pink-400 rounded-full">
                      <p className="text-xl mt-1">{loan.lendername.charAt(0)}</p>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{loan.lendername}</div>
                      <div className="text-sm text-gray-500">{loan.lender}</div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-4 text-center font-bold text-sm text-black whitespace-nowrap">₹{loan.pamount}</td>
                <td className="px-2 py-4 text-center text-sm  text-gray-500 whitespace-nowrap">( {loan.interest}% )yr</td>
                <td className="px-2 py-4 text-center text-sm text-gray-500 whitespace-nowrap">{loan.timeperiod}yrs</td>
                <td className="px-2 py-4 text-center capitalize whitespace-nowrap"><span className={`inline-flex px-2 text-xs font-semibold leading-5 ${loan.type === 'gold' ? 'text-yellow-800 bg-yellow-100' : loan.type === 'personal' ? 'text-blue-800 bg-blue-100' : 'text-pink-800 bg-pink-100'} rounded-full`}>
                 {loan.type}
                </span>
                </td>
                <td className="px-2 py-4 text-center font-bold text-sm text-black whitespace-nowrap">₹{loan.amount}</td>
                <td className="px-2 py-4 text-center font-bold text-sm text-black whitespace-nowrap">₹{loan.total}</td>
                
                <td className="px-2 py-4 text-center font-bold text-sm text-black whitespace-nowrap">₹{MonthlyDue(loan.pamount,loan.timeperiod,(loan.interest/100))}</td>
                <td className="px-2 cursor-pointer py-4 text-sm whitespace-nowrap"> <button ><Payment details={loanDetails[index]} paymentamount={MonthlyDue(loan.pamount,loan.timeperiod,(loan.interest/100))} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Loans;
