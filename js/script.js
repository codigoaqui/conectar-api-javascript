let pagina = 1;
const anterior = document.getElementById('anterior');
const siguiente = document.getElementById('siguiente');
/* Ir a la página siguiente */
siguiente.addEventListener("click", () => {
    if (pagina < 1000) {
        pagina ++;
        cargarPeliculas();
    } else {
        alert("No hay más películas");
    }
});
/* Ir a la página anterior */
anterior.addEventListener("click", () => {
    if (pagina > 1) {
        pagina --;
        cargarPeliculas();
    }
});
/* Cargar Lista de Películas */
const cargarPeliculas = async () => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=5b30518dfd04c3c63a127a28c59dbe35&language=es-MX&page=${pagina}`);
		console.log(respuesta);
		if (respuesta.status === 200) {
			const datos = await respuesta.json();
			let peliculas = "";
			datos.results.forEach((pelicula) => {
				peliculas += `
                    <div class="pelicula">
                        <img src="https://image.tmdb.org/t/p/w200/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
            });
            /* Mostrar películas */
			document.getElementById("contenedor").innerHTML = peliculas;
		} else if (respuesta.status === 401) {
			// console.log("No se encontró la película");
		} else if (respuesta.status === 404) {
			alert("Esta película no existe en la plataforma");
		} else {
			alert("Ha ocurrido un error inesperado");
		}
	} catch (error) {
		console.log(error);
	}
};
cargarPeliculas();
