import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDatabase from './config/db.js';

dotenv.config();
connectDatabase();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to My-Coaching</h1>`)
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})