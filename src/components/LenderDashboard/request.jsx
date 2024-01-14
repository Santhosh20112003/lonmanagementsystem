import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Details } from './Dashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Loans() {
  const [loanDetails, setLoanDetails] = useState([]);
  const [details, setDetails] = useContext(Details);
  var pdf = "../asserts/documents/taskdetails.pdf";

  useEffect(() => {
    axios.get('http://localhost:5000/getloanrequest')
      .then(response => {
        const newData = response.data.map(object => ({
          loanid: object.loanid,
          amount: object.amount,
          total:object.totalamount,
          interest: object.pintrest,
          lenderemail: object.lenderemail,
          borroweremail: object.borroweremail,
          lender: object.lender,
          borrower: object.borrower,
          proof: object.proof,
          type:object.type,
          total:object.totalamount,
          duration:object.repayment
        }));
        setLoanDetails(newData);
      })
      .catch(err => {
        console.log('Error fetching loan details:', err);
        toast.error('Error fetching loan details', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      });
  }, []);

  const confirmRequest = (index) => {
    const loan = loanDetails[index];
    const confirmCancel = window.confirm("Are you sure you want to Accept this loan?");
     if(confirmCancel){
      const loanRequest = {
        loanid: loan.loanid,
        amount: loan.amount,
        lender: details.email,
        borrower: loan.borroweremail,
        interest: loan.interest,
        timeperiod: loan.duration,
        status: "approved",
        lendername: details.name,
        borrowername: loan.borrower,
        type:loan.type,
        pamount:loan.total
      };
  
      axios.post('http://localhost:5000/acceptloan', { details: loanRequest })
        .then(res => {
          if (res.status === 200) {
            toast.success('Loan Provided 👍', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
          if(err.response.status == 401){
            toast.warn('Loan Already Accepted', {
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
          else{
            toast.error('Error while accepting the loan', {
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
        });
     }
  };

  const cancelRequest = (index) => {
    const loan = loanDetails[index];
    const confirmCancel = window.confirm("Are you sure you want to Cancel this loan?");
     if(confirmCancel){
      const loanRequest = {
        loanid: loan.loanid,
        amount: loan.amount,
        lender: details.email,
        borrower: loan.borroweremail,
        interest: loan.interest,
        timeperiod: loan.duration,
        status: "rejected",
        lendername: details.name,
        borrowername: loan.borrower,
        type:loan.type,
        pamount:loan.total
      };
  
      axios.post('http://localhost:5000/acceptloan', { details: loanRequest })
        .then(res => {
          if (res.status === 200) {
            toast.success('Loan Cancelled', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
          if(err.response.status == 401){
            toast.warn('Loan Already Accepted', {
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
          else{
            toast.error('Error while accepting the loan', {
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
        });
     }
  };

  return (
    <div className="flex flex-col h-[90vh] overflow-scroll items-center w-full">
      <div className='flex lg:w-4/5 w-full pt-5 justify-between items-center'>
        <h1 className="text-2xl ms-3 font-medium ">Loan Requests</h1>
      </div>
      <div className="flex lg:w-4/5 w-full lg:p-0 px-3 h-[90vh] flex-col">
        <table className="divide-y mt-6 divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Borrower
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Interest
              </th>
              
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Documents
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Total
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {loanDetails.length <= 0 ? (<tr>
        <td colSpan="8" className='text-center py-4 '>No Loans Are Requested</td>
      </tr>): loanDetails.map((loan, index) => (
              <tr key={loan.loanid} className="transition-all hover:bg-gray-100 hover:shadow-lg">
                <td className="px-6 py-4 text-start whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full">
                      <p className="text-xl">{loan.borrower.charAt(0)}</p>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{loan.borrower}</div>
                      <div className="text-sm text-gray-500">{loan.borroweremail}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-500 whitespace-nowrap">{loan.interest}%</td>
               
                <td className="px-3 py-4 text-center whitespace-nowrap"><span className={`inline-flex px-2 text-xs font-semibold leading-5 ${loan.type === 'gold' ? 'text-yellow-800 bg-yellow-100' : loan.type === 'personal' ? 'text-blue-800 bg-blue-100' : 'text-pink-800 bg-pink-100'} rounded-full`}>
                 {loan.type}
                </span>
</td>
<td className="px-6 py-4 text-center  text-sm text-black whitespace-nowrap">{loan.duration}yrs</td>
<td className="px-6 py-4 text-center font-bold text-sm whitespace-nowrap ">
  <a href={pdf} target="_blank" rel="noopener noreferrer" className="inline-flex px-2 text-xs font-semibold leading-5 text-indigo-800 bg-indigo-100 rounded-full">
    View
  </a>
</td>
                <td className="px-6 py-4 text-center font-bold text-sm text-black whitespace-nowrap">₹{loan.amount}</td>
                <td className="px-6 py-4 text-center font-bold text-sm text-black whitespace-nowrap">₹{loan.total}</td>
               
                <td className="px-6 flex gap-5 cursor-pointer py-4 text-center text-base whitespace-nowrap">
                  <button onClick={() => confirmRequest(index)} className="bg-indigo-500 rounded shadow-lg py-2 px-3 active:scale-110 transition-transform text-center text-white">Accept</button>
                  <button onClick={() => cancelRequest(index)} className="bg-red-500 rounded shadow-lg py-2 px-3 active:scale-110 transition-transform text-center text-white">Cancel</button>
                </td>
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