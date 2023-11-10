import express  from "express";
import mysql from "mysql2";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const connection = mysql.createConnection(
	{
		host:"localhost",
		user:"root",
		password:"santhosh",
		database:"loanmanagement"
	}
);

connection.connect((err) => {
	if (err) {
	  console.error('Error connecting to MySQL:', err);
	  return;
	}
	console.log('Connected to MySQL!');
  });

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'santhoshtechnologies22@gmail.com',
	  pass: 'kbvjelgiowvlijia'
	}
  });

  app.post("/borrowerregister", (req, res) => {
	const checkQuery = "SELECT COUNT(*) AS count FROM borrower WHERE email = ?";
	const checkValue = req.body.email;
  
	connection.query(checkQuery, checkValue, (err, result) => {
	  if (err) {
		console.error(err);
		return res.sendStatus(500);
	  }
  
	  const count = result[0].count;
	  if (count > 0) {
		return res.sendStatus(200);
	  }
  
	  const insertQuery =
		"INSERT INTO borrower (name, email, phonenumber, employment, income,address, country,state,city, bankdetails, purpose, password,aadhardetails,dob) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)";
	  const insertValues = [
		req.body.name,
		req.body.email,
		req.body.phoneNumber,
		req.body.employment,
		req.body.income,
		(req.body.city+','+req.body.state+','+req.body.country),
		req.body.country,
		req.body.state,
		req.body.city,
		req.body.bankDetails,
		req.body.purpose,
		req.body.password,
		req.body.aadharnumber,
		req.body.dob
	  ];
  
	  connection.query(insertQuery, insertValues, (err, result) => {
		if (err) {
		  console.error(err);
		  return res.sendStatus(500);
		}
  
		function generateOTP() {
		  let otp = Math.floor(1000 + Math.random() * 9000);
		  return otp.toString();
		}
  
		const otp = generateOTP();
  
		const mailOptions = {
		  from: 'santhoshtechnologies22@gmail.com',
		  to: req.body.email,
		  subject: 'Sign Up Verification code For Your Borrower Account',
		  html: `<p>Your One-time Password for Loaners Borrower Account Registration is <br/> <h1>${otp}</h1></p><br/> <p>If you did not make this request, please ignore this email.</p>`
		};
  
		transporter.sendMail(mailOptions, (error, info) => {
		  if (error) {
			console.error(error);
			return res.sendStatus(500);
		  }
  
		  console.log('Email sent: ' + info.response);
  
		  const updateQuery = "UPDATE borrower SET signupotp = ? WHERE email = ?";
		  connection.query(updateQuery, [otp, req.body.email], (err) => {
			if (err) {
			  console.error(err);
			  return res.sendStatus(500);
			}
  
			return res.sendStatus(201);
		  });
		});
	  });
	});
  });

app.post("/lenderregister", (req, res) => {
	const checkQuery = "SELECT COUNT(*) AS count FROM lender WHERE email = ?";
	const checkValue = req.body.email;
  
	connection.query(checkQuery, checkValue, (err, result) => {
	  if (err) {
		console.error(err);
		res.sendStatus(500);
	  } else {
		const count = result[0].count;
		if (count > 0) {
		  res.sendStatus(200);
		} else {
		  const insertQuery =
			"INSERT INTO lender (name, email, phonenumber, intrest, timeperiod, penaltyamount, bankdetails, agrement, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
		  const insertValues = [
			req.body.name,
			req.body.email,
			req.body.phoneNumber,
			req.body.intrest,
			req.body.Repayment,
			req.body.penalty,
			req.body.bankDetails,
			req.body.SecurityAgreement,
			req.body.password
		  ];
  
		  connection.query(insertQuery, insertValues, (err, result) => {
			if (err) {
			  console.error(err);
			  res.sendStatus(500);
			} else {
				function generateOTP() {
					let otp = Math.floor(1000 + Math.random() * 9000);
					return otp.toString();
				  }
			
				  const otp = generateOTP();
			
				  const mailOptions = {
					from: 'santhoshtechnologies22@gmail.com',
					to: req.body.email,
					subject: 'Sign Up Verification code For Your Lender Account',
					html: `<p>Your One-time Password for Loaners Borrower Account Registration is <br/> <h1>${otp}</h1></p><br/> <p>If you did not make this request, please ignore this email.</p>`
				  };
			
				  transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
					  console.error(error);
					  return res.sendStatus(500);
					}
			
					console.log('Email sent: ' + info.response);
			
					const updateQuery = "UPDATE lender SET signupotp = ? WHERE email = ?";
					connection.query(updateQuery, [otp, req.body.email], (err) => {
					  if (err) {
						console.error(err);
						return res.sendStatus(500);
					  }
			
					  return res.sendStatus(201);
					});
				  });
			}
		  });
		}
	  }
	});
  });

app.post("/borrowerlogin",(req,res)=>{
	const { email, password } = req.body;

	connection.query('SELECT * FROM borrower WHERE email = ? AND password = ?', [email, password], (error, results) => {
	  if (error) {
		console.error('Error executing MySQL query', error);
		res.status(500).json({ message: 'Internal server error' });
		return;
	  }
  
	  if (results.length > 0) {
		const id = results[0].id;
		const token = jwt.sign({id},"SanthoshTechnologies",{expiresIn:'1h'});
		if(results[0].emailverified == 'true'){
			res.status(200).json({token});
		}
		else{
			res.sendStatus(203);
		}
	  } else {
		res.sendStatus(401);
	  }
	});

});

