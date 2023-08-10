import React, { useEffect } from "react";
import style from "./Landing.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
import { getPlatforms } from "../../redux/actions/getPlatformsActions";

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    if (!localStorage.length) {
      console.log("Cargando localStorage")
      dispatch(getPlatforms());
    }
  });

  return (
    <div className={style.landingContainer}>
      <div className={style.playContainer}>
        <Link to="/home">
          <h1>¡PLAY!</h1>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
