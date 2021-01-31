import sleep from './utils/sleep'
import Storage from './utils/storage'

export default class Scheduler {
    constructor(browser) {
        this.browser = browser
        this.runtime = false
        this.storage = new Storage()
    }

    startup() {
        while (1) {
            if (this.runtime === true) {
                //loop
                //run_loop_free_faucet()
                //run_loop_faucet_crypto()
            } else if (this.runtime === false) {
                sleep(2000)
            }
        }
    }
}
