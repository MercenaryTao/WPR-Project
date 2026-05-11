
const Event = require("../Model/EventsModel");
const admin = require("../Model/userModel").admins;

const admins = async (req, res) => {
    const admins = await admin.find();

 res.render("AdminSignUp", {
        admins
    });
};
const addAdmin = async (req, res) => {

    await admin.create({
        username: req.body.username,
        email: req.body.email,
        role: "admin"
    });
    const existingUser = await Admin.findOne({
    $or: [
        { username: req.body.username },
        { email: req.body.email }
    ]
});

if (existingUser) {
    return res.render("AdminSignUp", {
        error: "Username or email already exists"
    });
}
    res.redirect("/Events?success=1");
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
    addConsumer,
   admins,

};