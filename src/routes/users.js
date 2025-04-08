const express = require("express");
const router = express.Router();
const { hashPassword } = require("../middleware/passencrypt");
const { userLogIn, userSignUp } = require("../controllers/userControllers");
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/multerConfig");
const sharpMiddleware = require("../middleware/sharpMiddleware");



router.post("/login", userLogIn);


router.post("/signup", hashPassword, userSignUp);


router.post("/test", verifyToken, (req, res) => {
    console.log(req.userId);
    res.send("test");
  });



router.delete("/:id", (req, res) => {
    res.send(`User with ID ${req.params.id} deleted`);
});

router.put(
    "/userUpdate",
    verifyToken,
    upload.single("image"),
    sharpMiddleware("webp", 80), // <= тут!
    (req, res) => {
      console.log(req.body);
      console.log(req.file); // теперь .webp
      console.log(req.userId);
  
      res.json({ message: "User response reached" });
    }
  );
  
  
  

module.exports = router;
