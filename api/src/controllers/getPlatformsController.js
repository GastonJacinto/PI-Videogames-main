const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const platforms = new Set()


async function getPlatformsController() {
  let page = 1;

  let allPlatforms=[];
  let plats = [];


  while (page < 150) {
    const { data } = await axios(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=100&page=${page}`
    );
    
    let insertPlatforms =[]

    data.results.forEach((game) => {
      insertPlatforms = game.platforms.map((platf) => {
        return (name = platf.platform.name);
      });

   plats.push(insertPlatforms)
    });

    page += 1;
  }
  
plats.forEach((p)=>{
  p.forEach((pl)=>{
    platforms.add(pl)
  })
})

allPlatforms = [...platforms]

  return allPlatforms;
}

module.exports =  getPlatformsController
