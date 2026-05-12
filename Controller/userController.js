
const Event = require("../Model/EventsModel");
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
        role: "admin"
    });

};
const loginAdmin = async (req, res) => {
    const existingUser = await admin.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (existingUser) {
        res.render("AdminLogin", {
            error: "Invalid email or password"
        });
    } else {
        res.redirect("/Events?success=1");
    }
};
const addConsumer = async (req, res) => {
    await consumer.create({
        username: req.body.username,
        email: req.body.email,
        role: "consumer"
    });
    res.redirect("/Home?success=1");
};
module.exports = {
    addAdmin,
    loginAdmin,
    addConsumer,
   admins,

};