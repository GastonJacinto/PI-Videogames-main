/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getByName } from "../../redux/actions/getByNameActions";
import { orderByName } from "../../redux/actions/orderByNameActions";
import { cleanFiltered } from "../../redux/actions/cleanFilteredActions";
import { filteredBySource } from "../../redux/actions/filteredBySourceActions";

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
    dispatch(getByName(name));
  }

  function filtering(event) {
    if (event.target.value !== "Source...") {
      dispatch(filteredBySource(event.target.value));
    }
  }

  function ordering(event) {
    if (event.target.value !== "Select order") {
      dispatch(orderByName(event.target.value));
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
          onClick={() => {
            clean();
          }}
        >
          Clear filters
        </button>
        <select onChange={ordering} name="filters" id="">
          <option selected>Select order</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="+">Rating +</option>
          <option value="-">Rating -</option>
        </select>
        <select onChange={filtering} name="source" id="">
          <option selected>Source...</option>
          <option value="db">Database</option>
          <option value="api">API</option>
        </select>
      </div>
      <div>
        <input onChange={handleChange} value={name} type="search" />
        <button
          onClick={() => {
            searchByName(name);
          }}
          type="submit"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default NavBar;
