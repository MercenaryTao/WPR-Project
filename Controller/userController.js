
const Event = require("../Model/EventsModel");
const { consumer } = require("../Model/userModel");
const admin = require("../Model/userModel").admins;

const admins = async (req, res) => {
    const admins = await admin.find();

 res.render("AdminSignUp", {
        admins
    });
};
const addAdmin = async (req, res) => {
  const existingUser = await admin.findOne({
    $or: [
    {email: req.body.email},
    {username: req.body.username}
    ]
  });


if (existingUser) {
   return res.render("AdminSignUp", {
        error: "Email already exists or username already taken",
    });
} else {
    res.redirect("/Events?success=1");
}
// 
   
    await admin.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: "admin"
    });

};
const loginAdmin = async (req, res) => {
    const existingUser = await admin.findOne({
        username: req.body.username,
        password: req.body.password
    });
    if (existingUser) {
        res.render("AdminLogin", {
            error: "Invalid username or password"
        });
    } else {
        res.redirect("/Events?success=1");
    }
};
const addConsumer = async (req, res) => {

    const existingUser = await consumer.findOne({
        $or: [
            { email: req.body.email },
            { username: req.body.username }
        ]
    });

    if (existingUser) {

        return res.render("ConsumerReg", {
            error: "Email already exists or username already taken"
        });

    }

    await consumer.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: "user"
    });

    res.redirect("/");
};

const loginConsumer = async (req, res) => {

    const existingUser = await consumer.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (existingUser) {

        return res.redirect("/");

    }

    res.render("ConsumerLogin", {
        error: "Invalid username or password"
    });
};

module.exports = {
    addAdmin,
    loginAdmin,
    addConsumer,
    loginConsumer,
    admins,

};