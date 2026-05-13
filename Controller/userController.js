
const Event = require("../Model/EventsModel");
const { consumer } = require("../Model/userModel");
const admin = require("../Model/userModel").admins;

const admins = async (req, res) => {
    const admins = await admin.find();

 res.render("AdminSignUp", {
        admins
    });
};
const consumersEnquiries = async (req, res) => {
    const consumers = await consumer.find();

 res.render("Enquiries", {
        consumers
    });
};
const addAdmin = async (req, res) => {
  const existingUser = await admin.findOne({
    $or: [
      { email: req.body.email },
      { username: req.body.username }
    ]
  });

  if (existingUser) {
    return res.render("AdminSignUp", {
      error: "Email already exists or username already taken",
    });
  }

  const newAdmin = await admin.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: "admin"
  });

  req.session.user = {
    id: newAdmin._id,
    username: newAdmin.username,
    role: newAdmin.role
  };

  res.redirect("/Events?success=1");
};
const loginAdmin = async (req, res) => {
    const existingUser = await admin.findOne({
        username: req.body.username,
        password: req.body.password
    });
    if (!existingUser) {
        return res.render("AdminLogin", {
      
        });
    }

    req.session.user = {
        id: existingUser._id,
        username: existingUser.username,
        role: existingUser.role
    };

    res.redirect("/Events?success=1");
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
         
        });
    }

    const newConsumer = await consumer.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: "consumer"
    });

    req.session.user = {
        id: newConsumer._id,
        username: newConsumer.username,
        role: newConsumer.role
    };

    res.redirect("/Home");
};

const loginConsumer = async (req, res) => {
    const existingUser = await consumer.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (!existingUser) {
        return res.render("ConsumerLogin", {
            error: "Invalid username or password"
        });
    }

    req.session.user = {
        id: existingUser._id,
        username: existingUser.username,
        role: existingUser.role
    };

    res.redirect("/Home");
};

const enquire = async (req, res) => {
    const consumerUser = await consumer.findByIdAndUpdate(req.session.user.id, {
        inquire: req.body.message
});
    if (!consumerUser) {
        return res.redirect("/Contact?error=Please log in to submit an enquiry");
    }

    await consumerUser.save();
    res.redirect("/Contact?success=Enquiry submitted successfully");
};

module.exports = {
    addAdmin,
    loginAdmin,
    addConsumer,
    loginConsumer,
    admins,
    consumersEnquiries,
    enquire
};