app.post("/adminlogin",(req,res)=>{
	const { email, password } = req.body;

	connection.query('SELECT * FROM admin WHERE email = ? AND password = ?', [email, password], (error, results) => {
	  if (error) {
		console.error('Error executing MySQL query', error);
		res.status(500).json({ message: 'Internal server error' });
		return;
	  }
  
	  if (results.length > 0) {
		const id = results[0].idadmin;
		const token = jwt.sign({id},"Admin",{expiresIn:'1h'});
		res.status(200).json({token});
		
	  } else {
		res.sendStatus(401);
	  }
	});

});

app.post("/lenderlogin", (req, res) => {
	const { email, password } = req.body;
  
	connection.query(
	  'SELECT * FROM lender WHERE email = ? AND password = ? ',
	  [email, password],
	  (error, results) => {
		if (error) {
		  console.error('Error executing MySQL query', error);
		  res.sendStatus(500);
		} else {
		  if (results.length > 0) {
			if(results[0].emailverified == 'true'){
			const id = results[0].id;
		    const token = jwt.sign({id},"SanthoshTechnologieslender",{expiresIn:'1h'});
		    res.status(200).json({token});
			}
			else{
				res.sendStatus(202);
			}
		  } else {
			res.sendStatus(201);
		  }
		}
	  }
	);
  });

const verifytoken = (req,res,next)=>{
 const token = req.headers["access-token"];
if(!token){
	return res.status(400).json("We need Access Token");
}else{
	jwt.verify(token,"SanthoshTechnologies",(err,decoded)=>{
		if(err){
			console.log("not authenticated")
            res.status(401).json("Not Authenticated");
		}
		else{
			req.userId = decoded.id;
			next();
		}
	})
}
 
}
  
app.get("/checkauth",verifytoken,(req,res)=>{
	console.log("Successs");
	return res.status(200).json("Authenticated");
})

const verifyadmintoken = (req,res,next)=>{
	const token = req.headers["access-token"];
   if(!token){
	   return res.status(400).json("We need Access Token");
   }else{
	   jwt.verify(token,"Admin",(err,decoded)=>{
		   if(err){
			   console.log("not authenticated")
			   res.status(401).json("Not Authenticated");
		   }
		   else{
			   req.userId = decoded.id;
			   next();
		   }
	   })
   }
	
   }

app.get("/checkauthadmin",verifyadmintoken,(req,res)=>{
	console.log("Successs");
	return res.status(200).json("Authenticated");
})

app.post('/contactform', (req, res) => {
	const { email, message } = req.body;
	console.log(email, message);
  
	const checkQuery = 'SELECT * FROM contact WHERE email = ?';
	connection.query(checkQuery, [email], (checkErr, checkResult) => {
	  if (checkErr) {
		console.error(checkErr);
		res.sendStatus(500);
	  } else {
		if (checkResult.length > 0) {
		  res.sendStatus(201); 
		} else {
		  const insertQuery = 'INSERT INTO contact (email, message) VALUES (?, ?)';
		  connection.query(insertQuery, [email, message], (insertErr, insertResult) => {
			if (insertErr) {
			  console.error(insertErr);
			  res.sendStatus(500);
			} else {
				
				  var mailOptions = {
					from: 'santhoshtechnologies22@gmail.com',
					to: email,
					subject: 'Thanks For Your FeedBack',
					html: `<p>Thanks for sharing your response with Loaners (Loan Management System)</p>`
				  };
				  transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
					  console.log(error);
					  res.sendStatus(200);
					} else {
			  res.sendStatus(200);}})
			}
		  });
		}
	  }
	});
  });

  app.post("/generateotp", (req, res) => {
	const email = req.body.email;
	const resend = req.body.resend;
	
	const sQuery = "SELECT COUNT(*) AS count FROM borrower WHERE email = ?";
  
	connection.query(sQuery, email, (err, result) => {
	  if (err) {
		console.error(err);
		res.sendStatus(500);
	  } else {
		const count = result[0].count;
		
		if (count > 0) {
		  const emailCountQuery = "SELECT email_send FROM borrower WHERE email = ?";
		  
		  connection.query(emailCountQuery, [email], (err, result) => {
			if (err) {
			  console.error(err);
			  res.sendStatus(500);
			} else {
			  const emailCount = result[0].email_send;
			  
			  if (emailCount < 1 || resend) {
				function generateOTP() {
				  let op = Math.floor(1000 + Math.random() * 9000);
				  return op.toString();
				}
				
				const otp = generateOTP();
				
				
  
				var mailOptions = {
				  from: 'santhoshtechnologies22@gmail.com',
				  to: email,
				  subject: 'Reset your password For Loaners Borrower Account',
				  html: `<p>Your One-time Password is <br/> <h1> ${otp}</h1></p><br/> <p>If you did not make this request, please ignore this email.</p>`
				};
  
				transporter.sendMail(mailOptions, function (error, info) {
				  if (error) {
					console.log(error);
					res.sendStatus(500);
				  } else {
					console.log('Email sent: ' + info.response);
					const updateQuery = "UPDATE borrower SET otp = ?, email_send = 1 WHERE email = ?";
					connection.query(updateQuery, [otp, email], (err) => {
					  if (err) {
						console.error(err);
						res.sendStatus(500);
					  } else {
						res.sendStatus(200);
					  }
					});
				  }
				});
			  } else {
				res.sendStatus(226); // Unauthorized, email already sent
			  }
			}
		  });
		} else {
		  res.sendStatus(201); // Email not found
		}
	  }
	});
  });

