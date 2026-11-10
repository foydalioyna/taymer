const $=id=>document.getElementById(id);
// Clock
function updateClock(){const d=new Date();$("clock").textContent=d.toLocaleTimeString("uz-UZ",{hour12:false});$("date").textContent=d.toLocaleDateString("uz-UZ",{weekday:"long",day:"numeric",month:"long",year:"numeric"});}
updateClock();setInterval(updateClock,1000);
// Pomodoro
let minutes=25,left=1500,interval=null;
function showTimer(){$("timer").textContent=String(Math.floor(left/60)).padStart(2,"0")+":"+String(left%60).padStart(2,"0");}
document.querySelectorAll(".mode").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".mode").forEach(x=>x.classList.remove("active"));b.classList.add("active");minutes=Number(b.dataset.min);left=minutes*60;clearInterval(interval);interval=null;showTimer();}));
$("startBtn").onclick=()=>{if(interval)return;interval=setInterval(()=>{if(left>0){left--;showTimer()}else{clearInterval(interval);interval=null;alert("Timer tugadi!");}},1000)};
$("pauseBtn").onclick=()=>{clearInterval(interval);interval=null};
$("resetBtn").onclick=()=>{clearInterval(interval);interval=null;left=minutes*60;showTimer()};showTimer();
// Tasks
let tasks=[];try{tasks=JSON.parse(localStorage.getItem("focus-tasks")||"[]")}catch{}
function saveTasks(){localStorage.setItem("focus-tasks",JSON.stringify(tasks))}
function renderTasks(){$("taskList").innerHTML="";tasks.forEach((t,i)=>{const li=document.createElement("li");if(t.done)li.classList.add("done");const cb=document.createElement("input");cb.type="checkbox";cb.checked=t.done;cb.onchange=()=>{tasks[i].done=cb.checked;saveTasks();renderTasks()};const span=document.createElement("span");span.textContent=t.text;const del=document.createElement("button");del.textContent="×";del.onclick=()=>{tasks.splice(i,1);saveTasks();renderTasks()};li.append(cb,span,del);$("taskList").append(li)});$("emptyState").hidden=tasks.length>0}
$("taskForm").addEventListener("submit",e=>{e.preventDefault();const v=$("taskInput").value.trim();if(!v)return;tasks.push({text:v,done:false});$("taskInput").value="";saveTasks();renderTasks()});renderTasks();
// Notes
$("notes").value=localStorage.getItem("focus-notes")||"";$("notes").addEventListener("input",()=>{localStorage.setItem("focus-notes",$("notes").value);$("saveStatus").textContent="Saved just now"});
// Theme
function setTheme(v){document.body.classList.toggle("light",v==="light");$("themeBtn").textContent=v==="light"?"🌙":"☀️"}
let theme=localStorage.getItem("focus-theme")||"dark";setTheme(theme);$("themeBtn").onclick=()=>{theme=theme==="dark"?"light":"dark";localStorage.setItem("focus-theme",theme);setTheme(theme)};
// Daily quote
const quotes=["Small steps every day lead to big results.","Your future starts with what you do today.","Focus on progress, not perfection.","Dream big. Work consistently. Stay focused.","Every day is a new opportunity."];
$("quote").textContent=quotes[Math.floor(Date.now()/86400000)%quotes.length];
