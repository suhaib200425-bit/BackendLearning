const express = require("express");
const cors = require("cors");
const UserRoute = require("./Rutes/User.js");
const dbconnection = require("./DB/db.js");
const AdminRoute = require("./Rutes/Admin.js");


const app = express()
const port=8000

//db connections
dbconnection()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//api end points
app.use('/user', UserRoute)
app.use('/admin', AdminRoute)

app.listen(8000, () => {
  console.log(`server startedc on http://localhost:${port}/`);
})