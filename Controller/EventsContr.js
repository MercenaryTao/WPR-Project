const admin = require("../Model/userModel");
const Event = require("../Model/EventsModel");

const validateEventData = (data) => {
    const errors = [];
    if (!data.event || !data.event.trim()) {
        errors.push("Event name is required.");
    }
    if (!data.category || !data.category.trim()) {
        errors.push("Category is required.");
    }
    if (!data.date) {
        errors.push("Date is required.");
    }
    if (!data.price || Number(data.price) <= 0) {
        errors.push("Price must be greater than 0.");
    }
    if (data.quantity == null || Number(data.quantity) < 0) {
        errors.push("Quantity must be 0 or more.");
    }
    return errors;
};

const home = async (req, res) => {
    const { search, category, date, availability } = req.query;
    const query = {};

    if (search) {
        query.event = { $regex: search, $options: "i" };
    }

    if (category && category !== "all") {
        query.category = category;
    }

    if (date) {
        const selectedDate = new Date(date);
        const nextDate = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        query.date = { $gte: selectedDate, $lt: nextDate };
    }

    if (availability === "available") {
        query.quantity = { $gt: 0 };
    } else if (availability === "soldout") {
        query.quantity = { $lte: 0 };
    }

    const events = await Event.find(query).sort({ date: 1 });
    let categories = await Event.distinct("category");
    categories = categories.filter(Boolean);
    if (!categories.length) {
        categories = ["Music", "Art", "Food", "Technology", "Sports"];
    }

    res.render("Home", {
        events,
        categories,
        filters: {
            search: search || "",
            category: category || "all",
            date: date || "",
            availability: availability || "all"
        }
    });
};
const availableEvents = async (req, res) => {
    const events = await Event.find();
    res.render("Booking", { events });
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
        date: req.body.date ? new Date(req.body.date) : undefined,
        category: req.body.category,
        creator: admin._id
    });

    res.redirect("/Events");
};

const editEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.render("Events/EditEvent", { event });
};

const deleteEventPage = async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.render("Events/DeleteEvent", { event });
};

const deleteEvent = async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect("/Events");
};

const updateEvent = async (req, res) => {
    const errors = validateEventData(req.body);
    if (errors.length) {
        return res.redirect(`/EditEvent/${req.params.id}?error=${encodeURIComponent(errors.join(' '))}`);
    }

    await Event.findByIdAndUpdate(req.params.id, {
        event: req.body.event,
        price: req.body.price,
        quantity: req.body.quantity,
        date: req.body.date ? new Date(req.body.date) : undefined,
        category: req.body.category
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
    deleteEventPage,
    updateEvent,
    deleteEvent,
    bookEvent,
    confirmBooking,
    availableEvents

};