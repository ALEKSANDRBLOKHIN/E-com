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
    sharpMiddleware("webp", 80),
    (req, res) => {
      if (!req.file) {
        return res.status(400).json({ error: "Error uploading the file. Wrong format ?" });
      }
  
      console.log("Form fields:", req.body);
      console.log("Processed file:", req.file);
      console.log("User ID:", req.userId);
  
      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.originalname}`;
  
      res.json({
        message: "User response reached",
        fileUrl,
      });
    }
  );
  
  
  
  
  

module.exports = router;
