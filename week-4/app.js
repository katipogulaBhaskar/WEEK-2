// week-4/ task file

require('dotenv').config();

const express = require('express');
const { sequelize } = require('./src/models/index');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api', userRoutes);


sequelize.sync().then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch(error => {
    console.log(`Unable to connect to the database:`, error);
})

