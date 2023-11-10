import React from "react";

export function MonthlyDue(amount,Repayment,interestRate){
	const totalAmount = amount * (1+(interestRate*(Repayment*12)));
	const monthlyDue = Math.ceil((totalAmount / (Repayment*12))) 
	return monthlyDue;
}

export function TotalAmount(amount,Repayment,interestRate){
	const totalAmount =Math.floor(amount * (1+(interestRate*(Repayment*12))));
	return totalAmount;
}