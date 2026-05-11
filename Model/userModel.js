const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: String,
    email: String,
    role: {
        type: String,
        default: "admin"
    }
});

const admins = mongoose.model("Admin", adminSchema);

const consumerSchema = new mongoose.Schema({
    username: String,
    email: String,
    role: {
        type: String,
        default: "consumer"
    }
});

const consumer = mongoose.model("Consumer", consumerSchema);

module.exports = {
    admins,
    consumer
};