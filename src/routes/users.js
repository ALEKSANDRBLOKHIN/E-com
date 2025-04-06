const express = require("express");
const router = express.Router();
const { hashPassword } = require("../middleware/passencrypt");
const { userLogIn, userSignUp } = require("../controllers/userControllers");
const { verifyToken } = require("../middleware/auth"); 

router.post("/login", userLogIn);


router.post("/signup", hashPassword, userSignUp);


router.post("/test", verifyToken, (req, res) => {
    res.send("Successful access to protected route!");
});


router.put("/:id", (req, res) => {
    res.send(`User with ID ${req.params.id} updated`);
});

router.delete("/:id", (req, res) => {
    res.send(`User with ID ${req.params.id} deleted`);
});

module.exports = router;
