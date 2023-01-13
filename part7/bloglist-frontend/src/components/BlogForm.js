import React from "react";
import { useRef } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";
import { createBlog ,likeBlog,deleteBlog, initializeBlogs} from "./Reducers/BlogReducer";
import {useDispatch} from "react-redux";
import { setNotification } from "./Reducers/Notification";
import {connect} from "react-redux";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";

const BlogForm = (props) => {



  const blogs = useSelector( state => state.blogs );

  const dispatch=useDispatch()
  const { notifyWith } = props;

  const blogFormRef = useRef();

  const createblog = () => (
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
    dispatch(createBlog(blogObject));
    props.notifyWith(`New Blog Added Title:  ${title} By: ${author}`);
  };

  // const handleLikeChange = async (blog) => {
  //   blog.likes = blog.likes + 1;
  //   dispatch(likeBlog(blog));
  //   // await blogService.update(blog._id, {
  //   //   title: blog.title,
  //   //   author: blog.author,
  //   //   url: blog.url,
  //   //   likes: blog.likes + 1,
  //   // });

  //   // const blogs = await blogService.getAll();
  //   // setBlogs(blogs);

  //   notifyWith(`Blog Liked: ${blog.title} Author: ${blog.author}`);
  // };

  // const handleRemove = async (blog) => {
  //   if (
  //     window.confirm(
  //       `Do you want to remove Blog: ${blog.title} By: ${blog.author}`
  //     )
  //   ) {
  //     dispatch(deleteBlog(blog));
  //     // await blogService.remove(blog._id);
  //     // let blogs = await blogService.getAll();
  //     // blogs.sort((a, b) => b.likes - a.likes);
  //     // setBlogs(blogs);

  //     notifyWith(`Blog Removed: ${blog.title} By: ${blog.author}`, "error");
  //   }
  // };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <div>{createblog()}</div>
      {console.log("blogs", blogs)}
      <div>
        <h2>All Blogs</h2>
        {blogs.map((blog) => (
                  <div style={blogStyle}>

          <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
          </div>

          // <Blog
          //   key={blog._id}
          //   blog={blog}
          //   handleLikeChange={handleLikeChange}
          //   handleRemove={handleRemove}
          // />
        ))}
        </div>

      </div>
  );
};

const mapStateToProps = (state) => {
  return { blogs: state.blogs }; 
  
}

const mapDispatchToProps = {
  createBlog,
  likeBlog,
  deleteBlog,
}

const ConnectedBlogForm = connect(mapStateToProps, mapDispatchToProps)(BlogForm)
export default ConnectedBlogForm