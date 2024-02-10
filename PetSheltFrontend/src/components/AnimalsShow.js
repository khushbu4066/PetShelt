import React, { Component  } from 'react'

import UpdateAnimalButton from './UpdateAnimalButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NavItem } from 'react-bootstrap';
export class AnimalsShow extends Component {

  
  render() {
    
   
    
    const handleAdopt = async () => {
    
      try {
        console.log()
        const response = await axios.post(
          `http://localhost:4000/animals/api/animals/${id}/adopt`,
          {},
          { withCredentials: true }
        );
       
      
        console.log('Adoption successful', response.data);
        // Additional logic after successful adoption
      } catch (error) {
        console.error('Error adopting animal:', error);
      }
    };

    

    const handleDelete = async () => {
      try {
        console.log()
        const response = await axios.delete(
          `http://localhost:4000/animals/api/animals/${id}`,
          {},
          { withCredentials: true }
        );
        
        console.log('Adoption successful', response.data);
        // Additional logic after successful adoption
      } catch (error) {
        console.error('Error adopting animal:', error);
      }
    };
  

    let {name ,age,category, description,ImageUrl,id,role,adoptedB} = this.props;
    console.log(this.props);
  
    return (
      
      <div className="col-md-4 mb-4">
        <span className="badge rounded-pill text-bg-secondary">{category}</span>
        

        <div className="card" style={{ width: '18rem', height:'400px'} }>
  <img src= {ImageUrl} className="card-img-top" alt="..." style={{ width: 'auto', height: '170px' }}/>
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
    <p className="card-text"> Age : {age} Years</p>
    <p className="card-text">{description}</p>
    
    
    {/* <p className="card-text">{id}</p> */}
    
    {
      console.log(adoptedB)

    
    }
    {role === 'user'&& adoptedB ==='No' && (
            <button className="btn btn-info" onClick={handleAdopt}> Adopt</button>
          )}
          {role === 'user'&& adoptedB !=='No' && (
            <button className="btn btn-dark" onClick={handleAdopt}> Already Adopted By Someone</button>
          )}
          {role === 'admin' && (
           <UpdateAnimalButton name={name} age ={age}category={category}description={description} ImageUrl={ImageUrl}id={id}/>
          )}
          {role === 'admin' && (
            <button className="btn btn-danger mx-2" onClick={handleDelete}>Delete</button>
          )}
    
   
  </div>
</div>

  
      </div>
      
    )
    

  }

}


export default AnimalsShow;
