const express = require("express");
const router = express.Router();
const { hashPassword } = require("../middleware/passencrypt");
const { userLogIn, userSignUp } = require("../controllers/userControllers");


router.get("/", userLogIn);


router.post("/", hashPassword, userSignUp);

router.put("/:id", (req, res) => {
    res.send(`User with ID ${req.params.id} updated`);
});

router.delete("/:id", (req, res) => {
    res.send(`User with ID ${req.params.id} deleted`);
});

module.exports = router;
