import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Details } from './Dashboard';
import Edit from './edit';


function Loans() {
  const [loanDetails, setLoanDetails] = useState([]);
  const [details, setDetails] = useContext(Details);
  

  useEffect(() => {
      axios
        .post('http://localhost:5000/getloansbylender', {
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
            total:object.totalamount
          }));

          setLoanDetails(newData);
        })
        .catch((err) => {
          console.log('Error fetching loan details:', err);
        });
    
  }, );

  return (
    <div className="flex flex-col  h-[90vh] overflow-scroll items-center w-full">
      <div className='flex lg:w-4/5 w-full  pt-5 justify-between items-center'>
        <h1 className="text-2xl ms-3 font-medium "> Active Loans </h1>
      </div>
      <div className="flex lg:w-11/12 w-full lg:p-0 px-3 h-[90vh] flex-col">
        <table className="divide-y mt-6 divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Lender
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Borrower
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Status
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Intrest
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Duration
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Type
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                total
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                paid
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                balance
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {loanDetails.length <= 0 ? (<tr>
        <td colSpan="10" className='text-center py-4'>No Loans Are Taken</td>
      </tr>): loanDetails.map((loan,index) => (
              <tr key={loan.id} className="transition-all hover:bg-gray-100 hover:shadow-lg">
                <td className="px-3 py-4 text-start whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-pink-400  rounded-full">
                      <p className="text-xl">{loan.lendername.charAt(0)}</p>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{loan.lendername} (Me)</div>
                      <div className="text-sm text-gray-500">{loan.lender}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 text-start whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full">
                      <p className="text-xl">{loan.borrowername.charAt(0)}</p>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{loan.borrowername}</div>
                      <div className="text-sm text-gray-500">{loan.borrower}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 text-center whitespace-nowrap">
                  <span className={`inline-flex px-2 text-xs font-semibold leading-5 ${loan.status === 'approved' ? 'text-indigo-800 bg-indigo-100' : 'text-red-800 bg-red-100'} rounded-full`}>
                    {loan.status}
                  </span>
                </td>
                <td className="px-3 py-4 text-center text-sm text-gray-500 whitespace-nowrap">{loan.interest}%</td>
                <td className="px-3 py-4 text-center text-sm text-gray-500 whitespace-nowrap">{loan.timeperiod}yrs</td>
                <td className="px-3 py-4 text-center capitalize whitespace-nowrap"><span className={`inline-flex px-2 text-xs font-semibold leading-5 ${loan.type === 'gold' ? 'text-yellow-800 bg-yellow-100' : loan.type === 'personal' ? 'text-blue-800 bg-blue-100' : 'text-pink-800 bg-pink-100'} rounded-full`}>
                 {loan.type}
                </span>
                </td>
                <td className="px-3 py-4 text-center font-bold text-sm text-black whitespace-nowrap">₹{loan.total}</td>
                <td className="px-3 py-4 text-center font-bold text-sm text-black whitespace-nowrap">₹{loan.total-loan.amount}</td>
                <td className="px-3 py-4 text-center font-bold text-sm text-black whitespace-nowrap">₹{loan.amount}</td>
                <td className="px-3 py-4 text-center text-sm text-black whitespace-nowrap"><Edit details={loanDetails[index]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Loans;
