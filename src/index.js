const express = require("express");
const test = require("./test");
const userRoutes = require("./routes/users");
const connectDB = require("./utils/db");

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
    test();
    const now = Date.now();
    req.requestTime = now;
    console.log("Time:", now);
    next();
});

app.use((req, res, next) => {
    const num1 = 4;
    const num2 = 7;
    req.calculatedValue = num1 * num2;
    console.log(`Calculated Value: ${req.calculatedValue}`);
    next();
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

app.get("/", (req, res) => {
    res.send("Welcome to my API! e-commerce backend 🛍️");
});

app.use("/api/users", userRoutes);

// Запускаем сервер ТОЛЬКО после успешного подключения к БД
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();
