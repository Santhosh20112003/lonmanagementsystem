import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Profile() {
  const [details, setDetails] = useState({
    id:'',
    name: '',
    email: '',
    phonenumber: ''
  });

  useEffect(() => {
    axios.post("http://localhost:5000/admingetdetails", { token: window.localStorage.getItem("tokenadmin") })
      .then((res) => {
        const user = res.data;
        setDetails({
          id:user.id,
          name: user.name,
          email: user.email,
          phonenumber: user.phonenumber
        });

      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, []); 

  return (
    <div className='flex h-[90vh] w-full items-center flex-col justify-center'>
		<div class="flex flex-col w-full  justify-center items-center ">
            <div class="relative h-[90vh] flex flex-col items-center  w-full mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500  ">
                <div class="relative flex h-[40vh] w-full justify-center rounded-xl bg-cover" >
                    <div className="absolute bg-gradient-to-r from-indigo-500 to-pink-500   flex h-[40vh] w-full justify-center rounded-xl bg-cover"></div >
                    <div class="absolute -bottom-14 flex h-32 w-32 items-center justify-center rounded-full border-[4px] border-white bg-indigo-500">
                    <div className="w-full h-full mt-2 rounded-full flex items-center justify-center text-white text-7xl text-center leading-32 mx-auto ">
                      {details.name.charAt(0)}
                     </div>
                    </div>
                </div> 
                <div class="mt-16 flex flex-col items-center">
                <span className='inline-flex items-baseline gap-2'><h4 class="text-xl font-bold capitalize text-navy-700 ">
					{details.name}  
                    </h4></span>
                    <p class="text-base font-normal text-gray-600">{details.email}</p>
					<p class="text-base font-normal text-gray-600">+{details.phonenumber}</p>
                </div> 
                
            </div>  
        </div> 	 
    </div>
  );
}

export default Profile;