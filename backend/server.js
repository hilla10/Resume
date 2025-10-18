import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import connectDB from './configs/db.js';
import userRouter from './routes/userRouter.js';
import resumeRouter from './routes/resumeRouter.js';
import aiRouter from './routes/aiRouter.js';

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Database Connection
await connectDB();

app.get('/', (req, res) => {
  res.send('API Working Successfully.');
});
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
