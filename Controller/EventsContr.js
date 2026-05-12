const admin = require("../Model/userModel");
const Event = require("../Model/EventsModel");

const home = async (req, res) => {
    const events = await Event.find();

    res.render("Home", {
        events
    });
};

const events = async (req, res) => {
    const events = await Event.find();
    res.render("Events", { events });
};

const createEvent = async (req, res) => {

    await Event.create({
        event: req.body.event,
        price: req.body.price,
        quantity: req.body.quantity,
        creator: admin._id
    }); 

    res.redirect("/Events");
};

const editEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.render("Events/EditEvent", { event });
};
const deleteEvent = async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect("/Events");
};

const updateEvent = async (req, res) => {
    await Event.findByIdAndUpdate(req.params.id, {
        event: req.body.event,
        price: req.body.price,
        quantity: req.body.quantity
    });
    res.redirect("/Events");
};

const bookEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);

    res.render("Events/BookEvent", { event });
}

const confirmBooking = async (req, res) => {
    const event = await Event.findById(req.params.id);
    // Logic for confirming booking
    event.quantity -= req.body.qty;
    await event.save();
    res.redirect("/");
}

module.exports = {
    home,
    events,
    createEvent,
    editEvent,
    updateEvent,
    deleteEvent,
    bookEvent,
    confirmBooking
   
};