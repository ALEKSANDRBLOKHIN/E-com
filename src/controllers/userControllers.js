const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Вход (логин)
exports.userLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверка пользователя
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Неверный пароль" });
    }

    // Генерация JWT токена
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your_jwt_secret", // желательно вынести в .env
      { expiresIn: "1h" }
    );

    // Ответ
    res.status(200).json({
      message: "Успешный вход",
      token,
      user: {
        firstName: user.firstName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Ошибка при входе пользователя:", error);
    res.status(500).json({ message: "Ошибка сервера" });
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
      message: "Пользователь создан",
      firstName: savedUser.firstName,
      email: savedUser.email,
      role: savedUser.role,
    });
  } catch (error) {
    console.error("ERROR in creating user:", error);
    res.status(400).json({ message: error.message });
  }
};