app.post("/checkotp",(req,res)=>{
	const email = req.body.email;
	const otpclient = req.body.otp;

	const sQuery = "SELECT COUNT(*) AS count FROM borrower WHERE email = ?";

	connection.query(sQuery, email, (err, result) => {
		if (err) {
		  console.error(err);
		  res.sendStatus(500);
		} else {
		  const count = result[0].count;
		  if(count > 0){

           const otpquery = 'select otp from borrower where email = ?';
            connection.query(otpquery,email,(err,result)=>{
				if(err){
					console.log(err);
				}
				else{
					var dbOtp = result[0]['otp'];
					if(otpclient == dbOtp){
						res.sendStatus(200) 
					}
					else{
						res.sendStatus(201)
					}
				}
			})
		  } else {
			res.sendStatus(202);
		  }
		}
	  });
	

})

app.post("/changepassword",(req,res)=>{
	const email = req.body.email;
	const newpassword = req.body.password;

	const passquery = 'UPDATE borrower SET password = ? WHERE email = ?';
	const passcheckquery ="SELECT password from borrower where email = ?";
	connection.query(passcheckquery,[email],function(err,rows){
	const password = rows[0].password;
	if(password == newpassword){
       res.sendStatus(201);
	}
	else{
		connection.query(passquery,[newpassword,email],function(err){
			if (err) {
				console.error(err);
				res.sendStatus(500);
			  } else {
				var mailOptions = {
					from: 'santhoshtechnologies22@gmail.com',
					to: email,
					subject: 'Loaners - Password Changed',
					html: `<p>Your Password Has been Changed Successfully . Login with new Password</p>`
				  };
	
				  transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
					  console.log(error);
					  res.sendStatus(500);
					} else {
					  console.log('Email sent: ' + info.response);
					  res.sendStatus(200);
					}
				  });
			  }
		})
	}
	
	});
})

app.post("/lchangepassword",(req,res)=>{
	const email = req.body.email;
	const newpassword = req.body.password;

	const passquery = 'UPDATE lender SET password = ? WHERE email = ?';
	const passcheckquery ="SELECT password from lender where email = ?";
	connection.query(passcheckquery,[email],function(err,rows){
	const password = rows[0].password;
	if(password == newpassword){
       res.sendStatus(201);
	}
	else{
		connection.query(passquery,[newpassword,email],function(err){
			if (err) {
				console.error(err);
				res.sendStatus(500);
			  } else {
				res.sendStatus(200);
			  }
		})
	}
	
	});
})

app.post("/lgenerateotp", (req, res) => {
	const email = req.body.email;
	const resend = req.body.resend;
	
	const sQuery = "SELECT COUNT(*) AS count FROM lender WHERE email = ?";
  
	connection.query(sQuery, email, (err, result) => {
	  if (err) {
		console.error(err);
		res.sendStatus(500);
	  } else {
		const count = result[0].count;
		
		if (count > 0) {
		  const emailCountQuery = "SELECT email_send FROM lender WHERE email = ?";
		  
		  connection.query(emailCountQuery, [email], (err, result) => {
			if (err) {
			  console.error(err);
			  res.sendStatus(500);
			} else {
			  const emailCount = result[0].email_send;
			  
			  if (emailCount < 1 || resend) {
				function generateOTP() {
				  let op = Math.floor(1000 + Math.random() * 9000);
				  return op.toString();
				}
				
				const otp = generateOTP();
  
				var mailOptions = {
				  from: 'santhoshtechnologies22@gmail.com',
				  to: email,
				  subject: 'Reset your password For Loaners Lender Account',
				  html: `<p>Your One-time Password is <br/> <h1> ${otp}</h1></p><br/> <p>If you did not make this request, please ignore this email.</p>`
				};
  
				transporter.sendMail(mailOptions, function (error, info) {
				  if (error) {
					console.log(error);
					res.sendStatus(500);
				  } else {
					console.log('Email sent: ' + info.response);
					const updateQuery = "UPDATE lender SET otp = ?, email_send = 1 WHERE email = ?";
					connection.query(updateQuery, [otp, email], (err) => {
					  if (err) {
						console.error(err);
						res.sendStatus(500);
					  } else {
						res.sendStatus(200);
					  }
					});
				  }
				});
			  } else {
				res.sendStatus(226); // Unauthorized, email already sent
			  }
			}
		  });
		} else {
		  res.sendStatus(201); // Email not found
		}
	  }
	});
  });

app.post("/lcheckotp",(req,res)=>{
	const email = req.body.email;
	const otpclient = req.body.otp;

	const sQuery = "SELECT COUNT(*) AS count FROM lender WHERE email = ?";

	connection.query(sQuery, email, (err, result) => {
		if (err) {
		  console.error(err);
		  res.sendStatus(500);
		} else {
		  const count = result[0].count;
		  if(count > 0){

           const otpquery = 'select otp from lender where email = ?';
            connection.query(otpquery,email,(err,result)=>{
				if(err){
					console.log(err);
				}
				else{
					var dbOtp = result[0]['otp'];
					if(otpclient == dbOtp){
						res.sendStatus(200) 
					}
					else{
						res.sendStatus(201)
					}
				}
			})
		  } else {
			res.sendStatus(202);
		  }
		}
	  });
	

})

