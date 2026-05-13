const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    role: {
        type: String,
        default: "admin"
    }
});

const admins = mongoose.model("Admin", adminSchema);

const consumerSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    role: {
        type: String,
        default: "consumer"
    },
     inquire: {type: String, default: "" },
});

const consumer = mongoose.model("Consumer", consumerSchema);

module.exports = {
    admins,
    consumer
};