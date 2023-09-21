import React, { useState } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const [keyword, setKeyword] = useState("");
  let history = useNavigate();
  function searchSubmithandler(e) {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/meals/${keyword}`);
    } else {
      history("/meals");
    }
  }
  return (
    <div className="blurred-box">
      <form className="searchBox" onSubmit={searchSubmithandler}>
        <input
          className="mealSearchinput"
          type="text"
          name=""
          id=""
          placeholder="Search Your favourate Meal..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </div>
  );
};

export default Search;
