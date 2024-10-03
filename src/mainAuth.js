const express = require('express');
const passportConfig = require('./config/passportConfig');
const authRouter = require('./routes/authRouter');
const homeRouter = require('./routes/homeRouter');
const connectDB = require('./config/db');
// const User = require('./models/userSchema'); 
require('dotenv').config();
require('./config/GoogleAuth');

const app = express();

// app.get('/sample_test', async (req,res) => {
//     try {
//         const newUser = new User({
//             username: "Min Min",
//             googleID: "12345678",
//         });
//         await newUser.save();
//         res.send(`New user created: ${newUser}`);

//     }
//     catch(error){
//         console.error(error);
//         res.status(500).send('Error inserting data');
//     }
// });

connectDB();

passportConfig(app);
app.use('/',homeRouter);
app.use('/auth',authRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})