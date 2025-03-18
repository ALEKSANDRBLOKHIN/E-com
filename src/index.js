const express = require("express");
const app = express();
const port = 3000;



app.use((req, res, next) => {
    console.log("Time:", Date.now()); 
    next();
});


app.use((req, res, next) => {
    const num1 = 4;
    const num2 = 7;
    req.calculatedValue = num1 * num2;
    console.log(`Calculated Value: ${req.calculatedValue}`); 
    next();
});

app.get("/", (req, res) => {
    res.send(`Hello World! Calculated Value: ${req.calculatedValue}`);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


