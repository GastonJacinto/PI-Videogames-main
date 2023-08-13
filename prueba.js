let genres= [{name:"Action"},{name:"Adventure"},{name:"Indie"},{name:"RPG"},{name:"Race"}];
let filteredGenres= []

genres.forEach((gen,i)=>{
if(gen.name==="Action"){
  filteredGenres.push(gen)
}
})

console.log(filteredGenres)