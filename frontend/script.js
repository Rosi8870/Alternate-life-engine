window.onload = async () => {
  const currentCountrySelect = document.getElementById("currentCountry");
  const alternateCountrySelect = document.getElementById("alternateCountry");
  const careerSelect = document.getElementById("career");

  // 1️⃣ Fetch countries from backend
  try {
    const response = await fetch("http://localhost:5000/countries");
    const countries = await response.json();

    countries.forEach(country => {
      currentCountrySelect.add(new Option(country, country));
      alternateCountrySelect.add(new Option(country, country));
    });
  } catch (err) {
    alert("Failed to load countries from server");
    console.error(err);
  }

  // 2️⃣ Careers (can also be backend-driven later)
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
 * Simulate life
 */
async function simulate(event) {
  event.preventDefault();

  document.getElementById("loading").style.display = "block";
  document.getElementById("lifeCard").classList.add("hidden");

  const payload = {
    name: document.getElementById("name").value,
    age: Number(document.getElementById("age").value),
    career: document.getElementById("career").value,
    currentCountry: document.getElementById("currentCountry").value,
    alternateCountry: document.getElementById("alternateCountry").value
  };

  try {
    const response = await fetch("http://localhost:5000/simulate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    document.getElementById("loading").style.display = "none";

    if (data.error) {
      alert(data.error);
      return;
    }

    // Show result
    document.getElementById("lifeCard").classList.remove("hidden");

    document.getElementById("outName").innerText = data.name;
    document.getElementById("outCurrentCountry").innerText = data.currentCountry;
    document.getElementById("outAlternateCountry").innerText = data.alternateCountry;
    document.getElementById("careerPath").innerText = data.careerPath;

    document.getElementById("incomeBar").style.width = data.income + "%";
    document.getElementById("stressBar").style.width = data.stress + "%";
    document.getElementById("lifeBar").style.width = data.lifeSatisfaction + "%";

    document.getElementById("lifeStory").innerText = data.story;

  } catch (error) {
    document.getElementById("loading").style.display = "none";
    alert("Server error. Check backend.");
    console.error(error);
  }
}
