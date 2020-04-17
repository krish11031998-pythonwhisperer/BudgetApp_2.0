const mongoose = require('mongoose');

const Schema = mongoose.Schema

const subsSchema = new Schema({
    description : {type:String,required:true},
    amt: {type:Number,required:true},
});


const Subscription = mongoose.model('Subscription',subsSchema);

module.exports = Subscription;