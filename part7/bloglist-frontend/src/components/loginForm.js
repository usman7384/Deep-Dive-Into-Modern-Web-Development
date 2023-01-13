import React, { useState } from "react";

import blogService from "../services/blogs";
import loginService from "../services/login";
import { useDispatch } from "react-redux";
import { setUser} from "./Reducers/LoginReducer";
import { useSelector } from "react-redux";
import {connect} from 'react-redux'

const LoginForm = (props) => {
  // const user = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  const {
    user,
    onLogin,
    onLogout,
    notifyWith,
    username,
    setUsername,
    password,
    setPassword,
  } = props;

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const responseUser = await loginService.login({
        username,
        password,
      });
      console.log("after login",responseUser)

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(responseUser));
      blogService.setToken(responseUser.token);
      onLogin(responseUser)

      // setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      notifyWith("Wrong Credentials");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    onLogout(user)
  };

  const LogOut = () => {
    return (
      <div>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
      </div>
    );
  };

  const Login = () => {
    return (
      <div>
        <h2>Log In</h2>
        <div>
          <form onSubmit={handleLogin}>
            <div>
              Username:
              <input
                type="text"
                value={username}
                name="Username"
                autoComplete="on"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              Password:
              <input
                type="password"
                value={password}
                name="Password"
                autoComplete="on"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    );
  };

  return (<div>{user ? <LogOut /> : <Login />}</div>);
  // return <div>{console.log(user)}</div>;
};

// const mapStateToProps = (state) => {
//   return { user: state.user }; 
  
// }

// const mapDispatchToProps = {
//   setUser,
// }

// const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)
// export default ConnectedLoginForm

export default LoginForm