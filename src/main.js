const express = require('express');
const session = require('express-session');
const passportConfig = require('./config/passportConfig');
const authRouter = require('./routes/authRouter');
const homeRouter = require('./routes/homeRouter');
const menuRouter = require('./routes/menuRouter');
const connectDB = require('./config/db');
const isLoggedIn = require('./middleware/authMiddleWare');
const setupProfileRouter = require('./routes/setupProfileRouter');
require('dotenv').config();
require('./config/GoogleAuth');

const app = express();

app.set('trust proxy', 1);

connectDB();

app.use(session({
    secret: 'sessionStallMate',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
        secure: true,
        sameSite: 'none'
    }
}));

passportConfig(app);

app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/dashboard/stallowner', isLoggedIn, setupProfileRouter);
app.use('/dashboard/stallowner', isLoggedIn, menuRouter);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
module.exports = app