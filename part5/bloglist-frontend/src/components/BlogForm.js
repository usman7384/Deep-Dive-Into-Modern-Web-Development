import React from "react";
import { useRef } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";

const BlogForm = (props) => {
  const { blogs, setBlogs, notifyWith } = props;

  const blogFormRef = useRef();

  const createBlog = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <CreateBlog addBlog={addBlog} />
    </Togglable>
  );

  const addBlog = (event, title, author, url) => {
    event.preventDefault();

    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then((returnedBlog) => setBlogs(blogs.concat(returnedBlog)));

    notifyWith(`New Blog Added Title:  ${title} By: ${author}`);
  };

  const handleLikeChange = async (blog) => {
    await blogService.update(blog._id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    });

    const blogs = await blogService.getAll();
    setBlogs(blogs);

    notifyWith(`Blog Liked: ${blog.title} Author: ${blog.author}`);
  };

  const handleRemove = async (blog) => {
    if (
      window.confirm(
        `Do you want to remove Blog: ${blog.title} By: ${blog.author}`
      )
    ) {
      await blogService.remove(blog._id);

      let blogs = await blogService.getAll();
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);

      notifyWith(`Blog Removed: ${blog.title} By: ${blog.author}`, "error");
    }
  };

  return (
    <div>
      <div>{createBlog()}</div>

      <div>
        <h2>All Blogs</h2>
        {blogs.map((blog) => (
          <Blog
            key={blog._id}
            blog={blog}
            handleLikeChange={handleLikeChange}
            handleRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogForm;
