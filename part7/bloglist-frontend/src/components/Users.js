import React, { useEffect } from 'react';
import userService from '../services/users';
import { initializeUsers } from './Reducers/UserReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap'

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector( state => state.users );

  useEffect(() => {
    userService.getAll().then(users => {
      console.log('users', users);
      dispatch(initializeUsers(users));
    })}, [dispatch]);

  return <div>
    <h2>Users</h2>
    <Table striped>
      <tbody>
        <tr>
          <th>User</th>
          <th>Blogs created</th>
        </tr>
        {users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
      </tbody>
    </Table>
  </div>
}

export default Users;