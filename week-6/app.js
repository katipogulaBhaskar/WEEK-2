import express from 'express';
import dotenv from 'dotenv';
import cors from  'cors';
import router from './src/router/admin.routes.js';
import connectToDB from './src/config/DBconnection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());
app.use('/api/admin', router);

app.listen(PORT, () => {
    connectToDB();
    console.log(`Server is running on port ${PORT}`);
})

