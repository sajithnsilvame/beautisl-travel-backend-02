import dotenv from 'dotenv';

dotenv.config();

interface DatabasePoolConfig {
  max: number;
  min: number;
  acquire: number;
  idle: number;
  evict: number;
}

interface DatabaseConfig {
  name: string;
  user: string;
  password: string;
  host: string;
  port: number;
  dialect: 'mysql';
  pool: DatabasePoolConfig;
  retry: {
    max: number;
  };
  dialectOptions: {
    connectTimeout: number;
  };
}

interface AppConfig {
  app: {
    name: string;
    version: string;
    port: number;
    nodeEnv: string;
  };
  database: DatabaseConfig;
  jwt: {
    secret: string;
  };
  swagger: {
    url: string;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
  cors: {
    origin: string;
  };
}

const appConfig: AppConfig = {
  app: {
    name: process.env.APP_NAME || 'Backend API Server',
    version: process.env.APP_VERSION || '1.0.0',
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  database: {
    name: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    pool: {
      max: Number(process.env.DB_POOL_MAX) || 10,
      min: Number(process.env.DB_POOL_MIN) || 2,
      acquire: Number(process.env.DB_POOL_ACQUIRE) || 60000,
      idle: Number(process.env.DB_POOL_IDLE) || 30000,
      evict: Number(process.env.DB_POOL_EVICT) || 1000,
    },
    retry: {
      max: 3,
    },
    dialectOptions: {
      connectTimeout: 30000,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
  },
  swagger: {
    url: process.env.SWAGGER_URL || '/api-docs',
  },
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
    max: Number(process.env.RATE_LIMIT_MAX) || 100,
  },
  cors: {
    origin: process.env.CLIENT_ORIGIN || '*',
  },
};

export default appConfig;