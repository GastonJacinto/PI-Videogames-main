/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import style from "./Create.module.css";
import { postGame } from "../../redux/actions/postGameActions";
import { useDispatch, useSelector } from "react-redux";
import plataformas from "./plataformas";
import { getGenres } from "../../redux/actions/getGenresActions";
import { all } from "axios";
import { getAllGames } from "../../redux/actions/getAllGamesActions";



const Create = () => {

  const dispatch = useDispatch();
  
  const [create, setCreate] = React.useState({
    name: "",
    imagen: "",
    description: "",
    platforms: "",
    released: "",
    rating: "",
    genres: "",
  });
  
  const [errors, setErrors] = React.useState({
    name: "Must be between 5 and 30 characters long.",
    imagen: "Please, enter an image for your game.",
    description: "Must be between 10 and 200 characters long.",
    platforms: "Please, select one platform at least.",
    released: "When was your game released?",
    rating: "Please select a rating for your game.",
    genres: "Please, select one genre at least.",
  });
  const genres = useSelector((state) => state.genres);
  

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  let [addGenres, setAddGenres] = React.useState([]);

  let [addPlatforms, setAddPlatforms] = React.useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const newGame = {
      name: create.name,
      imagen: create.imagen,
      description: create.description,
      platforms: addPlatforms,
      released: create.released,
      rating: create.rating,
      genres: addGenres,
    };
    dispatch(postGame(newGame));
    disabler(getAllGames())
  }

  function disabler() {
    let disabled = true;
    for (const err in errors) {
      if (errors[err] === "") {
        disabled = false;
      } else {
        disabled = true;
        break;
      }
    }
    return disabled;
  }
  //PARA FORZAR RENDERIZADO
  const [aux, setAux] = React.useState(false);

  //PARA SACAR EL ULTIMO GENERO AGREGADO
  function eraseLastGenre() {
    if (addGenres.length === 1) {
      setErrors({
        ...errors,
        genres: "Please, select one genre at least.",
      });
    }
    addGenres.pop();
    aux ? setAux(false) : setAux(true);
  }
function eraseLastPlatform(){
  if(addPlatforms.length===1){
    setErrors({
      ...errors,
      platforms:"Please, select one platform at least."
    })
  }
  addPlatforms.pop();
  aux ? setAux(false) : setAux(true);
}
  function handleChange(event) {
    
    if (event.target.name === "genres") {
      if (!addGenres.includes(event.target.value)) {
        setAddGenres([...addGenres, event.target.value]);
      }
    
    }
    if(event.target.name==="platforms"){
      if(!addPlatforms.includes(event.target.value)){
        setAddPlatforms([...addPlatforms,event.target.value])
      }
    }

    setCreate({ ...create, [event.target.name]: event.target.value });
    validation(
      { ...create, [event.target.name]: event.target.value },
      event.target.name
    );
    
    aux ? setAux(false) : setAux(true);
  }

  function validation(state, name) {
    if (name === "name") {
      if (state.name === "" || state.name.length < 5 || state.name.length > 30)
        setErrors({
          ...errors,
          name: "Must be between 5 and 30 characters long.",
        });
      else setErrors({ ...errors, name: "" });
    }
    if (name === "description") {
      if (
        state.description === "" ||
        state.description.length < 10 ||
        state.description.length > 200
      )
        setErrors({
          ...errors,
          description: "Must be between 10 and 200 characters long.",
        });
      else setErrors({ ...errors, description: "" });
    }
    if (name === "platforms") {
      if (state.platforms==="") setErrors({
          ...errors,
          platforms: "Please, select one platform at least.",
        });
      else setErrors({ ...errors, platforms: "" });
       
    }
    if (name === "imagen") {
      if (state.imagen !== "") setErrors({ ...errors, imagen: "" });
      else
        setErrors({
          ...errors,
          imagen: "Please, enter an image for your game.",
        });
    }
    if (name === "released") {
      if (state.released !== "") setErrors({ ...errors, released: "" });
      else setErrors({ ...errors, released: "When was your game released?" });
    }
    if (name === "rating") {
      if (isNaN(parseInt(state.rating)))
        setErrors({
          ...errors,
          rating: "Rating must be a number between 0 and 5.",
        });
      else setErrors({ ...errors, rating: "" });
    }
    if (name === "genres") {
      if (state.genres === "") {
        setErrors({ ...errors, genres: "Please, enter one genre at least." });
        return;
      } else {
        setErrors({ ...errors, genres: "" });
        return;
      }
    }
  }
  
//!ACA HAGO EL GETITEM Y USO LAS PLATAFORMAS
let allPlatforms;
if(localStorage.length){
  allPlatforms = localStorage.getItem("plats").split(",")
}

