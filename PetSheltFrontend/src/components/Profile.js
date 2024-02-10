import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Button } from 'react-bootstrap';
import { AdaptedShow } from './AdaptedShow';
import AddAnimalButton from './AddAnimalButton'; // Import the AddAnimalButton component
import { useNavigate } from 'react-router-dom'; 
import { login, logout, getAuthState } from './Auth';
const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = getAuthState();
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/animals/api/profile', { withCredentials: true });
        console.log('Profile data:', response.data);
        setUserProfile(response.data.user);
        if(isLoggedIn==false){
          setUserProfile({ username: null, role: null, adoptedAnimals: [] });

        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
    
  }, []); // Empty dependency array ensures the effect runs only once after initial render
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/users/logout' , { withCredentials: false });
      logout();
      setUserProfile({ username: null, role: null, adoptedAnimals: [] });
      navigate('./../animals')
      console.log( response.data);

      
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="container mt-3">
      
       
    
      
      <h5>User Profile</h5>
      {userProfile && (
        <div>
            {userProfile.role === 'user' && (
              <div>
        <Button variant="outline-danger"  className="m-2" onClick={handleLogout}>Logout</Button>
        <h6> Username: {userProfile.username}</h6>
           </div>
          )}
 
          {userProfile.role === 'admin' && (
             <div>
            <Button variant="outline-danger"  className="m-2" onClick={handleLogout}>Logout</Button>
            <h6> Username: {userProfile.username}</h6>
           </div>
          )}
          {userProfile.role !== 'admin' && (
             <div>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           </div>
          )}
          {userProfile.role !== 'user' && (
             <div>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           </div>
          )}
          
          
          {userProfile.role === 'user' && (
            <div>
              <p1>Role: Customer</p1>
              <br></br>
              <br></br>
              <h4>Adapted Animals By You:</h4>
            
              
            </div>
          )}
 
          {userProfile.role === 'admin' && (
            <div>
              <h6>Role: Agent</h6>
          
              <br></br>
              {/* Add a button or link to trigger the "Add Animal" functionality */}
              <AddAnimalButton />
              <br></br>
              <br></br>
              {/* <h5>Added Animals By You:</h5> */}
            </div>
          )}
        </div>
      )}
  
      {userProfile && (
        <div className="container">
          <div className="row">
            {userProfile.adoptedAnimals.map((animal) => (
              <div className="col-md-4" key={animal.url}>
                <AdaptedShow name={animal.name} age={animal.age} category={animal.category} description={animal.description} ImageUrl={animal.ImageUrl} id={animal._id} role={userProfile.role} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
