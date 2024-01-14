import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./Dashboard";

const FreeCard = () => {
	const [details] =useContext(Context);
	return (
		<div className="absolute bottom-4 ml-7 flex w-[200px] mt-8  h-fit flex-col items-center">
		  <div className="bg-gradient-to-b from-indigo-200 to-indigo-400 w-full flex  items-center justify-start flex-col shadow-lg mt-8 rounded-3xl">
		  <div className=" bg-blue-500 h-16 -top-8 w-16 rounded-full flex items-center justify-center border-4 border-indigo-200 text-white md:text-3xl text-2xl text-center relative">
                  <p className=" uppercase">{details.name.charAt(0)}</p>  
				  <p className="absolute  bg-green-500 text-xs px-2 scale-75 rounded-full bottom-0 right-[4px] transform translate-x-2 translate-y-2 border-2 border-indigo-200 text-black">Borrower</p>        
                </div>
				<span className="-mt-6 pb-4 flex flex-col justify-center items-center">
				<h1 className="text-sm font-medium text-slate-600">{details.name}</h1>
				<p className="text-lg text-slate-800">+{details.phonenumber}</p>
				</span>
				<Link to={"profile"}
			className="text-medium block rounded-full mb-5 py-[12px] px-11 text-center text-base bg-indigo-900 text-white"
		  >
			View Profile
		  </Link>
		  </div> 
		</div>
	  
	);
  };
  
  export default FreeCard;