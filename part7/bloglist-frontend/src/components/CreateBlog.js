import React, { useState } from "react";
import { connect } from "react-redux";

const CreateBlog = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addBlog(event, title, author, url);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:{" "}
          <input
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="create">
          Add
        </button>
      </form>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return { blogs: state.blogs }; 
  
// }

// // const mapDispatchToProps = {
// //   addBlog,
// // };

// const ConnectedCreateBlog = connect(mapStateToProps)(CreateBlog)
// export default ConnectedCreateBlog

export default CreateBlog;