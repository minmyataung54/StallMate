const express = require('express');
const passportConfig = require('./config/passportConfig');
const authRouter = require('./routes/authRouter');
const homeRouter = require('./routes/homeRouter');
require('dotenv').config();
require('./GoogleAuth');

const app = express();

passportConfig(app);
app.use('/',homeRouter);
app.use('/auth',authRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})