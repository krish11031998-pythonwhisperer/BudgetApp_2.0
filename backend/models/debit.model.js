const mongoose = require('mongoose');

const Schema = mongoose.Schema
const debitSchema = new Schema({
    description : {type:String,required:true},
    amt: {type:Number,required:true},
    date: {type:String, required:true}
});

const Debit = mongoose.model('Debit',debitSchema);

module.exports = Debit;