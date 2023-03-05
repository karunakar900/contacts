const mongoose = require('mongoose');

const datamodel = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: String, required: true }
})

const userdata = mongoose.model("user", datamodel);

module.exports = userdata;