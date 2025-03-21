const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Users page");
});

router.post("/", (req, res) => {
    console.log(req.body); 
    res.send("User added");
});

router.put("/:id", (req, res) => {
    res.send(`User with ID ${req.params.id} updated`);
});

router.delete("/:id", (req, res) => {
    res.send(`User with ID ${req.params.id} deleted`);
});

module.exports = router;
