import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Edit from './lendereditdetails';


function Loans() {
  const [loanDetails, setLoanDetails] = useState([]);
  useEffect(() => {
      axios.get('http://localhost:5000/getlenderslist')
        .then((response) => {
          const newData = response.data.map((object) => ({
      id:object.id,
			name:object.name,
			email:object.email,
			phonenumber:object.phonenumber,
			intrest:object.intrest,
			bankdetails:object.bankdetails,
			timeperiod:object.timeperiod,
			emailverified:object.emailverified
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
        <h1 className="text-2xl ms-3 font-medium "> Lenders Details </h1>
      </div>
      <div className="flex lg:w-11/12 w-full lg:p-0 px-3 h-[90vh] flex-col">
        <table className="divide-y mt-6 divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
			<th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Id
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                name
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                email
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                phone number
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Intrest
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Timeperiod
              </th>
              {/* <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                address
              </th> */}
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                bank details
              </th>
             
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                email verified
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {loanDetails.length <= 0 ? (<tr>
        <td colSpan="10" className='text-center py-4'>No Borrowers are there !!</td>
      </tr>): loanDetails.map((loan,index) => (
              <tr key={loan.id} className="transition-all hover:bg-gray-100 hover:shadow-lg">
				<td className="px-3 py-4  text-start text-sm  whitespace-nowrap">{index+1}</td>
                 <td className="px-3 py-4 font-bold text-start text-sm  whitespace-nowrap">{loan.name}</td>
                 <td className="px-3 py-4 text-start text-sm  whitespace-nowrap">{loan.email}</td>
				 <td className="px-3 py-4 text-start text-sm  whitespace-nowrap">+{loan.phonenumber}</td>
                <td className="px-3 py-4 text-center text-sm text-gray-500 whitespace-nowrap">{loan.intrest}%</td>
                <td className="px-3 py-4 text-center text-sm text-gray-500 whitespace-nowrap">{loan.timeperiod}yrs</td>
                {/* <td className="px-3 py-4 text-center text-sm text-gray-500 whitespace-nowrap">{loan.address.slice(0, 10)}...</td> */}
                <td className="px-6 py-4 text-center font-bold text-sm whitespace-nowrap ">
    			<a href={loan.bankdetails} target="_blank" rel="noopener noreferrer" className="inline-flex px-2 text-xs font-semibold leading-5 text-indigo-800 bg-indigo-100 rounded-full">
   				 View
  				</a>
				</td>
                <td className="px-3 py-4 text-center text-sm text-black whitespace-nowrap">{loan.emailverified == "true" ? <FontAwesomeIcon icon="fas fa-envelope-circle-check" title='verified' className='text-green-600' /> : <FontAwesomeIcon icon='fas fa-envelope' title='Not verified' className='text-yellow-600' />}</td>
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
