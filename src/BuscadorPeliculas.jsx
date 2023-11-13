import { useState } from 'react'

export const BuscadorPeliculas = () => {

    const baseUrl = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = '8b843b5ded4be28b3f490f4b7a1417e7'

    const [busqueda, setBusqueda] = useState('')
    const [peliculas, setPeliculas] = useState([])

    const handleInputChange = (e) => {
        setBusqueda(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchPeliculas()
    }

    const fetchPeliculas = async () => {
        try {
            const response = await fetch(`${baseUrl}?query=${busqueda}&api_key=${API_KEY}`)
            const data = await response.json()
            setPeliculas(data.results)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='container'>
            <h1 className='title'>Buscador de Películas</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Escribe el nombre de una película'
                    value={busqueda}
                    onChange={handleInputChange}
                />
                <button type="submit" className='serach-button'>Buscar</button>
            </form>
            <div className='movie-list'>
                {
                    peliculas.map((pelicula) => (
                        <div className='movie-card' key={pelicula.id}>
                            <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                            <div className='movie-info'>
                                <h3>{pelicula.title}</h3>
                                <span>{pelicula.vote_average}</span>
                            </div>
                            <div className='movie-overview'>
                                <h2>Overview:</h2>
                                <p>{pelicula.overview}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
