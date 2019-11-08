// Creating an array of JSON for the taxation table to calculate the income tax.
const taxTable =
    /*
        taxTable schema = {
            minSalary,
            maxSalary,
            baseTax,
            taxPerDollar
        }
    */
    [{
        minSalary: 0,
        maxSalary: 18200,
        baseTax: 0,
        taxPerDollar: 0
    },
    {
        minSalary: 18201,
        maxSalary: 37000,
        baseTax: 0,
        taxPerDollar: 0.19
    },
    {
        minSalary: 37001,
        maxSalary: 87000,
        baseTax: 3572,
        taxPerDollar: 0.325
    },
    {
        minSalary: 87001,
        maxSalary: 180000,
        baseTax: 19822,
        taxPerDollar: 0.37
    },
    {
        minSalary: 180001,
        maxSalary: 0,
        baseTax: 54232,
        taxPerDollar: 0.45
    }];

// Exporting the taxtable to be used in the calculation of income tax further.
module.exports = taxTable;