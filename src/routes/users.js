const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Users page");
});

router.post("/", (req, res) => {
    const { firstName, email, password } = req.body;  
    console.log(`Received data: First Name: ${firstName}, Email: ${email}, Password: ${password}`);

    res.json({
        firstName,
        email,
        password,
        _id: "randomId4567"
    });
});


router.put("/:id", (req, res) => {
    res.send(`User with ID ${req.params.id} updated`);
});

router.delete("/:id", (req, res) => {
    res.send(`User with ID ${req.params.id} deleted`);
});

module.exports = router;
