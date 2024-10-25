require('dotenv').config();

const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
        logging: false,
    }
);


sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    })


    module.exports = sequelize;