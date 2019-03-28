const request = require("supertest");
const mongoose = require("mongoose");
const puppeteer = require("puppeteer");
const app = require("./app");
const User = require("./model/User");
const Poll = require("./model/Poll");
var bcrypt = require('bcrypt-nodejs');

//----------------------------------------------
let server;
let page;
let browser;
const width = 1920;
const height = 1080;
//----------------------------------------------

beforeEach(async () => {
  // antes de cada prueba limpiamos todas las colecciones para iniciar con una
  // base de datos en blanco
  for (var i in mongoose.connection.collections) {
    await mongoose.connection.collections[i].remove({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});

beforeAll(async () => {
  server = app.listen(3000);
  browser = await puppeteer.launch({
    headless: true,
    args: [`--windows-size=1920,1080`]
  });
  page = await browser.newPage();
  await page.setViewport({width,height});
});

// Esto soluciona un issue de Jest con las cookies en Superagent. Ver
// https://github.com/facebook/jest/issues/2549
request.agent.prototype._saveCookies = function(res) {
  const cookies = res.headers['set-cookie'];
  if (cookies) this.jar.setCookies(cookies[0].split(","));
};

const signIn = async (credentials) => {
  const agent = request.agent(app);
  await agent.post('/logIn')
      .type("form")
      .send(credentials);
  return agent;
}

describe("/", ()=>{
  test("GET responds whit success code(200)", async () => {
    const responce = await request(app).get("/");
    expect(responce.statusCode).toBe(200);
  });
});

describe("GET /logIn", ()=>{
  test("GET responds whit success code(200) on logIn", async () => {
    const responce = await request(app).get("/logIn");
    expect(responce.statusCode).toBe(200);
  });
});

describe("POST /logIn", ()=>{
  test("POST logIn and redirects to /polls", async () => {
    const credentials = { email: "pedro@gmail.com", password: bcrypt.hashSync("test1234") };
    const user = await User.create(credentials);
    const responce = await request(app).post("/logIn")
    .send(`email=pedro@gmail.com&password=test1234`);
    expect(responce.statusCode).toBe(302);
    expect(responce.headers.location).toBe("/polls");
  });
});

describe("GET /register", ()=>{
  test("GET responds whit success code(200) on Register", async () => {
    const responce = await request(app).get("/register");
    expect(responce.statusCode).toBe(200);
  });
});

describe("POST /register", ()=>{
  test("add new user and redirects to logIn", async () => {
    const responce = await request(app).post("/register")
    .send("email=pedro@gmail.com&password=test1234");
    expect(responce.statusCode).toBe(302);
    expect(await User.countDocuments({})).toBe(1);
    expect(responce.headers.location).toBe("/logIn");    
  });
});

describe(" POST /polls/new", ()=>{
  test("create a polls and go to main page", async () => {
    const credentials = { email: "pedro@gmail.com", password: "test1234" };
    const user = await User.create({ email: "pedro@gmail.com", password: bcrypt.hashSync("test1234") });
    const agent = await signIn(credentials);
    console.log(agent)
    const responce = await agent.post("/polls/new")
    .type("form")
    .send({name:"testName"})
    .send({description:"testDescription"})
    .send({Option1:"T1"})
    .send({Option2:"T2"})
    .send({Option3:"T3"})
    .send({Option4:"T4"});

    expect(await Poll.countDocuments({})).toBe(1);
  });
});

// describe("GET /polls", () => {
//   test("redirects to login if not authenticated", async () => {
//     const response = await request(app).get('/polls');
//     expect(response.statusCode).toBe(302);
//     expect(response.headers.location).toBe("/login");
//   });

//   test("responds with success code if authenticated", async () => {
//     const credentials = { email: "pedro@gmail.com", password: "test1234" };
//     const user = await User.create(credentials);
//     const agent = await signIn(credentials);
//     const response = await agent.get("/polls");
//     expect(response.statusCode).toBe(200);
//   });
// });

describe("RENDER AND CLICKS", () =>{
  test("user can register and login", async () => {
    await page.goto("http://localhost:3000/");
    await page.click('a[href="/register"]');
  
    // registrarse

    await page.waitFor('input[id=email]');
    await page.type("input[id=email]", "pedro@gmail.com");
    await page.type("input[id=password]", "test1234");
    const nav = page.waitForNavigation();
    await page.click("button[type=submit]");
    await nav;
    expect(page.url()).toBe("http://localhost:3000/logIn?");

    // login

    // const credentials = { email: "pedro@gmail.com", password: "test1234" };
    // const user = await User.create(credentials);
    
    // await page.goto("http://localhost:3000/logIn");
    // await page.waitFor('input[id=email]');
    // await page.type("input[id=email]", "pedro@gmail.com");
    // await page.type("input[id=password]", "test1234");
    // const nav2 = page.waitForNavigation();
    // await page.click("button[type=submit]");
    // await nav2;  
    // expect(page.url()).toBe("http://localhost:3000/polls");
  });
});