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

// Chatbot toggle
const chatbotWidget = document.getElementById("chatbot-widget");
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotInput = document.getElementById("chatbot-text");
const chatbotSend = document.getElementById("chatbot-send");

chatbotToggle.addEventListener("click", () => {
  chatbotWidget.style.display = "flex";
  chatbotToggle.style.display = "none";
});

chatbotClose.addEventListener("click", () => {
  chatbotWidget.style.display = "none";
  chatbotToggle.style.display = "block";
});

// Add message to chat window
function addChatMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender);
  msg.innerText = text;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Local fallback reply
function localAIReply(text) {
  if (text.toLowerCase().includes("oil")) {
    return "Oil spills can spread rapidly. Please report location details for responders.";
  } else if (text.toLowerCase().includes("plastic")) {
    return "Plastic waste harms marine life. Consider tagging the hazard on the map.";
  }
  return "I'm OceanBot 🌊. I can help with hazard reports, analytics, or ocean safety info.";
}

// Send user message
function sendMessage() {
  const text = chatbotInput.value.trim();
  if (!text) return;
  addChatMessage("user", text);
  chatbotInput.value = "";

  // 🚀 Swap this with OpenAI fetch if backend is ready
  setTimeout(() => {
    addChatMessage("bot", localAIReply(text));
  }, 600);
}

chatbotSend.addEventListener("click", sendMessage);
chatbotInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
// Chatbot toggle
const chatbotWidget = document.getElementById("chatbot-widget");
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotInput = document.getElementById("chatbot-text");
const chatbotSend = document.getElementById("chatbot-send");

chatbotToggle.addEventListener("click", () => {
  chatbotWidget.style.display = "flex";
  chatbotToggle.style.display = "none";
});

chatbotClose.addEventListener("click", () => {
  chatbotWidget.style.display = "none";
  chatbotToggle.style.display = "block";
});

// Add message to chat window
function addChatMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender);
  msg.innerText = text;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Local fallback reply
function localAIReply(text) {
  if (text.toLowerCase().includes("oil")) {
    return "Oil spills can spread rapidly. Please report location details for responders.";
  } else if (text.toLowerCase().includes("plastic")) {
    return "Plastic waste harms marine life. Consider tagging the hazard on the map.";
  }
  return "I'm OceanBot 🌊. I can help with hazard reports, analytics, or ocean safety info.";
}

// Send user message
function sendMessage() {
  const text = chatbotInput.value.trim();
  if (!text) return;
  addChatMessage("user", text);
  chatbotInput.value = "";

  // 🚀 Swap this with OpenAI fetch if backend is ready
  setTimeout(() => {
    addChatMessage("bot", localAIReply(text));
  }, 600);
}

chatbotSend.addEventListener("click", sendMessage);
chatbotInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
