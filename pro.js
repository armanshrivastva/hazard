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
//noth
const reports = [];
const feedList = document.getElementById('feedList');
const chatStream = document.getElementById('chatStream');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const submitReport = document.getElementById('submitReport');
const fileInput = document.getElementById('file');
const filePreview = document.getElementById('filePreview');

// sample feed to start
const sampleFeed = [
  {type:'social', text:'Satellite shows oil-like sheen near coast', time:'2h', src:'@marine_watch'},
  {type:'report', text:'Floating debris spotted near Pier 7', time:'1h', src:'local_user'},
  {type:'social', text:'Storm surge advisory issued for west coast', time:'4h', src:'weather_official'},
];

function renderFeed(){
  feedList.innerHTML = '';
  const combined = [...sampleFeed].concat(reports.slice().reverse());
  combined.forEach(item=>{
    const div = document.createElement('div');
    div.className='feed-item';
    div.innerHTML = `
      <div style="width:52px;height:52px;border-radius:10px;background:#f3fbff;display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--accent-2)">${item.type.slice(0,1).toUpperCase()}</div>
      <div style="flex:1">
        <div style="font-weight:600">${item.src || 'unknown'}</div>
        <div style="font-size:13px;color:var(--muted)">${item.text}</div>
        <div class="muted small" style="margin-top:6px">${item.time||'just now'}</div>
      </div>
    `;
    feedList.appendChild(div);
  })
}
renderFeed();

// file preview
fileInput.addEventListener('change', e=>{
  filePreview.innerHTML = '';
  const f = e.target.files[0];
  if(!f) { filePreview.style.display='none'; return }
  const img = document.createElement('img');
  img.src = URL.createObjectURL(f);
  filePreview.appendChild(img);
  const span = document.createElement('div');
  span.innerHTML = `<div style="font-size:12px;color:var(--muted)">${f.name}</div>`;
  filePreview.appendChild(span);
  filePreview.style.display='flex';
})

document.getElementById('clearForm').addEventListener('click', ()=>{
  document.getElementById('hazardType').value='oil';
  document.getElementById('location').value='';
  document.getElementById('description').value='';
  fileInput.value=''; filePreview.style.display='none'
})

submitReport.addEventListener('click', ()=>{
  const t = document.getElementById('hazardType').value;
  const loc = document.getElementById('location').value || 'unknown location';
  const desc = document.getElementById('description').value || '';
  const time = new Date().toLocaleTimeString();
  const report = {type:'report', text:`${t.toUpperCase()}: ${desc}`, time: time, src:'you', loc};
  reports.push(report);
  document.getElementById('statReports').innerText = reports.length + 12;
  renderFeed();
  addChatMessage('user', `I submitted a report: ${t} at ${loc}`)
  localAIReply(`Thanks — I've recorded your ${t} report at ${loc}. Suggested action: mark area as avoid; notify local authority.`)
  document.getElementById('description').value='';
})

// AI responder mock
function localAIReply(userText){
  addChatMessage('bot', '...thinking')
  setTimeout(()=>{
    const reply = cannedResponse(userText);
    const thinking = Array.from(document.querySelectorAll('.msg.bot')).reverse().find(n=>n.innerText.includes('...thinking'));
    if(thinking) thinking.remove();
    addChatMessage('bot', reply)
  }, 700)
}

function cannedResponse(q){
  const qq = q.toLowerCase();
  if(qq.includes('oil') || qq.includes('spill')) return 'Oil spill detected — recommended: avoid contact, contain if trained, notify coast guard.';
  if(qq.includes('latest reports')||qq.includes('near')) return `Showing ${reports.length} new local report(s). Top: ${reports.slice(-1)[0] ? reports.slice(-1)[0].text : 'no user reports yet'}`;
  if(qq.includes('what to do')||qq.includes('safety')) return 'General safety: keep distance, do not touch unknown slicks, use PPE, report to authorities.';
  if(qq.includes('export')||qq.includes('download')) return 'Use the Export CSV button on the right to download a CSV of reports.';
  return "Thanks — I can help summarize reports, draft social posts, or suggest safety actions.";
}

function addChatMessage(who, text){
  const d = document.createElement('div');
  d.className = 'msg ' + (who==='user' ? 'user' : 'bot');
  const meta = document.createElement('div'); meta.className='meta'; meta.innerText = (who==='user' ? 'You' : 'OceanBot') + ' · ' + new Date().toLocaleTimeString();
  const body = document.createElement('div'); body.innerText = text;
  d.appendChild(meta); d.appendChild(body);
  chatStream.appendChild(d);
  chatStream.scrollTop = chatStream.scrollHeight;
}

sendBtn.addEventListener('click', ()=>{
  const v = chatInput.value.trim(); if(!v) return;
  addChatMessage('user', v);
  chatInput.value='';
  localAIReply(v);
})
chatInput.addEventListener('keydown', (e)=>{ if(e.key==="Enter") sendBtn.click(); })

// Export CSV
document.getElementById('exportCSV').addEventListener('click', ()=>{
  if(reports.length===0) return alert('No reports to export');
  const rows = [['type','text','time','src','loc']].concat(reports.map(r=>[r.type,`"${(r.text||'').replace(/"/g,'""')}"`,r.time,r.src,r.loc]));
  const csvContent = rows.map(r=>r.join(',')).join('\n');
  const blob = new Blob([csvContent],{type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='reports.csv'; a.click();
  URL.revokeObjectURL(url);
})

// Connect API demo
document.getElementById('connectAPI').addEventListener('click', ()=>{
  const ep = prompt('Paste your backend endpoint (demo):');
  if(ep) alert('Demo: would connect to ' + ep);
})

// initialize
document.getElementById('statAlerts').innerText = 2;

