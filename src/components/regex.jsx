import React from "react";

export const validfullname = new RegExp("^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$");
export const validemail = new RegExp("^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z]{2,4})+$");
export const validphnumber =  /^(\+91)?[6-9]\d{9}$/ ;
export const validincome = /^\d+(?:\.\d{1,2})?$/;
export const validbankdetails = /\.(pdf|docx)$/i;
export const validpenalty = /^\d+(?:\.\d{1,2})?$/;