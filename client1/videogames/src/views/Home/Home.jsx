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

function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);

  const filteredByName = useSelector((state) => state.filteredByName);
  const currentPage = useSelector((state) => state.currentPage);
const created = useSelector((state)=>state.created)

  React.useEffect(() => {
      dispatch(getAllGames());

    return () => {};
  }, [allGames.length]);

  const paginate = (event) => {
    dispatch(nextOrPrev(event.target.name));
  };

  return (
    <div>
      <div className={style.paginateButtons}>
        <button className={style.pagButts} name="prev" onClick={paginate}>
          Previous
        </button>
        <div className={style.currentPageContainer}>
          <p className={style.currentPageP}>{currentPage + 1}</p>
        </div>
        <button className={style.pagButts} name="next" onClick={paginate}>
          Next
        </button>
      </div>
      <div className={style.homeContainer}>
        <div className={style.cardsHomeContainer}>
          {filteredByName.length ? (
            <Cards props={filteredByName} />
          ) : (
            <Cards props={allGames} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
