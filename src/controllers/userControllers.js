const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.userLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "No user" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "wrong password" });
    }


    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your_jwt_secret", 
      { expiresIn: "1h" }
    );


    res.status(200).json({
      message: "Graet you are loged in",
      token,
      user: {
        firstName: user.firstName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in log in:", error);
    res.status(500).json({ message: "serever error" });
  }
};

exports.userSignUp = async (req, res) => {
  try {
    const { firstName, email, lastName, imageUrl, role } = req.body;
    const hashedPassword = req.hashedPassword;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      imageUrl,
      role,
      inventory: [],
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "Uer created",
      firstName: savedUser.firstName,
      email: savedUser.email,
      role: savedUser.role,
    });
  } catch (error) {
    console.error("ERROR in creating user:", error);
    res.status(400).json({ message: error.message });
  }
};
