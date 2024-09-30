const getApartments = async (req, res) => {
    // 1. Ir al modelo y obtener todos los apartamentos (hasta 100000) <- TODO
    const Apartment = require('../models/apartment.model.js');
    const apartments = await Apartment.find({ estado: 1 }).limit(10000);
    // 2. Devolver una respuesta
    res.status(200).json({
        message: "Query executed successfully",
        results: apartments // TODO: Completar con todos los apartmentos de la base de datos
    })
}

module.exports = {
    getApartments
}