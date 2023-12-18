
import React, { useEffect, useState } from "react";
import "./CSS/style.css";
import { useNavigate } from "react-router-dom";
import HamLoader from "./Loader/HamLoader";
import axios from "axios";
import Pagination from "./Pagination";

const apiKey = "c45a857c193f6302f2b5061c3b85e743";
const initialPage = 1;
const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${initialPage}`;

const TopRated = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [postPerPage, setPostPerPage] = useState(8);

  useEffect(() => {
    const getSearchResult = async () => {
      try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          if (response.data.results.length) {
            setMovieData(response.data.results);
          } else {
            alert("Movie Not found");
          }
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.log("something went wrong", error);
      }
    };

    getSearchResult();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = movieData.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div id="home">
        <div>
          {currentPost.length ? (
            currentPost.map((movie, index) => (
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
            ))
          ) : (
            <HamLoader />
          )}
        </div>
      </div>
      <Pagination
        totalPost={movieData.length}
        postPerPage={postPerPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default TopRated;


