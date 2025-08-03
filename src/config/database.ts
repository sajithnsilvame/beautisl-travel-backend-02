import { Sequelize } from 'sequelize';
import appConfig from '@/config/app.config';

const { database, app } = appConfig;

const sequelize = new Sequelize(
  database.name, 
  database.user, 
  database.password, 
  {
    host: database.host,
    port: database.port,
    dialect: database.dialect,
    // logging: app.nodeEnv === 'development' ? false : false,
    pool: database.pool,
    retry: database.retry,
    dialectOptions: database.dialectOptions
  }
);

export default sequelize;
