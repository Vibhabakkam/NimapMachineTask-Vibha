import React, { useEffect, useState } from "react";
import "./CSS/style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HamLoader from "./Loader/HamLoader";
import Pagination from "./Pagination";

const apiKey = "c45a857c193f6302f2b5061c3b85e743";
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

const HomePage = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8)
  useEffect(()=>{
    const getSearchResult = async ()=>{
      try {
        const response = await axios.get(apiUrl);
        if(response.status === 200 ){
          if(response.data.results.length){
            return setMovieData(response.data.results);
          }
          return alert("Movie Not found");

        }else{
          alert('Something went wrong');
        }
      } catch (error) {
        console.log("something went wrong");
      }

    }
    getSearchResult();
  },[])
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = movieData.slice(firstPostIndex,lastPostIndex)

  return (
    <>
      <div id="home">
        <div>
          {currentPost.length ?
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
            )) : <HamLoader/>}
        </div>
      </div>
      <Pagination totalPost ={movieData.length} postPerPage = {postPerPage} setCurrentPage ={setCurrentPage} setPostPerPage = {setPostPerPage}/>
    </>
  );
};

export default HomePage;

