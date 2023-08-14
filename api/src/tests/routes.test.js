const server = require("../app");
const session = require("supertest");
const agent = session(server);
let acc = 1;

describe("ROUTES TESTS", () => {
  describe("GET /videogames/:id", () => {
    let response;
    it("Should response with status 200.", async () => {
      response = await agent.get("/videogames/3328").expect(200);
    });

    it("If error, response with status 400.", async () => {
      expect((await agent.get("/videogames/-1")).status).toEqual(400);
    });

   
  });
describe("GET /videogames/name?",()=>{

  it("Should response with an array of 4 games to query: 'Grand'.", async () => {
    const {body} = (await agent.get("/videogames/name?name=Grand"))
    expect(body).toHaveLength(4);
  },8000);

  it("Should response with status 400 if there are no games with that name.", async()=>{
    expect((await agent.get("/videogames/name?name=nogamename")).status).toEqual(400)
  
  })
})
describe("GET /genres", ()=>{
  it("Should map all the genres(19) from the API.", async()=>{
    const {body} = (await agent.get("/genres"))
    expect(body).toHaveLength(19);
  })
})

  describe("POST /videogames", ()=>{
let acc = Math.floor(Math.random() * (50000 - 1) + 1)
    const obj ={
      name:`GAME OF TEST num:${acc}`,
      description: "This is a test for POST",
      platforms:["PC"],
      imagen:"https://images.all-free-download.com/images/graphicwebp/test_testing_optical_265619.webp",
      rating:4,
      genres:["Action","RPG"],
      released: "2000/04/17"
    }
 it("Should response with status 200.", async()=>{
  const testPost = await agent.post("/videogames").send(obj);
  expect(testPost.status).toEqual(200)
 })
  })

  
});
