import React, { useState } from "react";
import "../CSS/style.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ movie: "" });

  const handleInputChange = (e) => {
    let fieldName = e.target.name;
    let fieldValue = e.target.value;

    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ movie: "" });
    navigate(`/search/${formData.movie}`);
  };

  return (
    <>
      <nav className="display">
        <div className="display">
          <div className="nav-l">
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="logo"
              className="adj-img"
            />
          </div>
          <div className="nav-r display">
            <div onClick={() => navigate("/")} className="cursor">
              Popular
            </div>
            <div onClick={() => navigate("/top")} className="cursor">
              Top Rated
            </div>
            <div onClick={() => navigate("/upcome")} className="cursor">
              Upcoming
            </div>
            <div className="searchBar display">
              <input
                type="text"
                placeholder="Movie Name"
                name="movie"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                value={formData.movie}
              />
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;








