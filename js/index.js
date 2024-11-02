let boton_buscar = document.getElementById("boton_buscar");
let date = document.getElementById("date");
let url_base = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=";
let fecha = "2015-07-02"
let url_base2 = "&api_key=JaqcHck0T8xRGHFdiKglELSuQVJfxGKejSEKaJbn&page=";
let id_img = document.getElementById("id");
let martian_sol = document.getElementById("martian_sol");
let earth_date = document.getElementById("earth_date");
let imagen = document.getElementById("imagen");
let pagina_actual = 1;

const contenedor_tabla = document.getElementById("contenedor_tabla");
const tabla = document.createElement('table');
const fila_cabeza = document.createElement('tr');
const id = document.createElement('th');
const rover = document.createElement('th');
const camera = document.createElement('th');
const details = document.createElement('th');

id.textContent = "ID";
rover.textContent = "Rover Name";
camera.textContent = "Camera";
details.textContent = "Details";

fila_cabeza.appendChild(id);
fila_cabeza.appendChild(rover);
fila_cabeza.appendChild(camera);
fila_cabeza.appendChild(details);

function find(){
    console.log(date.value);
    console.log(fecha);
    let url = url_base+date.value+url_base2+pagina_actual;

    tabla.innerHTML = "";
    tabla.appendChild(fila_cabeza);
    
    fetch(url)
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            const photos = data.photos;
            
            imagen.src = photos[0].img_src;
            id_img.innerText = "Id: " + photos[0].id;
            martian_sol.innerText = "Martian sol: " + photos[0].sol;
            earth_date.innerText = "Earth date: " + photos[0].earth_date;

            photos.forEach(photo => {
                let fila = document.createElement('tr');
                let id = document.createElement('th');
                let rover = document.createElement('th');
                let camera = document.createElement('th');
                let details = document.createElement('button');

                id.textContent = photo.id;
                rover.textContent = photo.rover.name;
                camera.textContent = photo.camera.name;
                details.textContent= "MORE";
                details.className = "boton";

                details.addEventListener('click', function detailsButton(){
                    imagen.src = photo.img_src;
                    id_img.innerText = "Id: " + photo.id;
                    martian_sol.innerText = "Martian sol: " + photo.sol;
                    earth_date.innerText = "Earth date: " + photo.earth_date;
                })

                fila.appendChild(id);
                fila.appendChild(rover);
                fila.appendChild(camera);
                fila.appendChild(details);
                
                tabla.appendChild(fila);
            });
            contenedor_tabla.appendChild(tabla)


        })
    
}

function previous(){
    if(pagina_actual>1){
        pagina_actual --;
        find(pagina_actual);
    }
    else{

    }
}

function next(){
    pagina_actual ++;
    find(pagina_actual);
}

document.addEventListener('DOMContentLoaded', find());