const genresOk = addGenres.map((gen, index) => {
  if (index === addGenres.length - 1) {
    return (gen = `${gen}.`);
  } else {
    return (gen = `${gen}/`);
  }
});
const platformsOk = addPlatforms.map((plat,index)=>{
  if (index === addPlatforms.length - 1) {
    return (plat = `${plat}.`);
  } else {
    return (plat = `${plat}/`);
  }
})

  return (
    <div>
      <div className={style.letsCreateContainer}>
        <h2>¡Let's create a game!</h2>
      </div>
      <div className={style.createFormContainer}>
        <form onSubmit={handleSubmit} action="">
          <div className={style.allContainer}>
            <div className={style.nameAndImageContainer}>
              <label className={style.createFormLabels}>Name:</label>
              <input
                size={30}
                placeholder="Name of your game."
                name="name"
                type="text"
                onChange={handleChange}
              />
              <label className={style.formErrorLabel}>{errors.name}</label>
              <label className={style.createFormLabels}>Image:</label>
              <input
                placeholder="Insert image URL"
                name="imagen"
                type="text"
                onChange={handleChange}
              />
              <div>
                <label className={style.formErrorLabel}>{errors.imagen}</label>
              </div>
            </div>
            <div>
              <div className={style.textAreaContainer}>
                <label className={style.createFormLabels}>Description:</label>
                <textarea
                  rows="4"
                  cols="40"
                  placeholder="Describe your game"
                  name="description"
                  onChange={handleChange}
                ></textarea>
                <label className={style.formErrorLabel}>
                  {errors.description}
                </label>
              </div>
            </div>
          </div>
          <br />
          <label className={style.createFormLabels}>Platforms:</label>
          <select multiple onChange={handleChange} name="platforms" id="">
            {allPlatforms?.map((plat)=>{
              return(
                <option value={plat}>{plat}</option>
              )
            })}
          </select>
          <label className={style.formErrorLabel}>{errors.platforms}</label>
       <div className={style.platfsbutcontainer}>
       <div className={style.genreAndButContainer}>
            <p className={style.genresRender}>{platformsOk}</p>
           
          </div>
          <button className={style.xGenreButton}for="platforms" onClick={eraseLastPlatform} type="button">
              X
            </button>
       </div>
          <label className={style.createFormLabels}>Released:</label>
          <input
            className={style.releasedCalendar}
            type="date"
            name="released"
            onChange={handleChange}
            max="2023-07-31"
          />
          <label className={style.formErrorLabel}>{errors.released}</label>
          <br />
          <div className={style.ratingContainer}>
            <label className={style.createFormLabels}>Rating: </label>
            <div className={style.starsContainer}>
              <input
                className={style.inputRating}
                onChange={handleChange}
                id="radio1"
                type="radio"
                name="rating"
                value="5"
              ></input>
              <label className={style.startButtons} for="radio1">
                ★
              </label>
              <input
                className={style.inputRating}
                onChange={handleChange}
                id="radio2"
                type="radio"
                name="rating"
                value="4"
              ></input>
              <label className={style.startButtons} for="radio2">
                ★
              </label>
              <input
                className={style.inputRating}
                onChange={handleChange}
                id="radio3"
                type="radio"
                name="rating"
                value="3"
              ></input>
              <label className={style.startButtons} for="radio3">
                ★
              </label>
              <input
                className={style.inputRating}
                onChange={handleChange}
                id="radio4"
                type="radio"
                name="rating"
                value="2"
              ></input>
              <label className={style.startButtons} for="radio4">
                ★
              </label>
              <input
                className={style.inputRating}
                onChange={handleChange}
                id="radio5"
                type="radio"
                name="rating"
                value="1"
              ></input>
              <label className={style.startButtons} for="radio5">
                ★
              </label>
            </div>
            <label className={style.formErrorLabel}>{errors.rating}</label>
          </div>

          <label className={style.createFormLabels}>Genres:</label>
          <select className={style.formSelect}name="genres" id="genres" multiple onChange={handleChange}>
            {genres.map((genre) => {
              return <option value={genre.name}>{genre.name}</option>;
            })}
          </select>
          <div className={style.platfsbutcontainer}>
       <div className={style.genreAndButContainer}>
            <p className={style.genresRender}>{genresOk}</p>
           
          </div>
          <button className={style.xGenreButton}for="genres" onClick={eraseLastGenre} type="button">
              X
            </button>
       </div>
          <label className={style.formErrorLabel}>{errors.genres}</label>

          <input
            disabled={disabler()}
            className={style.submitFormButton}

            type="submit"
            value={"Create game!"}
          />
        </form>
      </div>
    </div>
  );
};

export default Create;
