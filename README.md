# Pay_slip_generation
A simple backend application built using NodeJs and ExpressJS for creating a tabular table containing the salary and taxations of the Employee for the given month and year.

![Directory Structure](https://github.com/shubh9457006801/Employee_pay_slip_generation/blob/master/structure.PNG)

## Steps to run -

1. Clone the directory using `git clone https://github.com/shubh9457006801/Employee_pay_slip_generation.git`
2. Run the below two commands
```bash
npm install
node server
```
You may also run the application in debugging mode:

```bash
env NODE_DEBUG=server,stripe,mailgun,cli,workers node server.js
```

Running the APP for different environments:

```bash
NODE_ENV=staging node server.js

```
3. Install the body-parser and express (`npm install express body-parser`).
4. Run the project using node index.js
5. Open `localhost:2000/` using Postman. It can use any route(eg- get or post).
6. To generate the salary slip, go to `localhost:2000/payslip` using the POST route in Postman. Ensure that you pass all the required key value pairs in the body section of the Postman(Accessed through the raw JSON method in the body section in pictures).

## Snapshots

### Landing Page

![Landing Page](https://github.com/shubh9457/Pay_slip_generation/blob/master/landing_page.PNG)

### Generating Payslips

![Generating payslip](https://github.com/shubh9457/Pay_slip_generation/blob/master/Generate_slip1.PNG)
![Generating payslip](https://github.com/shubh9457/Pay_slip_generation/blob/master/Generate_slip2.PNG)
![Generating payslip](https://github.com/shubh9457/Pay_slip_generation/blob/master/Generate_slip3.PNG)

## Directory Structure -

Entry Point - index.js

    Index.js calls the the user defined routes located in /route/slip_generation.js for initializing the routes.

        /route/slip_generation uses all the functionality defined in the /controllers/payslip.js
        
            /controllers/payslip.js has all the information of the middleware and the end point method defined in the 
            middleware and slip_gen classes(Uses /payslipcalculation/slip_generation.js for further calling methods).
            
                /payslipcalculation/slip_generation.js will be generating all the inputs required for the payslip generation
                and has a checkinputs and generate method for the last level verification of inputs defined under 
                /utils/slip_generation_utils.js file and the taxation table for income tax calculation inside 
                the /config/tax_table.js as an array of JSON objects.

