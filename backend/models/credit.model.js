const mongoose = require('mongoose');

const Schema = mongoose.Schema

const creditSchema = new Schema({
    description : {type:String,required:true},
    amt: {type:Number,required:true},
    date: {type:String, required:true}
});

const Credit = mongoose.model('Credit',creditSchema);

module.exports = Credit;
