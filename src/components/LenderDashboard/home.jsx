import React, { useContext, useEffect, useState } from 'react';
import { Details } from './Dashboard';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, PointElement, Title, CategoryScale, BarElement, RadialLinearScale } from 'chart.js';
import { Doughnut, Bar, PolarArea } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, RadialLinearScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend);


export default function Home() {
  const [details, setDetails] = useContext(Details);
  const [loanDetails, setLoanDetails] = useState([]);
  const [debtdata, setdebtdata] = useState(0);
  const [activeloans, setactiveloans] = useState(0);
  const [requestcount, setrequestcount] = useState(0);
  const [paiddata, setpaiddata] = useState(0);

  const activeloan = () => {
    axios.post("http://localhost:5000/getactivelenderloancount", {
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
  const requestloan = () => {
    axios.post("http://localhost:5000/getrequestedlenderloancount", {
      email: details.email,
    }).then((res) => {
      if (res.status == 200) {
        const count = res.data.count
        setrequestcount(count);
      }
      else {
        setrequestcount(0);
      }
    })
      .catch(err => { setrequestcount(0); })
  }
  const totalamount = () => {
    axios.post("http://localhost:5000/gettotalrepayment",{
      "email":details.email
    })
      .then((res) => {
        if (res.status == 200) {
          const count = res.data.total;
          setdebtdata(count);
        }
        else {
          setdebtdata(0);
        }
      })
      .catch(err => { setdebtdata(0); })
  }
  useEffect(() => {
      totalamount();
      activeloan();
      requestloan();
  },[]);

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
                total repayment
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
                <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" class="w-14 h-14 " viewBox="0 0 512 512" fill="#9ca3af" >
                  <g>
                    <path class="st0" d="M418.336,193.866C397.758,111.819,318.07,80.96,311.102,73.444l19.594-71.328c0,0-24.469-7.906-58.797,6.828
		c-43.641,18.734-67.953-5.156-67.953-5.156l21.547,70.781c-6.766,7.688-91.516,42.141-106.875,123.219
		c-7.797,41.094,3.422,92.531,39.25,127.516c12.953-4.984,29.078-8.219,49.969-8.219h85.594c19.844,0,35.984,16.141,35.984,35.984
		c0,0.906-0.125,1.797-0.188,2.688C407.258,328.663,432.555,250.429,418.336,193.866z M312.883,263.132
		c-1.969,4.25-4.984,7.984-8.953,11.141c-4.063,3.172-9.25,5.734-15.438,7.578c-3.031,0.875-6.359,1.563-9.938,2.016v11.828h-17.563
		v-11.188c-6.422-0.328-12.625-1.172-18.469-2.625c-6.734-1.656-12.063-3.703-16.297-6.25c-1.016-0.625-1.109-0.844-1.109-3.016
		v-15.125c0-1.172,0.266-1.172,0.625-1.172c0.313,0,0.672,0.094,0.938,0.234c1.453,0.766,2.984,1.531,4.547,2.297
		c3.75,1.781,7.625,3.328,11.531,4.625c3.891,1.313,7.797,2.375,11.594,3.156c3.875,0.797,7.531,1.219,10.813,1.219
		c8.266,0,14.234-1.609,18.266-4.922c4.125-3.391,6.203-7.609,6.203-12.547c0-2.469-0.422-4.75-1.25-6.766
		c-0.875-2.141-2.469-4.109-4.766-5.875c-2.078-1.625-4.984-3.219-8.609-4.734c-3.5-1.469-8-3.047-13.375-4.703
		c-7.109-2.281-13.125-4.719-17.875-7.234c-4.641-2.453-8.375-5.172-11.125-8.063c-2.672-2.813-4.594-5.891-5.75-9.156
		c-1.172-3.328-1.766-7.031-1.766-10.984c0-5,1.25-9.609,3.703-13.703c2.5-4.203,6-7.859,10.359-10.906
		c4.406-3.078,9.703-5.516,15.688-7.219c1.984-0.547,4.063-0.984,6.125-1.359v-11.625h17.563v10.594
		c4.891,0.188,9.766,0.609,14.469,1.469c5.094,0.906,10.109,2.406,14.906,4.406c0.906,0.375,1.125,0.594,1.125,1.453v15.656
		c-0.016,0.234-0.219,0.313-0.625,0.313c-0.359,0-0.656-0.063-0.828-0.125c-4.25-1.453-8.688-2.75-13.188-3.797
		c-6.516-1.516-13.031-2.297-19.328-2.297c-7.75,0-13.75,1.516-17.859,4.5c-4.375,3.203-6.594,7.344-6.594,12.328
		c0,2.156,0.484,4.219,1.406,6.109c0.938,1.906,2.5,3.734,4.688,5.406c2.031,1.563,4.703,3.109,8.203,4.688
		c3.313,1.531,7.594,3.109,12.656,4.656c6.797,2.094,12.719,4.344,17.625,6.688c4.797,2.281,8.797,4.844,11.875,7.625
		c3,2.672,5.203,5.766,6.594,9.188c1.438,3.5,2.156,7.609,2.156,12.25C315.836,254.179,314.836,258.866,312.883,263.132z"/>
                    <path class="st0" d="M234.57,374.46c14.281,0,58.859,0,58.859,0c11.828,0,21.406-9.578,21.406-21.391
		c0-11.828-9.578-21.406-21.406-21.406c-10.703,0-32.094,0-85.594,0c-53.516,0-70.453,22.297-89.188,41.016l-33.984,29.688
		c-2.203,1.922-3.469,4.688-3.469,7.625v98.641c0,1.313,0.766,2.516,1.969,3.063s2.609,0.359,3.609-0.516l65.672-56.297
		c2.313-1.969,5.406-2.797,8.391-2.266l102.344,18.609c7.141,1.297,14.484-0.344,20.422-4.531c0,0,130.625-90.828,140.266-98.859
		l0,0c9.188-8.438,9.094-20.672,0.641-29.875c-8.438-9.203-24.172-7.25-34.688,0.531c-9.625,8.016-75.359,51.219-75.359,51.219
		H234.57l-0.25,0.125c-4.203-0.141-7.5-3.672-7.375-7.875c0.156-4.203,3.688-7.5,7.875-7.359L234.57,374.46z"/>
                  </g>
                </svg>
              </span>
            </div>
          </div>
          <div class="flex items-center lg:hover:shadow-md lg:shadow-sm transition-all min-w-[250px] justify-between p-4 bg-gray-200 rounded-md h-[100px]">
            <div>
              <h6 class="text-sm font-medium  leading-none tracking-wider text-gray-500 uppercase ">
                Loan Requests
              </h6>
              <span class="text-xl text-gray-600 font-semibold">{requestcount}</span>

            </div>
            <div>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className='h-14 w-14 text-gray-400' viewBox="0 0 16 16">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
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
            <Bar options={options} data={data2} />
          </span>

        </div>
      </span>
    </div>
  )
}

