// importar módulos de terceros
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
// importar las rutas públicas
const indexRoutes = require('./routes/index.js');
const apiRoutes = require('./routes/api.js');
// importar las rutas de administrador
const adminRoutes = require('./routes/admin.js');
const authRoutes = require('./routes/auth.js');
app.use('/api', apiRoutes);
// creamos una instancia del servidor Express

app.use(express.json());
// Tenemos que usar un nuevo middleware para indicar a Express que queremos procesar peticiones de tipo POST
app.use(express.urlencoded({ extended: true }));
//
app.use(session({
    secret: 'miSecretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // secure: true en producción con HTTPS
}));
// Añadimos el middleware necesario para que el client puedo hacer peticiones GET a los recursos públicos de la carpeta 'public'
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

// Especificar a Express que quiero usar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Usamos el middleware morgan para loguear las peticiones del cliente
app.use(morgan('tiny'));
app.use((req, res, next) => {
    // La variable req.locals es una variable "global" de tipo objecto a la que todas las vistas pueden acceder
    // Si el usuario esta autentificado entonces es que es de tipo administrador
    res.locals.isAdmin = req.session.isAuthenticated;

    // tenemos que ejecutar next() para que la petición HTTP siga su curso
    next();
})

app.use('/admin', (req, res, next) => {
    // Miramos si el usuario esta autentificado
    if (req.session.isAuthenticated) {
        // Si es que si, establecemos que es de tipo administrador y permitimos que siga la petición
        res.locals.isAdmin = true;
        next();
    } else {
        // en caso contrario lo llevamos a la vista de login
        res.locals.isAdmin = false;
        res.redirect('/');
    }
});
// Añadimos las ritas de index.js en nuestra app
// El primer parámetro significa que todas las rutas que se encuentren en 'indexRouter' estarán prefijados por '/'
// Voy a prefijar todas las rutas de administrador con '/admin'
app.use('/admin', adminRoutes);
app.use('/', authRoutes);
app.use('/', indexRoutes);


async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a la base de datos');
}

connectDB().catch(err => console.log(err))

app.listen(PORT, (req, res) => {
    console.log("Servidor escuchando correctamente en el puerto " + PORT);
});