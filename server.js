import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDatabase from './config/db.js';
import authRoutes from './routes/authRoute.js'
import studentsRoutes from './routes/studentRoute.js';


dotenv.config();
connectDatabase();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to My-Coaching</h1>`)
})

app.use('api/v1/auth', authRoutes);
app.use('/api/v1/students', studentsRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})