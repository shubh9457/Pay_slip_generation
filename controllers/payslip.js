// Importing the slip calculations object from the calculator
const slip_gen_obj = require('../payslipcalculation/slip_generation');

// First level of checking of inputs to ensure that fields are not left blank
class middleware {
    // Verify the inputs prior to routing forward
    verify_inputs(req, res, next) {
        let error = [];

        if (!req.body.firstname)
            error.push('firstname is missing');
        if (!req.body.lastname)
            error.push('lastname is missing');
        if (!req.body.annual_salary && req.body.annual_salary != 0)
            error.push('annual_salary is missing');
        if (!req.body.superrate && req.body.superrate != 0)
            error.push('superrate is missing');
        if (!req.body.payment_month && req.body.payment_month != 0)
            error.push('payment_month is missing');
        if (!req.body.payment_year && req.body.payment_year != 0)
            error.push('payment_year is missing');

        if (error.length != 0 && Array.isArray(error)) {
            res.status(400).json({
                error,
                inputs_recieved: req.body
            })
        }
        else {
            next();     // Goes to slip_gen.generate_slip
        }
    }
}

// A class used for defining all the end points of the routes
class slip_gen {
    // To show the various inputs needed by the user, it is a simple landing page.
    landing_page(req, res) {
        res.send(`<center><h1>Welcome Employee!</h1>
        Use <i>'/payslip'</i> to get your payslip now (Accepts firstname, lastname, annual_salary(number > 0), superrate(number 0-12), payment_month(string) and payment_year(number 2000-2019). All fields are mandatory)</center>
        `);
    }

    // The main function used to generate the salary slip for the employee
    generate_slip(req, res) {
        // Fetching the inputs from user
        let fname = req.body.firstname;
        let lname = req.body.lastname;
        let annual_salary = req.body.annual_salary;
        let superrate = req.body.superrate;
        let month = req.body.payment_month;
        let year = req.body.payment_year;

        // Calling the calculation function to calculate the taxes and all or the error if the input is invalid.
        let err_or_result = slip_gen.prototype.pay_slip_gen.generate(fname, lname, annual_salary, superrate, month, year);

        // Checking if the error is returned by the calculation and input validation function
        if (err_or_result.length != 0 && Array.isArray(err_or_result)) {
            res.status(400).json({ error: err_or_result });
        }
        // Generating a salary slip of the employee in tabular form and giving response back to the employee
        else {
            const gen_slip_string = `<center><h1>Pay slip for ${err_or_result.month_in_str}-${year}</h1><br><br><table width=50% border="1px"><tr><td>Name</td><td>${err_or_result.name}</td></tr><tr><td>Pay-Period</td><td>${err_or_result.paymentPeriod}</td></tr><tr><td>Gross-income</td><td>${err_or_result.grossIncome}</td></tr><tr><td>Income tax</td><td>${err_or_result.incomeTax}</td></tr><tr><td>Net income</td><td>${err_or_result.netIncome}</td></tr><tr><td>Super rate</td><td>${err_or_result.superAnnuation}</td></tr></table></center>`;

            res.status(200).send(gen_slip_string);
        }
    }
}

// Adding the calculator for calculating all the deduction and pay in the slip generation class.
slip_gen.prototype.pay_slip_gen = slip_gen_obj;

// Exporting the functionality for the use in routes.
module.exports = {
    middleware: new middleware(),
    slip_gen: new slip_gen(slip_gen_obj)
}