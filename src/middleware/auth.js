const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No token provided!" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // ✅ тут исправили
    req.userId = decodedToken.userId;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};