const verifytokenlender = (req,res,next)=>{
	const token = req.headers["access-token"];
   if(!token){
	   return res.status(400).json("We need Access Token");
   }else{
	   jwt.verify(token,"SanthoshTechnologieslender",(err,decoded)=>{
		   if(err){
			   console.log("not authenticated")
			   res.status(401).json("Not Authenticated");
		   }
		   else{
			   req.userId = decoded.id;
			   next();
		   }
	   })
   }
	
   }
	 
app.get("/lcheckauth",verifytokenlender,(req,res)=>{
	   console.log("Successs");
	   return res.status(200).json("Authenticated");
   })
 
   app.post("/borrowergetdetails", (req, res) => {
	const token = req.body.token;
	const getdetailsquery = "SELECT id,name, email, phonenumber, employment, income, address, purpose,amount , bankdetails ,aadhardetails,dob FROM borrower WHERE id = ?";
  
	jwt.verify(token, 'SanthoshTechnologies', function (err, decoded) {
	  if (err) {
		console.log("Invalid Access Token");
		res.status(400).json("Invalid Access Token");
	  } else {
		const id = decoded.id;
		connection.query(getdetailsquery, id, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(401).json(err);
		  } else {
			const details = {
			  id:  result[0].id,
			  name: result[0].name,
			  email: result[0].email,
			  phonenumber: result[0].phonenumber,
			  employment: result[0].employment,
			  income: result[0].income,
			  address: result[0].address,
			  purpose: result[0].purpose,
			  amount: result[0].amount,
			  bankdetails: result[0].bankdetails,
			  aadharnumber:result[0].aadhardetails,
			  dob:result[0].dob
			};
			res.status(200).json(details);
		  }
		});
	  }
	});
  });

  app.post("/getborrowercustomdetails", (req, res) => {
	const token = req.body.token;
	const field = req.body.field;
	const getdetailsquery = "SELECT * from borrower WHERE id = ?";
  
	jwt.verify(token, 'SanthoshTechnologies', function (err, decoded) {
	  if (err) {
		console.log("Invalid Access Token");
		res.status(400).json("Invalid Access Token");
	  } else {
		const id = decoded.id;
		connection.query(getdetailsquery, [id], (err, result) => {
		  if (err) {
			
			res.status(401).json(err);
		  } else {
		
			res.status(200).json(result[0][field]);
		  }
		});
	  }
	});
  });

  app.post("/lendergetdetails", (req, res) => {
	const token = req.body.token;
	const getdetailsquery = "SELECT id, name, email, phonenumber, intrest, timeperiod, penaltyamount, bankdetails ,agrement , amount , emailverified FROM lender WHERE id = ?";
  
	jwt.verify(token, 'SanthoshTechnologieslender', function (err, decoded) {
	  if (err) {
		console.log("Invalid Access Token");
		res.status(400).json("Invalid Access Token");
	  } else {
		const id = decoded.id;
		connection.query(getdetailsquery, id, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(401).json(err);
		  } else {
			const details = {
			  id: result[0].id,
			  name: result[0].name,
			  email: result[0].email,
			  phonenumber: result[0].phonenumber,
			  intrest: result[0].intrest,
			  timeperiod: result[0].timeperiod,
			  penaltyamount: result[0].penaltyamount,
			  bankdetails: result[0].bankdetails,
			  agrement: result[0].agrement,
			  amount: result[0].amount,
			  type: result[0].type,
			  emailverified: result[0].emailverified
			};
  
			res.status(200).json(details);
		  }
		});
	  }
	});
  });

  app.post("/admingetdetails", (req, res) => {
    const token = req.body.token;
    const getdetailsquery = "SELECT idadmin, name, email, phonenumber FROM admin WHERE idadmin = ?";
  
    jwt.verify(token, 'Admin', function (err, decoded) {
        if (err) {
            console.log("Invalid Access Token");
            res.status(400).json("Invalid Access Token Admin");
        } else {
            const id = decoded.id;
            connection.query(getdetailsquery, [id], (err, result) => { 
                if (err) {
                    console.log(err);
                    res.status(401).json(err);
                } else {
                    if (result.length > 0) {
                        const details = {
                            id: result[0].idadmin,
                            name: result[0].name,
                            email: result[0].email,
                            phonenumber: result[0].phonenumber
                        };
                        res.status(200).json(details);
                    } else {
                        console.log("Admin not found");
                        res.status(404).json("Admin not found");
                    }
                }
            });
        }
    });
});

  app.post("/getloansbyborrower", (req, res) => {
	const borrower = req.body.email;
	const getdetailsquery = "select * from loans where borrower = ? and status = 'approved'";
  

		connection.query(getdetailsquery, borrower, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(400).json(err);
		  } else {
			
			if(result.length > 0){
					res.status(200).json(result);
			}
			else{
				res.sendStatus(404);
			}

		  }
        });

});

app.post("/getloansbylender", (req, res) => {
	const borrower = req.body.email;
	const getdetailsquery = "select * from loans where lender = ? and status = 'approved'";
  
		connection.query(getdetailsquery, borrower, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(400).json(err);
		  } else {
			
			if(result.length > 0){
					res.status(200).json(result);
			}
			else{
				res.sendStatus(404);
			}

		  }
        });

});

