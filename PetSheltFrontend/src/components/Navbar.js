import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";

export class Navbar extends Component {
  render() {
    
    return (
      <div>
         <nav className="navbar navbar-expand-lg bg-dark navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand text-light" to="/">
            VatsalyaExpress
            </Link>
            <button
              className="navbar-toggler btn-info"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
               <span
                className="navbar-toggler-icon btn-secondary"
                style={{ backgroundColor: '#red' }}
              ></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item"><Link className="nav-link text-light" to="/animals">Available Pets</Link></li>
      <li className="nav-item mx-3"><Link className="nav-link text-light" to="/Dog">Dog</Link></li>
        <li className="nav-item mx-3"><Link className="nav-link text-light" to="/Cat">Cat</Link></li>
        <li className="nav-item mx-3"><Link className="nav-link text-light" to="/Bird">Bird</Link></li>
        <li className="nav-item mx-3"><Link className="nav-link text-light" to="/Cow">Cow</Link></li>
        <li className="nav-item mx-3"><Link className="nav-link text-light" to="/Monkey">Monkey</Link></li>
        <li className="nav-item">
          <Link className="nav-link text-light m-10" aria-current="page" to="/Userlogin" >User SignUp/SignIn</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light " aria-current="page" to="/Adminlogin" > Agent SignUp/SignIn</Link>
        </li>
        

       <li className="nav-item mx-3"><Link className="nav-link text-light" to="/profile">Profile</Link></li>
        
        
        
      </ul>
     
    </div>
  </div>
</nav>
        
      </div>
    )
  }
}

export default Navbar
