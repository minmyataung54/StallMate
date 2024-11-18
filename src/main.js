const express = require('express');
const session = require('express-session');
const passport = require('passport'); 
const MongoStore = require('connect-mongo'); // Import connect-mongo
const connectDB = require('./config/db'); 
const passportConfig = require('./config/passportConfig');
const authRouter = require('./routes/authRouter');
const homeRouter = require('./routes/homeRouter');
const menuRouter = require('./routes/menuRouter');
const orderRouter = require('./routes/orderRouter');
const customerOrder = require('./routes/customerOrderRouter');
const setupProfileRouter = require('./routes/setupProfileRouter');
const isLoggedIn = require('./middleware/authMiddleware');

require('./config/GoogleAuth'); 

const app = express();

// Trust the proxy (important for secure cookies on platforms like Vercel)
app.set('trust proxy', 1);

// Connect to MongoDB (if you're using a database)
connectDB();

// Configure session with connect-mongo
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
        sameSite: 'lax', // Required for cross-site cookies on Vercel
        httpOnly: true // Protect against XSS
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug route
app.get('/debug', (req, res) => {
    res.json({
        sessionId: req.sessionID,
        session: req.session,
        user: req.user,
        isAuthenticated: req.isAuthenticated()
    });
});
// Define routes
app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/dashboard/stallowner', isLoggedIn, setupProfileRouter);
// app.use('/dashboard/stallowner', isLoggedIn, cart);
app.use('/dashboard/stallowner', isLoggedIn, orderRouter);
app.use('/dashboard/stallowner', isLoggedIn, menuRouter);
app.use('/dashboard/customer', isLoggedIn, customerOrder);

// Start the server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

module.exports = app;