import express from 'express';
import sequelize from './db';
import historyRoutes from './routes/history';
import './consumer';

const app = express();

app.use(express.json());
app.use('/history', historyRoutes);

const start = async () => {
    try {
        await sequelize.sync();
        app.listen(3001, () => console.log('History service listening on port 3001'));
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
};

start();