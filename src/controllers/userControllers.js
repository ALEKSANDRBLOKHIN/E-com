exports.userLogIn = (req, res) => {
    res.send("User login");
};

exports.userSignUp = (req, res) => {
    const { firstName, email } = req.body;
    const hashedPassword = req.hashedPassword; 

    res.json({
        firstName,
        email,
        hashedPassword,
        _id: "randomId4567"
    });
};
