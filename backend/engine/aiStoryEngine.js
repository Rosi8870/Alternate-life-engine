const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateAIStory(life) {
  const prompt = `
You are a thoughtful life reflection assistant.

Create a short, emotional narrative (5–6 lines) for this alternate life:

Decision: ${life.decision}
Country: ${life.country}
Career: ${life.careerPath}
Stress: ${life.stress}%
Life Satisfaction: ${life.lifeSatisfaction}%

Tone: human, reflective, calm. Not motivational.
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You write reflective life stories." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7
  });

  return response.choices[0].message.content.trim();
}

module.exports = generateAIStory;
