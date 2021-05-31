import '../assets/sass/main.scss'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1Ijoic2lsdmlhY2diIiwiYSI6ImNrb2pwbGY1MzB4MzIycHJtZTZqOHQzZHQifQ.4OCtysgsx9_5mkZ6tu-QxQ';



window.addEventListener("load", () => {
    loadMapView();    
});

let markersPositions;
let mapPosition; 
let view;
let map;
let weather;
const modal = document.querySelector(".details");


const loadMarkers = () => {
    const localStorageMarkers = localStorage.getItem("markers");
        if (localStorageMarkers == null) { 
            markersPositions = [];
        } else {
            markersPositions = JSON.parse(localStorageMarkers);
    } 
}



const loadMapInfo = () => {
    const localStoragePosition = localStorage.getItem("map-info");
        if (localStoragePosition == null) { 
            mapPosition = {
                center: [-3, 40], 
                zoom: 11,
            };
        } else {
            mapPosition = JSON.parse(localStoragePosition);
        }
}



const loadMapView = () => {   
    view = "map";
    loadMarkers();
    loadMapInfo();

    renderMapViewHeader();
    renderMapViewMain();   
    renderMapViewFooter();   
}



const renderMapViewHeader = () => {
    const header = document.querySelector(".header");
    header.innerHTML = "<h1>Weathever</h1>";
}


const renderMapViewMain = () => {
    const main = document.querySelector(".main");
    main.innerHTML = '<div id="mi_mapa_silvia"></div>';
    renderMap();
    renderMarkers();
    initMapEvents();
}

const renderMapViewFooter = () => {
    const footer = document.querySelector(".my_position");
    footer.innerHTML = `
    <p>Go to my position</p> 
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30pt" height="30pt" viewBox="0 0 30 30" version="1.1">
      <g id="surface1">
      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(80%,89.411765%,100%);fill-opacity:1;" d="M 25.210938 10.851562 C 25.210938 12.714844 24.714844 14.457031 23.847656 15.957031 L 15 29.363281 L 6.152344 15.957031 C 5.285156 14.457031 4.789062 12.714844 4.789062 10.851562 C 4.789062 5.207031 9.359375 0.636719 15 0.636719 C 20.640625 0.636719 25.210938 5.207031 25.210938 10.851562 Z M 20.105469 10.851562 C 20.105469 8.03125 17.820312 5.746094 15 5.746094 C 12.179688 5.746094 9.894531 8.03125 9.894531 10.851562 C 9.894531 13.671875 12.179688 15.957031 15 15.957031 C 17.820312 15.957031 20.105469 13.671875 20.105469 10.851562 Z M 20.105469 10.851562 "/>
      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,47.843137%,100%);fill-opacity:1;" d="M 5.621094 16.308594 L 14.46875 29.714844 C 14.585938 29.890625 14.785156 30 15 30 C 15.214844 30 15.414062 29.890625 15.53125 29.714844 L 24.398438 16.277344 C 25.347656 14.636719 25.851562 12.757812 25.851562 10.851562 C 25.851562 4.867188 20.984375 0 15 0 C 9.015625 0 4.148438 4.867188 4.148438 10.851562 C 4.148438 12.757812 4.652344 14.636719 5.601562 16.277344 C 5.605469 16.289062 5.613281 16.300781 5.621094 16.308594 Z M 15 1.277344 C 20.28125 1.277344 24.574219 5.570312 24.574219 10.851562 C 24.574219 12.535156 24.132812 14.191406 23.3125 15.605469 L 15 28.203125 L 6.695312 15.621094 C 5.863281 14.179688 5.425781 12.527344 5.425781 10.851562 C 5.425781 5.570312 9.71875 1.277344 15 1.277344 Z M 15 1.277344 "/>
      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,47.843137%,100%);fill-opacity:1;" d="M 15 16.597656 C 18.167969 16.597656 20.746094 14.019531 20.746094 10.851562 C 20.746094 7.683594 18.167969 5.105469 15 5.105469 C 11.832031 5.105469 9.253906 7.683594 9.253906 10.851562 C 9.253906 14.019531 11.832031 16.597656 15 16.597656 Z M 15 6.382812 C 17.464844 6.382812 19.46875 8.386719 19.46875 10.851562 C 19.46875 13.316406 17.464844 15.320312 15 15.320312 C 12.535156 15.320312 10.53125 13.316406 10.53125 10.851562 C 10.53125 8.386719 12.535156 6.382812 15 6.382812 Z M 15 6.382812 "/>
      </g>
    </svg>`;

  // Click Botón "Go to my position"

  footer.addEventListener("click", () => {
      flytoLocation();
  });
}

