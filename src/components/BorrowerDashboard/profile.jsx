import React, { useContext, useEffect, useState } from 'react';
import Edit from "./editdetails";
import { Context } from './Dashboard';

function Profile() {
	const [details, setDetails] = useContext(Context)

  return (
    <div className='flex h-[90vh] w-full items-center flex-col justify-center'>
		<div class="flex flex-col w-full  justify-center items-center ">
            <div class="relative h-[90vh] flex flex-col items-center   w-full mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500  ">
                <div class="relative flex h-52 w-full justify-center rounded-xl bg-cover" >
                    <div className="absolute bg-gradient-to-r from-indigo-500 to-pink-500   flex h-52 w-full justify-center rounded-xl bg-cover"></div >
                    <div class="absolute -bottom-14 flex h-32 w-32 items-center justify-center rounded-full border-[4px] border-white bg-blue-500">
                    <div className="w-full h-full mt-2 rounded-full flex items-center justify-center text-white text-7xl text-center leading-32 mx-auto ">
                      {details.name.charAt(0)}
                     </div>
                    </div>
                </div> 
                <div class="mt-16 flex flex-col items-center">
                    <span className='inline-flex items-baseline gap-2'><h4 class="text-xl font-bold capitalize text-navy-700 ">
					{details.name}  
                    </h4><Edit /></span>
                    <p class="text-base font-normal text-gray-600">{details.email}</p>
					<p class="text-base font-normal text-gray-600">+{details.phonenumber}</p>
					
                </div> 
                <div class="mt-6 mb-3 flex gap-14 md:!gap-14">
                    <div class="flex flex-col items-center justify-center">
                    <p class="text-2xl font-bold text-navy-700 ">₹{details.income}</p>
                    <p class="text-sm font-normal text-gray-600">Annual Income</p>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                    <p class="text-2xl font-bold text-navy-700 ">{details.dob}</p>
                    <p class="text-sm font-normal text-gray-600">Date of Birth</p>
                    </div>
					<div class="flex flex-col items-center justify-center">
                    <p class="text-2xl font-bold text-navy-700 ">{details.purpose}</p>
                    <p class="text-sm font-normal text-gray-600">purpose for Loan</p>
                    </div>
                </div>
				<div class="mt-6 mb-3 flex gap-14 px-3 text-center">
                    <div class="flex flex-col items-center justify-center">
                    <p class="text-2xl font-bold text-navy-700 ">{details.address}</p>
                    <p class="text-sm font-normal text-gray-600">Address</p>
                    </div>
                </div>
                
				
            </div>  
        </div> 	 
    </div>
  );
}

export default Profile;