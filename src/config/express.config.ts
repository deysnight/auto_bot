import express, { Application } from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server } from 'socket.io';

export default function (expressApp: Application) {
  const __dirname = path.resolve();
  const frontFolder = path.join(__dirname, 'build/front');

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

    res.header('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200).end();
    }

    return next();
  });

  const server = createServer(expressApp);
  const io = new Server(server);
  expressApp.set('io', io);

  return server;
}
