import "reflect-metadata";
import "module-alias/register";
import "@/di-container";
import express from 'express';
import { json } from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '@/config/swagger';
import routes from '@/routes/index';
import connectToDatabase from '@/config/database';
import { errorHandler } from '@/middlewares/error.middleware';
import appConfig from '@/config/app.config';
import helmet from 'helmet';
import morgan from 'morgan';
import morganMiddleware from '@/middlewares/logger.middleware';
import cors from 'cors';
import { apiLimiter } from "@/middlewares/rateLimit.middleware";

const app = express();
const { app: appSettings, cors: corsSettings, swagger } = appConfig;

// CORS middleware
const corsOptions = {
  origin: corsSettings.origin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Use CORS middleware

// Security middleware
app.use(helmet());

// Logging middleware (morgan integrated with winston Logger)
app.use(morganMiddleware);

// Request logging middleware
if (appSettings.nodeEnv === 'development') {
    app.use(morgan('dev')); // Logs: :method :url :status :response-time ms
} else {
    app.use(morgan('combined')); // More detailed logging for production
}

app.use(apiLimiter);

// Middleware
app.use(json());
if (appSettings.nodeEnv === 'development') {
    app.use(swagger.url, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    
}

// Routes
app.use(routes);

// Default route (optional)
app.get('/api', (req, res) => {
  res.send('Welcome to the Todo API');
});

// Error handling middleware
app.use(errorHandler);

// Database connection
connectToDatabase.authenticate()
  .then(() => {
    app.listen(appSettings.port, () => {
      console.log('✅ Connected to database');
      console.log(`🔰 Server is running on 👉 http://localhost:${appSettings.port}/api`);
      console.log(`🔰 Swagger docs available at 👉 http://localhost:${appSettings.port}${swagger.url}`);
    });
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err);
  });