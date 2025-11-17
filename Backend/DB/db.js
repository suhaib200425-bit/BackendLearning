
const mongoose = require('mongoose');


const dbconnection =  () => {
    mongoose.connect('mongodb+srv://suhaibkoppath66_db_user:Suhaib2006@cluster0.f4qictt.mongodb.net/Learning')
        .then(() => console.log("MongoDB Connected ✅"))
        .catch(err => console.log("DB Error:", err));
}
module.exports = dbconnection;