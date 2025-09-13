// Sample trending hashtags
const trendingTags = [
  "#OilSpill",
  "#PlasticPollution",
  "#CycloneAlert",
  "#SaveTheOcean",
  "#TsunamiWarning",
  "#ClimateCrisis",
  "#FloodAlert",
  "#Heatwave",
];

// Insert hashtags dynamically
const tagsContainer = document.getElementById("tags-container");

function loadHashtags() {
  tagsContainer.innerHTML = "";
  trendingTags.forEach(tag => {
    const card = document.createElement("div");
    card.className = "tag-card";
    card.textContent = tag;
    tagsContainer.appendChild(card);
  });
}

// Chart.js setup
function loadChart() {
  const ctx = document.getElementById("trendChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Hashtag Mentions",
        data: [12, 19, 14, 25, 30, 22, 28],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: getComputedStyle(document.body).getPropertyValue("--text") }
        }
      },
      scales: {
        x: { ticks: { color: getComputedStyle(document.body).getPropertyValue("--text") } },
        y: { ticks: { color: getComputedStyle(document.body).getPropertyValue("--text") } }
      }
    }
  });
}

// =================== THEME TOGGLE ===================
const themeBtn = document.querySelector(".theme-toggle");
const body = document.body;

// Load theme from localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeBtn.setAttribute("aria-pressed", "true");
}

// Toggle theme on click
themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeBtn.setAttribute("aria-pressed", isDark.toString());
});
// Initialize page
window.onload = () => {
  loadHashtags();
  loadChart();
};

