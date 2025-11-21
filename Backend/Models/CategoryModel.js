const mongoose = require("mongoose")

const Category = new mongoose.Schema({
    admin_id: String,
    category: String,
    image: String,
});
module.exports = mongoose.model("Category", Category);