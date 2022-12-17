const Router = require("express").Router();
const Blog = require("../models/blog");

Router.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

Router.get("/:id", (request, response) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
        response.status(200).end();
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

Router.post("/", (request, response) => {
  const blog = new Blog(request.body);
  if (typeof blog.likes === "undefined" || blog.likes === null) {
    blog.likes = 0;
  }
  if (
    typeof blog.title === "undefined" ||
    blog.title === null ||
    typeof blog.url === "undefined" ||
    blog.url === null
  ) {
    response.status(400).end();
  } else {
    blog.save().then((result) => {
      response.status(201).json(result);
    });
  }
});

Router.delete("/:id", (request, response) => {
  const id = request.params.id;
  Blog.findByIdAndRemove(id).then((result) => {
    response.status(204).end();
  });
});

Router.put("/:id", (request, response, next) => {
  const body = request.body;
  const blog = {
    likes: body.likes,
  };
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = Router;
