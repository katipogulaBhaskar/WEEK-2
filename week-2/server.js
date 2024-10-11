const express = require("express");

const app = express();

const route = require('./src/routes/login')

const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use('/api', route);

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})
