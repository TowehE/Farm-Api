const mongoose = require("mongoose")

//create a schema
const animalSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true,
    },
    breed:{
        type : String,
        required: true,
    },
    IsMatured:{
            type : Boolean,
       default:false,
    },
    age : {
        type : Number,
        required : true,
    },
    isSold: {
        type : Boolean,
       default: false,
    }

},{timeStamps: true})

const animalModel = mongoose.model("animals", animalSchema)

module.exports = {animalModel}