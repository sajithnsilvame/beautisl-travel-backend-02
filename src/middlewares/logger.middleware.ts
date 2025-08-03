import morgan from 'morgan';
import Logger from '@/utils/logger';
import appConfig from '@/config/app.config';

const stream = {
  write: (message: string) => Logger.http(message.trim()),
};

const skip = () => {
  return appConfig.app.nodeEnv !== 'development';
};

const morganMiddleware = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

export default morganMiddleware;