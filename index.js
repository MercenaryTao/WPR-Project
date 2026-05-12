const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = 3000;
const eventsController = require("./Controller/EventsContr");
const adminController = require("./Controller/userController");

mongoose.connect("mongodb+srv://600857_db_user:skLwMLnpoZ5uplKs@wprcluster0.eucqytb.mongodb.net/")
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


app.get("/", eventsController.home);

app.get("/Booking", (req, res) => {
    res.render("Booking");
});
app.post("/Booking", (req, res) => {
    res.render("Booking");
});
app.get("/Events" , eventsController.events);

app.post("/Events", eventsController.createEvent);
app.get("/consumerLogin", (req, res) => {
    res.render("consumerLogin");
});
app.post("/consumerLogin", (req, res) => {
    res.render("consumerLogin");
});
app.get("/Contact", (req, res) => {
    res.render("Contact");
});
app.post("/Contact", (req, res) => {
    res.render("/Contact");
});
app.get("/AdminLogin", (req, res) => {
    res.render("AdminLogin");
});
app.post("/AdminLogin", adminController.loginAdmin);

app.get("/AdminSignUp", (req, res) => {
  res.render("AdminSignUp", {
        error: req.query.error
    });
});
app.post("/AdminSignUp", adminController.addAdmin);

app.get("/EditEvent/:id", eventsController.editEvent);
app.get("/DeleteEvent/:id", eventsController.deleteEventPage);

app.post("/EditEvent/:id", eventsController.updateEvent);
app.post("/DeleteEvent/:id", eventsController.deleteEvent);

app.listen(port, () => {  console.log(`Server listening at http://localhost:${port}`);
});