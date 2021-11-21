let pagina = 1;
let peliculas = '';
let ultimaPelicula;

// Crear Observador
let observador = new IntersectionObserver((entradas, observador) => {
	entradas.forEach(entrada => {
		if(entrada.isIntersecting) {
			pagina++;
			cargarPeliculas();
		}
	});
}, {
	rootMargin: '0px 0px 200px 0px',
	threshold: 1.0
});


/* Cargar Lista de Películas */
const cargarPeliculas = async () => {
	try {
		const respuesta = await axios.get('https://api.themoviedb.org/3/movie/popular?', {
            params: {
                // api_key: '5b30518dfd04c3c63a127a28c59dbe35',
                language: 'es-MX',
				page: pagina
            },
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjMwNTE4ZGZkMDRjM2M2M2ExMjdhMjhjNTlkYmUzNSIsInN1YiI6IjYxODZhZWJhMTNhMzg4MDA2NjA2ZGVjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gwGGNDwIvHoUFPwn4hiiSuGhNyc-RxdcUFYV3mGWFsQ'
            }
        })


		// const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=5b30518dfd04c3c63a127a28c59dbe35&language=es-MX&page=${pagina}`);

		// console.log(respuesta);

		if (respuesta.status === 200) {
			

			respuesta.data.results.forEach((pelicula) => {
				peliculas += `
                    <div class="pelicula">
                        <img src="https://image.tmdb.org/t/p/w200/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
            });
            /* Mostrar películas */
			document.getElementById("contenedor").innerHTML = peliculas;

			if(pagina < 1000) {
				if(ultimaPelicula) {
					observador.unobserve(ultimaPelicula);
				}

				const peliculasEnPantalla = document.querySelectorAll('.contenedor .pelicula');
				ultimaPelicula = peliculasEnPantalla[peliculasEnPantalla.length - 1];
				observador.observe(ultimaPelicula)
			}
			
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
