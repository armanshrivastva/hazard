// Theme toggle
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

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  const isVisible = !mobileMenu.classList.contains("hide");
  mobileMenu.classList.toggle("hide");
  menuToggle.setAttribute("aria-expanded", String(!isVisible));
});

// Contact form
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
// script.js
document.getElementById("contactForm").addEventListener("submit", function(e) {
e.preventDefault();
alert("Thank you for contacting us! We’ll get back to you soon.");
this.reset();
});


const hazardForm = document.getElementById("hazardForm");
const reportsList = document.getElementById("reportsList");


hazardForm.addEventListener("submit", function(e) {
e.preventDefault();
const title = document.getElementById("hazardTitle").value;
const desc = document.getElementById("hazardDescription").value;
const fileInput = document.getElementById("hazardImage");


const reportCard = document.createElement("div");
reportCard.classList.add("report-card");
reportCard.innerHTML = `<h4>${title}</h4><p>${desc}</p>`;


if (fileInput.files && fileInput.files[0]) {
const reader = new FileReader();
reader.onload = function(e) {
const img = document.createElement("img");
img.src = e.target.result;
img.alt = "Hazard Image";
reportCard.appendChild(img);
}
reader.readAsDataURL(fileInput.files[0]);
}


if (reportsList.querySelector("p")) {
reportsList.innerHTML = ""; // remove 'no reports' text
}


reportsList.appendChild(reportCard);


this.reset();
alert("Hazard report submitted successfully!");
});