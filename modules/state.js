class State {
    constructor() {
        this.flags = 0;
        this.isTrigger = false;
        this.s0 = new Array (120);
        for (let i = 1; i < this.s0.length; i++){
            this.s0[i] = 0;
        }
    }
        
  }

  module.exports = State;