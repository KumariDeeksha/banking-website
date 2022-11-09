const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true
    },acnumber:{
        type:Number,
        required:true
    },balance:{ 
        type:Number,
        required:true
    }

});



const Customers = mongoose.model('Customers',customerSchema);
module.exports = Customers;

