import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { likeBlog ,addComment} from "./Reducers/BlogReducer"
import { deleteBlog } from "./Reducers/BlogReducer"
import {useParams} from "react-router-dom"
import {useSelector} from "react-redux"
import {connect} from "react-redux"



const Blog = (props) => {
  const blogId = useParams().blogId;
  const blog = useSelector( state => {
    return state.blogs.find(blog => blog._id === blogId);
  });

  // const {handleLikeChange, handleRemove } = props
  const {notifyWith}=props
  const dispatch = useDispatch();
  // const location = useLocation();
  // const { blog,handleLikeChange,handleRemove } = location.state;
  // const blog=props.blog
  
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState("");

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikeChange = async (blog) => {
    blog.likes = blog.likes + 1;
    dispatch(likeBlog(blog));
    // await blogService.update(blog._id, {
    //   title: blog.title,
    //   author: blog.author,
    //   url: blog.url,
    //   likes: blog.likes + 1,
    // });

    // const blogs = await blogService.getAll();
    // setBlogs(blogs);

    notifyWith(`Blog Liked: ${blog.title} Author: ${blog.author}`);
  };

  const handleRemove = async (blog) => {
    if (
      window.confirm(
        `Do you want to remove Blog: ${blog.title} By: ${blog.author}`
      )
    ) {
      dispatch(deleteBlog(blog));
      // await blogService.remove(blog._id);
      // let blogs = await blogService.getAll();
      // blogs.sort((a, b) => b.likes - a.likes);
      // setBlogs(blogs);

      notifyWith(`Blog Removed: ${blog.title} By: ${blog.author}`, "error");
    }
  };

  const handleCommentChange = async (event) => {
    event.preventDefault();
    dispatch(addComment(blog, comment));
    notifyWith(`Comment Added: ${comment} to Blog: ${blog.title}`);
  };


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  if(!blog){
    return null;
  }


  return (
    <div style={blogStyle}>
      <div  className="blogTitle">
        <div>
          {blog.title} by {blog.author}{" "}
          {/* <button id="view" onClick={toggleVisibility}>
            view
          </button> */}
        </div>
      </div>
      <div className="AllBlogs">
        <div>
          {blog.title} 
          {/* <button onClick={toggleVisibility}>hide</button> */}
        </div>
        <div>{blog.url}</div>
        <div id="likes">
          {blog.likes}{" "}
          <button onClick={() => handleLikeChange(blog)}>like</button>
        </div>
        <div>{blog.author}</div>
        <button onClick={() => handleRemove(blog)}>remove</button>
        <div>
          <h3>Comments</h3>
          <form onSubmit={handleCommentChange}>
          <input
            id="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          /><button type="submit">add comment</button>
          </form>
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { blogs: state.blogs }; 
  
}

const mapDispatchToProps = {
  likeBlog,
  deleteBlog,
  addComment
}

const ConnectedBlog= connect(mapStateToProps, mapDispatchToProps)(Blog)
export default ConnectedBlog
