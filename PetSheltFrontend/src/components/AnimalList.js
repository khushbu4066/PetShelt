import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnimalsShow from './AnimalsShow'
import PropTypes from 'prop-types'
import { login, logout, getAuthState } from './Auth';
const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [userProfile, setUserProfile] = useState("ab");
  const isLoggedIn = getAuthState();
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get('http://localhost:4000/animals/api/animals',{ withCredentials: true });
        setAnimals(response.data.animals);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };

    fetchAnimals();
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
  
  }, []);

  

  return (
     <div className="container">
    <div className="row">
    {animals.map((animal)=>{
      
      var adoptedB ="No"
      if(animal.adoptedBy){
        adoptedB = animal._id
      }
  {console.log(adoptedB)}
    return <div className="col-md-4" key ={animal.url}>
    <AnimalsShow name={animal.name} age={animal.age} category= {animal.category} description={animal.description} ImageUrl={animal.ImageUrl} id={animal._id} role={userProfile.role} adoptedB={adoptedB}/>
    
    </div>
    
    })}
    
      
    
  </div>
  </div>
  )
}

export default AnimalList;
