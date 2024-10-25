// week-4/project-4 file
require('dotenv').config();

const express = require('express');
//const { sequelize } = require('./src/models');
const sequelize = require('./src/config/Config'); 
const user_Routes = require('./src/routes/user_Routes');

const app = express();
app.use(express.json());

app.use('/api', user_Routes);


sequelize.sync().then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch(error => {
    console.log(`Unable to connect to the database:`, error);
})

