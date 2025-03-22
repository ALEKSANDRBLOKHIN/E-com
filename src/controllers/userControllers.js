const User = require("../models/userModel");

exports.userLogIn = (req, res) => {
  res.send("User login");
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
        firstName: savedUser.firstName,
        email: savedUser.email,
        role: savedUser.role
      });
      
  } catch (error) {
    console.error("Ошибка при создании пользователя:", error);
    res.status(500).json({ error: "Ошибка сервера при создании пользователя" });
  }
};
