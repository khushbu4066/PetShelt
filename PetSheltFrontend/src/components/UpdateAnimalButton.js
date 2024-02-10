import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UpdateAnimalButton = ({ name ,age,category, description,ImageUrl,id}) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [animalData, setAnimalData] = useState({
    name: name,
    age: age,
    category:category,
    description:description,
    ImageUrl: ImageUrl,
  });
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Only update if the value is not blank
    setAnimalData((prevData) => ({ ...prevData, [name]: value.trim() !== '' ? value : prevData[name] }));
  };
  const handleUpdateAnimal = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/animals/api/animals/${id}`, animalData,{ withCredentials: true });
      console.log('Animal added:', response.data);
      navigate('./../animals');
      
      // Close the modal after a delay
      setTimeout(() => { 
        handleClose();
      }, 1000); // 1000 milliseconds = 2 seconds
    } catch (error) {
      console.error('Error adding animal:', error);
    }
  };
  // let {id} = this.props;
  console.log(id)
  return (
    <>
      <Button variant="primary" className='btn btn-warning' onClick={handleShow}>
       Update 
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#6c757d' }}>  Hello Agent : Update Animal Data </Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <Form>
    <Form.Group controlId="formAnimalName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter name" name="name" onChange={handleInputChange} />
    </Form.Group>

    <Form.Group controlId="formAnimalAge">
      <Form.Label>Age</Form.Label>
      <Form.Control type="number" placeholder="Enter age" name="age" onChange={handleInputChange} />
    </Form.Group>

    <Form.Group controlId="formAnimalCategory">
      <Form.Label>Category (Only Dog/Cat/Monkey/Bird/Cow)</Form.Label>
      <Form.Control type="text" placeholder="Enter category" name="category" onChange={handleInputChange} />
    </Form.Group>

    <Form.Group controlId="formAnimalDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control as="textarea" placeholder="Enter description about pet" name="description" onChange={handleInputChange} />
    </Form.Group>

    <Form.Group controlId="formAnimalImageUrl">
      <Form.Label>Image URL</Form.Label>
      <Form.Control type="text" placeholder="Enter image URL" name="ImageUrl" onChange={handleInputChange} />
    </Form.Group>
 <br></br>
    <Button variant="primary" className='btn btn-warning' onClick={handleUpdateAnimal}>
      Update
    </Button>
  </Form>
</Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateAnimalButton;