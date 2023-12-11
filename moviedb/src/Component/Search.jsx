import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HamLoader from "./Loader/HamLoader";

const apiKey = `c45a857c193f6302f2b5061c3b85e743`;

const Search = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState();

  const { name } = useParams();
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${name}&page=1`;

  useEffect(()=>{
    const getSearchResult = async ()=>{

      try {
        const response = await axios.get(searchUrl);
        if(response.status == 200){
          if(response.data.results.length){
            return setSearchResults(response.data.results);
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

  },[name])


  return (
    <>
      <div id="home">
        <div>
          {searchResults ?
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
            )): <HamLoader/>}
        </div>
      </div>
    </>
  );
};

export default Search;
