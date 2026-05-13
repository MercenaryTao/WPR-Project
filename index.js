require('dotenv').config();

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const eventsController = require("./Controller/EventsContr");
const userController = require("./Controller/userController");
const securityMiddleware = require("./config/security");
const isAdmin = require("./middleware/adminMiddleware");
const errorHandler = require("./middleware/errorMiddleware");
const app = express();
const port = process.env.PORT || 3000;
app.use(securityMiddleware);

// mongoose.connect(process.env.MONGO_URI)
mongoose.connect("mongodb+srv://600857_db_user:GiQGGS8eYlyg553y@wprcluster0.eucqytb.mongodb.net/WPR381")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: "replace-with-a-secure-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    }
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.error = null;
    res.locals.success = null;
    next();
});
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.get("/Home", eventsController.home);

app.get("/Booking", eventsController.availableEvents);
app.post("/Booking", (req, res) => {
    res.render("Booking");
});
app.get("/Events" , eventsController.events);

app.post("/Events", eventsController.createEvent);
app.get("/consumerLogin", (req, res) => {
    res.render("consumerLogin");
});

app.get("/Contact", (req, res) => {
    res.render("Contact");
});
app.post("/Contact", (req, res) => {
    res.render("Contact");
});
app.get("/AdminLogin", (req, res) => {
    res.render("AdminLogin");
});
app.post("/AdminLogin", userController.loginAdmin);

app.get("/AdminSignUp", (req, res) => {
  res.render("AdminSignUp", {
        error: req.query.error
    });
});
app.post("/AdminSignUp", userController.addAdmin);

app.get("/EditEvent/:id", isAdmin, eventsController.editEvent);
app.get("/DeleteEvent/:id", isAdmin, eventsController.deleteEventPage);

app.post("/EditEvent/:id", isAdmin, eventsController.updateEvent);
app.post("/DeleteEvent/:id", isAdmin, eventsController.deleteEvent);

app.get("/ConsumerReg", (req, res) => {
    res.render("ConsumerReg", {
        error: req.query.error
    });
});
app.post("/ConsumerLogin", userController.loginConsumer);

app.post("/ConsumerReg", userController.addConsumer);
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
        }
        res.redirect("/");
    });
});

app.get("/BookEvent/:id", eventsController.bookEvent);
app.post("/BookEvent/:id", eventsController.confirmBooking);
app.use(errorHandler);
app.listen(port, () => {  console.log(`Server listening at http://localhost:${port}`);
});