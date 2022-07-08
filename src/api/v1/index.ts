import publicRouter from './public';
import adminRouter from './admin';
import DatabaseFactory from '../../database/databaseFactory';

const express = require('express');
const cors = require('cors');

const databaseMiddleware = (database:any) => (req:any, res:any, next:any) => {
  req.database = database;
  next();
};

export default async function () {
  const app = express();

  let database;

  try {
    database = await new DatabaseFactory().getDatbase();
  } catch (error) {
    throw error;
  }

  app.use(express.json());
  app.use(cors({ 'Access-Control-Allow-Origin': '*' }));

  app.use(databaseMiddleware(database));

  app.use((req:any, res:any, next:any) => {
    res.append('X-Frame-Options', 'SAMEORIGIN');
    res.append('X-XSS-Protection', '1; mode=block');
    res.append('X-Content-Type-Options', 'nosniff');
    res.append('Content-Security-Policy', 'nosniff');
    next();
  });

  app.disable('x-powered-by');

  app.use('/api/v1/public', publicRouter);
  app.use('/api/v1/admin', adminRouter);

  return app;
}
