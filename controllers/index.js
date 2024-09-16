/** Crear un conjunto de funciones que van a dar respuesta a nuestras rutas  */
const Apartment = require('../models/apartment.model.js');

const getApartments = async (req, res) => {

    // Obtenemos todos los apartamentos de la base de datos
    const apartments = await Apartment.find({estado:1});
    res.render('home', {
        apartments
    });
}

const getApartmentById = async (req, res) => {
    // 1. Voy al modelo para obtener el apartamento dado su id
    const { idApartment } = req.params;

    const selectedApartment = await Apartment.findById(idApartment);

    res.render('detail-apartment', {
        selectedApartment
    });
};
const postSearch =async (req,res)=>{
    const { province, ciudad, hab, people, precio } = req.body;   
    precionuevo=precio.split('_');
    const filtro = {
        'location.province': province,
        'location.city': ciudad,
        nHab: hab,
        nPerson: people,
        price: { $gte: precionuevo[0], $lte: precionuevo[1] }
    };
    
     const apartments = await Apartment.find(filtro);
     res.json(apartments);
}

module.exports = {
    getApartments,
    getApartmentById,
    postSearch
}