app.post("/getactiveborrowerloancount", (req, res)=>{
	const borrower = req.body.email;
	const getdetailsquery = "select count(*) as count from loans where borrower = ? and status ='approved'";
  

		connection.query(getdetailsquery, borrower, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(400).json(err);
		  } else {
			if(result.length > 0){
					res.status(200).json(result[0]);
			}
			else{
				res.sendStatus(404);
			}

		  }
        });

});

app.post("/getrejectedborrowerloancount", (req, res)=>{
	const borrower = req.body.email;
	const getdetailsquery = "select count(*) as count from loans where borrower = ? and status ='rejected'";
  

		connection.query(getdetailsquery, borrower, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(400).json(err);
		  } else {
			if(result.length > 0){
					res.status(200).json(result[0]);
			}
			else{
				res.sendStatus(404);
			}

		  }
        });

});

app.get("/lenderscount", (req, res)=>{
	const getdetailsquery = "select count(*) as count from lender";
  

		connection.query(getdetailsquery, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(400).json(err);
		  } else {
			if(result.length > 0){
					res.status(200).json(result[0]);
			}
			else{
				res.sendStatus(404);
			}

		  }
        });

});

app.get("/borrowerscount", (req, res)=>{
	const getdetailsquery = "select count(*) as count from borrower";
  

		connection.query(getdetailsquery, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(400).json(err);
		  } else {
			if(result.length > 0){
					res.status(200).json(result[0]);
			}
			else{
				res.sendStatus(404);
			}

		  }
        });

});


app.post("/getactivelenderloancount", (req, res)=>{
	const borrower = req.body.email;
	const getdetailsquery = "select count(*) as count from loans where lender = ? and status ='approved'";
  

		connection.query(getdetailsquery, borrower, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(400).json(err);
		  } else {
			if(result.length > 0){
					res.status(200).json(result[0]);
			}
			else{
				res.sendStatus(404);
			}

		  }
        });

});

app.post("/getrequestedlenderloancount", (req, res)=>{
	const borrower = req.body.email;
	const getdetailsquery = "select count(*) as count from requestloan";
  

		connection.query(getdetailsquery, borrower, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(400).json(err);
		  } else {
			if(result.length > 0){
					res.status(200).json(result[0]);
			}
			else{
				res.sendStatus(404);
			}

		  }
        });

});

app.post("/getborrowerhistory", (req, res) => {
	const borrower = req.body.email;
	const getdetailsquery = "select * from loans where borrower = ? ";
		connection.query(getdetailsquery, borrower, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(400).json(err);
		  } else {
			if(result.length > 0){
					res.status(200).json(result);
			}
			else{
				res.sendStatus(404);
			}

		  }
        });

});

app.get("/getborrowersdetails", (req, res) => {
	const getdetailsquery = "select * from loans ";
		connection.query(getdetailsquery, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(400).json(err);
		  } else {
			if(result.length > 0){
					res.status(200).json(result);
			}
			else{
				res.sendStatus(404);
			}

		  }
        });

});

app.post("/getlenderhistory", (req, res) => {
	const lender = req.body.email;
	const getdetailsquery = "select * from loans where lender = ? ";
  

		connection.query(getdetailsquery, lender, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(400).json(err);
		  } else {
			if(result.length > 0){
					res.status(200).json(result);
			}
			else{
				res.sendStatus(404);
			}

		  }
        });

});


app.post("/loanrequest", (req, res) => {
		  const insertQuery ="INSERT INTO requestloan (amount, pintrest,repayment, proof, borrower, borroweremail,type,totalamount) VALUES (?, ?, ?, ?, ?, ?, ? , ? )";
          
		  const insertValues = [
			req.body.amount,
			req.body.interest,
			req.body.Repayment,
			req.body.proof,
			req.body.borrower,
			req.body.borroweremail,
			req.body.type,
			req.body.total
		  ];
          console.log(insertValues)
		  connection.query(insertQuery, insertValues, (err, result) => {
			if (err) {
			  console.error(err);
			  res.sendStatus(500);
			} else {
				const mailOptions = {
					from: 'santhoshtechnologies22@gmail.com',
					to: req.body.borroweremail,
					subject: 'Loan Requested Successfully',
					html: `<p>Hello ${req.body.borrower},</p>
					<p>Your Loan has been requested Successfully</p>
					<p><b>Loan Amount:</b> ₹${req.body.amount}</p>
					<p><b>Total Loan Amount (including intrest) :</b> ₹${req.body.total}</p>
					<p><b>Loan Type:</b> ${req.body.type} Loan</p>
					<p>Duration: ${req.body.Repayment}years</p>
					<p><b>Accepted Intrest Rate:</b> ${req.body.interest}%</p>
					<p>We have evaluated your loan with lenders. If approved, we will respond accordingly</p>
					<p>If you did not make this request, please ignore this email.</p>`
				  };
			
				  transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						console.error(error);
						res.sendStatus(400);
					}
			        else{
						res.sendStatus(201);
						console.log("Email Sent	")
					}
				});
			}
		  });
		
	  
  });

app.get('/getloanrequest',(req,res)=>{
	const getquery = "select * from requestloan ";
    connection.query(getquery,(err,response)=>{
      if(err){
		res.sendStatus(400);
	  }
	  else{
		res.status(200).json(response);
	  }
	})
})
   
