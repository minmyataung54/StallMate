const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Client = require('../config/s3Client');
const Menu = require('../models/menuSchema');
const isLoggedIn = require('../middleware/authMiddleWare');
const translate = require('../middleware/azure_translate');

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

// let key = process.env.key;
// let endpoint = process.env.endpoint;
// let location = process.env.location;

// const translate = async(text) => {
//   try {
//     const response = await axios.post(
//       `${endpoint}/transalte`,
//       [{'text' : text}],
//       {
//         headers : {
//             'Ocp-Apim-Subscription-Key': key,
//             'Ocp-Apim-Subscription-Region': location,
//             'Content-type': 'application/json',
//             'X-ClientTraceId': uuidv4().toString()
//         },
//         params : {
//           'api-version' : '3.0',
//           'from' : 'th',
//           'to' : 'en'
//         }
//       }
//   );
//   return response.data[0].translations[0].text;
//   }
//   catch(error){
//     console.error('Translation error:', error.response ? error.response.data : error.message);
//     throw new Error('Failed to translate the text');
//   }
// }

router.put('/:seller_id/menu', isLoggedIn, upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;

  
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


router.get('/:seller_id/menu', isLoggedIn, async (req, res) => {
  try {
    const menu = await Menu.findOne({ seller: req.params.seller_id });

    if (!menu || menu.items.length === 0) {
      return res.status(404).json({ Remark : 'No menu items for this seller yet' });
    }

    const filteredMenuItems = menu.items.map(item => ({
      _id: item._id,
      name: item.name,
      name_en: item.name_en, 
      description_en: item.description_en,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
    }));

    res.json({ 
      qrCodeUrl: menu.qrcode_url, // Assuming `qrcode_url` is the field name in the Menu schema
      menuItems: filteredMenuItems 
    });
  } catch (err) {
    console.error('Error fetching menu:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/:seller_id/menu/:item_id', isLoggedIn, upload.single('image'), async (req, res) => {
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

    
    try {
      const translatedName = await translate(name);
      const translatedDescription = await translate(description);
      menuItem.name_en = translatedName || menuItem.name_en;
      menuItem.description_en = translatedDescription || menuItem.description_en;
    } catch (translationError) {
      console.error('Translation failed, using original text:', translationError.message);
    }

    // Save the updated menu
    const updatedMenu = await menu.save();

    res.json({ message: 'Menu item updated successfully!', menu: updatedMenu });
  } catch (err) {
    console.error('Error updating menu item:', err);
    res.status(500).json({ error: 'Error updating menu item' });
  }
});

// router.delete('/:id/menu/:id', async (req, res) => {
//   const { id } = req.params;
//   console.log(id);

//   try {
//     const deletedMenuItem = await Menu.findByIdAndDelete(id);

//     if (!deletedMenuItem) {
//       return res.status(404).json({ message: 'Menu item not found' });
//     }

//     res.json({
//       message: 'Menu item deleted successfully!',
//       menuItem: deletedMenuItem
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Failed to delete menu item' });
//   }
// });

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