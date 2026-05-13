const mongoose = require("mongoose");

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
    Booked :{type: Number, 
        default: 0},
    date: {
        type: Date,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
});

module.exports = mongoose.model("Events", eventSchema);

