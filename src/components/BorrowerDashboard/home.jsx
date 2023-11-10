import React, { useContext, useEffect, useState } from 'react';
import { Context } from './Dashboard';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, PointElement, LineElement, Title, CategoryScale, BarElement, RadialLinearScale } from 'chart.js';
import { Line, Doughnut, Bar, Pie, PolarArea, Radar } from 'react-chartjs-2';

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

  const activeloan = () => {
    axios.post("http://localhost:5000/getactiveborrowerloancount", {
      email: details.email,
    }).then((res) => {
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
    axios.post("http://localhost:5000/getrejectedborrowerloancount", {
      email: details.email,
    }).then((res) => {
      if (res.status == 200) {
        const count = res.data.count
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
        <div class="grid  w-full lg:w-4/5 grid-cols-1 md:grid-cols-2 h-fit items-center gap-8 p-4 lg:grid-cols-3 xl:grid-cols-3">
          <div class="flex items-center lg:hover:shadow-md lg:shadow-sm transition-all  sm:min-w-[250px] justify-between p-4 bg-indigo-200 rounded-md  h-[100px]">
            <div>
              <h6 class="text-sm font-medium leading-none tracking-wider text-indigo-500 uppercase ">
                Amount To Pay
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
          <div class="flex items-center lg:hover:shadow-md lg:shadow-sm transition-all min-w-[250px] justify-between p-4 bg-gray-200 rounded-md h-[100px]">
            <div>
              <h6 class="text-sm font-medium  leading-none tracking-wider text-gray-500 uppercase ">
                Active Loans
              </h6>
              <span class="text-xl text-gray-600 font-semibold">{activeloans}</span>

            </div>
            <div>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-gray-400 " fill="currentColor"  viewBox="0 0 16 16">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                </svg>
              </span>
            </div>
          </div>
          <div class="flex items-center lg:hover:shadow-md lg:shadow-sm transition-all min-w-[250px] justify-between p-4 bg-gray-200 rounded-md h-[100px]">
            <div>
              <h6 class="text-sm font-medium  leading-none tracking-wider text-gray-500 uppercase ">
                Rejected Loans
              </h6>
              <span class="text-xl text-gray-600 font-semibold">{rejectedloans}</span>

            </div>
            <div>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-gray-400 " fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z" />
                </svg>

              </span>
            </div>
          </div>
        </div>
      </span>
      <span className="flex h-fit items-center justify-evenly w-full ">
        <div class="flex flex-row-reverse w-full items-center justify-evenly flex-wrap px-5 py-3 ">
          <span className='min-w-[300px] min-h-[400px]  flex items-center'>
            <PolarArea data={data2} options={options2} />
          </span>
          <span className='min-w-[300px] min-h-[300px] flex items-center'>
            <Doughnut data={data1} options={options2} />
          </span>
          <span className='min-w-[300px] min-h-[400px]  flex items-center'>
            <Bar className='barchart' options={options} data={data1} />
          </span>

        </div>
      </span>
    </div>
  )
}

