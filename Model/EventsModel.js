const mongoose = require("mongoose");
// let events = [{event: "Event 1", price: 10, qty: 100000}, {event: "Event 2", price: 20, qty: 50000}, {event: "Event 3", price: 30, qty: 25000}];
// function getEvents() {
// return events;
// }

// function searchEvents(searchString) {
//     const filteredEvents = events.filter(event => event.event.toLowerCase().includes(searchString.toLowerCase()));
//     return filteredEvents;
// }

const eventSchema = new mongoose.Schema({

    event: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }, 
  creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
});


module.exports = mongoose.model("Events", eventSchema);

