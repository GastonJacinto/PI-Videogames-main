let genres= [{name:"Action"},{name:"Adventure"},{name:"Indie"},{name:"RPG"},{name:"Race"}];
let filteredGenres= []

genres.forEach((gen,i)=>{
if(gen.name==="Action"){
  filteredGenres.push(gen)
}
})


if (name === "arrCountry") {
  if (stateForm.arrCountry === "")
    setError({
      ...error,
      country: "ERRORRRRR",
    });
  else setError({ ...error, country: "" });
}