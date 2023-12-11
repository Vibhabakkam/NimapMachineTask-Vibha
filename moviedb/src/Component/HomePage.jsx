import React, { useEffect, useState } from "react";
import "./CSS/style.css";
import { useNavigate } from "react-router-dom";

const apiKey = "c45a857c193f6302f2b5061c3b85e743";
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

const HomePage = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState();

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setMovieData(data.results));
  }, []);

  return (
    <>
      <div id="home">
        <div>
          {movieData &&
            movieData.map((movie, index) => (
              <div onClick={() => navigate(`/single/${movie.id}`)} key={index}>
                <div className="movie_img">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt="movie"
                    className="adj-img"
                  />
                </div>
                <div className="movie_name display">
                  <p>{movie.title}</p>
                  <p>Rating: {movie.vote_average}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
