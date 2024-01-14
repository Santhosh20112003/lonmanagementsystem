import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from './Dashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Loans() {
  const [loanDetails, setLoanDetails] = useState([]);
  const [details, setDetails] = useContext(Context);

  useEffect(() => {
      axios.post('http://localhost:5000/borrowerrequestedloans', {
          email: details.email,
        })
        .then((response) => {
          const newData = response.data.map((object) => ({
            loanid: object.loanid,
            total:object.totalamount,
            amount: object.amount,
            borrowername: object.borrower,
            interest: object.pintrest,
            penalty: object.ppenalty,
            status: "pending",
            borroweremail: object.borroweremail,
            type:object.type,
            duration:object.repayment
          }));
          
          setLoanDetails(newData);
        })
        .catch((err) => {
          console.log('Error fetching loan details:', err);
        });
    
  },[]);

  const CancelRequest = (index) => {
	const loan = loanDetails[index];
  
	const confirmCancel = window.confirm("Are you sure you want to cancel this loan?");
  
	if (confirmCancel) {
	  axios
		.post('http://localhost:5000/cancelloan', { loanid: loan.loanid ,email: loan.borroweremail,amount:loan.amount,name:loan.borrowername})
		.then((res) => {
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
		.catch((err) => {
		  console.log(err);
		  if (err.response.status == 401) {
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
		  } else {
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
    <div className="flex flex-col  h-[90vh] overflow-scroll items-center w-full">
      <div className='flex lg:w-4/5 w-full  pt-5 justify-between items-center'>
        <h1 className="text-2xl ms-3 font-medium "> Requested Loans </h1>
      </div>
      <div className="flex lg:w-4/5 w-full lg:p-0 px-3 text-center h-[90vh] flex-col">
        <table className="divide-y mt-6 divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase">
                Borrower
              </th>
              
              <th scope="col" className="px-3 text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase">
                Status
              </th>
              <th scope="col" className="px-3 text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase">
                Intrest
              </th>
              <th scope="col" className="px-3 text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase">
                Type
              </th>
              <th scope="col" className="px-3 text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase">
                Duration
              </th>
              <th scope="col" className="px-3 text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase">
                Amount
              </th>
              <th scope="col" className="px-3 text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase">
                Total
              </th>
              <th scope="col" className="px-3 text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase">
                
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loanDetails.length <= 0 ? (<tr>
        <td colSpan="8" className='text-center py-4'>No Loans Are Requested</td>
      </tr>): loanDetails.map((loan,index) => (
              <tr key={loan.id} className="transition-all hover:bg-gray-100 hover:shadow-lg">
                <td className="px-3 text-start py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full">
                      <p className="text-xl">{loan.borrowername.charAt(0)}</p>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{loan.borrowername} (Me)</div>
                      <div className="text-sm text-gray-500">{loan.borroweremail}</div>
                    </div>
                  </div>
                </td>
               
                <td className="px-3 text-center py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 text-xs font-semibold leading-5 ${loan.status === 'approved' ? 'text-green-800 bg-green-100' : 'text-pink-800 bg-pink-100'} rounded-full`}>
                    {loan.status}
                  </span>
                </td>
                <td className="px-3 text-center py-4 text-sm text-gray-500 whitespace-nowrap">( {loan.interest}% )yr</td>
                <td className="px-3 text-center capitalize py-4 text-sm text-gray-500 whitespace-nowrap">{loan.type}</td>
                <td className="px-3 text-center capitalize py-4 text-sm text-gray-500 whitespace-nowrap">{loan.duration}yrs</td>
                <td className="px-3 text-center py-4 font-bold text-sm text-black whitespace-nowrap">₹{loan.amount}</td>
                <td className="px-3 text-center py-4 font-bold text-sm text-black whitespace-nowrap">₹{loan.total}</td>
                <td className="px-3 text-center cursor-pointer py-4 text-sm text-indigo-500 underline whitespace-nowrap"><button onClick={() => CancelRequest(index)} className="bg-red-500 rounded shadow-lg py-2 px-3 text-center active:scale-110 transition-transform  text-white">Cancel</button></td>
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
