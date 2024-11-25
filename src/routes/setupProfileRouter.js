const express = require('express');
const StallOwnerProfile = require('../models/stallProfileSchema');
const mongoose = require('mongoose');
const isLoggedIn = require('../middleware/authMiddleware');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Client = require('../config/s3Client');

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
		}
	})
});

router.put('/:seller_id/profile', isLoggedIn, upload.fields([{ name: 'profilePhoto' }, { name: 'restaurantPhoto' }]), async (req, res) => {
	try {
		const { fullName, bio, experienceYears, restaurantName, location, openingHours, contact } = req.body;
		const profilePhotoUrl = req.files['profilePhoto'] ? req.files['profilePhoto'][0].location : null;
		const restaurantPhotoUrl = req.files['restaurantPhoto'] ? req.files['restaurantPhoto'][0].location : null;

		const newProfile = new StallOwnerProfile({
			StallOwnerID: req.params.seller_id,
			owner_profile: {
				full_name: fullName,
				profile_photo: profilePhotoUrl,
				bio: bio,
				experience_years: experienceYears
			},
			restaurant: {
				name: restaurantName,
				photo: restaurantPhotoUrl,
				location: location,
				opening_hours: openingHours,
				contact: contact
			}
		});

		await newProfile.save();
		res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
	} catch (error) {
		console.error('Error creating profile:', error);
		res.status(500).json({ error: 'Failed to create profile' });
	}
});


router.post('/:seller_id/profile', isLoggedIn, upload.fields([{ name: 'profilePhoto' }, { name: 'restaurantPhoto' }]), async (req, res) => {
	try {
		const { fullName, bio, experienceYears, restaurantName, location, openingHours, contact } = req.body;

		const profile = await StallOwnerProfile.findOne({ StallOwnerID: req.params.seller_id });
		if (!profile) {
			return res.status(404).json({ error: 'Profile not found' });
		}

		if (fullName) profile.owner_profile.full_name = fullName;
		if (bio) profile.owner_profile.bio = bio;
		if (experienceYears) profile.owner_profile.experience_years = experienceYears;
		if (restaurantName) profile.restaurant.name = restaurantName;
		if (location) profile.restaurant.location = location;
		if (openingHours) profile.restaurant.opening_hours = openingHours;
		if (contact) profile.restaurant.contact = contact;

		// If new files are uploaded, replace the existing photo URLs
		if (req.files['profilePhoto']) {
			profile.owner_profile.profile_photo = req.files['profilePhoto'][0].location;
		}
		if (req.files['restaurantPhoto']) {
			profile.restaurant.photo = req.files['restaurantPhoto'][0].location;
		}

		await profile.save();
		res.json({ message: 'Profile updated successfully', profile });
	} catch (error) {
		console.error('Error updating profile:', error);
		res.status(500).json({ error: 'Failed to update profile' });
	}
});

router.get('/:seller_id/profile', async (req, res) => {
	try {
		const sellerId = req.params.seller_id;

		if (!sellerId || !/^[0-9a-fA-F]{24}$/.test(sellerId)) {
			return res.status(400).json({
				status: 'not_setup',
				message: 'Please set up your profile first.'
			});
		}
		// console.log('Searching for profile with seller ID:', req.params.seller_id);
		if (!mongoose.Types.ObjectId.isValid(req.params.seller_id)) {
			return res.status(400).json({ error: 'Invalid seller ID format.' });

		}

		const profile = await StallOwnerProfile.findOne({ StallOwnerID: req.params.seller_id });

		// Handle profile not found
		if (!profile) {
			return res.status(404).json({ error: 'Profile not found.' });
		}

		// Return the profile
		res.status(200).json({ profile });
	} catch (error) {
		console.error('Error fetching profile:', error);
		res.status(500).json({ error: 'Failed to fetch profile.' });
	}
});

module.exports = router;