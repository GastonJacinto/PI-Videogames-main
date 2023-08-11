/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getByName } from "../../redux/actions/getByNameActions";
import { orderByName } from "../../redux/actions/orderByNameActions";
import { cleanFiltered } from "../../redux/actions/cleanFilteredActions";
import { filteredBySource } from "../../redux/actions/filteredBySourceActions";
import { orderByRating } from "../../redux/actions/orderByRatingActions";

const NavBar = () => {
  const dispatch = useDispatch();

  const [name, setName] = React.useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  function clean() {
    dispatch(cleanFiltered());
  }

  function searchByName(name) {
    const search = document.getElementById("search")
search.innerHTML = ""
    dispatch(getByName(name));
  }

  function filtering(event) {
    if (event.target.value !== "SOURCE...") {
      dispatch(filteredBySource(event.target.value));
    }
  }

  function orderName(event) {
    if (event.target.value !== "ORDER BY NAME...") {
      dispatch(orderByName(event.target.value));
    }
  }

  function orderRating(event) {
    if (event.target.value !== "ORDER BY RATING...") {
      dispatch(orderByRating(event.target.value));
    }
  }
  return (
    <div className={style.navBarContainer}>
      <div className={style.imgNavBarContainer}>
        <Link to={"/"}>
          <img src="https://i.gifer.com/Paz.gif" alt="logo" />
        </Link>
      </div>
      <div className={style.linkNavBarContainer}>
        <div className={style.createButtonContainer}>
          <Link to={"/create"}>
            <p className={style.newGameButton}>NEW GAME</p>
          </Link>
        </div>
        <div className={style.homeButtonContainer}>
          <Link to={"/home"}>
            <img
              className={style.homeButton}
              src="https://iili.io/HtypNDv.png"
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className={style.filtersContainer}>
        <button
        className={style.navSelects}
          onClick={() => {
            clean();
          }}
        >
          CLEAR FILTERS
        </button>
        <select className={style.navSelects}onChange={orderName} name="filters" id="">
          <option selected>ORDER BY NAME...</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      
        <select className={style.navSelects}onChange={orderRating} name="rating" id="">
          <option selected>ORDER BY RATING...</option>
          <option value="+">Rating +</option>
          <option value="-">Rating -</option>
        </select>
        <select className={style.navSelects}onChange={filtering} name="source" id="">
          <option selected>SOURCE...</option>
          <option value="db">Database</option>
          <option value="api">API</option>
        </select>
      </div>
      <div>
      <button
          onClick={() => {
            searchByName(name);
          }}
          type="submit"
        >
          SEARCH
        </button>
        <input className={style.navSelects}onChange={handleChange} id="search"value={name} type="search" />
      
      </div>
    </div>
  );
};

export default NavBar;
