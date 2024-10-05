/** Crear un conjunto de funciones que van a dar respuesta a nuestras rutas  */
const Apartment = require('../models/apartment.model.js');
const Reservas = require('../models/reservation.model.js');
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
const getApartmentReserv =async (req,res)=>{
    const { idApartment } = req.params;

    const selectedApartment = await Apartment.findById(idApartment);

    res.render('reserved-aparment', {
        selectedApartment
    });
}

const postReserveApartmen =async (req,res)=>{
    const { email,cliente,datestart,dateend,id } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);
    const hoy = new Date().toISOString().split('T')[0];
    if (!isValidEmail)
    {
        return res.json({
            message:"EL CORREO NO TIENE FORMATO CORRECTO",
            type:0
        });
    }
    if (cliente=='')
    {
        return res.json({
            message:"SE REQUIERE EL NOMBRE DEL CLIENTE",
            type:0
        });
    }
    if (dateend=='' || datestart=='')
    {
        return res.json({
            message:"FECHA NO VALIDA",
            type:0
        });
    }    
    if (datestart<hoy)
    {
        return res.json({
            message:"LA FECHA DE INICIO NO DEBE SER INFERIOR A LA FECHA ACTUAL",
            type:0
        });
    }
    if (datestart>dateend)
    {
        return res.json({
            message:"LA FECHA DE FINAL NO DEBE SER INFERIOR A LA FECHA DE INICIO",
            type:0
        });
    }
    //verificar si existe la reserva
    try{
        const startDate = new Date(datestart);
        const endDate = new Date(dateend);
        const reservaExistente = await Reservas.findOne({
            apartment: id,
            startDate: { $lte: endDate },  
            endDate: { $gte: startDate }   
         
        });
        if (reservaExistente){
            return res.json({
                message:"YA EXISTE UNA RESERVA EN ESAS FECHAS",
                type:0
            });
        }
        //registrar reserva
        try{
            await Reservas.create({
            email: email,
            cliente:cliente,
            startDate: startDate,
            endDate: endDate,
            apartment: id
        });
        res.json({
        message:"SE REGISTRO LA RESERVA DEL APARTAMENTO",
        type:1
        });
        }
        catch(error){
            console.log(error);
            res.json({
            message:"SE PRODUJO UN ERROR AL REGISTRAR",
            type:0
            });
        }
    }
    catch (error){
        console.log('error encontrar ',error);
    }
   

}
module.exports = {
    getApartments,
    getApartmentById,
    postSearch,
    getApartmentReserv,
    postReserveApartmen
}