app.post('/acceptloan',(req,res)=>{
    const details = req.body.details;
	const deletequery = "DELETE FROM requestloan WHERE loanid = ?";
	const insertquery = " INSERT INTO loans(amount,lender,borrower,intrest,timeperiod,penalty,status,lendername,borrowername,type,totalamount,principalamount)VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    
	console.log(details)

	connection.query(deletequery,[details.loanid],(err,response)=>{
		if(err){
			console.log(err);
			res.sendStatus(401);
		}
		else{
			connection.query(insertquery,[details.pamount,details.lender,details.borrower,details.interest,details.timeperiod,0,details.status,details.lendername,details.borrowername,details.type,details.pamount,details.amount],(err,response)=>{
				if(err){
					console.log(err);
					res.sendStatus(400);
				}
				else{
					const mailOptions = {
						from: 'santhoshtechnologies22@gmail.com',
						to: details.borrower,
						subject: `Loan ${details.status}`,
						html: `<p>Hello ${details.borrowername},</p>
						<p>Your Loan has been ${details.status} by ${details.lendername} (${details.lender})</p>
						<p><b>Loan Amount:</b> ₹${details.amount}</p>
						<p><b>Total Loan  Amount:</b> ₹${details.pamount}</p>
						<p><b>Loan Type:</b> ${details.type} Loan</p>
						<p><b> Intrest Rate:</b> ${details.interest}%</p>
						<p><b> Duration:</b>${details.timeperiod}years</p>
						<p>If you did not make this request, please ignore this email.</p>`
					  };
				
					  transporter.sendMail(mailOptions, (error, info) => {
						if (error) {
							console.error(error);
							res.sendStatus(400);
						}
						else{
							res.sendStatus(200);
						}
					});	
				}
			})
		}
	})
})   

app.post("/borrowerrequestedloans", (req, res) => {
	const borrower = req.body.email;
	const getdetailsquery = "select * from requestloan where borroweremail = ?";
  

		connection.query(getdetailsquery, borrower, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(400).json(err);
		  } else {
			
			if(result.length > 0){
					res.status(200).json(result);
			}
			else{
				res.sendStatus(404);
			}

		  }
        });

});

app.post('/cancelloan',(req,res)=>{
    const id = req.body.loanid;
	const borroweremail = req.body.email;
	const name = req.body.name;
	const amount = req.body.amount;
	const deletequery = "DELETE FROM requestloan WHERE loanid = ?";


	connection.query(deletequery,[id],(err,response)=>{
		if(err){
			console.log(err);
			res.sendStatus(401);
		}
		else{
            const mailOptions = {
				from: 'santhoshtechnologies22@gmail.com',
				to: borroweremail,
				subject: 'Loan Cancelled',
				html: `<p>Hello ${name},</p>
				<p>Your Loan for ₹${amount} has been Cancelled </p>
				<p>If you did not make this request, please ignore this email.</p>`
			  };
		
			  transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.error(error);
					res.sendStatus(400);
				}
				else{
					res.sendStatus(200);
				}
			});	
		}
	})
});

app.post('/loanrepayment', (req, res) => {
	const { amount, loanid, borroweremail ,paid} = req.body;
  
	const updateQuery = "UPDATE loans SET amount = ? WHERE loanid = ? AND borrower = ?";
	const checkQuery = "SELECT * FROM loans WHERE loanid = ? AND borrower = ?";
	const updateStatusQuery = "UPDATE loans SET status = 'paid' WHERE loanid = ? AND borrower = ?";
  
	connection.query(updateQuery, [amount, loanid, borroweremail], (err, updateResponse) => {
	  if (err) {
		console.log(err);
		return res.sendStatus(401);
	  }
  
	  connection.query(checkQuery, [loanid, borroweremail], (checkErr, checkResponse) => {
		if (checkErr) {
		  console.log(checkErr);
		  return res.sendStatus(401);
		}
  
		const loanAmount = checkResponse[0].amount;
  
		if (loanAmount === 0) {
		  connection.query(updateStatusQuery, [loanid, borroweremail], (updateStatusErr, updateStatusResponse) => {
			if (updateStatusErr) {
			  console.log(updateStatusErr);
			  return res.sendStatus(401);
			}
			const mailOptions = {
				from: 'santhoshtechnologies22@gmail.com',
				to: borroweremail,
				subject: 'Loan Acknowledgement',
				html: `<p>Hello ${checkResponse[0].borrowername},</p>
				<p>You have paid Full Amount ₹${checkResponse[0].totalamount} on ${new Date()}</p>
				<p>Total Loan Amount:</b> ₹${checkResponse[0].totalamount}</p>
				<p>Thanks For Making transaction with us !!</p>
				<p>If you did not make this request, please ignore this email.</p>`
			  };
		
			  transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
				  console.error(error);
				   res.sendStatus(400);
				}
			
			   return res.sendStatus(200);
			  })
		  });
		} else {
			const mailOptions = {
				from: 'santhoshtechnologies22@gmail.com',
				to: borroweremail,
				subject: 'Loan Acknowledgement',
				html: `<p>Hello ${checkResponse[0].borrowername},</p>
				<p>You have paid ₹${paid} on ${new Date()}</p>
				<p>Total Loan Amount: ₹${checkResponse[0].totalamount}</p>
				<p>Balance Loan Amount: ₹${checkResponse[0].amount}</p>
				<p>Thanks For Making transaction with us !!</p>
				<p>If you did not make this request, please ignore this email.</p>`
			  };
		
			  transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
				  console.error(error);
				   res.sendStatus(400);
				}
			
			   return res.sendStatus(200);
			  })
		}
	  });
	});
  });


