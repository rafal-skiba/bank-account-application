'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Justyna Skiba',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1234,
  movementsDates: [
    "2022-04-18T21:31:17.178Z",
    "2022-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2023-04-04T17:01:17.194Z",
    "2023-04-03T17:01:17.194Z",
    "2023-04-05T17:01:17.194Z",
    "2023-04-07T23:36:17.929Z",
    "2023-04-08T10:51:36.790Z",
  ],
  currency: "PLN",
  locale: "pl-PL"
};

const account2 = {
  owner: 'Rafał Skiba',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2022-04-18T21:31:17.178Z",
    "2022-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2023-04-03T17:01:17.194Z",
    "2023-04-07T23:36:17.929Z",
    "2023-04-08T10:51:36.790Z",
  ],
  currency: "PLN",
  locale: "pl-PL",
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2022-04-18T21:31:17.178Z",
    "2022-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2023-04-03T17:01:17.194Z",
    "2023-04-07T23:36:17.929Z",
    "2023-04-08T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2022-04-18T21:31:17.178Z",
    "2022-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2023-04-03T17:01:17.194Z",
    "2023-04-07T23:36:17.929Z",
    "2023-04-08T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "pt-PT",
};

const accounts = [account1, account2, account3, account4];

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const movementsRow = document.querySelector(".movements__row");

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/// function forEach reading values from account1

const formatDaysInMovements = function(date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2-date1) /
  (1000*60*60*24));

  const daysPassed = calcDaysPassed(new Date (), date);
  

  if (daysPassed === 0 ) return "Today"
  if (daysPassed === 1 ) return "Yesterday"
  if (daysPassed <= 7 ) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(date);

}

const formatCurrency = function (val, locale, currency) {

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(val);

}




const displayMovements = function(acc, sort = false) {

const movs = sort ? acc.movements.slice().sort((a,b) => a -b) : acc.movements;

containerMovements.innerHTML = '';

movs.forEach(function(mov, i) {
const type = mov > 0 ? 'deposit': 'withdrawal';

const date = new Date(acc.movementsDates[i]);
const displayDate = formatDaysInMovements(date, acc.locale);


const formattedMov = formatCurrency(mov, acc.locale, acc.currency)


const html = `
<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
</div>
`;

containerMovements.insertAdjacentHTML('afterbegin', html);
})
}


const deposits = movements.filter((depo) => depo > 0)
const withdrawals = movements.filter((withdrawal) => withdrawal < 0)

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0 );

const formattedBalance = formatCurrency(acc.balance, acc.locale, acc.currency)

labelBalance.textContent = `${formattedBalance}`;

}


const calcDisplaySummary = function (acc) {

  const incomes = acc.movements
  .filter(depo => depo > 0)
  .reduce((acc, mov) => acc + mov, 0)

  const formattedIncomes = formatCurrency(incomes, acc.locale, acc.currency)


  labelSumIn.textContent = formattedIncomes;

  const outcomes = acc.movements
  .filter(depo => depo < 0)
  .reduce((acc, mov) => acc + mov, 0)

  const formattedOutcomes = formatCurrency(outcomes, acc.locale, acc.currency)


 labelSumOut.textContent = formattedOutcomes;


const interest = acc.movements
.filter(mov => mov > 0)
.map(deposit => (deposit * acc.interestRate)/100)
.filter((int, i, arr) => int >= 1)
.reduce((acc, int) => acc + int, 0)

const formattedInterest = formatCurrency(interest, acc.locale, acc.currency)

labelSumInterest.textContent = formattedInterest;

}



const eurotoUsd = 1.1;

const totalDepo = movements.filter(depo => depo > 0).map(depo => depo * eurotoUsd).reduce((acc, depo) => acc + depo, 0);



const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username= acc.owner 
    .toLowerCase()
    .split(' ')
    .map((name) => name[0])
    .join('');
  
   
  })
  }
  
  createUsernames(accounts);


/// Event handler
let currentAccount;

const updateUI = (acc) => {
  displayMovements(acc);
  calcPrintBalance(acc);
  calcDisplaySummary(acc)
}

//setIntervalTimer function in log in

const startLogOutTimer = function () {
//Set time to 5 minute activity in bank account
let time = 50;

const timerActivity = setInterval ( function () {

const min = String(Math.trunc(time / 60)).padStart(2,0);
const sec = String(time % 60).padStart(2,0); 

labelTimer.textContent = `${min}:${sec}`;

time--;

if (time === 0) {
  clearInterval(timerActivity)
}

}, 1000);
};




btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
containerApp.style.opacity = "100";

//API DATE

const now = new Date();

const options = {
  hour: "numeric",
  minute: "numeric",
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long'
}



labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

//clear input data

inputLoginPin.value = ""

startLogOutTimer();

updateUI(currentAccount)



  } else {

    labelWelcome.textContent = `Wrong data`

  }
}) 

/// Event handler transfer money


btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username ===  inputTransferTo.value )
inputTransferAmount.value = "";
inputTransferTo.value = "";
  if (amount > 0 
    && receiverAcc
    && currentAccount.balance >= amount 
    && receiverAcc?.username !== currentAccount.username ) {

/// transfer push method
currentAccount.movements.push(-amount)
receiverAcc.movements.push(amount)

//add transfer date

currentAccount.movementsDates.push(new Date().toISOString());
receiverAcc.movementsDates.push(new Date().toISOString());

updateUI(currentAccount)  
  }

})



//Loan account function

btnLoan.addEventListener('click', (e) => {
e.preventDefault();

const loan = Number(inputLoanAmount.value)

if (loan && currentAccount.movements.some(mov => mov >= loan * 0.1)) { 
 setTimeout(() => {
currentAccount.movements.push(loan);
//Add loan date 
currentAccount.movementsDates.push(new Date().toISOString());



updateUI(currentAccount);
}, 3000) 
}

});

//Close account function

btnClose.addEventListener('click', function (e) {
e.preventDefault();



  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {

const index = accounts.findIndex(acc => acc.username === currentAccount.username );

    accounts.splice(index, 1)

    containerApp.style.opacity = 0;

  }

  inputCloseUsername.value = inputClosePin.value = "";

})

let stateOfSorted = false;
btnSort.addEventListener('click', (e) => {
e.preventDefault();

displayMovements(currentAccount.movements, !stateOfSorted);

stateOfSorted = !stateOfSorted;

})

