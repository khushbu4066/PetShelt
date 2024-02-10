import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimalList from './components/AnimalList';
import UserRegisterLogin from './components/UserRegisterLogin';
import AdminRegisterLogin from './components/AdminRegisterLogin';
import Navbar from './components/Navbar';
import Profile  from './components/Profile';
import Bird from './components/Bird'
import Dog from './components/Dog'
import Cat from './components/Cat'
import Cow from './components/Cow'
import Monkey  from './components/Monkey';
import PetCare from './components/PetCare';
import Footer from './components/Footer';

const App = () => {
  return (
       
    <Router>
      <Navbar/>
      <div style={{ paddingTop: '36px' , paddingBottom:'120px'}}>
      
      <Routes>
      <Route exact path='/' element={<PetCare/>} />
      <Route exact path='/Userlogin' element={<UserRegisterLogin/>} />
      <Route exact path='/Adminlogin' element={<AdminRegisterLogin/>} />
      <Route exact path='/animals' element={<AnimalList/>} />
      
      <Route exact path='/profile' element={<Profile/>} />
      <Route exact path='/Dog' element={<Dog/>} />
      <Route exact path='/Cat' element={<Cat/>} />
      <Route exact path='/Bird' element={<Bird/>} />
      <Route exact path='/Cow' element={<Cow/>} />
      
      <Route exact path='/Monkey' element={<Monkey/>} />
     

        
      </Routes>
      </div>
      <Footer/>
    </Router>
  );
};



export default App;