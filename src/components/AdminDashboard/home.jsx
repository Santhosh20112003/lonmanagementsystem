import React, { useContext, useEffect, useState } from 'react';
import { Context } from './Dashboard';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, PointElement, LineElement, Title, CategoryScale, BarElement, RadialLinearScale } from 'chart.js';
import { Line, Doughnut, Bar, Pie, PolarArea, Radar } from 'react-chartjs-2';
import { MonthlyDue, TotalAmount } from '../calculate';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, RadialLinearScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend);


export default function Home() {
  const [total, setotal] = useState(0);
  const [details, setDetails] = useContext(Context);
  const [loanDetails, setLoanDetails] = useState([]);
  const [debtdata, setdebtdata] = useState(0);
  const [activeloans, setactiveloans] = useState(0);
  const [rejectedloans, setrejectedloans] = useState(0);
  const [paiddata, setpaiddata] = useState(0);

  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(1);
  const [loanTerm, setLoanTerm] = useState(1);
  const [monthlyPayment, setMonthlyPayment] = useState(934);
  const [totalPayment, settotalPayment] = useState(11200);

  const calculateLoan = () => {
    const principal = loanAmount;
    const rate = interestRate / 100;
    const term = loanTerm;

    const monthlyPayment = MonthlyDue(principal, term, rate);
    const totalpayment = TotalAmount(principal, term, rate);
    settotalPayment(totalpayment);
    setMonthlyPayment(monthlyPayment);
  };

  const activeloan = () => {
    axios.get("http://localhost:5000/borrowerscount").then((res) => {
      if (res.status == 200) {
        const count = res.data.count
        setactiveloans(count);
      }
      else {
        setactiveloans(0);
      }
    })
      .catch(err => { setactiveloans(0); })
  }
  const rejectloan = () => {
    axios.get("http://localhost:5000/lenderscount")
      .then((res) => {
        if (res.status == 200) {
          const count = res.data.count;
          console.log(count)
          setrejectedloans(count);
        }
        else {
          setrejectedloans(0);
        }
      })
      .catch(err => { setrejectedloans(0); })
  }

  useEffect(() => {
    axios
      .post('http://localhost:5000/getloansbyborrower', {
        email: details.email,
      })
      .then((response) => {
        const newData = response.data.map((object) => ({
          loanid: object.loanid,
          amount: object.amount,
          lender: object.lender,
          borrower: object.borrower,
          interest: object.intrest,
          timeperiod: object.timeperiod,
          penalty: object.penalty,
          status: object.status,
          lendername: object.lendername,
          borrowername: object.borrowername,
          total: object.totalamount
        }));

        setLoanDetails(newData);
        let value = 0;
        let paidvalue = 0;

        loanDetails.forEach((loanDetail) => {
          value += loanDetail.amount;
        });

        loanDetails.forEach((loanDetail) => {
          paidvalue = paidvalue + (loanDetail.total - loanDetail.amount);
        });

        console.log(paidvalue)

        activeloan();
        rejectloan();
        setpaiddata(details.amount);
        setdebtdata(value);
        setpaiddata(paidvalue)

        if (value == 0) {
          setdebtdata(0);
        }
        else {
          setdebtdata(value);
        }
      })
      .catch((err) => {
        console.log('Error fetching loan details:', err);
      });

  },);

  var data1 = {
    labels: ['Paid', 'Debt'],
    datasets: [
      {
        label: 'Amount',
        data: [paiddata, debtdata],
        backgroundColor: [
          '#6366f1',
          '#f97316'
        ]
      },
    ],

  };
  var data2 = {
    labels: ['Paid', 'Debt'],
    datasets: [
      {
        label: 'Amount',
        data: [paiddata, debtdata],
        backgroundColor: [
          '#6366f1',
          '#f97316'
        ]
      },
    ],

  };
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: '',
      },
    },
    scales: {
    },

  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: '',
      },
    },
    scales: {
      y: {
        min: 0,
        max: (debtdata + 50000)
      }
    }
  };

  return (
    <div className=' h-[90vh] w-full overflow-y-scroll'>
      <div class="flex items-center justify-between px-4 py-4  lg:py-6 ">
        <h1 class="text-2xl ms-14 font-semibold">Welcome, {details.name}</h1>
      </div>
      <span className='flex w-full justify-evenly '>
        <div class="grid  w-full lg:w-11/12 grid-cols-1 md:grid-cols-2 h-fit items-center gap-10 p-4 lg:grid-cols-4 xl:grid-cols-4">
          <div class="flex items-center lg:hover:shadow-md lg:shadow-sm transition-all  sm:min-w-[250px] justify-between p-4 bg-indigo-200 rounded-md  h-[100px]">
            <div>
              <h6 class="text-sm font-medium leading-none tracking-wider text-indigo-500 uppercase ">
                Total Amount
              </h6>
              <span class="text-xl text-indigo-600 font-semibold">${debtdata}</span>

            </div>

            <div>
              <span>
                <svg class="w-14 h-14 text-indigo-400 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div class="flex items-center lg:hover:shadow-md lg:shadow-sm transition-all  sm:min-w-[250px] justify-between p-4 bg-indigo-200 rounded-md  h-[100px]">
            <div>
              <h6 class="text-sm font-medium leading-none tracking-wider text-indigo-500 uppercase ">
                Paid Amount
              </h6>
              <span class="text-xl text-indigo-600 font-semibold">${paiddata}</span>

            </div>

            <div>
              <span>
                <svg class="w-14 h-14 text-indigo-400 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div class="flex items-center lg:hover:shadow-md lg:shadow-sm transition-all min-w-[250px] justify-between p-4 bg-gray-200 rounded-md h-[100px]">
            <div>
              <h6 class="text-sm font-medium  leading-none tracking-wider text-gray-500 uppercase ">
                Borrowers
              </h6>
              <span class="text-xl text-gray-600 font-semibold">{activeloans}</span>

            </div>
            <div>
              <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 " fill="currentColor" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
</svg>
              </span>
            </div>
          </div>
          <div class="flex items-center lg:hover:shadow-md lg:shadow-sm transition-all min-w-[250px] justify-between p-4 bg-gray-200 rounded-md h-[100px]">
            <div>
              <h6 class="text-sm font-medium  leading-none tracking-wider text-gray-500 uppercase ">
                Lenders
              </h6>
              <span class="text-xl text-gray-600 font-semibold">{rejectedloans}</span>

            </div>
            <div>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 " fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                </svg>

              </span>
            </div>
          </div>
        </div>
      </span>

      <span className="flex h-fit items-center justify-evenly w-full ">
        <div class="flex flex-row-reverse lg:w-[90%] w-full items-center  justify-between gap-10   flex-wrap px-5 py-3 ">
          <span className='min-w-[300px] min-h-[400px] flex items-center'>
            <div className="bg-white shadow-lg min-w-[320px] w-4/5 px-8 pt-10 py-5 rounded  ">

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Loan Amount ($ {loanAmount})
                </label>
                <input
                  type="range"
                  min="1000"
                  max="1000000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full accent-purple-500  h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg "
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Interest Rate ({interestRate}%)
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full accent-purple-500 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg "
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Loan Term ({loanTerm} years)
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full accent-purple-500 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg "
                />
              </div>

              <button
                onClick={calculateLoan}
                className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 focus:outline-none w-full"
              >
                Calculate
              </button>
              <div className="mt-4 flex items-center  justify-between">
                <span>
                  <h2 className="text-lg font-semibold text-purple-600">Monthly EMI</h2>
                  <p title={"₹" + monthlyPayment} className="text-xl font-bold text-gray-700">₹{monthlyPayment}.00</p>
                </span>
                <span>
                  <h2 className="text-lg font-semibold text-purple-600">Total Payment</h2>
                  <p className="text-xl font-bold text-gray-700">₹{totalPayment}.00</p>
                </span>
              </div>
            </div>
          </span>
          <span className='min-w-[300px] min-h-[300px] flex items-center'>
            <Doughnut data={data1} options={options2} />
          </span>
          <span className='min-w-[300px] min-h-[400px]  flex items-center'>
            <PolarArea data={data1} options={options2} />
          </span>

        </div>
      </span>
    </div>
  )
}

