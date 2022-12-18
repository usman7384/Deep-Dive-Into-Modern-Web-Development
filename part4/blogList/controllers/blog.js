const Router = require("express").Router();
const jwt = require("jsonwebtoken");

const Blog = require("../models/blog");
const User = require("../models/user")

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

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

Router.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const token = getTokenFrom(request);
  console.log(token);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  console.log("decoded",decodedToken)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    date: new Date(),
    user: user._id,
  });

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
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
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
