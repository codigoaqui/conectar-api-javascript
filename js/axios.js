const obtenerPeliculas = async() => {
    try {
        const respuesta = await axios.get('https://api.themoviedb.org/3/movie/popular?', {
            params: {
                // api_key: '5b30518dfd04c3c63a127a28c59dbe35',
                language: 'es-MX'
            },
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjMwNTE4ZGZkMDRjM2M2M2ExMjdhMjhjNTlkYmUzNSIsInN1YiI6IjYxODZhZWJhMTNhMzg4MDA2NjA2ZGVjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gwGGNDwIvHoUFPwn4hiiSuGhNyc-RxdcUFYV3mGWFsQ'
            }
        })
        console.log(respuesta);       
    } catch(error) {
        console.log(error);
    }
}
obtenerPeliculas();