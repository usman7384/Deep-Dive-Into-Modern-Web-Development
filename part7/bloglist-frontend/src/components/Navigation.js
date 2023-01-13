import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Navigation=({user})=>{
    return(
        <Navbar bg="light" expand="lg">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
  <div class="navbar-nav">
    <a class="nav-item nav-link active" href="#"><Link to='/blogs'>Blogs </Link></a>
    <a class="nav-item nav-link" href="#"><Link to='/users'>Users </Link></a>
    <span>{user.name} logged in</span>
  </div>
</div>
</nav>
</Navbar>
    )
    }

export default Navigation;


