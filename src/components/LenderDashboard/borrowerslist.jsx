import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Edit from './editdetails';


function Loans() {
  const [loanDetails, setLoanDetails] = useState([]);

  

  useEffect(() => {
      axios.get('http://localhost:5000/getborrowerslist')
        .then((response) => {
          const newData = response.data.map((object) => ({
      id:object.id,
			name:object.name,
			email:object.email,
			phonenumber:object.phonenumber,
			employment:object.employment,
			income:object.income,
			address:object.address,
			bankdetails:object.bankdetails,
			purpose:object.purpose,
			emailverified:object.emailverified
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
        <h1 className="text-2xl ms-3 font-medium "> Borrowers Details </h1>
      </div>
      <div className="flex lg:w-11/12 w-full lg:p-0 px-3 h-[90vh] flex-col">
        <table className="divide-y mt-6 divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
                employment
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                income
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                address
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                bank details
              </th>
              <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                purpose
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
                 <td className="px-3 py-4 font-bold text-start text-sm  whitespace-nowrap">{loan.name}</td>
                 <td className="px-3 py-4 text-start text-sm  whitespace-nowrap">{loan.email}</td>
				 <td className="px-3 py-4 text-start text-sm  whitespace-nowrap">+{loan.phonenumber}</td>
                <td className="px-3 py-4 text-center text-sm text-gray-500 whitespace-nowrap">{loan.employment}</td>
                <td className="px-3 py-4 text-center text-sm text-gray-500 whitespace-nowrap">{loan.income}</td>
                <td className="px-3 py-4 text-center text-sm text-gray-500 whitespace-nowrap">{loan.address.slice(0, 10)}...</td>
                <td className="px-6 py-4 text-center font-bold text-sm whitespace-nowrap ">
    			<a href={loan.bankdetails} target="_blank" rel="noopener noreferrer" className="inline-flex px-2 text-xs font-semibold leading-5 text-indigo-800 bg-indigo-100 rounded-full">
   				 View
  				</a>
				</td>
                <td className="px-3 py-4 capitalize text-center text-sm text-black whitespace-nowrap">{loan.purpose}</td>
                <td className="px-3 py-4 text-center text-sm text-black whitespace-nowrap">{loan.emailverified ? <FontAwesomeIcon icon="fas fa-envelope-circle-check" title='verified' className='text-green-600' /> : <FontAwesomeIcon icon='fas fa-envelope' title='Not verified' className='text-yellow-600' />}</td>
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
