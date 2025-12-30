function generateStory(life) {
  let tone = "balanced";

  if (life.lifeSatisfaction >= 80) tone = "fulfilling";
  else if (life.lifeSatisfaction <= 50) tone = "challenging";

  return `In this alternate life, you chose "${life.decision}".
You live in ${life.country} and work as a ${life.careerPath}.
Your life feels ${tone}. 
You earn reasonably well, manage stress at ${life.stress}%, 
and your overall life satisfaction is ${life.lifeSatisfaction}%.
Some days are hard, but this path shaped who you became.`;
}

module.exports = generateStory;
