const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Client = require('../config/s3menuconfig');
const Menu = require('../models/menuSchema');
const isLoggedIn = require('../middleware/authMiddleWare');
const axios = require('axios');

const router = express.Router();

// Set up Multer for image upload to S3
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = Date.now().toString() + '-' + file.originalname;
      cb(null, fileName);
    },
  }),
});


const translate = async (text) => {
  try {
    const response = await axios.post('http://localhost:8000/translate', {
      q: text,
      source: 'th',
      target: 'en',
      format: 'text'
    });
    return response.data.translatedText;
  } catch (error) {
    console.error('Translation error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to translate the text');
  }
};


router.post('/:id/menu', isLoggedIn, upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;

  
  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }
  const imageUrl = req.file.location;

  try {
    
    let menu = await Menu.findOne({ seller: req.params.id });
    if (!menu) {
      menu = new Menu({
        seller: req.params.id,
        items: []
      });
    }

    
    let translatedName = name; // Default to original name in case translation fails
    let translatedDescription = description; // Default to original description

    try {
      translatedName = await translate(name);
      translatedDescription = await translate(description);
      console.log(`Translation successful: ${translatedName}, ${translatedDescription}`);
    } catch (translationError) {
      console.error('Translation failed, using original text:', translationError.message);
    }

    
    const newMenuItem = {
      name: name,
      description: description,
      price: price,
      imageUrl: imageUrl,
      name_en: translatedName, 
      description_en: translatedDescription, 
    };

    
    menu.items.push(newMenuItem);
    const updatedMenu = await menu.save();

    res.json({ message: 'Menu item added successfully!', menu: updatedMenu });
  } catch (error) {
    console.error('Error saving or translating menu item:', error.message);
    res.status(500).json({ error: 'Failed to add menu item' });
  }
});


router.get('/:id/menu', isLoggedIn, async (req, res) => {
  try {
    const menu = await Menu.findOne({ seller: req.params.id });

    if (!menu || menu.items.length === 0) {
      return res.status(404).json({ error: 'No menu items found for this seller' });
    }

    const filteredMenuItems = menu.items.map(item => ({
      name: item.name,
      name_en: item.name_en, 
      description_en: item.description_en,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
    }));

    res.json({ menuItems: filteredMenuItems });
  } catch (err) {
    console.error('Error fetching menu:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/edit-item/:item_id', isLoggedIn, upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const menu = await Menu.findOne({ 'items._id': req.params.item_id });

    if (!menu) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    const menuItem = menu.items.id(req.params.item_id);

    menuItem.name = name || menuItem.name;
    menuItem.description = description || menuItem.description;
    menuItem.price = price || menuItem.price;

    if (req.file) {
      const imageUrl = req.file.location;
      menuItem.imageUrl = imageUrl;
    }

    const updatedMenu = await menu.save();
    res.json({ message: 'Menu item updated successfully!', menu: updatedMenu });
  } catch (err) {
    console.error('Error updating menu item:', err);
    res.status(500).json({ error: 'Error updating menu item' });
  }
});

module.exports = router;