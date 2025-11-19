const mongoose = require("mongoose")

const Banner = new mongoose.Schema({
    category: String,
    image: String,
    order: Number
});

module.exports = mongoose.model("Banner", Banner);