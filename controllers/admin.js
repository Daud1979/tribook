// importar el modelo
const Apartment = require('../models/apartment.model.js');

const getNewApartmentForm = (req, res) => {

    // Obtener todos los apartmentos de la base de datos
    const apartments = Apartment.find();
    res.render('new-apartment.ejs')
}

const postNewApartment = async (req, res) => {
 
    const wifi = (req.body.wifi==='true')? true : false;
    const airConditioner = (req.body.airConditioner==='true')? true : false;
    const disability= (req.body.disability==='true')? true : false;
    const kitchen= (req.body.kitchen==='true')? true : false;
    const heater= (req.body.heater==='true')? true : false;
    const tv= (req.body.tv==='true')? true : false;    
    const pet= (req.body.pet==='true')? true : false;   
    const parking= (req.body.parking==='true')? true : false;    
    await Apartment.create({
           
            title: req.body.title,
            price: req.body.price,
            size: req.body.size,
            mainPhoto: req.body.mainPhoto,
            description: req.body.description,
            normas: req.body.normas,
            estado:1,
            nHab: req.body.nHab,
            nBat: req.body.nBanio, // Asegúrate que coincida con el esquema
            nBedSimple: req.body.nBedSimple,
            nBedDouble: req.body.nBedDouble,
            nPerson: req.body.nPerson,
            descriptionmainPhoto: req.body.descriptionmainPhoto,
            photo1: req.body.Photo1,
            descriptionphoto1: req.body.descriptionphoto1,
            photo2: req.body.Photo2,
            descriptionphoto2: req.body.descriptionphoto2,
            photo3: req.body.Photo3,
            descriptionphoto3: req.body.descriptionphoto3,
            location:{
                province:req.body.province,
                city:req.body.city,
                gps:req.body.gps,
            },
            services: {
                wifi: wifi,
                airConditioner: airConditioner,
                disability:disability,
                kitchen: kitchen,
                heater: heater,
                tv: tv,
                pet:pet,
                parking:parking
            }
      
    });
    res.render('new-apartment.ejs');
}
const postEditApartment = async (req,res)=>{
    const { id } = req.body;
   
   
    const wifi = (req.body.wifi==='on')? true : false;
    const airConditioner = (req.body.airConditioner==='on')? true : false;
    const disability= (req.body.disability==='on')? true : false;
    const kitchen= (req.body.kitchen==='on')? true : false;
    const heater= (req.body.heater==='on')? true : false;
    const tv= (req.body.tv==='on')? true : false;    
    const pet= (req.body.pet==='on')? true : false;   
    const parking= (req.body.parking==='on')? true : false; 
    const datos = {
        title: req.body.title,
        price: req.body.price,
        size: req.body.size,
        mainPhoto: req.body.mainPhoto,
        description: req.body.description,
        normas: req.body.normas,

        nHab: req.body.nHab,
        nBat: req.body.nBanio, // Asegúrate que coincida con el esquema
        nBedSimple: req.body.nBedSimple,
        nBedDouble: req.body.nBedDouble,
        nPerson: req.body.nPerson,
        descriptionmainPhoto: req.body.descriptionmainPhoto,
        photo1: req.body.Photo1,
        descriptionphoto1: req.body.descriptionphoto1,
        photo2: req.body.Photo2,
        descriptionphoto2: req.body.descriptionphoto2,
        photo3: req.body.Photo3,
        descriptionphoto3: req.body.descriptionphoto3,
        location:{
            province:req.body.province,
            city:req.body.city,
            gps:req.body.gps,
        },
        services: {
            wifi: wifi,
            airConditioner: airConditioner,
            disability:disability,
            kitchen: kitchen,
            heater: heater,
            tv: tv,
            pet:pet,
            parking:parking
        }

    }
    
    await Apartment.findByIdAndUpdate(id, datos);
    const apartments = await Apartment.find();

    res.render('home', {
        apartments
    });
}

const getEditAparmentForm = async (req, res) => {
    // 1. Recuperar el apartmento identificado por su idApartment de la base de datos
    const { idApartment } = req.params;
    
    // 2. Ir a la base de datos y obtener el apartamento dada su id
    const apartment = await Apartment.findById(idApartment);

    // 3. Pasar este apartmento a la vista para pre rellenar todos los campos
    res.render('edit-apartment', {
        apartment
    })
}
const getEstadoAparmentForm = async (req, res) => {
    // 1. Recuperar el apartmento identificado por su idApartment de la base de datos
    const { idApartment } = req.params;   
   
    try {
        const estadoactual = await Apartment.findById(idApartment);
        const nuevoEstado = estadoactual.estado === 1 ? 0 : 1;
        await Apartment.findByIdAndUpdate(idApartment, { estado: nuevoEstado });
        console.log('Estado actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar el estado:', error);
    }
    const apartments = (await Apartment.find());
    res.render('home', {
        apartments
    });
}
const getApartmentAdmin = async (req, res) => {

    // Obtenemos todos los apartamentos de la base de datos
    const apartments = await Apartment.find();

    res.render('home', {
        apartments
    });
}
// named exports (expotamos varios recursos, lo hacemos como un objeto)
module.exports = {
    getNewApartmentForm,
    postNewApartment,
    getEditAparmentForm,
    postEditApartment,
    getEstadoAparmentForm,
    getApartmentAdmin
}