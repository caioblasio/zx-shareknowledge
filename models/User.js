const mongoose = require('mongoose');
const { Schema } = mongoose;


let userSchema = new Schema({
    username: {type: String, unique: true, require: [true, "can't be blank"], index: true},
    email: {type: String, unique: true, require: [true, "can't be black"], index: true}, 
});
