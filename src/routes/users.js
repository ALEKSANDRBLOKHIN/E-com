const express = require("express");
const router = express.Router();
const { hashPassword } = require("../middleware/passencrypt");


router.get("/", (req, res) => {
    res.send("Users page");
});

router.post("/", hashPassword, (req, res) => {
    const { firstName, email } = req.body;
    res.json({
        firstName,
        email,
        hashedPassword: req.hashedPassword,
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
