import jwt from 'jsonwebtoken';
import appConfig from '../config/app.config';

const SECRET_KEY = appConfig.jwt.secret;

export const generateToken = (payload: object): string => {
  const sessionId = Math.random().toString(36).substring(2); // Generate unique session ID
  return jwt.sign({ ...payload, sessionId }, SECRET_KEY, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string): object | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (typeof decoded === 'object' && decoded !== null) {
      return decoded;
    }
    return null;
  } catch (error) {
    return null;
  }
};
