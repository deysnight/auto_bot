import express, { Application } from 'express';
import path from 'path';

export default function (expressApp: Application) {
  const __dirname = path.resolve();
  const frontFolder = path.join(__dirname, 'src/front');

  expressApp.use(express.json());
  expressApp.use(express.urlencoded());
  expressApp.use('/', express.static(frontFolder));

  expressApp.use('*', (req, res, next) => {
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, GET, POST, DELETE, OPTIONS'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, X-Correlation-ID, Content-Type, Accept'
    );

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200).end();
    }

    return next();
  });

  return expressApp;
}
