const express = require("express");
const test = require("./test");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const invoiceRoutes = require("./routes/invoices"); 
const connectDB = require("./utils/db");
const path = require("path");
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
app.use("/api/products", productRoutes);
app.use("/api/invoices", invoiceRoutes); 

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
