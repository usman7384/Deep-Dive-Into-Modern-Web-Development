import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,useNavigate,
  Routes, Route, Link
} from "react-router-dom"
import { useMatch, useParams } from 'react-router-dom'
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import LoginForm from "./components/loginForm"
import Notification from "./components/Notification"
import { setNotification } from "./components/Reducers/Notification"
import { initializeBlogs } from "./components/Reducers/BlogReducer"
import { useDispatch } from 'react-redux'
import { setUser } from "./components/Reducers/LoginReducer"
import { useSelector } from "react-redux"
import User from "./components/User"
import Users from "./components/Users"
import Blog from "./components/Blog"
import './css/index.css'
import {useLocation} from "react-router-dom"
import Navigation from "./components/Navigation"

const App = () => {


  // const [blogs, setBlogs] = useState([])
  // const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const loginUser=(user)=>{
    dispatch(setUser(user))
    console.log("at login",user)
  }

  const logoutUser=(user)=>{
    window.localStorage.removeItem('user');
    dispatch(setUser(null))
    console.log("at logout",user)
  }

  // useEffect(() => {

  //   const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")

  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     // setUser(user)
  //     loginUser(user);
  //     console.log(user)
  //     // console.log("here",user)
  //     blogService.setToken(user.token)
  //   }
  // })

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initializeBlogs(blogs));
    })}, [dispatch]);


  const notifyWith = (message) => {
    dispatch(setNotification( message,5))
  }




  return (
    <div>
      {console.log("aa  jao",user)}
      <h1>Blogs</h1>
      {/* {user &&
      <Navigation user={user} />} */}
      <Notification/>
      <LoginForm
        user={user}
        onLogin={loginUser}
        onLogout={logoutUser}
        notifyWith={notifyWith}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      {/* {
        user &&
        <BlogForm notifyWith={notifyWith} /> 
      } */}
        {/* {user &&      <Users/>}

        {user &&      <User/>} */}
        {user && <Router>
          <Navigation user={user} />
          {/* <Link to={`/users`}><button>Users</button></Link> */}
          {/* <Link to={`/blogs`}><button>Blogs</button></Link> */}
        <Routes>
        <Route exact path="/blogs" element={<BlogForm notifyWith={notifyWith} />}/>
        <Route exact path="/blogs/:blogId" element={ <Blog notifyWith={notifyWith}/>}/>
        <Route exact path="/users/:userId" element={<User />}/>
        <Route exact path="/users" element={<Users />}/>
        {/* <Route exact path="/" element={<Navigation user={user} />}/> */}
              </Routes>
              </Router>}

    </div>
  )
}

export default App