app.post("/checkborrowersignupotp",(req,res)=>{
	const email = req.body.email;
	const otpclient = req.body.otp;

	const sQuery = "SELECT COUNT(*) AS count FROM borrower WHERE email = ?";

	connection.query(sQuery, email, (err, result) => {
		if (err) {
		  console.error(err);
		  res.sendStatus(500);
		} else {
		  const count = result[0].count;
		  if(count > 0){

           const otpquery = 'select signupotp from borrower where email = ?';
            connection.query(otpquery,email,(err,result)=>{
				if(err){
					console.log(err);
				}
				else{
					var dbOtp = result[0]['signupotp'];
					if(otpclient == dbOtp){
					const emailverifiedquery = "update borrower set emailverified = 'true' where email = ?";
					connection.query(emailverifiedquery,email,(err,result)=>{
						if(err){
                            res.sendStatus(400);
						}
						else{
							res.sendStatus(200);
						}
					}
					
					)
					 
					}
					else{
						res.sendStatus(201)
					}
				}
			})
		  } else {
			res.sendStatus(202);
		  }
		}
	  });
	

})

app.post("/resendborrowersignupotp",(req,res)=>{
	const email = req.body.email;
	const otpclient = req.body.otp;

	const sQuery = "SELECT COUNT(*) AS count FROM borrower WHERE email = ?";

	connection.query(sQuery, email, (err, result) => {
		if (err) {
		  console.error(err);
		  res.sendStatus(500);
		} else {
		  const count = result[0].count;
		  if(count > 0){
           
				
			function generateOTP() {
				let otp = Math.floor(1000 + Math.random() * 9000);
				return otp.toString();
			  }
		
			  const otp = generateOTP();
		
			  const mailOptions = {
				from: 'santhoshtechnologies22@gmail.com',
				to: req.body.email,
				subject: 'Sign Up Verification code',
				html: `<p>Your One-time Password for Loaners Borrower Account Registration is <br/> <h1>${otp}</h1></p><br/> <p>If you did not make this request, please ignore this email.</p>`
			  };
		
			  transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
				  console.error(error);
				   res.sendStatus(400);
				}
		
				console.log('Email sent: ' + info.response);
		
				const updateQuery = "UPDATE borrower SET signupotp = ? WHERE email = ?";
				connection.query(updateQuery, [otp, req.body.email], (err) => {
				  if (err) {
					console.error(err);
					return res.sendStatus(500);
				  }
		
				  return res.sendStatus(200);
				});
			  });
					
				
		  } else {
			res.sendStatus(202);
		  }
		}
	  });
	

})

app.post("/checklendersignupotp",(req,res)=>{
	const email = req.body.email;
	const otpclient = req.body.otp;

	const sQuery = "SELECT COUNT(*) AS count FROM lender WHERE email = ?";

	connection.query(sQuery, email, (err, result) => {
		if (err) {
		  console.error(err);
		  res.sendStatus(500);
		} else {
		  const count = result[0].count;
		  if(count > 0){

           const otpquery = 'select signupotp from lender where email = ?';
            connection.query(otpquery,email,(err,result)=>{
				if(err){
					console.log(err);
				}
				else{
					var dbOtp = result[0]['signupotp'];
					if(otpclient == dbOtp){
					const emailverifiedquery = "update lender set emailverified = 'true' where email = ?";
					connection.query(emailverifiedquery,email,(err,result)=>{
						if(err){
                            res.sendStatus(400);
						}
						else{
							res.sendStatus(200);
						}
					}
					
					)
					 
					}
					else{
						res.sendStatus(201)
					}
				}
			})
		  } else {
			res.sendStatus(202);
		  }
		}
	  });
	

})




app.post("/resendlendersignupotp",(req,res)=>{
	const email = req.body.email;
	const otpclient = req.body.otp;

	const sQuery = "SELECT COUNT(*) AS count FROM lender WHERE email = ?";

	connection.query(sQuery, email, (err, result) => {
		if (err) {
		  console.error(err);
		  res.sendStatus(500);
		} else {
		  const count = result[0].count;
		  if(count > 0){
           
				
			function generateOTP() {
				let otp = Math.floor(1000 + Math.random() * 9000);
				return otp.toString();
			  }
		
			  const otp = generateOTP();
		
			  const mailOptions = {
				from: 'santhoshtechnologies22@gmail.com',
				to: req.body.email,
				subject: 'Sign Up Verification code',
				html: `<p>Your One-time Password for Loaners Lender Account Registration is <br/> <h1>${otp}</h1></p><br/> <p>If you did not make this request, please ignore this email.</p>`
			  };
		
			  transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
				  console.error(error);
				   res.sendStatus(400);
				}
		
				console.log('Email sent: ' + info.response);
		
				const updateQuery = "UPDATE lender SET signupotp = ? WHERE email = ?";
				connection.query(updateQuery, [otp, req.body.email], (err) => {
				  if (err) {
					console.error(err);
					return res.sendStatus(500);
				  }
		
				  return res.sendStatus(200);
				});
			  });
					
				
		  } else {
			res.sendStatus(202);
		  }
		}
	  });
	

})

