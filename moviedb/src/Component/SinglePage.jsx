import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HamLoader from "./Loader/HamLoader";

const apiKey = `c45a857c193f6302f2b5061c3b85e743`;

const SinglePage = () => {
  const [movieData, setMovieData] = useState();
  const [castData, setCastData] = useState();

  const { id } = useParams();
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
  const castDetailsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
  const [isLoaded,setIsLoaded] = useState(false);




  useEffect(()=>{
    const getSearchResult = async ()=>{
      try {
        const movieDetails = await axios.get(movieDetailsUrl);
        const castDetails = await axios.get(castDetailsUrl);

        if(movieDetails.status == 200 && castDetails.status == 200){
          if(movieDetails && castDetails){
             setMovieData(movieDetails.data);
             setCastData(castDetails.data.cast);
             setIsLoaded(true);
          }else{
            alert("Movie Not found");
          }
        }else{
          alert('Something went wrong');
        }  
      } catch (error) {
        console.log("something went wrong");
      }

    }
    getSearchResult();
  },[])

  return (
    <>
    {isLoaded ?
      (<><div id="overview">
          <div className="overview-l display">
            <div className="overview-top">
              <div className="movie-poster">
                {movieData && movieData.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                    alt="movie_logo"
                    className="adj-img" />
                )}
              </div>
              <div className="display ratings">
                {movieData && movieData.title && <p>{movieData.title}</p>}
                {movieData && movieData.vote_average && (
                  <p>Rating : {movieData.vote_average}</p>
                )}
                {movieData && movieData.release_date && (
                  <p>Released Date : {movieData.release_date}</p>
                )}
                {movieData && movieData.runtime && <p>Min :{movieData.runtime}</p>}
              </div>
            </div>
            <div className="overview-bot">
              <h3>Overview</h3>
              {movieData && movieData.overview && <p>{movieData.overview}</p>}
            </div>
          </div>
          <div className="overview-r">
            {movieData && movieData.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`}
                alt="movie_logo"
                className="adj-img" />
            )}
          </div>
        </div><div id="cast">
            {castData &&
              castData.map((actor, index) => (
                <div key={index} className="display">
                  <div className="cast_img">
                    <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt="cast" className="adj-img" />
                  </div>
                  <div className="cast_name display">
                    <p>Name: {actor.original_name}</p>
                    <p>Character: {actor.character}</p>
                  </div>
                </div>
              ))}
          </div></>)
    : 
    <HamLoader/>} 
    </>
  );
};

export default SinglePage;
