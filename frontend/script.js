// 🔗 Production backend URL (Render)
const API_BASE = "https://alternate-life-engine.onrender.com";

/**
 * Load countries + careers when page loads
 */
window.onload = async () => {
  const currentCountrySelect = document.getElementById("currentCountry");
  const alternateCountrySelect = document.getElementById("alternateCountry");
  const careerSelect = document.getElementById("career");

  // 🔹 Load countries from backend
  try {
    const res = await fetch(`${API_BASE}/countries`);
    const countries = await res.json();

    countries.forEach(country => {
      currentCountrySelect.add(new Option(country, country));
      alternateCountrySelect.add(new Option(country, country));
    });
  } catch (err) {
    alert("❌ Failed to load countries from server");
    console.error(err);
  }

  // 🔹 Careers (must match backend careers.json keys)
  const careers = [
    "Engineer",
    "Software Developer",
    "Doctor",
    "Business Owner"
  ];

  careers.forEach(career => {
    careerSelect.add(new Option(career, career));
  });
};

/**
 * Simulate alternate life
 */
async function simulate(event) {
  event.preventDefault();

  const loading = document.getElementById("loading");
  const lifeCard = document.getElementById("lifeCard");

  loading.style.display = "block";
  lifeCard.classList.add("hidden");

  // 🔹 Build request payload
  const payload = {
    name: document.getElementById("name").value,
    age: Number(document.getElementById("age").value),
    career: document.getElementById("career").value,
    currentCountry: document.getElementById("currentCountry").value,
    alternateCountry: document.getElementById("alternateCountry").value
  };

  try {
    const response = await fetch(`${API_BASE}/simulate`, {
      method: "POST",                 // ✅ MUST be POST
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    // ❌ Handle API errors safely
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    const data = await response.json();

    loading.style.display = "none";
    lifeCard.classList.remove("hidden");

    // 🔹 Fill UI with response data
    document.getElementById("outName").innerText = data.name;
    document.getElementById("outCurrentCountry").innerText = data.currentCountry;
    document.getElementById("outAlternateCountry").innerText = data.alternateCountry;
    document.getElementById("careerPath").innerText = data.careerPath;

    document.getElementById("incomeBar").style.width = data.income + "%";
    document.getElementById("stressBar").style.width = data.stress + "%";
    document.getElementById("lifeBar").style.width = data.lifeSatisfaction + "%";

    document.getElementById("lifeStory").innerText = data.story;

  } catch (error) {
    loading.style.display = "none";
    alert("❌ Simulation failed. Please try again.");
    console.error("Simulation error:", error);
  }
}
