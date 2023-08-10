/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameDetail } from "../../redux/actions/getGameDetailActions";
import { cleanDetail } from "../../redux/actions/cleanDetailStateActions";
import { useParams } from "react-router-dom";
import style from "./Details.module.css";
import { Link,  } from "react-router-dom";
import { deleteGame } from "../../redux/actions/deleteGameActions";

const Details = () => {
  const dispatch = useDispatch();

  const id = useParams();
  const gameDetail = useSelector((state) => state.gameDetail);

  let description = gameDetail.description?.replace(/<[^>]+>/g, "");

  React.useEffect(() => {
    dispatch(getGameDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, []);
  let genres = [];

  if (gameDetail.onDB) {
    genres = gameDetail.genres?.map((gen, index) => {
      if (index === gameDetail.genres.length - 1) {
        return (gen = `${gen.name}.`);
      } else {
        return (gen = `${gen.name}/`);
      }
    });
  } else {
    genres = gameDetail.genres?.map((gen, index) => {
      if (index === gameDetail.genres.length - 1) {
        return (gen = `${gen}.`);
      } else {
        return (gen = `${gen}/`);
      }
    });
  }
let hola;
  const platforms = gameDetail.platforms?.map((plat, index) => {
    if (index === gameDetail.platforms.length - 1) {
      return (plat = `${plat}.`);
    } else {
      return (plat = `${plat}/`);
    }
  });

  function deleteDBGame(){
dispatch(deleteGame(gameDetail.id))
// redirect("/home");
  }
  return (
    <div>
      <div className={style.backButtonContainer}>
        <Link to="/home">
          <button className={style.backButton}>Back</button>
        </Link>
      </div>
      <div className={style.detailsContainer}>
        <div className={style.allDetailContainer}>
          <div className={style.imgContainer}>
            <img
              className={style.detailsImagen}
              src={gameDetail.imagen}
              alt={gameDetail.name}
            />
            
          </div>
          <div className={style.infoContainer}>
            <h2 className={style.detailName}>{gameDetail.id}: {gameDetail.name}</h2>
            <p className={style.detailsP}>{description}</p>
            <p className={style.detailsP}>Platforms: {platforms}</p>
            <p className={style.detailsP}>Genres: {genres}</p>
            <p className={style.detailsP}>Released: {gameDetail.released}</p>
            <p className={style.detailsP}>Rating: {gameDetail.rating}</p>
            <div className={style.deleteContainer}>
           {gameDetail.onDB? <Link to="/home"><button onClick={deleteDBGame} className={style.deleteButton}>🗑</button></Link>:null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
