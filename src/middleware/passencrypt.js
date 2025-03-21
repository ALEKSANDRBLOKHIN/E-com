const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.hashPassword = (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
            return res.status(500).json({ error: "Error hashing password" });
        }
        req.hashedPassword = hash;
        console.log("Your hashed password:", hash);
        next();
    });
};
