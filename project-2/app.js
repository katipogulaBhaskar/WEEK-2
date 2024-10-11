const express = require("express");

const app = express();

const userRoutes = require('./src/routes/userRoutes')

const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use('/api/user', userRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})
