import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
export class AdaptedShow extends Component {

  
  render() {
      
    
    let {name ,age,category, description,ImageUrl,role} = this.props;
    console.log(this.props);
    return (
      
      <div className='my-3'>
        <span className="badge rounded-pill text-bg-secondary">{category}</span>
        

       <div className="card" style={{width: "18rem" , height:'400px'}}>
  <img src= {ImageUrl} className="card-img-top" alt="..." style={{ width: 'auto', height: '170px' }}/>
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
    <p className="card-text"> Age : {age} Years</p>
    <p className="card-text">{description}</p>
    {/* <p className="card-text">{id}</p> */}
    {role === 'admin' && (
            <button className="btn btn-success" > Added</button>
          )}
    
    {role === 'user' && (
            <button className="btn btn-success" > Adopted</button>
          )}
  </div>
</div>

  
      </div>
    )
  }
}

export default AdaptedShow;
