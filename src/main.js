const express = require('express');
const session = require('express-session');
const passport = require('passport'); 
const MongoStore = require('connect-mongo'); 
const connectDB = require('./config/db'); 
const passportConfig = require('./config/passportConfig');
const authRouter = require('./routes/authRouter');
const homeRouter = require('./routes/homeRouter');
const menuRouter = require('./routes/menuRouter');
const orderRouter = require('./routes/orderRouter');
const customerOrder = require('./routes/customerOrderRouter');
const setupProfileRouter = require('./routes/setupProfileRouter');
const favoriteStallRouter = require('./routes/favoriteStallRouter');
const isLoggedIn = require('./middleware/authMiddleware');
const ratingRouter = require('./routes/ratingRouter');
const billingCardRouter = require('./routes/customerPaymentRouter');
const walletHistory = require('./routes/walletHistory');

require('./config/GoogleAuth'); 

const app = express();

app.set('trust proxy', 1);

connectDB();


app.use(session({
    secret: 'StallMate', 
    resave: false, 
    saveUninitialized: false, 
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, 
        collectionName: 'sessions', 
        ttl: 60 * 60 
    }),
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
        secure: false, // Ensure cookies are only sent over HTTPS
        sameSite: 'lax', 
        httpOnly: true // Protect against XSS
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/debug', (req, res) => {
    res.json({
        sessionId: req.sessionID,
        session: req.session,
        user: req.user,
        isAuthenticated: req.isAuthenticated()
    });
});

app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/dashboard/stallowner', isLoggedIn, setupProfileRouter);
// app.use('/dashboard/stallowner', isLoggedIn, cart);
app.use('/dashboard/stallowner', isLoggedIn, orderRouter);
app.use('/dashboard/stallowner', isLoggedIn, menuRouter);
app.use('/dashboard/customer', isLoggedIn, customerOrder);
app.use('/dashboard/customer', isLoggedIn, ratingRouter);
app.use('/dashboard/customer', isLoggedIn, favoriteStallRouter);
app.use('/dashboard/customer', isLoggedIn, billingCardRouter);
app.use('/dashboard/stallowner', isLoggedIn, walletHistory);


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

module.exports = app;