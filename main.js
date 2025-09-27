require('dotenv').config({quiet: true});
require('./src/config/connection')()

const express = require('express');
const cors = require('cors')
const app = express();
const routes = require('./src/routes');

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Cookie'
    ],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/boxonia', routes)
app.use('/', (req, res) => res.send('Hello World!'));

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
