import React, { useState } from "react";

import blogService from "../services/blogs";
import loginService from "../services/login";

const LoginForm = (props) => {
  const {
    notifyWith,
    user,
    setUser,
    username,
    setUsername,
    password,
    setPassword,
  } = props;

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      notifyWith("Wrong Credentials");
      setTimeout(() => {}, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
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

  return <div>{user ? <LogOut /> : <Login />}</div>;
};

export default LoginForm;
