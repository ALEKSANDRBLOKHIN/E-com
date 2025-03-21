const express = require("express");
const router = express.Router();

// Получить список пользователей
router.get("/", (req, res) => {
    res.send("Users page");
});

// Добавить нового пользователя
router.post("/", (req, res) => {
    res.send("User added");
});

// Обновить информацию пользователя
router.put("/:id", (req, res) => {
    res.send(`User with ID ${req.params.id} updated`);
});

// Удалить пользователя
router.delete("/:id", (req, res) => {
    res.send(`User with ID ${req.params.id} deleted`);
});

module.exports = router;
