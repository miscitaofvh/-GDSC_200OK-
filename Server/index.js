require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { connectDB } = require('./utils/db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, sameSite: 'strict' }
}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/user.routes'));

connectDB().then(() => {
    app.listen(3000, () => console.log("Server running at http://localhost:3000"));
});
