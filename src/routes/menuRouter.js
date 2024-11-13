const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Client = require('../config/s3Client');
const { Menu, CATEGORIES } = require('../models/menuSchema');
const isLoggedIn = require('../middleware/authMiddleWare');
const translate = require('../middleware/azure_translate');

const router = express.Router();


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


router.put('/:seller_id/menu', isLoggedIn, upload.single('image'), async (req, res) => {
    const { name, description, price, category } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'Image file is required' });
    }
    const imageUrl = req.file.location;

    try {
        let menu = await Menu.findOne({ seller: req.params.seller_id });
        if (!menu) {
            menu = new Menu({
                seller: req.params.seller_id,
                items: []
            });
        }

        let translatedName = name;
        let translatedDescription = description;
        try {
            translatedName = await translate(name);
            translatedDescription = await translate(description);
            console.log(`Translation successful: ${translatedName}, ${translatedDescription}`);
        } catch (translationError) {
            console.error('Translation failed:', translationError.message);
        }

        const newMenuItem = {
            name,
            name_en: translatedName,
            description,
            description_en: translatedDescription,
            price,
            imageUrl,
            category: category || 'Main dish'
        };

        menu.items.push(newMenuItem);
        const updatedMenu = await menu.save();

        res.json({ message: 'Menu item added successfully!', menu: updatedMenu });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to add menu item' });
    }
});

router.get('/:seller_id/menu', isLoggedIn, async (req, res) => {
    try {
        const menu = await Menu.findOne({ seller: req.params.seller_id });

        if (!menu || menu.items.length === 0) {
            return res.json({ 
                message: 'No menu items available',
                categories: [] 
            });
        }

        
        const usedCategories = [...new Set(menu.items.map(item => item.category))]; 
        const categorizedMenu = usedCategories.reduce((acc, category) => {
        
            const categoryItems = menu.items
                .filter(item => item.category === category)
                .map(item => ({
                    _id: item._id,
                    name: item.name,
                    name_en: item.name_en,
                    description: item.description,
                    description_en: item.description_en,
                    price: item.price,
                    imageUrl: item.imageUrl
                }));

        
            acc[category] = categoryItems;
            return acc;
        }, {});

        res.json({ 
            restaurant_id: menu.seller,
            categories: categorizedMenu 
        });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:seller_id/menu/:category', isLoggedIn, async (req, res) => {
  try {
      const menu = await Menu.findOne({ seller: req.params.seller_id });
      const requestedCategory = decodeURIComponent(req.params.category);

      if (!menu) {
          return res.status(404).json({ 
              message: 'No menu found for this seller' 
          });
      }

      // Filter items by the requested category
      const categoryItems = menu.items
          .filter(item => item.category === requestedCategory)
          .map(item => ({
              _id: item._id,
              name: item.name,
              name_en: item.name_en,
              description: item.description,
              description_en: item.description_en,
              price: item.price,
              imageUrl: item.imageUrl,
              category: item.category
          }));

      if (categoryItems.length === 0) {
          return res.json({ 
              message: `No items found in ${requestedCategory} category`,
              items: []
          });
      }

      res.json({
          category: requestedCategory,
          items: categoryItems
      });
  } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Server error' });
  }
});


router.post('/:seller_id/menu/:item_id', isLoggedIn, upload.single('image'), async (req, res) => {
  const { name, description, price, category } = req.body;


  if (category && !Object.values(CATEGORIES).includes(category)) {
      return res.status(400).json({ 
          error: `Invalid category. Must be one of: ${Object.values(CATEGORIES).join(', ')}` 
      });
  }

  try {
      const menu = await Menu.findOne({ 'items._id': req.params.item_id });

      if (!menu) {
          return res.status(404).json({ error: 'Menu item not found' });
      }

      const menuItem = menu.items.id(req.params.item_id);

      // Update fields if provided
      if (name) menuItem.name = name;
      if (description) menuItem.description = description;
      if (price) menuItem.price = price;
      if (category) menuItem.category = category;
      if (req.file) {
          menuItem.imageUrl = req.file.location;
      }

      // Handle translations
      try {
          if (name) {
              menuItem.name_en = await translate(name);
          }
          if (description) {
              menuItem.description_en = await translate(description);
          }
      } catch (translationError) {
          console.error('Translation failed:', translationError.message);
      }

      const updatedMenu = await menu.save();
      res.json({ 
          message: 'Menu item updated successfully!', 
          menu: updatedMenu 
      });
  } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error updating menu item' });
  }
});

router.delete('/:seller_id/menu/:item_id', async (req, res) => {
  const { seller_id, item_id } = req.params;

  try {
    
    const updatedMenu = await Menu.findOneAndUpdate(
      { seller: seller_id },
      { $pull: { items: { _id: item_id } } }, 
      { new: true } 
    );

    if (!updatedMenu) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({
      message: 'Menu item deleted successfully!',
      menu: updatedMenu
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

module.exports = router;