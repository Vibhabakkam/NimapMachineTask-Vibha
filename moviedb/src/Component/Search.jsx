import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const apiKey = `c45a857c193f6302f2b5061c3b85e743`;

const Search = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState();

  const { name } = useParams();
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${name}&page=1`;

  useEffect(() => {
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => setSearchResults(data.results));
  }, [searchUrl]);

  console.log(searchResults);

  return (
    <>
      <div id="home">
        <div>
          {searchResults &&
            searchResults.map((result, index) => (
              <div onClick={() => navigate(`/single/${result.id}`)} key={index}>
                <div className="movie_img">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${result.backdrop_path}`}
                    alt="movie"
                    className="adj-img"
                  />
                </div>
                <div className="movie_name display">
                  <p>{result.title}</p>
                  <p>Rating: {result.vote_average}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Search;
