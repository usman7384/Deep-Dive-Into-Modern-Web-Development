const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("verify that the unique identifier property  is id", async () => {
  const resp = await api.get("/api/blogs");
  expect(resp.body[0]._id).toBeDefined();
});

test("Create a new blog ", async () => {
  const lenBefore = await api.get("/api/blogs");

  const newEntry = {
    title: "Usman",
    author: "SHROUD",
    url: "no url",
    likes: 100,
  };
  await api.post("/api/blogs").send(newEntry).expect(201);

  const response = await api.get("/api/blogs");
  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(lenBefore.body.length + 1);
  expect(contents).toContain("Usman");
});

test("if not specifies likes is zero", async () => {
  const newEntry = {
    title: "Custom DNS Client",
    author: "Usman&Faizan",
    url: "check github",
  };

  const response = await api.post("/api/blogs").send(newEntry).expect(201);
  expect(response.body.likes).toBe(0);
});

test("missing title or url properties backend responds status code 400 Bad Request.", async () => {
  const newEntry = {
    author: null,
    url: "https://stack.com/",
    likes: 1,
  };

  const response = await api.post("/api/blogs").send(newEntry).expect(400);
  expect(response.status).toBe(400);
});

test("delete a blog", async () => {
  const newEntry = {
    title: "Custom DNS Client",
    author: "Usman&Faizan",
    url: "check github",
    likes: 1,
  };

  const result = await api.post("/api/blogs").send(newEntry).expect(201);

  const deleteBlog = await api
    .delete(`/api/blogs/${result.body._id}`)
    .expect(204);
  expect(deleteBlog.status).toBe(204);
});

test("update a blog", async () => {
  const newEntry = {
    title: "man",
    author: "SHROUD",
    url: "no url",
    likes: 150,
  };
  const result = await api.post("/api/blogs").send(newEntry).expect(201);
  newEntry.likes += 1;

  await api.put(`/api/blogs/${result.body._id}`).send(newEntry).expect(200);

  const updatedResult = await api
    .get(`/api/blogs/${result.body._id}`)
    .expect(200);

  expect(updatedResult.body.likes).toBe(newEntry.likes);
});

afterAll(() => {
  mongoose.connection.close();
});
