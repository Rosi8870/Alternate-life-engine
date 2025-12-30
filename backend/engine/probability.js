function pickByProbability(options) {
  const random = Math.random() * 100;
  let cumulative = 0;

  for (let option of options) {
    cumulative += option.probability;
    if (random <= cumulative) {
      return option;
    }
  }

  return options[0];
}

module.exports = pickByProbability;