const renderMap = () => {
    console.log(mapPosition.center);
    map = new mapboxgl.Map({
        container: 'mi_mapa_silvia',
        style: 'mapbox://styles/silviacgb/ckp3rkriu4nsy18ota6df7fi4',
        center: mapPosition.center,
        zoom: mapPosition.zoom,
    });
    
    console.log(map.center);
};




const renderMarkers = () => {
		markersPositions.forEach(m => {
				new mapboxgl.Marker().setLngLat([m.coord.lon, m.coord.lat]).addTo(map);
        })
};


const flytoLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        
        map.flyTo({                    
            center: [lng, lat], 
            zoom: 5  
       })
    });  
}




const initMapEvents = () => {
    map.on("move", (ev) => {
        const center = ev.target.getCenter();
        const zoom = ev.target.getZoom();
        const storingObj = {
            center: [center.lng, center.lat],
            zoom: zoom
        };
        localStorage.setItem("map-info", JSON.stringify(storingObj));
    });
    map.on("click", async(ev) => {
        loadSingleView(ev.lngLat);        
    });
};
// Spinner

const loadSingleView = async (lngLat) => {
    view = "single";
    loadSpinner();
    await fetchData(lngLat);

    unloadSpinner();
    renderSingleViewModal();

    modal.classList.add("opened");
}


// Spinner visible / Spinner oculto
const loadSpinner = () => {      
    const spinner = document.querySelector(".spinner");
    spinner.classList.add("opened");
}

const unloadSpinner = () => {    
    const spinner = document.querySelector(".spinner");
    spinner.classList.remove("opened");
}


// Almacenar datos api


