const express = require("express");
const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("Home");
});
app.get("/Home", (req, res) => {
    res.render("Home");
});
app.get("/Booking", (req, res) => {
    res.render("Booking");
});
app.post("/Booking", (req, res) => {
    res.redirect("/Booking");
});
app.get("/Events", (req, res) => {
    res.render("Events");
});
app.post("/Events", (req, res) => {
    res.redirect("/Events");
});
app.get("/UserLogin", (req, res) => {
    res.render("UserLogin");
});
app.post("/UserLogin", (req, res) => {
    res.redirect("/UserLogin");
});
app.get("/Contact", (req, res) => {
    res.render("Contact");
});
app.post("/Contact", (req, res) => {
    res.redirect("/Contact");
});

app.listen(port, () => {  console.log(`Server listening at http://localhost:${port}`);
});