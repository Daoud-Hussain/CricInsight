const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String
})

const FormDataModel = mongoose.model('Profiling_Data', FormDataSchema);

module.exports = FormDataModel;
