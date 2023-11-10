import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Edit({ details }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(details.name);
  const [email, setEmail] = useState(details.email);
  const [phoneNumber, setPhoneNumber] = useState(details.phonenumber);
  const [intrest, setIntrest] = useState(details.intrest);
  const [timeperiod, setTimePeriod] = useState(details.timeperiod);
  const [emailVerified, setEmailVerified] = useState(details.emailverified);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setDetailsAndClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const setDetailsAndClose = () => {
    setName(details.name);
    setEmail(details.email);
    setPhoneNumber(details.phonenumber);
    setIntrest(details.intrest);
    setTimePeriod(details.timeperiod);
    setEmailVerified(details.emailverified);
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!name) {
      validationErrors.name = "Name is required";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!phoneNumber) {
      validationErrors.phoneNumber = "Phone number is required";
    }
    if (!intrest) {
      validationErrors.intrest = "Please select interest status";
    }
    if (!timeperiod) {
      validationErrors.timeperiod = "Time period is required";
    }
    if (emailVerified === "") {
      validationErrors.emailVerified = "Email verified is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const consent = window.confirm("Are you sure you want to update Lender Details?");
      if (consent) {
        axios
          .post("http://localhost:5000/updatelenderdetails", {
            id: details.id,
            name: name,
            email: email,
            phonenumber: phoneNumber,
            intrest: intrest,
            timeperiod: timeperiod,
            emailverified: emailVerified,
          })
          .then((res) => {
            if (res.status === 200) {
              alert("Details Updated");
              setDetailsAndClose();
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Update Failed");
          });
      }
    }
  };

  return (
    <>
      <FontAwesomeIcon
        icon={"fas fa-pen"}
        title="Edit"
        onClick={() => {
          setShowModal(true);
        }}
        className="text-gray-500 text-xs active:scale-110 transition-transform active:text-indigo-400"
      />
      {showModal && (
        <div className="justify-center dropdown items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-md">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex w-full items-center justify-between p-5  rounded-t">
                <h3 className="text-2xl font-semibold">Edit Lender Details</h3>
                <FontAwesomeIcon
                  onClick={() => {
                    setDetailsAndClose();
                  }}
                  icon="fas fa-xmark"
                  className="text-lg text-slate-500"
                />
              </div>
              <div className="relative px-6 py-3 flex-auto">
                <form onSubmit={handleSubmit} className="flex gap-5 flex-wrap justify-center">
                  <div className="text-start">
                    {/* Name */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        className={`${
                          errors.name ? "border-red-500" : "border"
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-2">{errors.name}</p>
                      )}
                    </div>
                    {/* Email */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`${
                          errors.email ? "border-red-500" : "border"
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-2">{errors.email}</p>
                      )}
                    </div>
                    {/* Phone Number */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        className={`${
                          errors.phoneNumber ? "border-red-500" : "border"
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                    {/* Interest */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Interest
                      </label>
                      <select
                        className={`${
                          errors.intrest ? "border-red-500" : "border"
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={intrest}
                        onChange={(e) => setIntrest(e.target.value)}
                      >
                        <option value="">Select an option</option>
                        <option value="2">2%</option>
                        <option value="5">5%</option>
                        <option value="7">7%</option>
                      </select>
                      {errors.intrest && (
                        <p className="text-red-500 text-xs mt-2">{errors.intrest}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-start w-40">
                    {/* Time Period */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Time Period
                      </label>
                      <input
                        type="number"
                        className={`${
                          errors.timeperiod ? "border-red-500" : "border"
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={timeperiod}
                        onChange={(e) => setTimePeriod(e.target.value)}
                      />
                      {errors.timeperiod && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.timeperiod}
                        </p>
                      )}
                    </div>
                    {/* Email Verified */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email Verified
                      </label>
                      <select
                        className={`${
                          errors.emailVerified ? "border-red-500" : "border"
                        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={emailVerified}
                        onChange={(e) => setEmailVerified(e.target.value)}
                      >
                        <option value="">Select an option</option>
                        <option value={true}>Verified</option>
                        <option value={false}>Not Verified</option>
                      </select>
                      {errors.emailVerified && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.emailVerified}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="">
                      <button
                        type="submit"
                        className="bg-indigo-500 right-0 -bottom-6 relative w-full text-white p-2 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
