const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Client = require('../config/s3menuconfig');
const Menu = require('../models/menuSchema');  
const isLoggedIn = require('../middleware/authMiddleWare');

const router = express.Router();

// Set up Multer for image upload
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

    const newMenuItem = { name, description, price, imageUrl };

    menu.items.push(newMenuItem);

    const updatedMenu = await menu.save();

    res.json({ message: 'Menu item added successfully!', menu: updatedMenu });
  } catch (err) {
    res.status(500).json({ error: 'Error saving menu item' });
  }
});

router.get('/:id/menu', isLoggedIn, async (req, res) => {
  try {
    const menu = await Menu.findOne({ seller: req.params.id });

    if (!menu || menu.items.length === 0) {
      return res.status(404).json({ error: 'No menu items found for this seller' });
    }
    const filteredMenuItems = menu.items.filter(item => ({
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,

  }));
    
    res.json({ menuItems: filteredMenuItems});
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
    res.status(500).json({ error: 'Error updating menu item' });
  }
});

module.exports = router;