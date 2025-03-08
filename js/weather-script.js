// Nos mantenemos a la escucha que se cargue la página
const apiClave = '******************************************'; // substitueix per la teva clau d'Openweather

// Consulta por ubicación del usuario
window.addEventListener('load', ()=>{
    // Declaramos variables para mostrar datos en el DOM
    let temperaturaValor = document.querySelector('#temperatura-valor');
    let temperaturaDescripcion = document.querySelector('#temperatura-descripcion');
    let ubicacion = document.querySelector('#ubicacion');
    let iconoDom = document.querySelector('#icono-animado');
    let vientoVelocidad = document.querySelector('#viento-velocidad');

    // Obtenemos la geolocalización del navegador (pedimos permiso al usuario)
    if(navigator.geolocation){
        console.log(navigator.geolocation);
        navigator.geolocation.getCurrentPosition(posicion =>{
            // console.log(posicion);
            // console.log(posicion.coords.latitude);
            // console.log(posicion.coords.longitude);
            let longitud = posicion.coords.longitude;
            let latitud = posicion.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiClave}&units=metric&lang=es`;

            // const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=${apiClave}&units=metric&lang=es`;

            // console.log(url);

            // Petición de datos con FETCH
            fetch(url)
                .then (response => response.json())
                // .then (json => console.log(json))
                .then (datos =>{
                    console.log(datos);
                    let temperatura = Math.round(datos.main.temp);
                    temperaturaValor.textContent = `${temperatura} °C`;
                    
                    let localizacion = datos.name;
                    ubicacion.textContent = localizacion;
                    
                    let descripcion = datos.weather[0].description;
                    temperaturaDescripcion.textContent = descripcion.toUpperCase();

                    let viento = datos.wind.speed;
                    vientoVelocidad.textContent = `${viento} m/s`;

                    // let icono = datos.weather[0].icon;
                    // let urlIcono = `http://openweathermap.org/img/wn/${icono}.png`;
                    // iconoDom.src = urlIcono;

                    let icono = datos.weather[0].main;
                    // console.log(icono);
                    switch(icono){
                        case 'Clouds':
                            iconoDom.src = 'img/cloudy-day-1.svg';
                            break;
                        case 'Clear':
                            iconoDom.src = 'img/day.svg';
                            break;
                        case 'Snow':
                            iconoDom.src = 'img/snowy-1.svg';
                            break;
                        case 'Rain':
                            iconoDom.src = 'img/rainy-1.svg';
                            break;
                        case 'Drizzle':
                            iconoDom.src = 'img/rainy-2.svg';
                            break;
                        case 'Thunderstorm':
                            iconoDom.src = 'img/thunder.svg';
                            break;
                        case 'Atmosphere':
                            iconoDom.src = 'img/weather.svg';
                            break;
                        default:
                            iconoDom.src = 'img/weather_sunset.svg';
                    }


                })
                .catch(err => console.log('Descripción errores', err))
        });
    }
});

// Esperamos a que el usuario escriba el tema y pulse el botón
document.querySelector('#consulta').addEventListener('click', ()=>{
    let datoUsuario = document.querySelector('#ciudad').value;
    // console.log(datoUsuario);
    app(datoUsuario);
});

document.querySelector('#ciudad').addEventListener('keyup', (event)=>{
    if (event.key === 'Enter'){
        let datoUsuario = document.querySelector('#ciudad').value;
        console.log(datoUsuario);
        app(datoUsuario);
    }
});


// Consulta por parte del usuario
const app = (dato)=>{
    // console.log('Hola');
    let temperaturaValorUsuario = document.querySelector('#temperatura-valor-usuario');
    let temperaturaDescripcionUsuario = document.querySelector('#temperatura-descripcion-usuario');
    let ubicacionUsuario = document.querySelector('#ubicacion-usuario');
    let iconoDomUsuario = document.querySelector('#icono-animado-usuario');
    let vientoVelocidadUsuario = document.querySelector('#viento-velocidad-usuario');

    
    // Ubicación dada por el usuario
    const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${dato}&appid=${apiClave}&units=metric&lang=es`;
    // console.log(urlCity);

    // Petición a API REST
    fetch(urlCity)
        .then (response => response.json())
        // .then (json => console.log(json))
        .then (datosUsuario =>{
            // console.log(datosUsuario);
            let temperatura = Math.round(datosUsuario.main.temp);
                    temperaturaValorUsuario.textContent = `${temperatura} °C`;
                    
                    let localizacion = datosUsuario.name;
                    ubicacionUsuario.textContent = localizacion;
                    
                    let descripcion = datosUsuario.weather[0].description;
                    temperaturaDescripcionUsuario.textContent = descripcion.toUpperCase();

                    let viento = datosUsuario.wind.speed;
                    vientoVelocidadUsuario.textContent = `${viento} m/s`;

                    // let icono = datos.weather[0].icon;
                    // let urlIcono = `http://openweathermap.org/img/wn/${icono}.png`;
                    // iconoDom.src = urlIcono;

                    let icono = datosUsuario.weather[0].main;
                    // console.log(icono);
                    switch(icono){
                        case 'Clouds':
                            iconoDomUsuario.src = 'img/cloudy-day-1.svg';
                            break;
                        case 'Clear':
                            iconoDomUsuario.src = 'img/day.svg';
                            break;
                        case 'Snow':
                            iconoDomUsuario.src = 'img/snowy-1.svg';
                            break;
                        case 'Rain':
                            iconoDomUsuario.src = 'img/rainy-1.svg';
                            break;
                        case 'Drizzle':
                            iconoDomUsuario.src = 'img/rainy-2.svg';
                            break;
                        case 'Thunderstorm':
                            iconoDomUsuario.src = 'img/thunder.svg';
                            break;
                        case 'Atmosphere':
                            iconoDomUsuario.src = 'img/weather.svg';
                            break;
                        default:
                            iconoDomUsuario.src = 'img/cloudy.svg';
                    }
        })
        .catch(err => console.log('Descripción errores', err))

}
