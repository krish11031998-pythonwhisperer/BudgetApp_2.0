const mongoose = require('mongoose');

const Schema = mongoose.Schema
const ProductModel = new Schema({
    url : {type:"String",required:true},
    name: {type:"String",required:true},
    currency: {type:"String",required:true},
    info:{type:"String",required:true},
    price : {type:"Number",required : true},
    prev_price: {type:"Number",required:true},
    saving_timeframe: {type:"Number",required:true},
    date : {type:"Date",required:true}
})

const Product = mongoose.model('Product',ProductModel);
module.exports = Product;