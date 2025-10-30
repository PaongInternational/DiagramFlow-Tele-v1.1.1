import dotenv from 'dotenv';
dotenv.config();
export const CONFIG = {
  PORT: process.env.PORT || 3000,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '',
  PLUGINS_DIR: './plugins',
  DATA_DIR: './data'
};
