const express = require('express');
const Animal = require('./models/animal');
const isAdmin = require('./middlewares/authAdMiddleware');
const isUser =  require('./middlewares/authUsMiddleware');
const User = require('./models/user');

const router = express.Router();

router.get('/api/animals', async (req, res) => {
  try {
    const animals = await Animal.find().populate('adoptedBy', 'username');
    res.json({ animals });
  } catch (error) {
    console.error('Error fetching animals:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/animals/:category', async (req, res) => {
  const  {category } = req.params;

  try {
    const animal = await Animal.find({ category }).populate('adoptedBy', 'username');
    res.json({ animal });
  } catch (error) {
    console.error(`Error fetching ${category}s:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Adopt Animal API 
router.post('/api/animals/:id/adopt', async (req, res) => {
  try {
    
      if (req.user && req.user._id) {
        const userId = req.user._id;
      }
    
    const userId = req.user._id;
    const animalId = req.params.id;

    // Check if the animal is already adopted
    const animal = await Animal.findById(animalId);
    if (animal.adoptedBy) {
      return res.status(400).json({ error: 'Animal already adopted' });
    }

    // Update the animal with the adoptedBy field
    animal.adoptedBy = userId;
    await animal.save();

    // Update the user's adoptedAnimals list
    const user = await User.findById(userId);
    user.adoptedAnimals.push(animalId);
    await user.save();

    res.json({ message: 'Adoption successful', animal });
  } catch (error) {
    console.error('Error adopting animal:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/api/profile',async (req, res) => {
  try {
    const userId = req.user._id;
    

    // Fetch the user with adopted animals populated
    const user = await User.findById(userId).populate('adoptedAnimals');

    res.json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Add entry
router.post('/api/animals',  async (req, res) => {
  try {
    const { name, age, category, description ,ImageUrl} = req.body;

    // Create a new animal entry
    const newAnimal = new Animal({ name, age, category, description,ImageUrl });
    const savedAnimal = await newAnimal.save();

    res.json(savedAnimal);
  } catch (error) {
    console.error('Error creating animal:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
router.put('/api/animals/:id', async (req, res) => {
  try {
    const { name, age, category, description,ImageUrl } = req.body;
    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      { name, age, category, description,ImageUrl },
      { new: true }
    );

    res.json(updatedAnimal);
  } catch (error) {
    console.error('Error updating animal:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an existing animal by ID
router.delete('/api/animals/:id',async (req, res) => {
  try {
    const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
    res.json(deletedAnimal);
  } catch (error) {
    console.error('Error deleting animal:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;