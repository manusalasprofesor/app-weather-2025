// Nos mantenemos a la escucha que se cargue la página
const apiClave = 'a9a0c550e7617ee2a2601fa5dc985f49'; // Sustituye por tu clave de Openweather
const apikeyUnplash = 'DeFjVs9RHp_oXbJhYwMpqEpA-JnclDZjyGgTvDlo6QA'; // Sustituye por tu clave de Unsplash

// Consulta por ubicación del usuario
window.addEventListener('load', ()=>{
    let temperaturaValor = document.querySelector('#temperatura-valor');
    let temperaturaDescripcion = document.querySelector('#temperatura-descripcion');
    let ubicacion = document.querySelector('#ubicacion');
    let iconoDom = document.querySelector('#icono-animado');
    let vientoVelocidad = document.querySelector('#viento-velocidad');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( async (posicion) =>{
            let longitud = posicion.coords.longitude;
            let latitud = posicion.coords.latitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiClave}&units=metric&lang=es`;
            
            // fetch(url)
            //     .then (response => response.json())
            //     .then (datos =>{
            //         let temperatura = Math.round(datos.main.temp);
            //         temperaturaValor.textContent = `${temperatura} °C`;
            //         ubicacion.textContent = datos.name;
            //         temperaturaDescripcion.textContent = datos.weather[0].description.toUpperCase();
            //         vientoVelocidad.textContent = `${datos.wind.speed} m/s`;
                    
            //         let icono = datos.weather[0].main;
            //         iconoDom.src = obtenerIcono(icono);
            //     })
            //     .catch(err => console.log('Error:', err));

            try{
                const response = await fetch(url);
                const datos = await response.json();

                let temperatura = Math.round(datos.main.temp);
                temperaturaValor.textContent = `${temperatura} °C`;
                ubicacion.textContent = datos.name;
                temperaturaDescripcion.textContent = datos.weather[0].description.toUpperCase();
                vientoVelocidad.textContent = `${datos.wind.speed} m/s`;
                
                let icono = datos.weather[0].main;
                iconoDom.src = obtenerIcono(icono);

            }
            catch (error){
                console.error('Error al cargar el mapa de Openweather map:', error);
            }
        });
    }
});

// Evento para buscar una ciudad
document.querySelector('#consulta').addEventListener('click', ()=>{
    let ciudad = document.querySelector('#ciudad').value;
    if (ciudad) {
        obtenerDatosCiudad(ciudad);
        cambiarFondoCiudad(ciudad);
    }
});

document.querySelector('#ciudad').addEventListener('keyup', (event)=>{
    if (event.key === 'Enter'){
        let ciudad = document.querySelector('#ciudad').value;
        if (ciudad) {
            obtenerDatosCiudad(ciudad);
            cambiarFondoCiudad(ciudad);
        }
    }
});

// Función para obtener datos de la ciudad desde OpenWeather
// const obtenerDatosCiudad = (ciudad) => {
//     let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiClave}&units=metric&lang=es`;
//     fetch(urlCity)
//         .then(response => response.json())
//         .then(datos =>{
//             document.querySelector('#temperatura-valor-usuario').textContent = `${Math.round(datos.main.temp)} °C`;
//             document.querySelector('#ubicacion-usuario').textContent = datos.name;
//             document.querySelector('#temperatura-descripcion-usuario').textContent = datos.weather[0].description.toUpperCase();
//             document.querySelector('#viento-velocidad-usuario').textContent = `${datos.wind.speed} m/s`;
//             document.querySelector('#icono-animado-usuario').src = obtenerIcono(datos.weather[0].main);
//         })
//         .catch(err => console.log('Error:', err));
// };

const obtenerDatosCiudad = async (ciudad)=>{
    let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiClave}&units=metric&lang=es`;
    try{
        const response = await fetch(urlCity);
        const datos = await response.json();

        document.querySelector('#temperatura-valor-usuario').textContent = `${Math.round(datos.main.temp)} °C`;
        document.querySelector('#ubicacion-usuario').textContent = datos.name;
        document.querySelector('#temperatura-descripcion-usuario').textContent = datos.weather[0].description.toUpperCase();
        document.querySelector('#viento-velocidad-usuario').textContent = `${datos.wind.speed} m/s`;
        document.querySelector('#icono-animado-usuario').src = obtenerIcono(datos.weather[0].main);

    }
    catch (error){
        console.error('Error al cargar imagen de Unsplash:', error);
    }
};


// Función para cambiar el fondo con una imagen de Unsplash
// const cambiarFondoCiudad = (ciudad) => {
//     const urlUnsplash = `https://api.unsplash.com/photos/random?query=${ciudad}&client_id=${apikeyUnplash}`;
//     fetch(urlUnsplash)
//         .then(response => response.json())
//         .then(data => {
//             if (data.urls && data.urls.full) {
//                 document.body.style.backgroundImage = `url('${data.urls.full}')`;
//                 document.body.style.backgroundSize = 'cover';
//                 document.body.style.backgroundPosition = 'center';
//             }
//         })
//         .catch(err => console.log('Error al cargar imagen de Unsplash:', err));
// };

const cambiarFondoCiudad = async (ciudad) => {
    try {
        const urlUnsplash = `https://api.unsplash.com/photos/random?query=${ciudad}&client_id=${apikeyUnplash}`;
        const response = await fetch(urlUnsplash);
        
        // if (!response.ok) {
        //     throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        // }

        const data = await response.json();

        if (data.urls && data.urls.full) {
            document.body.style.backgroundImage = `url('${data.urls.full}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
        } 
        // else {
        //     throw new Error('No se encontró una imagen válida en la respuesta de Unsplash.');
        // }

    } catch (error) {
        console.error('Error al cargar imagen de Unsplash:', error);
    }
};



// Función para obtener icono de clima
const obtenerIcono = (icono) => {
    switch(icono){
        case 'Clouds': return 'img/cloudy-day-1.svg';
        case 'Clear': return 'img/day.svg';
        case 'Snow': return 'img/snowy-1.svg';
        case 'Rain': return 'img/rainy-1.svg';
        case 'Drizzle': return 'img/rainy-2.svg';
        case 'Thunderstorm': return 'img/thunder.svg';
        case 'Atmosphere': return 'img/weather.svg';
        default: return 'img/weather_sunset.svg';
    }
};