const fetchData = async (lngLat) => {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lngLat.lat}&lon=${lngLat.lng}&appid=b92eb8a2e5fe79e7ea0cfcf4ebb3d1b8&units=metric`;
    weather = await fetch(url).then(d => d.json()).then(d => d);
    console.log(weather);
}



const renderSingleViewModal = () => {
    
    modal.innerHTML =`<div class="modal-details">
       <div class="details-content">
           <button class="close">
           <span class="fa fa-close"></span>
           </button>
          
           <div class="content">
           <h2>${weather.name}</h2>
           <div class= "all-data">
           <div class="data">
           <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20pt" height="20pt" viewBox="0 0 20 20" version="1.1">
           <g id="surface1">
           <path style=" stroke:none;fill-rule:nonzero;fill:rgb(12.941176%,58.823529%,95.294118%);fill-opacity:1;" d="M 13.472656 4.386719 C 12.449219 3.082031 11.394531 1.734375 10.539062 0.285156 C 10.3125 -0.09375 9.6875 -0.09375 9.460938 0.285156 C 8.605469 1.734375 7.550781 3.082031 6.527344 4.386719 C 4.453125 7.035156 2.492188 9.535156 2.492188 12.492188 C 2.492188 16.632812 5.859375 20 10 20 C 14.140625 20 17.507812 16.632812 17.507812 12.492188 C 17.507812 9.535156 15.546875 7.035156 13.472656 4.386719 Z M 13.472656 4.386719 "/>
           <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.039216%,98.039216%,98.039216%);fill-opacity:1;" d="M 8.121094 11.242188 C 7.089844 11.242188 6.246094 10.398438 6.246094 9.363281 C 6.246094 8.328125 7.089844 7.488281 8.121094 7.488281 C 9.15625 7.488281 10 8.328125 10 9.363281 C 10 10.398438 9.15625 11.242188 8.121094 11.242188 Z M 8.121094 8.738281 C 7.777344 8.738281 7.496094 9.019531 7.496094 9.363281 C 7.496094 9.707031 7.777344 9.988281 8.121094 9.988281 C 8.46875 9.988281 8.75 9.707031 8.75 9.363281 C 8.75 9.019531 8.46875 8.738281 8.121094 8.738281 Z M 8.121094 8.738281 "/>
           <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.039216%,98.039216%,98.039216%);fill-opacity:1;" d="M 11.878906 17.496094 C 10.84375 17.496094 10 16.65625 10 15.621094 C 10 14.585938 10.84375 13.742188 11.878906 13.742188 C 12.910156 13.742188 13.753906 14.585938 13.753906 15.621094 C 13.753906 16.65625 12.910156 17.496094 11.878906 17.496094 Z M 11.878906 14.996094 C 11.53125 14.996094 11.25 15.277344 11.25 15.621094 C 11.25 15.964844 11.53125 16.246094 11.878906 16.246094 C 12.222656 16.246094 12.503906 15.964844 12.503906 15.621094 C 12.503906 15.277344 12.222656 14.996094 11.878906 14.996094 Z M 11.878906 14.996094 "/>
           <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.039216%,98.039216%,98.039216%);fill-opacity:1;" d="M 6.871094 16.246094 C 6.710938 16.246094 6.550781 16.183594 6.429688 16.0625 C 6.183594 15.820312 6.183594 15.421875 6.429688 15.179688 L 12.683594 8.921875 C 12.929688 8.679688 13.324219 8.679688 13.570312 8.921875 C 13.8125 9.164062 13.8125 9.5625 13.570312 9.804688 L 7.3125 16.0625 C 7.191406 16.183594 7.03125 16.246094 6.871094 16.246094 Z M 6.871094 16.246094 "/>
           </g>
           </svg>
           <p>${weather.main.humidity}</p>
           </div>
           <div class="data">
           <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25pt" height="25pt" viewBox="0 0 25 25" version="1.1">
            <g id="surface1">
            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(56.470588%,64.313725%,68.235294%);fill-opacity:1;" d="M 14.84375 3.125 L 14.84375 14.0625 L 10.15625 14.0625 L 10.15625 3.125 C 10.15625 1.828125 11.203125 0.78125 12.5 0.78125 C 13.796875 0.78125 14.84375 1.828125 14.84375 3.125 Z M 14.84375 3.125 "/>
            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(95.686275%,26.27451%,21.176471%);fill-opacity:1;" d="M 16.40625 20.3125 C 16.40625 22.46875 14.65625 24.21875 12.5 24.21875 C 10.34375 24.21875 8.59375 22.46875 8.59375 20.3125 C 8.59375 19.03125 9.203125 17.90625 10.15625 17.1875 L 10.15625 14.0625 L 14.84375 14.0625 L 14.84375 17.1875 C 15.796875 17.90625 16.40625 19.03125 16.40625 20.3125 Z M 16.40625 20.3125 "/>
            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(92.54902%,93.72549%,94.509804%);fill-opacity:1;" d="M 12.5 25 C 9.914062 25 7.8125 22.898438 7.8125 20.3125 C 7.8125 18.960938 8.375 17.710938 9.375 16.820312 L 9.375 3.125 C 9.375 1.402344 10.777344 0 12.5 0 C 14.222656 0 15.625 1.402344 15.625 3.125 L 15.625 16.820312 C 16.625 17.710938 17.1875 18.960938 17.1875 20.3125 C 17.1875 22.898438 15.085938 25 12.5 25 Z M 12.5 1.5625 C 11.640625 1.5625 10.9375 2.265625 10.9375 3.125 L 10.9375 17.1875 C 10.9375 17.433594 10.820312 17.664062 10.625 17.8125 C 9.832031 18.410156 9.375 19.320312 9.375 20.3125 C 9.375 22.035156 10.777344 23.4375 12.5 23.4375 C 14.222656 23.4375 15.625 22.035156 15.625 20.3125 C 15.625 19.320312 15.167969 18.410156 14.375 17.8125 C 14.179688 17.664062 14.0625 17.433594 14.0625 17.1875 L 14.0625 3.125 C 14.0625 2.265625 13.359375 1.5625 12.5 1.5625 Z M 10.15625 17.1875 L 10.171875 17.1875 Z M 10.15625 17.1875 "/>
            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(92.54902%,93.72549%,94.509804%);fill-opacity:1;" d="M 13.28125 6.25 C 12.851562 6.25 12.5 6.601562 12.5 7.03125 C 12.5 7.460938 12.851562 7.8125 13.28125 7.8125 L 15.625 7.8125 L 15.625 6.25 Z M 13.28125 6.25 "/>
            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(92.54902%,93.72549%,94.509804%);fill-opacity:1;" d="M 13.28125 10.9375 C 12.851562 10.9375 12.5 11.289062 12.5 11.71875 C 12.5 12.148438 12.851562 12.5 13.28125 12.5 L 15.625 12.5 L 15.625 10.9375 Z M 13.28125 10.9375 "/>
            </g>
            </svg>
           <p>${weather.main.temp}º</p>
           </div>
           <div class="data">
           <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25pt" height="25pt" viewBox="0 0 25 25" version="1.1">
            <g id="surface1">
            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(56.470588%,79.215686%,97.647059%);fill-opacity:1;" d="M 20.160156 8.59375 C 19.429688 4.980469 16.265625 2.34375 12.5 2.34375 C 9.375 2.34375 6.566406 4.203125 5.335938 7.03125 C 2.382812 7.101562 0 9.527344 0 12.5 C 0 15.515625 2.453125 17.96875 5.46875 17.96875 L 20.3125 17.96875 C 22.898438 17.96875 25 15.867188 25 13.28125 C 25 10.644531 22.777344 8.527344 20.160156 8.59375 Z M 20.160156 8.59375 "/>
            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(89.019608%,94.901961%,99.215686%);fill-opacity:1;" d="M 16.40625 14.84375 C 16.335938 14.84375 16.269531 14.84375 16.203125 14.847656 C 15.507812 12.125 13.039062 10.15625 10.15625 10.15625 C 7.929688 10.15625 5.859375 11.367188 4.75 13.28125 C 4.726562 13.28125 4.707031 13.28125 4.6875 13.28125 C 2.101562 13.28125 0 15.382812 0 17.96875 C 0 20.554688 2.101562 22.65625 4.6875 22.65625 L 16.40625 22.65625 C 18.5625 22.65625 20.3125 20.90625 20.3125 18.75 C 20.3125 16.59375 18.5625 14.84375 16.40625 14.84375 Z M 16.40625 14.84375 "/>
            </g>
            </svg>

           <p>${weather.clouds.all}%</p>
           </div>
           </div>
           </div>
           <button class="save"><p>Save</p></button>
       </div>
   </div>` ;
    

       const save = modal.querySelector('.save');
       save.addEventListener("click", () => {
       saveMarker();  
       modal.classList.remove("opened");   
       loadMapView(); 
       });

       
   
   
       const close = modal.querySelector(".close"); 
       close.addEventListener("click", () => {
        modal.classList.remove("opened"); 
       });
        
   };



const saveMarker = () => {
    
    markersPositions.push(weather);
    localStorage.setItem("markers", JSON.stringify(markersPositions));  
    
}

