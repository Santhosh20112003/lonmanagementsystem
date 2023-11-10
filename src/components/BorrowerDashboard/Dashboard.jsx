import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './header';
import FreeCard from './profilecard';
export const Context = React.createContext();

function Dashboard() {
  const [auth, setAuth] = useState(false);
  var userid;
  const links = [
    { name: "Home", link: "home" },
    { name: "Loan Details", link: "loandetails" },
    { name: "Active Loans", link: "loans" },
    { name: "Requested Loans", link: "requests" },
    { name: "Loan History", link: "payments" },
  ];
  const location = useLocation();
  const [details, setDetails] = useState({
    id:null,
    name: '<Name>',
    email: 'your****@gmail.com',
    phonenumber: '78******90',
    employment: 'Full Time',
    income: '90,000',
    address: '123 Main Street,Anytown,California,12345',
    bankdetails: '',
    purpose: ' Business ',
    amount: '12***',
    aadharnumber:'',
    dob:''
  });

  useEffect(() => {
    const checkAuth = () => {
      axios.get("http://localhost:5000/checkauth", {
        headers: { "access-token": localStorage.getItem("tokenborrower") },
      }).then(response => {
        if (response.status === 200) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      }).catch(err => {
        console.log('error', err)
      }
      );

    };




    const det = () => {
      axios.post("http://localhost:5000/borrowergetdetails", { token: window.localStorage.getItem("tokenborrower") })
        .then((res) => {
          const user = res.data;
          userid = user.id;
          setDetails({
            id:user.id,
            name: user.name,
            email: user.email,
            phonenumber: user.phonenumber,
            employment: user.employment,
            income: user.income,
            address: user.address,
            bankdetails: user.bankdetails,
            purpose: user.purpose,
            amount: user.amount,
            bankdetails:user.bankdetails,
            aadharnumber:user.aadharnumber,
            dob:user.dob
          });
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
    checkAuth();
    det();
    
  }, []);

  return (
    <Context.Provider value={[details, setDetails]}>
       
        <div className="w-full h-screen flex">
          {auth ? (
            <>
              <div className="min-w-[250px]  lg:w-[10%] hidden bg-indigo-500 h-screen lg:flex md:flex flex-col gap-3 items-center justify-start">
                <div className="w-full flex items-center justify-center h-24 hover:scale-105 transition-transform cursor-pointer">
                  <a href='home' className="flex items-center justify-center w-4/5 bg-slate-800 px-2 py-2 shadow-md rounded-md">
                    <img className="h-12 w-12" src="/logo.svg" alt="Logo" />
                    <span className="text-white text-3xl font-bold ml-2">Loaners</span>
                  </a>
                </div>
                <span className="text-none w-full flex flex-col items-start">
                  <p className="text-2xl barchart font-medium w-full text-center text-gray-800 pb-5">MENU</p>
                  <ul className='w-full flex flex-col items-center gap-3'>
                    {links.map((link) => (
                      <Link to={link.link} className={`text-lg text-center py-3 rounded-md transition text-white font-medium hover:bg-gray-800 w-[80%] ${location.pathname.includes(link.link) ? 'bg-gray-800' : ''
                        }`}>
                        {link.name}
                      </Link>
                    ))}
                  </ul>
                  <div className=''>
                    <FreeCard />
                  </div>
                </span>
              </div>
              <div className="w-full h-screen bg-slate-100">
                <Navbar />
                <Outlet />
              </div>
            </>
          ) : (
            <div className="w-full h-screen flex items-center justify-center">
              <div className="flex bg-slate-200 shadow-xl max-w-xl md:py-3 lg:py-3 py-5 rounded-lg items-center mt-3 lg:px-5 px-3 md:px-5 flex-wrap text-center justify-center gap-3">
                <h1 className="text-gray-800 text-2xl font-bold">
                  YOU ARE NOT AUTHENTICATED TO SEE THE CONTENTS
                </h1>
                <Link
                  className="bg-indigo-500 px-3 font-medium active:scale-105 transition-transform py-2 rounded-md shadow-md text-white hover:bg-indigo-600"
                  to="/blogin"
                >
                  Back To Login
                </Link>
              </div>
            </div>
          )}
        </div>

    </Context.Provider>
  );
}

export default Dashboard;