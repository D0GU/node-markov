/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");

    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    for (let i = 0; i < this.words.length; i++) {
      let currWord = this.words[i];
      let nextWord = this.words[i + 1] || null;

      console.log(this.words[i]);
      if (chains.has(currWord)) {
        chains.get(currWord).push(nextWord);
      } else {
        chains.set(currWord, [nextWord]);
      }
    }
    console.log(chains);
    this.chains = chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = keys[Math.floor(Math.random() * keys.length)];
    let out = [];

    while (out.length < numWords && key !== null) {
      out.push(key);
      key =
        this.chains.get(key)[
          Math.floor(Math.random() * this.chains.get(key).length)
        ];
    }

    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
