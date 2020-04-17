const mongoose = require('mongoose');

const Schema = mongoose.Schema
const savingSchema = new Schema({
    description : {type:String,required:true},
    amt: {type:Number,required:true},
    date: {type:String, required:true}
});


const Saving = mongoose.model('Savings',savingSchema);

module.exports = Saving;