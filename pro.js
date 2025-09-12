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

// =================== MOBILE MENU ===================
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  const isVisible = !mobileMenu.classList.contains("hide");
  mobileMenu.classList.toggle("hide");
  menuToggle.setAttribute("aria-expanded", String(!isVisible));
});

// =================== CONTACT FORM ===================
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

// =================== HAZARD FORM ===================
const hazardForm = document.getElementById("hazardForm");
const reportsList = document.getElementById("reportsList");

// Load saved reports from localStorage
let hazardReports = JSON.parse(localStorage.getItem("hazardReports")) || [];

// Function to render all reports
function renderReports() {
  reportsList.innerHTML = "";
  if (hazardReports.length === 0) {
    reportsList.innerHTML = "<p>No reports yet.</p>";
    return;
  }

  hazardReports.forEach((report) => {
    const reportCard = document.createElement("div");
    reportCard.classList.add("report-card");
    reportCard.innerHTML = `<h4>${report.title}</h4><p>${report.desc}</p>`;

    if (report.image) {
      const img = document.createElement("img");
      img.src = report.image;
      img.alt = "Hazard Image";
      reportCard.appendChild(img);
    }

    reportsList.appendChild(reportCard);
  });
}

// Render reports on page load
renderReports();

// Handle form submission
hazardForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("hazardTitle").value.trim();
  const desc = document.getElementById("hazardDescription").value.trim();
  const fileInput = document.getElementById("hazardImage");

  if (!title || !desc) {
    alert("Please fill out all fields.");
    return;
  }

  const newReport = { title, desc, image: null };

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      newReport.image = e.target.result;
      hazardReports.push(newReport);
      localStorage.setItem("hazardReports", JSON.stringify(hazardReports));
      renderReports();
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    hazardReports.push(newReport);
    localStorage.setItem("hazardReports", JSON.stringify(hazardReports));
    renderReports();
  }

  this.reset();
  alert("Hazard report submitted successfully!");
});
