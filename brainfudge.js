/**
 * Brain whatever intepreter
 */
const Brain = {
  /**
   * Read whatever the input is given.
   * 
   * @param  {string} input
   * @return {string}       Decoded string
   */
  evaluate(input) {
    this.i     = 0;
    this.tape  = [0];
    this.out   =  [];
    this.stack = [];
    this.table = {};
    this.index = 0;

    this.create_map(input);
    this.read(input);

    return this.out.join("");
  },

  create_map(input) {
    for (let j = 0; j < input.length; j++) {
      if(input[j]=== "[") {
        this.stack.push(j);
      }

      if(input[j]=== "]") {
        const start_index = this.stack.pop();
        this.table[start_index] = j;
        this.table[j] = start_index;
      }
    }
  },

  read(input) {
    while(this.i < input.length) {
      let pointer = input[this.i];

      if(pointer === "+") {
        this.tape[this.index] += 1;
        if(this.tape[this.index] === 256) {
          this.tape[this.index] = 0;
        }
      }

      if(pointer === "-") {
        this.tape[this.index] -= 1;
        if(this.tape[this.index] === -1) {
          this.tape[this.index] = 255;
        }
      }

      if(pointer === ">") {
        this.index += 1;
        if(this.index === this.tape.length) {
          this.tape.push(0)
        }
      }

      if(pointer === "<") {
        this.index -= 1;
      }

      if(pointer === ".") {
        const character = String.fromCharCode(this.tape[this.index]);
        this.out.push(character);
      }

      if(pointer === "]"){
        if(this.tape[this.index] !== 0) {
          this.i = this.table[this.i]
        }
      }

      if(pointer === "[") {
        if(this.tape[this.index] === 0) {
          this.i = this.table[this.i]
        }
      }

      this.i += 1;
    }
  }
}
