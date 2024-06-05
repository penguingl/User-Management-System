const express = require('express');
const sequelize = require('./db');
const userRoutes = require('./routes/user');
const app = express();

app.use(express.json());
app.use('/users', userRoutes);

const start = async () => {
    try {
        await sequelize.sync();
        app.listen(3000, () => console.log('User service listening on port 3000'));
    } catch (e) {
        console.error('Unable to connect to the database', e);
    }
};

start();