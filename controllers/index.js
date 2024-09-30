/** Crear un conjunto de funciones que van a dar respuesta a nuestras rutas  */
const Apartment = require('../models/apartment.model.js');

const getApartments = async (req, res) => {
    req.session.isAuthenticated = false;
    res.locals.isAdmin = false;  
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
    let filtro = {};    
    // Agregar filtros opcionales según si los valores están presentes
    if (province !='Seleccione una provincia') filtro['location.province'] = province;
    if (ciudad !='Seleccione una ciudad') filtro['location.city'] = ciudad;
    if (hab!='') filtro.nHab = hab;
    if (people!='') filtro.nPerson = people;
    if (precio!='Seleccione un precio') {
        const precionuevo = precio.split('_');
        filtro.price = { $gte: precionuevo[0], $lte: precionuevo[1] };
    }        
     const apartments = await Apartment.find(filtro);
    //  res.render('home', {
    //     body:'req.body',
    //     apartments
    // });
    res.json(apartments);
}

module.exports = {
    getApartments,
    getApartmentById,
    postSearch
}
