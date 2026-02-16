import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import compression from 'compression';
import { connectDB } from './config/database';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import heroRoutes from './routes/heroRoutes';
import aboutRoutes from './routes/aboutRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import propertyRoutes from './routes/propertyRoutes';

dotenv.config({ debug: false });

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'https://betonkegna.vercel.app',
  'https://www.betonkegna.com',
  'https://betonkegna.com',
  'http://localhost:3000',
  'http://localhost:3300'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Beton Kegna API Server' });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/properties', propertyRoutes);

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
