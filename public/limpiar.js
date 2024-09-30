limpiar = document.querySelector("#limpiar");


description= document.querySelector("#description");
normas= document.querySelector("#normas");
nHab= document.querySelector("#nHab");
nBanio= document.querySelector("#nBanio");
nBed= document.querySelector("#nBed");
nPerson= document.querySelector("#nPerson");

descriptionmainPhoto= document.querySelector("#descriptionmainPhoto");
Photo1= document.querySelector("#Photo1");
descriptionphoto1= document.querySelector("#descriptionphoto1");
Photo2= document.querySelector("#Photo2");
descriptionphoto2= document.querySelector("#descriptionphoto2");
Photo3= document.querySelector("#Photo3");
descriptionphoto3= document.querySelector("#descriptionphoto3");
wifi= document.querySelector("#wifi");
airConditioner= document.querySelector("#airConditioner");
disability= document.querySelector("#disability");
kitchen= document.querySelector("#kitchen");
heater= document.querySelector("#heater");
tv= document.querySelector("#tv");

title = document.querySelector("#title");
mainPhoto= document.querySelector("#mainPhoto");
price= document.querySelector("#price");
size= document.querySelector("#size");

limpiar.addEventListener('click', ()=>{
    title.value='';
    price.value='';
    size.value='';
    mainPhoto.value='';

    description.value='';
    normas.value='';
    nHab.value=''; 
    nBanio.value=''; 
    nBed.value=''; 
    nPerson.value=''; 
    descriptionmainPhoto.value='';
    Photo1.value='';
    descriptionphoto1.value='';
    Photo2.value='';
    descriptionphoto2.value='';
    Photo3.value=''; 
    descriptionphoto3.value=''; 
wifi.checked=false; 
airConditioner.checked=false; 
disability.checked=false; 
kitchen.checked=false;
heater.checked=false;
tv.checked=false; 
})

const data = {
    Madrid: [
        {nombre: 'Madrid', lat: 40.4165, lng: -3.7026},
        {nombre: 'Alcalá de Henares', lat: 40.4819, lng: -3.3635},
    ],
    Barcelona: [
        {nombre: 'Barcelona', lat: 41.3851, lng: 2.1734},
        {nombre: 'Badalona', lat: 41.4469, lng: 2.2450},
    ],
    Valencia: [
        {nombre: 'Valencia', lat: 39.4699, lng: -0.3763},
        {nombre: 'Gandía', lat: 38.9680, lng: -0.1795},
    ],
    // Agrega más provincias y ciudades según sea necesario
};
function cargarCiudades() {
    const provinciaSelect = document.getElementById('province');
    const ciudadSelect = document.getElementById('gps');

    const provincia = provinciaSelect.value;

    // Limpiar el select de ciudades
    ciudadSelect.innerHTML = '<option selected>Seleccione una ciudad</option>';

    if (provincia && data[provincia]) {
        data[provincia].forEach(ciudad => {
            const option = document.createElement('option');
            option.value = `${ciudad.lat},${ciudad.lng}`;
            option.textContent = ciudad.nombre;
            ciudadSelect.appendChild(option);
           
        });
        
    }
}
const gps = document.getElementById('gps');
gps.addEventListener('click',()=>{
    const city = document.getElementById('city');
    const textoSeleccionado =gps.options[gps.selectedIndex].textContent;
    city.value =textoSeleccionado ;
})

btnadmin = document.querySelector('#btnadmin1');
btnadmin.addEventListener('click',()=>{
    alert('hola');

})

btnsearch = document.querySelector('#btnsearch');
btnsearch.addEventListener('click',()=>{
    alert('hola');
});

