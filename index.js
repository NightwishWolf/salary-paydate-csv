const fs = require("fs");

// write header to csv file
var csv = "Month,Salary payment date,Bonus payment date\r\n";
fs.writeFileSync("payment_dates.csv", csv);

// get current month
const now = new Date();
let month = now.getMonth();

const allMonths = 11;
var allMonthsText = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// loops through the remaining months and writes it to the csv file
for (i = month; i <= allMonths; i++) {

 var paymentMonth = allMonthsText[i]; 
 var bonusDate = generateBonusDate(i);
 var baseSalaryDate = calculateBaseSalaryDay(i);

 var csvDates = paymentMonth+","+baseSalaryDate.toDateString()+","+bonusDate.toDateString()+"\r\n";

 fs.appendFileSync("payment_dates.csv", csvDates);
}

function generateBonusDate(monthIndex) {
  var date = new Date();

  date.setDate(15);
  date.setMonth(monthIndex);
  let bonusPayDay = date.getDay();

  if (bonusPayDay === 6) {
    date.setDate(date.getDate() + 4);
  } else if (bonusPayDay === 0) {
    date.setDate(date.getDate() + 3);
  } 

  return date;
}

function calculateBaseSalaryDay(monthIndex){
  const now = new Date();
  let year = now.getFullYear();

  var lastDayOfMonth = new Date(year, monthIndex + 1, 0);
  let DayPayment = lastDayOfMonth.getDay();
  
  if (DayPayment === 6) {
    lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1);
  } else if (DayPayment === 0) {
    lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 2);
  }

  return lastDayOfMonth;
}



