// Importing all the dependencies in the file for usage
var utils = require('../utils/slip_generation_utils');
var tax_table = require('../config/tax_table');

// A class for binding the taxTable as well as using the same to generate the salary slip details
class PayslipGenerator {
    // Initialize the taxTable for income tax reference
    constructor(taxTable) {
        this.taxTable = taxTable;
    }

    // This method is used to validate all the required inputs and proceed if no errors or return the errors back
    checkinputs(config, firstName, lastName, annualSalary, superRate, paymentMonth, paymentYear) {
        let error = [];

        if (!config)
            error.push('Could not find tax rates');
        if (!utils.isValidString(firstName))
            error.push(`firstName is invalid! ${firstName} is not a valid name`);
        if (!utils.isValidString(lastName))
            error.push(`lastName is invalid! ${lastName} is not a valid name`);
        if (!utils.isValidNumber(superRate) || superRate < 0 || superRate > 12)
            error.push(`superrate is invalid! Expected between 0-12, got ${superRate}`);
        if (!utils.isValidNumber(annualSalary) || annualSalary == 0)
            error.push('annual_salary is invalid');
        if (!utils.isValidYear(paymentYear))
            error.push(`payment_year is invalid!`);
        if (!utils.isValidMonth(paymentMonth))
            error.push(`payment_month is invalid`);
        
        let dateValiditystr = utils.isValidDate(paymentMonth, paymentYear);
        if(dateValiditystr) {
            error.push(dateValiditystr);
        }

        if (error.length != 0)
            return error;
    }

    // The final function for generating the slip if all the fields are found correct.
    generate(firstName, lastName, annualSalary, superRate, paymentMonth, paymentYear) {
        let config = utils.getTaxRate(this.taxTable, annualSalary)
        let input_validation_errors = this.checkinputs(config, firstName, lastName, annualSalary, superRate, paymentMonth, paymentYear);
        
        if(input_validation_errors) {
            return input_validation_errors;
        }

        // Calculating the tax, gross salary as well as superAnnuation for the salary
        var grossIncome = Math.round(annualSalary / 12);
        var incomeTax = Math.round((config.baseTax + ((annualSalary - config.minSalary) * config.taxPerDollar)) / 12);
        var netIncome = grossIncome - incomeTax;
        var superAnnuation = Math.round((grossIncome * superRate) / 100);

        let date_str = `${paymentYear}-${paymentMonth}-1`;
        let month_index = new Date(date_str).getMonth();

        // Get a common format of first 3 characters of month to print in the slip
        paymentMonth = new Date(date_str).toString('MMMM').split(' ')[1];
        let last_date = (new Date(new Date(paymentYear, (month_index + 1), 1) - 24 * 60 * 60 * 1000)).getDate();

        // If no errors are found while generating, returning the payslip details to the controller
        return {
            name: firstName + ' ' + lastName,
            paymentPeriod: `01 ${paymentMonth}-${last_date} ${paymentMonth}`,
            grossIncome: grossIncome,
            incomeTax: incomeTax,
            netIncome: netIncome,
            superAnnuation: superAnnuation,
            month_in_str: paymentMonth
        }
    }
}

// Exporting the object of PayslipGenerator class to be used in routes. 
module.exports = new PayslipGenerator(tax_table);