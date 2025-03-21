const express = require("express");
const test = require("./test"); // Импортируем test.js

const app = express();
const port = 3000;

// Middleware с тестовой функцией
app.use((req, res, next) => {
    test(); // Вызываем test()
    const now = Date.now();
    req.requestTime = now;
    console.log("Time:", now);
    next();
});

// Middleware с арифметикой
app.use((req, res, next) => {
    const num1 = 4;
    const num2 = 7;
    req.calculatedValue = num1 * num2;
    console.log(`Calculated Value: ${req.calculatedValue}`);
    next();
});

app.get("/", (req, res) => {
    res.send(`Hello World! Calculated Value: ${req.calculatedValue}, Request Time: ${req.requestTime}`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
