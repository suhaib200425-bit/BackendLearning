const express = require("express");
const cors = require("cors");
const UserRoute = require("./Rutes/User.js");
const dbconnection = require("./DB/db.js");
const AdminRoute = require("./Rutes/Admin.js");
const BannerRouter = require("./Rutes/Banner.js");
const CategoryRouter =require("./Rutes/Category.js");
const ProductRoute = require("./Rutes/Product.js");
const db = require("./DB/db.js");
const dotenv=require('dotenv');

const app = express()
const port=8000

//db connections
db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed:", err);
    } else {
        console.log("MySQL Connected Successfully!");
    }
});
dotenv.config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//api end points
app.use('/user', UserRoute)
app.use('/admin', AdminRoute)
app.use('/banner', BannerRouter)
app.use('/category',CategoryRouter)
app.use('/product',ProductRoute )

app.use("/image", express.static("uploads"));

app.listen(8000, () => {
  console.log(`server startedc on http://localhost:${port}/`);
})