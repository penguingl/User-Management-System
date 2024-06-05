import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE as string, process.env.DB_USERNAME as string, process.env.DB_PASS as string, {
    host: 'localhost',
    dialect: 'postgres',
});

export default sequelize;