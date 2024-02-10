import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnimalsShow from './AnimalsShow'
import { login, logout, getAuthState } from './Auth';
const Cat = () => {
  const [animal, setAnimal] = useState([]);
  const [userProfile, setUserProfile] = useState("ab");
  const isLoggedIn = getAuthState();
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get('http://localhost:4000/animals/api/animals/Cat',{ withCredentials: true });
        setAnimal(response.data.animal);
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
    {animal.map((animal)=>{

    return <div className="col-md-4" key ={animal.url}>
    <AnimalsShow name={animal.name} age={animal.age} category= {animal.category} description={animal.description} ImageUrl={animal.ImageUrl} id={animal._id} role={userProfile.role}/>
    </div>
    })};
    
      
    
  </div>
  </div>
  );
};

export default Cat;
