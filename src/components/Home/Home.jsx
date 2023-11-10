import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import hero from "../asserts/hero.svg";
import steps from "../asserts/steps.jpg";
import { Link } from "react-router-dom";
import axios from 'axios';
import { MonthlyDue, TotalAmount } from "../calculate";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, PointElement, LineElement, Title, CategoryScale, BarElement, RadialLinearScale } from 'chart.js';
import { Line, Doughnut, Bar, Pie, PolarArea, Radar } from 'react-chartjs-2';





function Home() {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
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

  var data = {
    labels: [ 'Loan Amount','Intrest Amount','Monthly Due'],
    datasets: [
      {
        data: [loanAmount, (totalPayment-loanAmount),monthlyPayment],
        backgroundColor: [
          '#6366f1',
          '#f97316',
          '#a855f7'
        ],
         borderColor: [
          '#6366f1',
          '#f97316',
          '#a855f7'
        ],
        borderColor:[
          '#ccc'
        ],
        borderWidth: 1,
      },
    ],

  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'center',
      },
      title: {
        display: false,
        text: '',
      },
    }
  };


  const contactSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};

    if (!email) {
      newErrors.email = "*Email is required";
    }

    if (!message) {
      newErrors.message = "*Please type some message";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const formData = {
        email: email,
        message: message
      }

      axios.post("http://localhost:5000/contactform", formData).then((res) => {
        if (res.status === 200) {
          newErrors.responsesucess = "Response Shared";
          setErrors(newErrors);
        }
        else if (res.status == 201) {
          newErrors.responseerror = "Already used Email can't use Again";
          setErrors(newErrors);
        }
      })
        .catch((err) => {
          newErrors.responseerror = "Response Not Shared";
          setErrors(newErrors);
          console.log(err);
        });
    }
  };

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

  let Links = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Contact", link: "#contact" },
  ];

  let [open, setOpen] = useState(false);

  let icon = open
    ? "fas fa-xmark transition-transform duration-400"
    : "fas fa-bars transition-transform duration-400";

  const toggleNavbar = () => {
    setOpen(!open);
  };

  return (
    <div className="Home">
      <header className="w-100 p-5 lg:py-5 lg:px-3 md:py-5 md:px-3 bg-indigo-500 flex items-center justify-between lg:justify-evenly md:justify-evenly">
        <span className="flex items-center gap-3">
          <i className="fa-solid fa-handshake text-white text-3xl"></i>
          <h1 className="text-3xl text-white font-bold">Loaners</h1>
        </span>

        <span className="hidden md:flex items-center gap-5">
          {Links.map((link) => (
            <a className="text-white text-xl" href={link.link} key={link.name}>
              {link.name}
            </a>
          ))}
        </span>

        <span className="hidden md:flex items-center gap-3">

          <Link
            className="px-3 py-2 active:scale-110 transition-transform bg-indigo-700 shadow-md rounded-md text-white font-bold"
            to="blogin"
          >
            Borrower Login
          </Link>
          <Link
            className="px-3 py-2 active:scale-110 transition-transform bg-indigo-700 shadow-md rounded-md text-white font-bold"
            to="llogin"
          >
            Lender Login
          </Link>
          <Link
            className="px-3 py-2 active:scale-110 transition-transform bg-indigo-700 shadow-md rounded-full text-white font-bold"
            to="adminlogin" title="admin"
          >
            <FontAwesomeIcon icon="fas fa-user-shield" />
          </Link>

        </span>

        <span
          className="flex md:hidden lg:hidden"
          onClick={toggleNavbar}
        >
          <FontAwesomeIcon
            icon={icon}
            className="text-2xl bg-indigo-900 shadow-md active:scale-110 transition-transform rounded-md transform text-white py-2 px-3"
          />

          <ul
            className={`md:flex md:items-center md:pb-0 pb-8 absolute md:static md:z-auto left-0 w-full z-[30] md:w-auto md:pl-0 pl-9 md:bg-transparent bg-indigo-950 transition-all duration-500 ease-in ${open ? "top-20 z-[-1]" : "top-[-490px] z-[-1]"
              }`}
          >
            {Links.map((link) => (
              <li
                key={link.name}
                className="md:ml-8 md:text-xl md:my-0 my-7"
              >
                <a
                  href={link.link}
                  className="text-white"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <span className="flex items-center gap-3">
              <Link
                className="px-3 py-2 active:scale-110 transition-transform bg-indigo-700 shadow-md rounded-md text-white font-bold"
                to="blogin"
              >
                Borrower Login
              </Link>
              <Link
                className="px-3 py-2 active:scale-110 transition-transform bg-indigo-700 shadow-md rounded-md text-white font-bold"
                to="llogin"
              >
                Lender Login
              </Link>
              <Link
                className="px-3 py-2 active:scale-110 transition-transform bg-indigo-700 shadow-md rounded-full text-white font-bold"
                to="adminlogin"
              >
                <FontAwesomeIcon icon="fas fa-user-shield" />
              </Link>
            </span>
          </ul>
        </span>
      </header>

      <section id="home" className={`w-full  ${open ? "blur" : "blur-none"
        }`}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            "autoPlay": true,
            "background": {
              "color": {
                "value": "#fff"
              },
              "image": "",
              "position": "",
              "repeat": "",
              "size": "",
              "opacity": 1
            },
            "backgroundMask": {
              "composite": "destination-out",
              "cover": {
                "color": {
                  "value": "#fff"
                },
                "opacity": 1
              },
              "enable": false
            },
            "defaultThemes": {},
            "delay": 0,
            "fullScreen": {
              "enable": true,
              "zIndex": -2
            },
            "detectRetina": true,
            "duration": 0,
            "fpsLimit": 120,
            "interactivity": {
              "detectsOn": "window",
              "events": {
                "onClick": {
                  "enable": false,
                  "mode": []
                },
                "onDiv": {
                  "selectors": [],
                  "enable": false,
                  "mode": [],
                  "type": "circle"
                },
                "onHover": {
                  "enable": false,
                  "mode": [],
                  "parallax": {
                    "enable": false,
                    "force": 2,
                    "smooth": 10
                  }
                },
                "resize": {
                  "delay": 0.5,
                  "enable": true
                }
              },
              "modes": {
                "trail": {
                  "delay": 1,
                  "pauseOnStop": false,
                  "quantity": 1
                },
                "attract": {
                  "distance": 200,
                  "duration": 0.4,
                  "easing": "ease-out-quad",
                  "factor": 1,
                  "maxSpeed": 50,
                  "speed": 1
                },
                "bounce": {
                  "distance": 200
                },
                "bubble": {
                  "distance": 200,
                  "duration": 0.4,
                  "mix": false,
                  "divs": {
                    "distance": 200,
                    "duration": 0.4,
                    "mix": false,
                    "selectors": []
                  }
                },
                "connect": {
                  "distance": 80,
                  "links": {
                    "opacity": 0.5
                  },
                  "radius": 60
                },
                "grab": {
                  "distance": 100,
                  "links": {
                    "blink": false,
                    "consent": false,
                    "opacity": 1
                  }
                },
                "push": {
                  "default": true,
                  "groups": [],
                  "quantity": 4
                },
                "remove": {
                  "quantity": 2
                },
                "repulse": {
                  "distance": 200,
                  "duration": 0.4,
                  "factor": 100,
                  "speed": 1,
                  "maxSpeed": 50,
                  "easing": "ease-out-quad",
                  "divs": {
                    "distance": 200,
                    "duration": 0.4,
                    "factor": 100,
                    "speed": 1,
                    "maxSpeed": 50,
                    "easing": "ease-out-quad",
                    "selectors": []
                  }
                },
                "slow": {
                  "factor": 3,
                  "radius": 200
                },
                "light": {
                  "area": {
                    "gradient": {
                      "start": {
                        "value": "#ffffff"
                      },
                      "stop": {
                        "value": "#000000"
                      }
                    },
                    "radius": 1000
                  },
                  "shadow": {
                    "color": {
                      "value": "#000000"
                    },
                    "length": 2000
                  }
                }
              }
            },
            "manualParticles": [],
            "particles": {
              "bounce": {
                "horizontal": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0.1
                  },
                  "value": 1
                },
                "vertical": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0.1
                  },
                  "value": 1
                }
              },
              "collisions": {
                "absorb": {
                  "speed": 2
                },
                "bounce": {
                  "horizontal": {
                    "random": {
                      "enable": false,
                      "minimumValue": 0.1
                    },
                    "value": 1
                  },
                  "vertical": {
                    "random": {
                      "enable": false,
                      "minimumValue": 0.1
                    },
                    "value": 1
                  }
                },
                "enable": false,
                "maxSpeed": 50,
                "mode": "bounce",
                "overlap": {
                  "enable": true,
                  "retries": 0
                }
              },
              "color": {
                "value": "#000",
                "animation": {
                  "h": {
                    "count": 0,
                    "enable": false,
                    "offset": 0,
                    "speed": 20,
                    "delay": 0,
                    "decay": 0,
                    "sync": true
                  },
                  "s": {
                    "count": 0,
                    "enable": false,
                    "offset": 0,
                    "speed": 1,
                    "delay": 0,
                    "decay": 0,
                    "sync": true
                  },
                  "l": {
                    "count": 0,
                    "enable": false,
                    "offset": 0,
                    "speed": 1,
                    "delay": 0,
                    "decay": 0,
                    "sync": true
                  }
                }
              },
              "groups": {
                "z5000": {
                  "number": {
                    "value": 70
                  },
                  "zIndex": {
                    "value": 50
                  }
                },
                "z7500": {
                  "number": {
                    "value": 30
                  },
                  "zIndex": {
                    "value": 75
                  }
                },
                "z2500": {
                  "number": {
                    "value": 50
                  },
                  "zIndex": {
                    "value": 25
                  }
                },
                "z1000": {
                  "number": {
                    "value": 40
                  },
                  "zIndex": {
                    "value": 10
                  }
                }
              },
              "move": {
                "angle": {
                  "offset": 0,
                  "value": 10
                },
                "attract": {
                  "distance": 200,
                  "enable": false,
                  "rotate": {
                    "x": 600,
                    "y": 1200
                  }
                },
                "center": {
                  "x": 50,
                  "y": 50,
                  "mode": "percent",
                  "radius": 0
                },
                "decay": 0,
                "distance": {},
                "direction": "right",
                "drift": 0,
                "enable": true,
                "gravity": {
                  "acceleration": 9.81,
                  "enable": false,
                  "inverse": false,
                  "maxSpeed": 50
                },
                "path": {
                  "clamp": true,
                  "delay": {
                    "random": {
                      "enable": false,
                      "minimumValue": 0
                    },
                    "value": 0
                  },
                  "enable": false,
                  "options": {}
                },
                "outModes": {
                  "default": "out",
                  "bottom": "out",
                  "left": "out",
                  "right": "out",
                  "top": "out"
                },
                "random": false,
                "size": false,
                "speed": 5,
                "spin": {
                  "acceleration": 0,
                  "enable": false
                },
                "straight": false,
                "trail": {
                  "enable": false,
                  "length": 10,
                  "fill": {}
                },
                "vibrate": false,
                "warp": false
              },
              "number": {
                "density": {
                  "enable": false,
                  "width": 1920,
                  "height": 1080
                },
                "limit": 0,
                "value": 200
              },
              "opacity": {
                "random": {
                  "enable": false,
                  "minimumValue": 0.1
                },
                "value": 1,
                "animation": {
                  "count": 0,
                  "enable": false,
                  "speed": 3,
                  "decay": 0,
                  "delay": 0,
                  "sync": false,
                  "mode": "auto",
                  "startValue": "random",
                  "destroy": "none",
                  "minimumValue": 0.1
                }
              },
              "reduceDuplicates": false,
              "shadow": {
                "blur": 0,
                "color": {
                  "value": "#000"
                },
                "enable": false,
                "offset": {
                  "x": 0,
                  "y": 0
                }
              },
              "shape": {
                "close": true,
                "fill": true,
                "options": {},
                "type": "circle"
              },
              "size": {
                "random": {
                  "enable": false,
                  "minimumValue": 1
                },
                "value": 3,
                "animation": {
                  "count": 0,
                  "enable": false,
                  "speed": 5,
                  "decay": 0,
                  "delay": 0,
                  "sync": false,
                  "mode": "auto",
                  "startValue": "random",
                  "destroy": "none"
                }
              },
              "stroke": {
                "width": 0
              },
              "zIndex": {
                "random": {
                  "enable": false,
                  "minimumValue": 0
                },
                "value": 5,
                "opacityRate": 0.5,
                "sizeRate": 1,
                "velocityRate": 1
              },
              "destroy": {
                "bounds": {},
                "mode": "none",
                "split": {
                  "count": 1,
                  "factor": {
                    "random": {
                      "enable": false,
                      "minimumValue": 0
                    },
                    "value": 3
                  },
                  "rate": {
                    "random": {
                      "enable": false,
                      "minimumValue": 0
                    },
                    "value": {
                      "min": 4,
                      "max": 9
                    }
                  },
                  "sizeOffset": true,
                  "particles": {}
                }
              },
              "roll": {
                "darken": {
                  "enable": false,
                  "value": 0
                },
                "enable": false,
                "enlighten": {
                  "enable": false,
                  "value": 0
                },
                "mode": "vertical",
                "speed": 25
              },
              "tilt": {
                "random": {
                  "enable": false,
                  "minimumValue": 0
                },
                "value": 0,
                "animation": {
                  "enable": false,
                  "speed": 0,
                  "decay": 0,
                  "sync": false
                },
                "direction": "clockwise",
                "enable": false
              },
              "twinkle": {
                "lines": {
                  "enable": false,
                  "frequency": 0.05,
                  "opacity": 1
                },
                "particles": {
                  "enable": false,
                  "frequency": 0.05,
                  "opacity": 1
                }
              },
              "wobble": {
                "distance": 5,
                "enable": false,
                "speed": {
                  "angle": 50,
                  "move": 10
                }
              },
              "life": {
                "count": 0,
                "delay": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0
                  },
                  "value": 0,
                  "sync": false
                },
                "duration": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0.0001
                  },
                  "value": 0,
                  "sync": false
                }
              },
              "rotate": {
                "random": {
                  "enable": false,
                  "minimumValue": 0
                },
                "value": 0,
                "animation": {
                  "enable": false,
                  "speed": 0,
                  "decay": 0,
                  "sync": false
                },
                "direction": "clockwise",
                "path": false
              },
              "orbit": {
                "animation": {
                  "count": 0,
                  "enable": false,
                  "speed": 1,
                  "decay": 0,
                  "delay": 0,
                  "sync": false
                },
                "enable": false,
                "opacity": 1,
                "rotation": {
                  "random": {
                    "enable": false,
                    "minimumValue": 0
                  },
                  "value": 45
                },
                "width": 1
              },
              "links": {
                "blink": false,
                "color": {
                  "value": "#ffffff"
                },
                "consent": false,
                "distance": 100,
                "enable": false,
                "frequency": 1,
                "opacity": 0.4,
                "shadow": {
                  "blur": 5,
                  "color": {
                    "value": "#000"
                  },
                  "enable": false
                },
                "triangles": {
                  "enable": false,
                  "frequency": 1
                },
                "width": 1,
                "warp": false
              },
              "repulse": {
                "random": {
                  "enable": false,
                  "minimumValue": 0
                },
                "value": 0,
                "enabled": false,
                "distance": 1,
                "duration": 1,
                "factor": 1,
                "speed": 1
              }
            },
            "pauseOnBlur": true,
            "pauseOnOutsideViewport": true,
            "responsive": [],
            "smooth": false,
            "style": {},
            "themes": [],
            "zLayers": 100,
            "emitters": {
              "autoPlay": true,
              "fill": true,
              "life": {
                "wait": false
              },
              "rate": {
                "quantity": 1,
                "delay": 7
              },
              "shape": "square",
              "startCount": 0,
              "size": {
                "mode": "percent",
                "height": 0,
                "width": 0
              },
              "particles": {
                "shape": {
                  "type": "images",
                  "options": {
                    "images": {
                      "src": "https://particles.js.org/images/cyan_amongus.png",
                      "width": 500,
                      "height": 634
                    }
                  }
                },
                "size": {
                  "value": 40
                },
                "move": {
                  "speed": 10,
                  "outModes": {
                    "default": "none",
                    "right": "destroy"
                  },
                  "straight": true
                },
                "zIndex": {
                  "value": 0
                },
                "rotate": {
                  "value": {
                    "min": 0,
                    "max": 360
                  },
                  "animation": {
                    "enable": true,
                    "speed": 10,
                    "sync": true
                  }
                }
              },
              "position": {
                "x": -5,
                "y": 55
              }
            },
            "motion": {
              "disable": false,
              "reduce": {
                "factor": 4,
                "value": true
              }
            }
          }}
        />
        <section class="text-gray-600 bg-[#ffffff8c] body-font">
          <div class="container mx-auto flex px-14 py-24 md:flex-row flex-col items-center">
            <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <img class="object-cover object-center rounded" alt="hero" src={hero} />
            </div>
            <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
                Streamline loan management processes with  our efficient and robust system.
              </h1>
              <p class="mb-8 leading-relaxed">Manage loans with ease and efficiency. Our advanced platform simplifies loan processing, tracking, and monitoring, making it a breeze for lenders and borrowers alike. Say goodbye to complex paperwork and manual processes..</p>

            </div>
          </div>
        </section>
      </section>


      <section class="text-gray-600 body-font">
        <div class="container px-5 py-14 mx-auto">
          <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="inline-block w-8 h-8 text-gray-400 mb-8" viewBox="0 0 975.036 975.036">
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            <p class="leading-relaxed text-lg">Success in loan management lies in leveraging an efficient system that streamlines operations and enhances the borrower experience.</p>
            <span class="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"></span>
            <h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">John Smith</h2>
            <p class="text-gray-500">Senior Product Designer</p>
          </div>
        </div>
      </section>


      <section id="about" class="text-gray-600 body-font min-h-screen">
        <div class="container lg:px-24 md:px-3 px-5 py-24 mx-auto flex flex-wrap">
          <div class="flex flex-wrap w-full">
            <div class="lg:w-1/2 md:w-1/2 md:pr-10 md:py-6">
              <div class="flex relative pb-12">
                <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 1</h2>
                  <p class="w-[80%] leading-relaxed">Select the specific role you require and Proceed with the authentication process to verify your identity.</p>
                </div>
              </div>
              <div class="flex relative pb-12">
                <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 bi bi-speedometer" viewBox="0 0 16 16">
                    <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z" />
                    <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z" />
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 2</h2>
                  <p class="w-[80%] leading-relaxed">Discover and navigate through the dashboard that we offer to explore its features and functionalities.</p>
                </div>
              </div>
              <div class="flex relative pb-12">
                <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="3"></circle>
                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 3</h2>
                  <p class="w-[80%] leading-relaxed">Seamlessly lend and receive money while efficiently managing loans for a streamlined transaction experience.</p>
                </div>
              </div>
              <div class="flex relative pb-12">
                <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi w-5 h-5 bi-bell-fill" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 4</h2>
                  <p class="w-[80%] leading-relaxed">Receive and send timely notifications for crucial loan process and management updates, ensuring you stay informed and connected.</p>
                </div>
              </div>
              <div class="flex relative">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">FINISH</h2>
                  <p class="w-[80%] leading-relaxed">Experience secure money management and loan requests with utmost confidentiality and safety through our platform's robust security measures.</p>
                </div>
              </div>
            </div>
            <img class="lg:w-1/2 min-h-[600px] h-[50vh] hidden md:block lg:block md:w-1/2 object-cover object-right-top
       rounded-lg md:mt-0 mt-12" src={steps} alt="step" />
          </div>
        </div>
      </section>


      <section className="w-full">
        <section class="text-gray-600 px-10 body-font">
          <div class="container px-5 pb-24 mx-auto">
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-20">Core Features
            </h1>
            <div class="flex flex-wrap sm:-m-4 -mx-4  -mt-4 md:space-y-0 space-y-6">
              <div class="p-4 md:w-1/3 flex">
                <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-6">
                  <h2 class="text-gray-900 text-lg title-font font-medium mb-2">Analysis</h2>
                  <p class="leading-relaxed text-base">Loan Management System Analysis: Evaluating efficiency, security, scalability, user experience, integration, and risk mitigation for streamlined loan operations.</p>

                </div>
              </div>
              <div class="p-4 md:w-1/3 flex">
                <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-6">
                  <h2 class="text-gray-900 text-lg title-font font-medium mb-2">Easy Management</h2>
                  <p class="leading-relaxed text-base">Easy loan management is essential for efficient operations. With a user-friendly interface, intuitive navigation, and streamlined processes, loan management becomes hassle-free. </p>

                </div>
              </div>
              <div class="p-4 md:w-1/3 flex">
                <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div class="flex-grow pl-6">
                  <h2 class="text-gray-900 text-lg title-font font-medium mb-2">User Management</h2>
                  <p class="leading-relaxed text-base">User management streamlines user accounts in a loan management system. It includes registration, authentication, authorization, and role management with Greater Help. </p>

                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <div className="w-full min-h-screen flex flex-col items-center py-10 md:py-16 lg:py-20">
  <div className="md:bg-gradient-to-bl bg-indigo-200 from-indigo-200 to-indigo-300 md:w- lg:w-4/5 md:shadow-2xl py-10 md:py-16 lg:pb-20 md:rounded-2xl mx-auto container">
    <h1 className="text-4xl md:text-5xl text-center mb-10 text-indigo-500 font-bold">How do We Calculate Loans?</h1>
    <div className="flex flex-wrap md:flex-nowrap  justify-evenly gap-3">
      <div className="w-full md:w-1/2 lg:w-2/5">
        <div className="w-full min-h-[400px] md:min-w-[350px] flex items-center justify-center">
          <div className="bg-white shadow-lg w-11/12 md:w-4/5 lg:w-4/5 px-8 py-10  rounded-xl">
          <h1 className="text-2xl font-semibold mb-4 text-indigo-500">Simple Loan Calculator</h1>
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
                className="w-full h-3 accent-indigo-500 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
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
                className="w-full h-3 accent-indigo-500 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
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
                className="w-full h-3 accent-indigo-500 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
              />
            </div>
            <button
              onClick={calculateLoan}
              className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none w-full"
            >
              Calculate
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center justify-center">
        <div className="md:w-80 md:h-80 w-96 h-96">
          <Doughnut data={data} options={options} />
        </div>
        <div className="md:mt-4 mt-8 flex w-full md:w-80 lg:w-72  flex-wrap md:flex-nowrap items-center justify-evenly md:justify-between">
          <div className="md:w-auto">
            <h2 className="text-lg font-semibold text-indigo-600">Monthly EMI</h2>
            <p title={"₹" + monthlyPayment} className="text-xl font-bold text-gray-700">₹{monthlyPayment}.00</p>
          </div>
          <div className="md:w-auto">
            <h2 className="text-lg font-semibold text-indigo-600">Total Payment</h2>
            <p className="text-xl font-bold text-gray-700">₹{totalPayment}.00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      

      <section id="contact" className="min-h-screen">
        <section class="text-gray-600 w-full h-screen body-font relative">
          <div class="absolute inset-0 bg-gray-300">
            <iframe width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" title="map" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.639618748838!2d80.04174647463134!3d12.930868615770883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f410ffffffff%3A0x4a25011cbe2f85b3!2sDhanalakshmi%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1696015793313!5m2!1sen!2sin" className=" contrast-" ></iframe>

          </div>
          <div class="container px-5 py-24 mx-auto flex">
            <form className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md" onSubmit={contactSubmit}>
              <h2 className="text-gray-900 text-2xl mb-1 font-medium">Connect with Us</h2>
              <p class="leading-relaxed  text-gray-600"> Reach out for inquiries and support regarding our Loan Management System.</p>

              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 inline-flex text-sm text-gray-600">Email  {errors.email && <p className="text-red-500 ms-3">{errors.email}</p>}</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

              </div>
              <div className="relative mb-2">
                <label htmlFor="message" className="leading-7 inline-flex text-sm text-gray-600">Message  {errors.message && <p className="text-red-500 ms-3">{errors.message}</p>}</label>
                <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>

              </div>
              {errors.responsesucess && <p className="text-green-500 mb-1 text-center">{errors.responsesucess}</p>}
              {errors.responseerror && <p className="text-red-500 mb-1 text-center">{errors.responseerror}</p>}
              <button type="submit" className="text-white bg-indigo-500 border-0 py-3 px-6 hover:bg-indigo-600 rounded-xl text-lg">Share the Response</button>
            </form>
          </div>
        </section>
      </section>


      <section class="text-gray-600 body-font">
        <div class="container flex flex-wrap px-5 py-5 mx-auto items-center">
          <div class="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 mb-10 md:mb-0 pb-10 ps-5 border-b border-gray-200">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">What we are Doing ?</h1>
            <p class="leading-relaxed text-base">Manage loans with ease and efficiency. Our advanced platform simplifies loan processing, tracking, and monitoring, making it a breeze for lenders and borrowers alike. Say goodbye to complex paperwork and manual processes..</p>
            <p className="leading-relaxed text-base">Mail to : <a className="text-indigo-600" href="mailto:santhoshtechnologies22@gmail.com" >santhoshtechnologies22@gmail.com</a> </p>

          </div>
          <div class="flex flex-col md:w-1/2 md:pl-12">
            <h2 class="title-font font-semibold text-gray-800 tracking-wider text-2xl mb-3">Important Links</h2>
            <nav class="flex flex-wrap list-none -mb-1">
              <li class="lg:w-1/3 mb-1 w-1/2">
                <a href="#home" class="text-gray-600 hover:text-gray-800">Home</a>
              </li>
              <li class="lg:w-1/3 mb-1 w-1/2">
                <a href="#about" class="text-gray-600 hover:text-gray-800">About</a>
              </li>
              <li class="lg:w-1/3 mb-1 w-1/2">
                <a href="#contact" class="text-gray-600 hover:text-gray-800">Contact</a>
              </li>
              <li class="lg:w-1/3 mb-1 w-1/2">
                <Link to="/llogin" class="text-gray-600 hover:text-gray-800">Login For Lenders</Link>
              </li>
              <li class="lg:w-1/3 mb-1 w-1/2">
                <Link to="/lregister" class="text-gray-600 hover:text-gray-800">Signup For Lenders</Link>
              </li>
              <li class="lg:w-1/3 mb-1 w-1/2">
                <Link to="/blogin" class="text-gray-600 hover:text-gray-800">Login For Borrowers</Link>
              </li>
              <li class="lg:w-1/3 mb-1 w-1/2">
                <Link to="/bregister" class="text-gray-600 hover:text-gray-800">Signup For Borrowers</Link>
              </li>
              <li class="lg:w-1/3 mb-1 w-1/2">
                <Link to="/adminlogin" class="text-gray-600 hover:text-gray-800">Admin Login</Link>
              </li>

            </nav>
          </div>
        </div>
      </section>


      <footer class="text-white bg-indigo-500 body-font">
        <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a href="#home" class="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <i className="fa-solid fa-handshake text-white text-3xl"></i>
            <span class="ml-3 text-xl">Loaners</span>
          </a>
          <p class="text-sm text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2023 Loaners — Designed by
            <a href="https://santhosh-technologies.netlify.app" class="text-white ml-1" rel="noopener noreferrer" target="_blank">Santhosh Technologies</a>
          </p>

        </div>
      </footer>
    </div>
  );
}

export default Home;