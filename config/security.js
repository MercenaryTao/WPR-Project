const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

const securityMiddleware = [
    helmet(),
    limiter
];

module.exports = securityMiddleware;