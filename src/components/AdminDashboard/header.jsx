import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from './Dashboard';
import FreeCard from './profilecard';



function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let [open, setOpen] = useState(false);
  const location = useLocation();
  const Links = [
    { name: "Home", link: "home" },
    { name: "Borrowers", link: "borrowers" },
    { name: "Lenders", link: "lenders" },
    { name: "Active loans", link: "activeloans" },
    { name: "Requested Loans", link: "requestedloans" },
  ];
  let icon = open ? "fas fa-bars" : "fas fa-bars";

  const toggleNavbar = () => {
    setOpen(!open);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeSidebar = () => {
    if (open) {
      setOpen(false);
    }
  };
  const [details, setDetails] = useContext(Context);

  return (
    <nav className={`bg-gray-800 shadow-xl h-[10vh]`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-[10vh]">
          <div className="flex items-center">
            <span className="flex md:hidden lg:hidden">
              <FontAwesomeIcon
                icon={icon}
                className="text-2xl mt-0.5 active:scale-110 transition-transform rounded-md transform duration-300 text-white py-2 px-3"
                onClick={toggleNavbar}
              />

              <ul
                className={`md:flex md:items-center w-[250px]  md:pb-0 pb-8 absolute md:static md:z-auto left-0 top-0 h-screen z-[30] md:w-auto md:pl-0  md:bg-transparent bg-indigo-900 transition-all duration-500 ease-in ${open ? "left-0 z-[-1] " : "left-[-250px] z-[-1]"
                  }`}
              >
                <span className="flex items-center justify-start pt-5 ps-4 w-full gap-3">
                  <FontAwesomeIcon
                    icon={["fas", "handshake"]}
                    className="h-8 w-8 text-white px-2 py-1 rounded-xl bg-indigo-500"
                  />
                  <h1 className="text-white text-2xl mt-1 font-bold">
                    Loaners
                  </h1>
                  <FontAwesomeIcon
                    icon={["fas", "arrow-left"]}
                    onClick={toggleNavbar}
                    className="text-indigo-300 mt-1 text-2xl absolute right-0 pe-2"
                  />
                </span>
                <p className="ms-5 text-xl text-slate-400 mt-10">MENU</p>
                {Links.map((link) => (
                  <li
                    key={link.name}
                    className="md:ml-8 leading-none pl-9 w-full md:text-xl md:my-0 my-7"
                  >
                    <Link
                      to={link.link}
                      className={`text-white px-3  py-2 rounded-md ${location.pathname.includes(link.link) ? 'bg-indigo-500 text-black font-medium' : ''
                        }`}
                      onClick={closeSidebar}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <div className="">
                <FreeCard/>
                </div>
              </ul> 
            </span>
            <div className="flex-shrink-0 flex items-center mt-0.5">
              <span className="text-white hidden lg:block md:block lg:text-xl text-2xl font-bold ml-1">
                Admin Dashboard
              </span>
              <span className="flex lg:hidden ml-3 items-center gap-3 md:hidden">
                <FontAwesomeIcon
                  icon={["fas", "handshake"]}
                  className="h-8 w-8 text-white px-2 py-1 rounded-xl bg-indigo-500"
                />
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-3 relative">
              <div
                onClick={toggleDropdown}
                className="flex w-fit items-center cursor-pointer gap-2"
              >
                <div className=" bg-blue-500 h-12 w-12 rounded-full flex items-center justify-center text-white md:text-3xl text-2xl text-center relative">
                  <p className="mt-0.5 uppercase">{details.name.charAt(0)}</p>
                  <div className="absolute w-3 h-3 bg-green-500 rounded-full -top-1 right-1 transform translate-x-2 translate-y-2 border border-white"></div>
                </div>
                <FontAwesomeIcon
                  icon={["fas", "angle-down"]}
                  className="text-white mt-1"
                />

              </div>

              {isDropdownOpen && (
                <div className="origin-top-right z-30 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1 "
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      to="profile"
                      className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={toggleDropdown}
                    >
                      Profile
                    </Link>

                    <button
                      onClick={(e) => { window.localStorage.removeItem("tokenborrower"); window.location.href = "/home" }}
                      className="block w-full text-start  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;