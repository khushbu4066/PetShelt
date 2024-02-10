import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddAnimalButton = ({ onAnimalAdded }) => {
  const [show, setShow] = useState(false);
  const [animalData, setAnimalData] = useState({
    name: '',
    age: 0,
    category: '',
    description: '',
    ImageUrl: '',
  });
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnimalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddAnimal = async () => {
    try {
      const response = await axios.post('http://localhost:4000/animals/api/animals', animalData,{ withCredentials: true });
      console.log('Animal added:', response.data);
      

      // Close the modal after a delay
      setTimeout(() => { 
        handleClose();
      }, 1000); // 1000 milliseconds 
    } catch (error) {
      console.error('Error adding animal:', error);
    }
  };

  return (
    <>
      <Button variant="primary" className='btn btn-secondary' onClick={handleShow}>
       Add Animal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#6c757d' }}>  Hello Agent </Modal.Title>
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
    <Button variant="primary" className='btn btn-success' onClick={handleAddAnimal}>
      Add
    </Button>
  </Form>
</Modal.Body>
      </Modal>
    </>
  );
};

export default AddAnimalButton;