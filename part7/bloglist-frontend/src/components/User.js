import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const userId = useParams().userId;
  const user = useSelector( state => {
    return state.users.find(user => user.id === userId);
  });

  if(!user){
    return null;
  }

  return <React.Fragment>
    <h2>{user.name}</h2>
    <h3>added blogs</h3>
    <ul>
      {user.blogs.map( blog => <li key={blog._id}>{blog.title}</li>)}
    </ul>
  </React.Fragment>
}

export default User;