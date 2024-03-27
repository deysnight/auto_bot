import path from 'path';
import dotenv from 'dotenv';

export default function initEnv() {
  const localEnv = process.env['NODE_ENV'];
  let envPath;

  switch (localEnv) {
    case 'production':
      envPath = '.env.production';
      break;
    default:
      envPath = '.env.development';
  }

  try {
    const __dirname = path.resolve();
    dotenv.config({
      path: path.join(__dirname, envPath),
    });
  } catch {
    console.log('Load default ENV');
  }
}
