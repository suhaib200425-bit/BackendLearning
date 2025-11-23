const mongoose = require("mongoose")

const Product = new mongoose.Schema({
    admin_id: String,
    category: String,
    name:String,
    price:Number,
    description :String,
    image:[String]
});
module.exports = mongoose.model("Product", Product);