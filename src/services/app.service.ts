import 'dotenv/config';
import npid from '../utils/pid.js';

class App {
  constructor() {
    this.start();
  }

  start() {
    try {
      const pid = npid.create(process.env['PIDFILE'] ?? 'autobot.pid');
      pid.removeOnExit();
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }
}

export default App;
