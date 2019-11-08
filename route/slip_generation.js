// Inporting all the dependencies in the routes file
const express = require('express');
const payslipgen = require('../controllers/payslip');

// Creating a express router as a middleware for the application in index.js file
const router = express.Router();

// Defining the route table for routing the employee to the different functionalities
router.all('/', payslipgen.slip_gen.landing_page);

router.post('/payslip', payslipgen.middleware.verify_inputs, payslipgen.slip_gen.generate_slip);

// Exporting the router middleware to be used in index.js
module.exports = router;