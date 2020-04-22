import React, {useState, useEffect} from "react";
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";

const movieState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
  };

const UpdateMovie = props => {
    const { push } = useHistory();
    const [movie, setMovie] = useState(movieState);
    const { id } = useParams();
    // console.log("Params id: ", id)
    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res => {
              console.log("Get Succeeded: ", res)
            setMovie(res.data);
          })
          .catch(err => console.log(err));
      }, [id]);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === 'director') {
            value = parseInt(value, 10);
          }

    setMovie({
        ...movie,
        [ev.target.name]: value
      });
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            console.log("Put Succeeded: ", res)
            const updatedMovie = res.data
            const newList = props.movieList.filter(movie => movie.id !== updatedMovie.id)
            props.setMovieList([
                ...newList,
                updatedMovie
            ]);
            push(`/`);
        })
        .catch(err => console.log(err));
    };

    const deleteMovie = e => {
        e.preventDefault();
        axios
        .delete(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
          console.log("Delete Successful: ", res)
          const deletedMovie = res
          const newList = props.movieList.filter(movie => movie.id !== deletedMovie.data)
          props.setMovieList([...newList]);
          push(`/`);
        })
        .catch(err => console.log("Delete Failed", err))
      }

    return (
        <div className="update-form">
            <h2 className="updateF-title">{movie.title}</h2>
            <form onSubmit={handleSubmit}>
                Title:
                <input className="input"
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="Title"
                value={movie.name}
                />Director:
                <input className="input"
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="Director"
                value={movie.director}
                />Metascore
                <input className="input"
                type="text"
                name="metascore"
                onChange={changeHandler}
                placeholder="Metascore"
                value={movie.metascore}
                />Stars
                <input className="input"
                type="text"
                name="stars"
                onChange={changeHandler}
                placeholder="Stars"
                value={movie.stars}
                />
            </form>
            <div className="updateF-buttons">
            <button className="update-button2" onClick={handleSubmit}> 
            Update Movie
            </button>
            <button className="delete-button" onClick={deleteMovie}>
            Delete Movie
            </button>
            </div>
        </div>
    )
}

export default UpdateMovie;