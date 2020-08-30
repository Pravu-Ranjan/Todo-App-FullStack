const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Define Todo Schema
const TodoSchema = new Schema({
        title: String,
        content: String
})

// Create Model Class
const ModelClass = mongoose.model('todo', TodoSchema);

//Export Model
module.exports = ModelClass;