app.post("/updateborrowerdetails", (req, res) => {
	const {
	  loanid,
	  borrower,
	  borrowerEmail,
	  duration,
	  totalAmount,
	  type,
	  interest,
	  status
	} = req.body;
  
	const updateQuery = `
	  UPDATE loans SET
	  amount = ?,
	  borrower = ?,
	  intrest = ?,
	  timeperiod = ?,
	  status = ?,
	  borrowername = ?,
	  type = ?
	  WHERE loanid = ?
	`;
  
	const details = [
	  totalAmount,
	  borrowerEmail,
	  interest,
	  duration,
	  status,
	  borrower,
	  type,
	  loanid
	];

  
	connection.query(updateQuery, details, (err, result) => {
	  if (err) {
		console.error("Error updating borrower details:", err);
		res.sendStatus(500);
	  } else {
		console.log("Borrower details updated successfully");
		res.sendStatus(200);
	  }
	});
  });

  
app.post("/updategeneralborrowerdetails", (req, res) => {
	const {
	  id,
	  name,
	  email,
	  phonenumber,
	  employment,
	  income,
	  address,
	  bankdetails,
	  emailverified
	} = req.body;
    
	const updateQuery = `
	  UPDATE borrower SET
	  name = ?,
	  email = ?,
	  phonenumber = ?,
	  employment = ?,
	  income = ?,
	  address = ?,
	  bankdetails = ?,
	  emailverified = ?
	  WHERE id = ?
	`;
  
	const details = [
		name,
		email,
		phonenumber,
	  employment,
	  income,
	  address,
	  bankdetails,
	  emailverified,
	  id
	];

  
	connection.query(updateQuery, details, (err, result) => {
	  if (err) {
		console.error("Error updating borrower details:", err);
		res.sendStatus(400);
	  } else {
		console.log("Borrower details updated successfully");
		res.sendStatus(200);
	  }
	});
  });

  app.post("/updategenerallenderdetails", (req, res) => {
	const {
	  id,
	  name,
	  email,
	  phonenumber,
	  intrest,
	  timeperiod,
	  bankdetails,
	  emailverified
	} = req.body;
    
	const updateQuery = `
	  UPDATE lender SET
	  name = ?,
	  email = ?,
	  phonenumber = ?,
	  intrest = ?,
	  timeperiod = ?,
	  bankdetails = ?,
	  emailverified = ?
	  WHERE id = ?
	`;
  
	const details = [
		name,
		email,
		phonenumber,
		intrest,
		timeperiod,
	  bankdetails,
	  emailverified,
	  id
	];

  
	connection.query(updateQuery, details, (err, result) => {
	  if (err) {
		console.error("Error updating borrower details:", err);
		res.sendStatus(400);
	  } else {
		console.log("Borrower details updated successfully");
		res.sendStatus(200);
	  }
	});
  });

  app.post("/updatelenderdetails", (req, res) => {
	const {
	  id,
	  name,
	  email,
	  phonenumber,
	  intrest,
	  timeperiod,
	  emailverified
	} = req.body;
    
	const updateQuery = `
	  UPDATE lender SET
	  name = ?,
	  email = ?,
	  phonenumber = ?,
	  intrest = ?,
	  timeperiod = ?,
	  emailverified = ?
	  WHERE id = ?
	`;
  
	const details = [
		name,
		email,
		phonenumber,
	  intrest,
	  timeperiod,
	  emailverified,
	  id
	];

  
	connection.query(updateQuery, details, (err, result) => {
	  if (err) {
		console.error("Error updating borrower details:", err);
		res.sendStatus(400);
	  } else {
		console.log("Borrower details updated successfully");
		res.sendStatus(200);
	  }
	});
  });


  app.post("/updatedetails", (req, res) => {
	const {
	  id,
	  name,
	  
	  phonenumber,
	  employment,
	  income,
	  address,
	  bankdetails,
	  aadharnumber
	} = req.body;
	console.log(id,
		name,
		
		phonenumber,
		employment,
		income,
		address,
		bankdetails)
	const updateQuery = `
	  UPDATE borrower SET
	  name = ?,
	  
	  phonenumber = ?,
	  employment = ?,
	  income = ?,
	  address = ?,
	  bankdetails = ?,
	  aadhardetails = ?,
	  dob = ?
	  WHERE id = ?
	`;
  
	const details = [
	  name,
	  phonenumber,
	  employment,
	  income,
	  address,
	  bankdetails,
	  aadharnumber,
	  dob,
	  id
	];
  
	connection.query(updateQuery, details, (err, result) => {
	  if (err) {
		console.error("Error updating borrower details:", err);
		res.sendStatus(400);
	  } else {
		console.log("Borrower details updated successfully");
		res.sendStatus(200);
	  }
	});
  });

  app.get("/getborrowerslist", (req, res) => {
	const getdetailsquery = "select * from borrower";
  
		connection.query(getdetailsquery, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(400).json(err);
		  } else {
			if(result.length > 0){
					res.status(200).json(result);
			}
			else{
				res.sendStatus(404);
			}

		  }
        });

});

app.get("/getlenderslist", (req, res) => {
	const getdetailsquery = "select * from lender";
  
		connection.query(getdetailsquery, (err, result) => {
		  if (err) {
			console.log(err);
			res.status(400).json(err);
		  } else {
			if(result.length > 0){
					res.status(200).json(result);
			}
			else{
				res.sendStatus(404);
			}

		  }
        });

});

app.listen(5000,()=>{
	console.log("Server is running on port no : ",5000);
})
