import { EventEmitter } from "events";

class Counter extends EventEmitter {
  constructor(maxLimit = null, minLimit = null) {
    super(); // so ova nasleduvame se od klasata EventEmitter
    this.count = 0; // go inicijalizirame broenjeto na 0
    this.maxLimit = maxLimit; //setirame max limit opcionalno
    this.minLimit = minLimit; // setirame min limit opcionalno
    this.increasedCount = 0; // kolku pati se zgolemil counterot
    this.decreasedCount = 0; // kolku pati se namalil counterot
    this.resetCount =0;       // resetiranje na counterot na 0
    // console.log("Counter created!");
    // console.log(`Initial count: ${this.count}`);
    // console.log(`Max Limit:${this.maxLimit} `);
    // console.log(`Min Limit ${this.minLimit}`);
  }
  logCurrentCount() {
    if (this.count === 0) {
      this.emit("zero"); // Emitira koga e na 0 counterot
    }
  }

  increase() {
    if (this.maxLimit === null || this.count < this.maxLimit) {
      this.count++; // go zgolemuvame counterot
      this.increasedCount++; // go pratime zgolemuvanjeto
    //   console.log(`Counter increased to: ${this.count}`);
      this.emit("increase", this.count); // emitirame event na zgolemuvanjeto

      if (this.count === 1) {
        this.emit("positive"); // Emitirame event koga brojot e pozitiven
      }

      // Proverka dali counterot go dostignal svojot max limit
      if (this.maxLimit !== null && this.count === this.maxLimit) {
        this.emit("maxReached"); // emitirame event deka broenjeto go dostignal svojot kraj
      }
    }
    this.logCurrentCount();
  }

  decrease() {
    if (this.minLimit === null || this.count > this.minLimit) {
      this.count--; // go namaluvame counterot
      this.decreasedCount++; // Go pratime namaluvanjeto
      // console.log(`Counter decreased to:${this.count}`);
      this.emit("decrease", this.count); // Emituvame emiter event za namaluvanjeto

      if (this.count === -1) {
        this.emit("negative"); // Emitirame event koga ke vleze vo - (NEGATIVNO)
      }

      // Check if the counter reached the min limit
      if (this.minLimit !== null && this.count === this.minLimit) {
        this.emit("minReached"); // Emit a "minReached" event
      }
    }
    this.logCurrentCount();
  }

  reset() {
    this.count = 0; // Go resetirame counterot na 0
    this.resetCount++; // Go pratime resetiranjeto
    this.emit("reset"); // Emitirame event za resetuvanjeto
    this.logCurrentCount();    // metoda koga e na 0 counterot
  }

  

  getStats() {
    const stats = {
      increased: this.increasedCount,
      decreased: this.decreasedCount,
      reset: this.resetCount,
    };
    this.emit("stats", stats); // ovde emitirame stats metodata kolku pati se zgolemil i namalil
  }
}

// Create a counter with maxLimit = 10 and minLimit = -5
const counter = new Counter(10, -5);
console.log("Counter created with maxLimit = 10 and minLimit = -5");

// Event listeners
counter.on("increase", (num) => console.log(`Event: Number increased to ${num}`));
counter.on("decrease", (num) => console.log(`Event: Number decreased to ${num}`));
counter.on("zero", () => console.log("Event: Counter is zero!"));
counter.on("positive", () => console.log("Event: Counter is now positive!"));
counter.on("negative", () => console.log("Event: Counter is now negative!"));
counter.on("maxReached", () => console.log("Event: Maximum limit reached!"));
counter.on("minReached", () => console.log("Event: Minimum limit reached!"));
counter.on("reset", () => console.log("Event: Counter has been reset!"));
counter.on("stats", (stats) =>
  console.log(
    `Event: Stats - Increased: ${stats.increased}, Decreased: ${stats.decreased}, Reset: ${stats.reset}`
  )
);

// Ovde go inicijalizirame counterot da broi do 12 no max limit e 10
console.log("Increasing the counter to the max limit 10 ");
for (let i = 0; i < 12; i++) {
  counter.increase(); 
}

// Ovde inicijalizirame za namaluvanje na counterot do -15 min limitot e -5
console.log("Decreasing the counter to the min limit -5");
for (let i = 0; i < 15; i++) {
  counter.decrease(); 
}

// Resetiranje na  counterot na 0
console.log("Resetting the counter ");
counter.reset(); 

// Informacii za counterot
console.log(" Getting counter stats");
counter.getStats(); 