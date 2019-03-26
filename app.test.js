const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./app");


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

describe("/", ()=>{
  test("GET responds whit success code(200)", async () => {
    const responce = await request(app).get("/");
    expect(responce.statusCode).toBe(200);
  });
})