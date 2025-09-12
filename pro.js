// ==================== Theme toggle ====================
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

// ==================== Mobile menu toggle ====================
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  const isVisible = !mobileMenu.classList.contains("hide");
  mobileMenu.classList.toggle("hide");
  menuToggle.setAttribute("aria-expanded", String(!isVisible));
});

// ==================== Contact form ====================
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return;
  }

  // Simple success toast
  const toast = document.createElement("div");
  toast.textContent = "✅ Message sent successfully!";
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#4ade80";
  toast.style.color = "#111";
  toast.style.padding = "10px 16px";
  toast.style.borderRadius = "6px";
  toast.style.fontWeight = "600";
  toast.style.zIndex = "999";
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);

  contactForm.reset();
});

// Extra alert on submit (your old code kept)
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for contacting us! We’ll get back to you soon.");
  this.reset();
});

// ==================== Hazard Report Form ====================
const hazardForm = document.getElementById("hazardForm");
const reportsList = document.getElementById("reportsList");

// Load reports from localStorage on page load
document.addEventListener("DOMContentLoaded", loadReports);

hazardForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("hazardTitle").value.trim();
  const desc = document.getElementById("hazardDescription").value.trim();
  const fileInput = document.getElementById("hazardImage");

  if (!title || !desc) {
    alert("Please fill out the required fields.");
    return;
  }

  // Create a report object
  const report = {
    title,
    desc,
    date: new Date().toLocaleString(),
    image: ""
  };

  // Handle image if uploaded
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      report.image = e.target.result;
      saveReport(report);
      displayReport(report);
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    saveReport(report);
    displayReport(report);
  }

  this.reset();
  alert("✅ Hazard report submitted successfully!");
});

// Save report to localStorage
function saveReport(report) {
  let reports = JSON.parse(localStorage.getItem("hazardReports")) || [];
  reports.push(report);
  localStorage.setItem("hazardReports", JSON.stringify(reports));
}

// Load all reports from localStorage
function loadReports() {
  const reports = JSON.parse(localStorage.getItem("hazardReports")) || [];
  if (reports.length > 0) {
    reportsList.innerHTML = "";
    reports.forEach(displayReport);
  }
}

// Display a single report
function displayReport(report) {
  const reportCard = document.createElement("div");
  reportCard.classList.add("report-card");
  reportCard.style.border = "1px solid #ddd";
  reportCard.style.padding = "1rem";
  reportCard.style.margin = "1rem 0";
  reportCard.style.borderRadius = "8px";
  reportCard.style.background = "var(--secondary)";

  const h4 = document.createElement("h4");
  h4.textContent = report.title;
  reportCard.appendChild(h4);

  const p = document.createElement("p");
  p.textContent = report.desc;
  reportCard.appendChild(p);

  const date = document.createElement("small");
  date.textContent = `Reported on: ${report.date}`;
  reportCard.appendChild(date);

  if (report.image) {
    const img = document.createElement("img");
    img.src = report.image;
    img.alt = "Hazard Image";
    img.style.maxWidth = "200px";
    img.style.display = "block";
    img.style.marginTop = "0.5rem";
    reportCard.appendChild(img);
  }

  if (reportsList.querySelector("p")) {
    reportsList.innerHTML = ""; // remove placeholder text
  }

  reportsList.appendChild(reportCard);
}
