const express = require('express');
const Customer = require('../models/customerCredentialSchema');
const router = express.Router();

// ==============================
// Fetch customer profile
router.get('/:_id/profile', async (req, res) => {
    try {
        const customerID = req.params._id;
        console.log('Fetching customer profile for ID:', customerID);
        const customerProfile = await Customer.findById(customerID);
        if (!customerProfile) {
            return res.json({ message: 'No customer profile found' });
        }
        res.status(200).json({
            message: 'Customer profile fetched successfully',
            data:{
                username: customerProfile.username,
                email: customerProfile.email,
            }
        });
    } catch (error) {
        console.log('Error fetching customer profile:', error);
        res.status(500).json('Failed to fetch customer profile');
    }
});


// ==============================
// Update customer profile
router.post('/:_id/profile', async (req, res) => {
    try {
        const customerID = req.params._id;
        const { username } = req.body;

        if (!username){
            return res.status(400).json({ error: 'Username is required' });
        }
        console.log("Updating customer username for customer ID:", customerID);

        const updatedCustomer = await Customer.findByIdAndUpdate(customerID, { username }, { new: true });

        if (!updatedCustomer){
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json({
            message: 'Customer username updated successfully',
            data: {
                username: updatedCustomer.username,
                email: updatedCustomer.email,
            }
        });
    }
    catch(error){
        console.log('Error updating customer username:', error);
        res.status(500).json({ error: 'Failed to update customer username' });
    }
}); 

module.exports = router;