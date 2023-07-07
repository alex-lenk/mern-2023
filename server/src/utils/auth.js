import jwt from 'jsonwebtoken';
import config from '../config.js';

function generateAccessToken(userId) {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: config.jwtAccessExpiresIn });
}

function generateRefreshToken(userId) {
  return jwt.sign({ userId }, config.jwtRefreshSecret, { expiresIn: config.jwtRefreshExpiresIn });
}

function verifyToken(token, isRefresh = false) {
  try {
    return jwt.verify(token, isRefresh ? config.jwtRefreshSecret : config.jwtSecret);
  } catch (err) {
    return null;
  }
}

export {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
