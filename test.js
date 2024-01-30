function ExpenseManager(transactions, loan) {
    const loanAmount = loan.amount;
    const loanDate = loan.startDate;
    const loanFrequency = loan.frequency;

    const relevantTransactions = transactions.filter(transaction => {
        return transaction.frequency === loanFrequency && transaction.startDate > loanDate;
    });

    let totalIncome = 0;
    let totalExpenses = 0;

    relevantTransactions.forEach(transaction => {
        if (transaction.type === 'DEBIT') {
            totalExpenses += transaction.amount;
        } else if (transaction.type === 'CREDIT') {
            totalIncome += transaction.amount;
        }
    });

    if (totalIncome - totalExpenses >= loanAmount) {
        return relevantTransactions[0].startDate.toLocaleDateString('en-GB');
    } else {
        return "Not possible";
    }
}

const { expect } = require('chai');
const solution = require('./Solution'); // Adjust the path accordingly

describe('ExpenseManager', () => {
    solution.cases.forEach(({ input, output }, index) => {
        it(`should return ${output} for case ${index + 1}`, () => {
            const result = solution.ExpenseManager(input.transactions, input.loan);
            expect(result).to.equal(output);
        });
    });
});


const testCases = [
  {
    input: {
      transactions: [
        { startDate: new Date("Jan 14, 2022"), amount: 15000, frequency: "MONTH", type: "DEBIT" },
        { startDate: new Date("Jan 17, 2022"), amount: 5000, frequency: "MONTH", type: "DEBIT" },
        { startDate: new Date("Jan 12, 2022"), amount: 45000, frequency: "MONTH", type: "CREDIT" },
        { startDate: new Date("Jan 17, 2022"), amount: 20000, frequency: "MONTH", type: "DEBIT" },
        { startDate: new Date("Jan 19, 2022"), amount: 4500, frequency: "MONTH", type: "DEBIT" },
        { startDate: new Date("Apr 1, 2022"), amount: 1500, frequency: "QUARTER", type: "CREDIT" },
      ],
      loan: { startDate: new Date("Jan 20, 2022"), amount: 1500, frequency: "MONTH"},
    },
    output: "20/03/2022",
  },
  {
    input: {
      transactions: [
        { startDate: new Date("Jan 1, 2022"), amount: 50000, frequency: "MONTH", type: "CREDIT" },
        { startDate: new Date("Jan 1, 2022"), amount: 30000, frequency: "MONTH", type: "DEBIT" },
        { startDate: new Date("Jan 21, 2022"), amount: 10000, frequency: "MONTH", type: "DEBIT" },
        { startDate: new Date("April 1, 2022"), amount: 40000, frequency: "QUARTER", type: "DEBIT" },
      ],
      loan: { startDate: new Date("April 12, 2022"), amount: 50000, frequency: "QUARTER"},
    },
    output: "Not Possible",
  },
  {
    input: {
      transactions: [
        { startDate: new Date("Jan 1, 2022"), amount: 50000, frequency: "MONTH", type: "CREDIT" },
        { startDate: new Date("Jan 1, 2023"), amount: 70000, frequency: "YEAR", type: "CREDIT" },
        { startDate: new Date("Jan 1, 2022"), amount: 30000, frequency: "MONTH", type: "DEBIT" },
        { startDate: new Date("Jan 21, 2022"), amount: 10000, frequency: "MONTH", type: "DEBIT" },
        { startDate: new Date("Apr 1, 2022"), amount: 40000, frequency: "QUARTER", type: "DEBIT" },
      ],
      loan: { startDate: new Date("April 12, 2022"), amount: 50000, frequency: "QUARTER"},
    },
    output: "12/01/2023",
  },
  {
    input: {
      transactions: [
        { startDate: new Date("Jan 1, 2022"), amount: 50000, frequency: "MONTH", type: "CREDIT" },
        { startDate: new Date("Feb 1, 2022"), amount: 10000, frequency: "MONTH", type: "CREDIT" },
        { startDate: new Date("Jan 1, 2022"), amount: 30000, frequency: "MONTH", type: "DEBIT" },
        { startDate: new Date("Jan 21, 2022"), amount: 10000, frequency: "MONTH", type: "DEBIT" },
      ],
      loan: { startDate: new Date("Jan 1, 2022"), amount: 20000, frequency: "QUARTER"},
    },
    output: "01/01/2022",
  },
  {
    input: {
      transactions: [
        { startDate: new Date("Jan 1, 2022"), amount: 65000, frequency: "MONTH", type: "CREDIT" },
        { startDate: new Date("Jan 1, 2022"), amount: 10000, frequency: "MONTH", type: "DEBIT" },
        { startDate: new Date("Jan 21, 2022"), amount: 1000, frequency: "MONTH", type: "DEBIT" },
        { startDate: new Date("Mar 21, 2022"), amount: 50000, frequency: "QUARTER", type: "DEBIT" },
      ],
      loan: { startDate: new Date("Jan 1, 2022"), amount: 60000, frequency: "QUARTER", type: "DEBIT" },
    },
    output: "01/04/2022",
  },
  {
    input: {
      transactions: [
        { startDate: new Date("Feb 1, 2022"), amount: 10000, frequency: "MONTH", type: "DEBIT" },
        { startDate: new Date("Feb 21, 2022"), amount: 1000, frequency: "MONTH", type: "DEBIT" },
        { startDate: new Date("Apr 27, 2022"), amount: 77000, frequency: "QUARTER", type: "DEBIT" },
        { startDate: new Date("Jan 29, 2022"), amount: 40000, frequency: "MONTH", type: "CREDIT" },
      ],
      loan: { startDate: new Date("Apr 28, 2022"), amount: 20000, frequency: "QUARTER", type: "DEBIT" },
    },
    output: "28/07/2022",
  }
];

module.exports.cases = testCases;