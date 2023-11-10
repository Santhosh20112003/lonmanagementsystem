import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { usePDF,Margin } from 'react-to-pdf';
import { Context } from './Dashboard';

function History() {
  const [loanDetails, setLoanDetails] = useState([]);
  const [details, setDetails] = useContext(Context);
  const { toPDF, targetRef } = usePDF({
    method: 'open',
    filename: "Borrowerhistory.pdf",
    margin: Margin.NONE,
    format: 'A4'
  });

  useEffect(() => {
      axios
        .get('http://localhost:5000/getborrowersdetails')
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
            total:object.totalamount,
            pamount:object.principalamount
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
        <h1 className="text-2xl ms-3 font-medium "> Loans History  </h1>
        <button className='px-3 py-2 rounded-md shadow-lg bg-indigo-500 text-white active:scale-110 transition-transform' onClick={toPDF}> <FontAwesomeIcon icon="fas fa-file-export" className=''></FontAwesomeIcon> Export PDF</button>
      </div>
      <div ref={targetRef} className="flex lg:w-[95%] w-full lg:p-0 px-3 h-[90vh] flex-col">
        <table className="divide-y mt-6 divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Borrower
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Lender
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
                Amount
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Paid
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Balance 
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                total
              </th>
			  
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {loanDetails.length <= 0 ? (<tr>
        <td colSpan="10" className='text-center py-4'>No Loans Are Taken</td>
      </tr>): loanDetails.map((loan) => (
              <tr key={loan.id} className="transition-all hover:bg-gray-100 hover:shadow-lg">
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex  items-center">
                    <div className=" w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full">
                      <p className="text-xl">{loan.borrowername.charAt(0)}</p>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{loan.borrowername} (Me)</div>
                      <div className="text-sm text-gray-500">{loan.borrower}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-pink-400 rounded-full">
                      <p className="text-xl">{loan.lendername.charAt(0)}</p>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{loan.lendername}</div>
                      <div className="text-sm text-gray-500">{loan.lender}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 text-xs font-semibold leading-5 ${loan.status === 'approved' ? 'text-indigo-800 bg-indigo-100' : loan.status === 'paid' ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'} rounded-full`}>
                 {loan.status}
                </span>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500  whitespace-nowrap">{loan.interest}%</td>
                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{loan.timeperiod}yrs</td>
                <td className="px-3 py-4 capitalize whitespace-nowrap"><span className={`inline-flex px-2 text-xs font-semibold leading-5 ${loan.type === 'gold' ? 'text-yellow-800 bg-yellow-100' : loan.type === 'personal' ? 'text-blue-800 bg-blue-100' : 'text-pink-800 bg-pink-100'} rounded-full`}>
                 {loan.type}
                </span>
</td>
<td className="px-3 py-4 font-bold text-sm text-black whitespace-nowrap">₹{loan.pamount}</td>
<td className="px-3 py-4 font-bold text-sm text-black whitespace-nowrap">₹{loan.total-loan.amount} </td>
                <td className="px-3 py-4 font-bold text-sm text-black whitespace-nowrap">₹{loan.amount}</td>
                <td className="px-3 py-4 font-bold text-sm text-black whitespace-nowrap">₹{loan.total} /-</td>
                
              </tr>
            ))}
			
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
