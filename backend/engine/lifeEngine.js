const countries = require("../data/countries.json");
const careers = require("../data/careers.json");
const pickByProbability = require("./probability");
const generateAIStory = require("./aiStoryEngine");

async function simulateLife(input) {
  console.log("RECEIVED INPUT:", input);

  // 🔁 BACKWARD + FORWARD COMPATIBILITY
  const name = input.name || "User";
  const age = input.age || 0;
  const career = input.career;

  // Support BOTH formats
  const currentCountry =
    input.currentCountry || input.country || "Unknown";

  const alternateCountry =
    input.alternateCountry || input.country;

  console.log("Resolved currentCountry:", currentCountry);
  console.log("Resolved alternateCountry:", alternateCountry);
  console.log("Available countries:", Object.keys(countries));

  // 🛑 Validate country
  const countryData = countries[alternateCountry];
  if (!countryData) {
    return {
      name,
      currentCountry,
      alternateCountry,
      careerPath: "Unavailable",
      income: 0,
      stress: 0,
      lifeSatisfaction: 0,
      story: "Selected country data is not available yet."
    };
  }

  // 🛑 Validate career
  const careerPaths = careers[career];
  if (!careerPaths) {
    return {
      name,
      currentCountry,
      alternateCountry,
      careerPath: "Unavailable",
      income: 0,
      stress: 0,
      lifeSatisfaction: 0,
      story: "Selected career data is not available yet."
    };
  }

  // 🎯 Pick career path
  const chosenPath = pickByProbability(careerPaths);

  // 📊 Satisfaction
  const lifeSatisfaction = Math.round(
    (chosenPath.satisfaction +
      countryData.workLifeBalance +
      countryData.jobStability) / 3
  );

  // 🤖 AI Story
  const story = await generateAIStory({
    name,
    age,
    career,
    from: currentCountry,
    to: alternateCountry,
    careerPath: chosenPath.path,
    stress: chosenPath.stress,
    lifeSatisfaction
  });

  return {
    name,
    currentCountry,
    alternateCountry,
    careerPath: chosenPath.path,
    income: chosenPath.income,
    stress: chosenPath.stress,
    lifeSatisfaction,
    story
  };
}

module.exports = simulateLife;
