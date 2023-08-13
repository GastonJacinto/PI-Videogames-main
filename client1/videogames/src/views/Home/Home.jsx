/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import Cards from "../../components/Cards/Cards";
import style from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../redux/actions/getAllGamesActions";
import { nextOrPrev } from "../../redux/actions/nextOrPrevActions";
import NavBar from "../../components/NavBar/NavBar";
import { getPlatforms } from "../../redux/actions/getPlatformsActions";
import { useParams } from "react-router-dom";
import { cleanFiltered } from "../../redux/actions/cleanFilteredActions";
import { getGenres } from "../../redux/actions/getGenresActions";
import Paginate from "../../components/Paginate/Paginate";

function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);
 const genres = useSelector((state) => state.genres);
  
  React.useEffect(() => {
    if (!allGames.length) {
      dispatch(getAllGames());
    }
    if (!genres.length) {
      dispatch(getGenres());
    }
    return () => {};
  }, []);

 return (
    <div>
      <Paginate/>
      <div className={style.homeContainer}>
        <div className={style.cardsHomeContainer}>
        <Cards props={allGames} />
        </div>
      </div>
    </div>
  );
}

export default Home;
