const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Client = require('../config/s3Client');
const { Menu, CATEGORIES } = require('../models/menuSchema');
const StallOwnerProfile = require('../models/StallOwner_profile');
const isLoggedIn = require('../middleware/authMiddleware');
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
            const fileName = `${Date.now()}-${file.originalname}`;
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
            const translatedNameResult = await translate(name);
            const translatedDescriptionResult = await translate(description);

            translatedName = translatedNameResult.translatedText;
            translatedDescription = translatedDescriptionResult.translatedText;

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
        console.error('Error adding menu item:', error.message);
        res.status(500).json({ error: 'Failed to add menu item' });
    }
});

router.get('/:seller_id/menu', isLoggedIn, async (req, res) => {
    try {
        const menu = await Menu.findOne({ seller: req.params.seller_id });
        if (!menu || menu.items.length === 0) {
            return res.json({ message: 'No menu items available.', categories: [] });
        }

        const stallOwnerProfile = await StallOwnerProfile.findOne({ StallOwnerID: req.params.seller_id });
        if (!stallOwnerProfile) {
            return res.status(404).json({ error: 'Stall owner profile not found.' });
        }

        const categorizedMenu = menu.items.reduce((acc, item) => {
            acc[item.category] = acc[item.category] || [];
            acc[item.category].push({
                _id: item._id,
                name: item.name,
                name_en: item.name_en,
                description: item.description,
                description_en: item.description_en,
                price: item.price,
                imageUrl: item.imageUrl,
            });
            return acc;
        }, {});

        res.json({
            restaurant_id: menu.seller,
            restaurant_name: stallOwnerProfile.restaurant.name,
            restaurant_image: stallOwnerProfile.restaurant.photo,
            rating: stallOwnerProfile.restaurant.rating || 0,
            categories: categorizedMenu,
        });
    } catch (err) {
        console.error('Error fetching menu:', err);
        res.status(500).json({ error: 'Failed to fetch menu.' });
    }
});

router.get('/:seller_id/menu/category/:category', isLoggedIn, async (req, res) => {
    try {
        const menu = await Menu.findOne({ seller: req.params.seller_id });
        if (!menu) {
            return res.status(404).json({ error: 'No menu found for this seller.' });
        }

        const category = decodeURIComponent(req.params.category);
        const categoryItems = menu.items.filter((item) => item.category === category);

        if (categoryItems.length === 0) {
            return res.json({ message: `No items found in ${category} category.`, items: [] });
        }

        res.json({
            category,
            items: categoryItems.map((item) => ({
                _id: item._id,
                name: item.name,
                name_en: item.name_en,
                description: item.description,
                description_en: item.description_en,
                price: item.price,
                imageUrl: item.imageUrl,
                category: item.category,
            })),
        });
    } catch (err) {
        console.error('Error fetching menu category:', err);
        res.status(500).json({ error: 'Failed to fetch menu category.' });
    }
});

router.post('/:seller_id/menu/:item_id', isLoggedIn, upload.single('image'), async (req, res) => {
    const { name, description, price, category } = req.body;

    try {
        const menu = await Menu.findOne({ 'items._id': req.params.item_id });
        if (!menu) {
            return res.status(404).json({ error: 'Menu item not found.' });
        }

        const menuItem = menu.items.id(req.params.item_id);
        if (name) menuItem.name = name;
        if (description) menuItem.description = description;
        if (price) menuItem.price = price;
        if (category) menuItem.category = category;
        if (req.file) menuItem.imageUrl = req.file.location;

        if (name) menuItem.name_en = await translate(name).catch(() => name);
        if (description) menuItem.description_en = await translate(description).catch(() => description);

        const updatedMenu = await menu.save();
        res.json({ message: 'Menu item updated successfully!', menu: updatedMenu });
    } catch (err) {
        console.error('Error updating menu item:', err);
        res.status(500).json({ error: 'Failed to update menu item.' });
    }
});

router.delete('/:seller_id/menu/:item_id', isLoggedIn, async (req, res) => {
    try {
        const updatedMenu = await Menu.findOneAndUpdate(
            { seller: req.params.seller_id },
            { $pull: { items: { _id: req.params.item_id } } },
            { new: true }
        );

        if (!updatedMenu) {
            return res.status(404).json({ message: 'Menu item not found.' });
        }

        res.json({ message: 'Menu item deleted successfully!', menu: updatedMenu });
    } catch (err) {
        console.error('Error deleting menu item:', err);
        res.status(500).json({ error: 'Failed to delete menu item.' });
    }
});

module.exports = router;