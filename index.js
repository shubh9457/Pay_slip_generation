// Importing all the necessary files for performing certain tasks in the code
const express = require('express');
const slipgen_router = require('./route/slip_generation');
const bp = require('body-parser');

// Creating an instance of the express to create a routing application.
const app = express();

// Using middleware like body-parser(to parse the html body in JSON) and the slipgen_router to route the user whenever he needs to generate the slip
app.use(bp.json());
app.use(slipgen_router);

// Defining the port number to run the NodeJS server on and requesting server to start listening all the requests going and comming through that port
const port = 2000;
app.listen(port, (err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log(`Server running on port ${port}`);
    }
});