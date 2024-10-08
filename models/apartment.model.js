// Your code here ...
const { Schema, model } = require('mongoose');

const apartmentSchema = new Schema({

    title: {
        type: String,
        
    },  
    isbn:{
        type:String,
        
    },
    price:{
        type:Number        
    },
    nHab:{
        type:Number,
        require:true
    },
    nBat:{
        type:Number,
        require:true
    },
    nBedSimple:{
        type:Number,
        require:true
    },
    nBedDouble:{
        type:Number,
        require:true
    },
    nPerson:{
        type:Number,
        require:true,
        min:1,
        max:7
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true,
        min: 0
    },
    mainPhoto: {
        type: String,
        required: true
       // match: ['\b((https?|ftp):\/\/[-\w+&@#/%=~_|!:,.;]+[-\w+&@#/%=~_|])', "URL not valid"]
    },
    descriptionmainPhoto: {
        type: String,
        required: true
       // match: ['\b((https?|ftp):\/\/[-\w+&@#/%=~_|!:,.;]+[-\w+&@#/%=~_|])', "URL not valid"]
    },
    photo1:{
        type: String      
    },
    descriptionphoto1:{
        type: String      
    },
    photo2:{
        type: String       
    },
    descriptionphoto2:{
        type: String      
    },
    photo3:{
        type: String       
    },
    descriptionphoto3:{
        type: String      
    },
    location:{
        province:String,
        city:String,
        gps:String,
        street:String,
        googlemap:String
    },
    estado:{
        type:Number
    },
    services: {
        
        wifi: Boolean,
        airConditioner: Boolean,
        kitchen: Boolean,
        disability: Boolean,
        heater: Boolean,
        tv: Boolean,
        pet:Boolean,
        parking:Boolean

    }

});
 const Apartment = model('Apartment',apartmentSchema)
 module.exports = Apartment;
