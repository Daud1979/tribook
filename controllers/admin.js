// importar el modelo
const Apartment = require('../models/apartment.model.js');

const getNewApartmentForm = (req, res) => {

    // Obtener todos los apartmentos de la base de datos
    const apartments = Apartment.find();

    res.render('new-apartment.ejs')
}

const postNewApartment = async (req, res) => {
   console.log(req.body);
    const wifi = (req.body.wifi==='true')? true : false;
    const airConditioner = (req.body.airConditioner==='true')? true : false;
    const disability= (req.body.disability==='true')? true : false;
    const kitchen= (req.body.kitchen==='true')? true : false;
    const heater= (req.body.heater==='true')? true : false;
    const tv= (req.body.tv==='true')? true : false;    
    await Apartment.create({
        title: req.body.title,
            price: req.body.price,
            size: req.body.size,
            mainPhoto: req.body.mainPhoto,
            description: req.body.description,
            normas: req.body.normas,
            nHab: req.body.nHab,
            nBat: req.body.nBat, // Asegúrate que coincida con el esquema
            nBed: req.body.nBed,
            nPerson: req.body.nPerson,
            descriptionmainPhoto: req.body.descriptionmainPhoto,
            photo1: req.body.Photo1,
            descriptionphoto1: req.body.descriptionphoto1,
            photo2: req.body.Photo2,
            descriptionphoto2: req.body.descriptionphoto2,
            photo3: req.body.Photo3,
            descriptionphoto3: req.body.descriptionphoto3,
            services: {
                wifi: wifi,
                airConditioner: airConditioner,
                disability:disability,
                kitchen: kitchen,
                heater: heater,
                tv: tv
            }
      
    });
    res.render('new-apartment.ejs');
}

// named exports (expotamos varios recursos, lo hacemos como un objeto)
module.exports = {
    getNewApartmentForm,
    postNewApartment
}