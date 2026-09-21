const STUDENTS = [
  "AHLIF ANNISA","ARINA MAZIYA","AULA SHABIRINA","BAITI CAHAYA ANDINI","CANDRA NILA OKTAVIANA","DAFFI AL HAMMAMI","DANIKA FARHANI","DONISAH","FARADILA MAULA","FARHAN AZHAR","HAFIZH AKMAL RIYADI","HANA MAHEERA MUTHIANIQA","LUTFIANAZWA RAMADHAN N","M. FAHRI JAVIER SATYA PRADITA","M. RAHMATUL ARIFIN","MISHEL RAMADHANI","MUHAMMAD RIFQI FAIZAL","MUHAMMAD RIZKI AKBAR","MUSYAFFA HANIF SUNNI","NADYA SHAFWAH","NASYA ANAYA PUTRI","NAWAL FAUZIATUL AWLIYA","NAYRA CELLIA ANKADIRA","NAZLIZA ARLIANA PUTRI","NUR NADYA ULYA","NURLIA AZIZAH","NURUL QONITA ASRIYA","RAFA ADITYA","RIFFI GUNAWAN","SELINAFYA ELDIANA","SITI NUR HIKMAH","SYIFA FADILLAH MURTONO","TALITA YUMNA AL - MUDZAKIRAH","TIARA ZENITA SARI","TITIN SOFIYATUN NISA","WAFIYATU SYAFA MAULIDA"
];

const SCHEDULE = {
  A:{
    Senin:["Matematika","PAI BP","Bahasa Inggris"],
    Selasa:["Bahasa Indonesia","Bahasa Jawa","Sejarah","PP"],
    Rabu:["Sejarah","PAI BP","Bahasa Jawa","Bahasa Inggris"],
    Kamis:["Matematika","Bahasa Indonesia","KIK"],
    Jumat:["KIK"]
  },
  B:{
    Senin:["Kejuruan"],
    Selasa:["Kejuruan","Mapil","PJOK"],
    Rabu:["Kejuruan"],
    Kamis:["Kejuruan Infra"],
    Jumat:["Bahasa Jepang"]
  }
};

const DUTY = {
  Senin:["DAFFI AL HAMMAMI","FARHAN AZHAR","AHLIF ANNISA","ARINA MAZIYA","AULA SHABIRINA","BAITI CAHAYA ANDINI","CANDRA NILA OKTAVIANA"],
  Selasa:["HAFIZH AKMAL RIYADI","M. FAHRI JAVIER SATYA PRADITA","DANIKA FARHANI","DONISAH","FARADILA MAULA","HANA MAHEERA MUTHIANIQA","LUTFIANAZWA RAMADHAN N"],
  Rabu:["M. RAHMATUL ARIFIN","MISHEL RAMADHANI","NADYA SHAFWAH","NASYA ANAYA PUTRI","NAWAL FAUZIATUL AWLIYA","NAYRA CELLIA ANKADIRA","NAZLIZA ARLIANA PUTRI"],
  Kamis:["MUHAMMAD RIFQI FAIZAL","MUHAMMAD RIZKI AKBAR","NUR NADYA ULYA","NURLIA AZIZAH","NURUL QONITA ASRIYA","RIFFI GUNAWAN","SELINAFYA ELDIANA"],
  Jumat:["MUSYAFFA HANIF SUNNI","RAFA ADITYA","SITI NUR HIKMAH","SYIFA FADILLAH MURTONO","TALITA YUMNA AL - MUDZAKIRAH","TIARA ZENITA SARI","TITIN SOFIYATUN NISA","WAFIYATU SYAFA MAULIDA"]
};

const DAYS = ["Senin","Selasa","Rabu","Kamis","Jumat"];

const QUOTES = [
  '"Rapi di sistem, kompak di lapangan, kuat di jaringan."',
  '"Satu kelas bukan cuma kumpulan nama—kita satu node."',
  '"Belajar bareng, debug bareng, naik level bareng."',
  '"Disiplin itu konfigurasi pertama sebelum jaringan berjalan."',
  '"XI TJKT 2: terkoneksi, terarah, siap bergerak."'
];

const state = {
  view: localStorage.getItem("tjkt2-view") || "dashboard1",
  block: localStorage.getItem("tjkt2-block") || "A",
  day: localStorage.getItem("tjkt2-day") || "Senin",
  rotationWeek: Number(localStorage.getItem("tjkt2-rotation-week") || 1),
  checkedDuty: loadJSON("tjkt2-duty-checks", {}),
  notes: localStorage.getItem("tjkt2-notes") || ""
};

const $ = id => document.getElementById(id);

function loadJSON(key,fallback){
  try{
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  }catch{
    return fallback;
  }
}

function saveState(){
  localStorage.setItem("tjkt2-view",state.view);
  localStorage.setItem("tjkt2-block",state.block);
  localStorage.setItem("tjkt2-day",state.day);
  localStorage.setItem("tjkt2-rotation-week",String(state.rotationWeek));
  localStorage.setItem("tjkt2-duty-checks",JSON.stringify(state.checkedDuty));
}

function escapeHTML(value){
  return String(value).replace(/[&<>'"]/g,char=>({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    "'":"&#39;",
    '"':"&quot;"
  }[char]));
}

function studentNumber(name){
  const index = STUDENTS.indexOf(name);
  return index >= 0 ? String(index + 1).padStart(2,"0") : "--";
}

function showToast(message){
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(()=>el.classList.remove("show"),2200);
}

const PAGE_TITLES = {
  dashboard1:"Class Hub",
  dashboard2:"Jadwal & Piket",
  dashboard3:"Apel & Baris",
  dashboard4:"TJKT Tools"
};

function switchView(view){
  if(!PAGE_TITLES[view]) return;

  state.view = view;

  document.querySelectorAll(".view").forEach(el=>{
    el.classList.toggle("active",el.id===view);
  });

  document.querySelectorAll(".nav-button").forEach(el=>{
    el.classList.toggle("active",el.dataset.view===view);
  });

  $("pageTitle").textContent = PAGE_TITLES[view];
  saveState();
  window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll(".nav-button").forEach(button=>{
  button.addEventListener("click",()=>switchView(button.dataset.view));
});

document.querySelectorAll("[data-jump]").forEach(button=>{
  button.addEventListener("click",()=>switchView(button.dataset.jump));
});

function renderStats(){
  const uniqueDuty = new Set(Object.values(DUTY).flat()).size;

  $("classStats").innerHTML = [
    ["36","TOTAL SISWA","Roster aktif"],
    ["05","HARI","Senin — Jumat"],
    ["18","PAIR APEL","Rotasi otomatis"],
    [String(uniqueDuty),"PETUGAS PIKET","Coverage mingguan"]
  ].map(([value,label,note])=>`
    <article class="stat-card">
      <span class="stat-label">${label}</span>
      <strong class="stat-value">${value}</strong>
      <small class="stat-note">${note}</small>
    </article>
  `).join("");

  $("studentCountLabel").textContent = `${STUDENTS.length} TERDAFTAR`;
}

function renderStudentGrid(filter=""){
  const needle = filter.trim().toLowerCase();

  const filtered = STUDENTS
    .map((name,index)=>({name,index}))
    .filter(({name})=>name.toLowerCase().includes(needle));

  $("studentGrid").innerHTML =
    filtered.map(({name,index})=>`
      <article class="student-card">
        <span class="student-id">NODE ${String(index+1).padStart(2,"0")}</span>
        <strong>${escapeHTML(name)}</strong>
        <small>XI TJKT 2</small>
      </article>
    `).join("") ||
    `<div class="empty-state">Nama tidak ditemukan.</div>`;

  $("studentCountLabel").textContent = `${filtered.length} DITAMPILKAN`;
}

function renderDutyDistribution(){
  const max = Math.max(...Object.values(DUTY).map(list=>list.length));

  $("dutyDistribution").innerHTML = DAYS.map(day=>{
    const count = DUTY[day].length;

    return `
      <div class="bar-item">
        <span class="bar-day">${day}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width:${Math.round((count/max)*100)}%"></div>
        </div>
        <strong>${count}</strong>
      </div>
    `;
  }).join("");
}

function randomStudent(targetId){
  const target = $(targetId);
  const winner = STUDENTS[Math.floor(Math.random()*STUDENTS.length)];

  target.innerHTML = `
    <span class="focus-label">RANDOMIZED · ${studentNumber(winner)}</span>
    <strong>${escapeHTML(winner)}</strong>
    <small>XI TJKT 2 • node ${studentNumber(winner)}</small>
  `;

  showToast(`${winner} terpilih`);
}

function initHub(){
  renderStats();
  renderStudentGrid();
  renderDutyDistribution();

  $("newQuote").addEventListener("click",()=>{
    const quote = $("classQuote");
    const current = quote.textContent;
    let next = QUOTES[Math.floor(Math.random()*QUOTES.length)];

    if(next===current){
      next = QUOTES[(QUOTES.indexOf(current)+1)%QUOTES.length];
    }

    quote.textContent = next;
  });

  $("studentSearch").addEventListener("input",event=>{
    renderStudentGrid(event.target.value);
  });

  $("randomStudentTop").addEventListener("click",()=>{
    randomStudent("focusStudent");
  });
}

function renderDaySwitcher(){
  $("daySwitcher").innerHTML = DAYS.map(day=>`
    <button class="${day===state.day?"active":""}" data-day="${day}">
      ${day}
    </button>
  `).join("");

  $("daySwitcher").querySelectorAll("button").forEach(button=>{
    button.addEventListener("click",()=>{
      state.day = button.dataset.day;
      saveState();
      renderSchedule();
    });
  });
}

function renderSchedule(){
  document.querySelectorAll("#blockSwitcher button").forEach(button=>{
    button.classList.toggle("active",button.dataset.block===state.block);
  });

  renderDaySwitcher();

  const subjects = SCHEDULE[state.block][state.day];

  $("scheduleEyebrow").textContent =
    `BLOCK ${state.block} · ${state.day.toUpperCase()}`;

  $("subjectTotal").textContent = `${subjects.length} MAPEL`;

  $("scheduleList").innerHTML = subjects.map((subject,index)=>`
    <div class="schedule-item">
      <span class="schedule-index">${String(index+1).padStart(2,"0")}</span>
      <strong>${escapeHTML(subject)}</strong>
      <small>BLOCK ${state.block}</small>
    </div>
  `).join("");

  const list = DUTY[state.day];

  $("dutyTitle").textContent = `Piket ${state.day}`;
  $("dutyTotal").textContent = `${list.length} ORANG`;

  $("dutyList").innerHTML = list.map((name,index)=>{
    const key = `${state.day}-${name}`;
    const checked = Boolean(state.checkedDuty[key]);

    return `
      <div class="duty-item ${checked?"checked":""}">
        <input type="checkbox" id="duty-${index}" data-duty-key="${escapeHTML(key)}" ${checked?"checked":""}>
        <label for="duty-${index}">${escapeHTML(name)}</label>
      </div>
    `;
  }).join("");

  $("dutyList").querySelectorAll("input").forEach(input=>{
    input.addEventListener("change",()=>{
      state.checkedDuty[input.dataset.dutyKey] = input.checked;
      saveState();
      renderDutyProgress();
    });
  });

  renderDutyProgress();
}

function renderDutyProgress(){
  const list = DUTY[state.day];
  const done = list.filter(name=>state.checkedDuty[`${state.day}-${name}`]).length;
  const percent = list.length ? Math.round((done/list.length)*100) : 0;

  $("dutyDone").textContent = `${done} / ${list.length}`;
  $("dutyProgress").style.width = `${percent}%`;
}

function initSchedule(){
  document.querySelectorAll("#blockSwitcher button").forEach(button=>{
    button.addEventListener("click",()=>{
      state.block = button.dataset.block;
      saveState();
      renderSchedule();
    });
  });

  renderSchedule();
}

function getRotationPair(week){
  const weekIndex = ((week-1)%18+18)%18;
  const firstIndex = weekIndex*2;

  return {
    today:STUDENTS[firstIndex],
    next:STUDENTS[(firstIndex+1)%STUDENTS.length]
  };
}

function renderRotation(){
  state.rotationWeek = Math.min(18,Math.max(1,Number(state.rotationWeek)||1));

  const pair = getRotationPair(state.rotationWeek);

  $("rotationWeek").value = state.rotationWeek;
  $("rotationWeekLabel").textContent =
    String(state.rotationWeek).padStart(2,"0");

  $("todayNumber").textContent = studentNumber(pair.today);
  $("todayName").textContent = pair.today;
  $("todayMeta").textContent = `Nomor siswa ${studentNumber(pair.today)}`;

  $("nextNumber").textContent = studentNumber(pair.next);
  $("nextName").textContent = pair.next;
  $("nextMeta").textContent = `Nomor siswa ${studentNumber(pair.next)}`;

  $("rotationStatus").textContent =
    `Minggu ${state.rotationWeek}: ${pair.today} → ${pair.next}`;

  $("pairRoadmap").innerHTML = Array.from({length:18},(_,i)=>{
    const a = STUDENTS[i*2];
    const b = STUDENTS[i*2+1];

    return `
      <div class="pair-chip ${i===state.rotationWeek-1?"active":""}">
        <b>MINGGU ${String(i+1).padStart(2,"0")}</b>
        <span>
          ${studentNumber(a)} · ${escapeHTML(a)}<br>
          ${studentNumber(b)} · ${escapeHTML(b)}
        </span>
      </div>
    `;
  }).join("");

  saveState();
}

function stepRotation(delta){
  state.rotationWeek += delta;

  if(state.rotationWeek>18) state.rotationWeek = 1;
  if(state.rotationWeek<1) state.rotationWeek = 18;

  renderRotation();
  showToast(`Masuk Minggu ${state.rotationWeek}`);
}

function initRotation(){
  $("rotationPrev").addEventListener("click",()=>stepRotation(-1));
  $("rotationNext").addEventListener("click",()=>stepRotation(1));

  $("nextRotationHero").addEventListener("click",()=>stepRotation(1));

  $("resetRotationHero").addEventListener("click",()=>{
    state.rotationWeek = 1;
    renderRotation();
    showToast("Rotasi kembali ke Minggu 1");
  });

  $("resetRotation").addEventListener("click",()=>{
    state.rotationWeek = 1;
    renderRotation();
    showToast("Rotasi kembali ke Minggu 1");
  });

  $("generateRotation").addEventListener("click",()=>{
    state.rotationWeek =
      Math.min(18,Math.max(1,Number($("rotationWeek").value)||1));

    renderRotation();
    showToast(`Minggu ${state.rotationWeek} dimuat`);
  });

  $("rotationWeek").addEventListener("change",()=>{
    state.rotationWeek =
      Math.min(18,Math.max(1,Number($("rotationWeek").value)||1));

    renderRotation();
  });

  renderRotation();
}

function validIPv4(input){
  const parts = String(input).trim().split(".");

  if(parts.length!==4 || parts.some(part=>!/^\d+$/.test(part))){
    return null;
  }

  const nums = parts.map(Number);

  if(nums.some(n=>n<0 || n>255)){
    return null;
  }

  return nums;
}

function classifyIPv4(nums){
  if(
    nums[0]===10 ||
    (nums[0]===172 && nums[1]>=16 && nums[1]<=31) ||
    (nums[0]===192 && nums[1]===168)
  ){
    return "PRIVATE";
  }

  if(nums[0]===127) return "LOOPBACK";
  if(nums[0]>=224 && nums[0]<=239) return "MULTICAST";
  if(nums[0]>=240) return "RESERVED";
  if(nums[0]===169 && nums[1]===254) return "LINK-LOCAL";

  return "PUBLIC / GENERAL";
}

function className(nums){
  const first = nums[0];

  if(first<=126) return "A";
  if(first<=191) return "B";
  if(first<=223) return "C";
  if(first<=239) return "D";

  return "E";
}

function checkIP(){
  const nums = validIPv4($("ipInput").value);

  if(!nums){
    $("ipResult").innerHTML = `
      <div><span>STATUS</span><strong>INVALID</strong></div>
      <div><span>TYPE</span><strong>CHECK INPUT</strong></div>
      <div><span>OCTETS</span><strong>—</strong></div>
      <div><span>CLASS</span><strong>—</strong></div>
    `;

    showToast("Format IPv4 tidak valid");
    return;
  }

  $("ipResult").innerHTML = `
    <div><span>STATUS</span><strong>VALID</strong></div>
    <div><span>TYPE</span><strong>${classifyIPv4(nums)}</strong></div>
    <div><span>OCTETS</span><strong>${nums.join(" · ")}</strong></div>
    <div><span>CLASS</span><strong>${className(nums)}</strong></div>
  `;
}

function ipToInt(nums){
  return (
    ((nums[0]<<24)>>>0) +
    (nums[1]<<16) +
    (nums[2]<<8) +
    nums[3]
  );
}

function intToIp(num){
  return [
    (num>>>24)&255,
    (num>>>16)&255,
    (num>>>8)&255,
    num&255
  ].join(".");
}

function maskFromPrefix(prefix){
  return prefix===0 ? 0 : (0xFFFFFFFF<<(32-prefix))>>>0;
}

function calcSubnet(){
  const nums = validIPv4($("subnetInput").value);
  const prefix = Number($("prefixInput").value);

  if(!nums || !Number.isInteger(prefix) || prefix<0 || prefix>32){
    $("subnetResult").innerHTML =
      `<p>Masukkan IPv4 valid dan prefix 0–32.</p>`;

    showToast("Subnet input tidak valid");
    return;
  }

  const ip = ipToInt(nums);
  const mask = maskFromPrefix(prefix);
  const network = (ip&mask)>>>0;
  const broadcast = (network|(~mask>>>0))>>>0;

  const hosts =
    prefix===32 ? 1 :
    prefix===31 ? 2 :
    Math.max(0,(2**(32-prefix))-2);

  $("subnetResult").innerHTML = `
    <div><strong>Network:</strong> ${intToIp(network)}/${prefix}</div>
    <div><strong>Broadcast:</strong> ${intToIp(broadcast)}</div>
    <div><strong>Subnet Mask:</strong> ${intToIp(mask)}</div>
    <div><strong>Usable Hosts:</strong> ${hosts.toLocaleString("id-ID")}</div>
  `;
}

let countdownTimer = null;
let countdownRemaining = 300;

function formatTime(seconds){
  const minutes = Math.floor(seconds/60);
  const secs = seconds%60;

  return `${String(minutes).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
}

function syncCountdownInputs(){
  const minutes = Math.max(0,Number($("countdownMinutes").value)||0);
  const seconds = Math.min(
    59,
    Math.max(0,Number($("countdownSeconds").value)||0)
  );

  countdownRemaining = minutes*60+seconds;
  $("countdownDisplay").textContent = formatTime(countdownRemaining);
}

function stopCountdown(){
  if(countdownTimer){
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
}

function randomStudentToolSpin(){
  const spot = $("randomToolSpot");
  const duration = 850;
  const start = performance.now();

  function tick(now){
    const progress = Math.min(1,(now-start)/duration);
    const current =
      STUDENTS[Math.floor(Math.random()*STUDENTS.length)];

    spot.innerHTML = `
      <span>SCANNING · ${Math.round(progress*100)}%</span>
      <strong>${escapeHTML(current)}</strong>
      <small>Routing class nodes...</small>
    `;

    if(progress<1){
      requestAnimationFrame(tick);
    }else{
      const winner =
        STUDENTS[Math.floor(Math.random()*STUDENTS.length)];

      spot.innerHTML = `
        <span>SELECTED · ${studentNumber(winner)}</span>
        <strong>${escapeHTML(winner)}</strong>
        <small>XI TJKT 2 • random result</small>
      `;

      showToast(`${winner} terpilih`);
    }
  }

  requestAnimationFrame(tick);
}

function exportClassData(){
  const data = {
    generatedAt:new Date().toISOString(),
    className:"XI TJKT 2",
    students:STUDENTS,
    schedule:SCHEDULE,
    duty:DUTY,
    rotation:{
      week:state.rotationWeek,
      pairs:Array.from(
        {length:18},
        (_,i)=>[STUDENTS[i*2],STUDENTS[i*2+1]]
      )
    },
    notes:state.notes
  };

  const blob = new Blob(
    [JSON.stringify(data,null,2)],
    {type:"application/json"}
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "XI-TJKT-2-class-data.json";
  a.click();

  URL.revokeObjectURL(url);
  showToast("Data kelas berhasil diexport");
}

function initTools(){
  $("checkIp").addEventListener("click",checkIP);

  $("ipInput").addEventListener("keydown",event=>{
    if(event.key==="Enter") checkIP();
  });

  $("calcSubnet").addEventListener("click",calcSubnet);

  $("randomStudentTool").addEventListener(
    "click",
    randomStudentToolSpin
  );

  $("countdownMinutes").addEventListener("input",()=>{
    if(!countdownTimer) syncCountdownInputs();
  });

  $("countdownSeconds").addEventListener("input",()=>{
    if(!countdownTimer) syncCountdownInputs();
  });

  $("countdownStart").addEventListener("click",()=>{
    if(countdownTimer) return;

    if(countdownRemaining<=0){
      syncCountdownInputs();
    }

    countdownTimer = setInterval(()=>{
      countdownRemaining =
        Math.max(0,countdownRemaining-1);

      $("countdownDisplay").textContent =
        formatTime(countdownRemaining);

      if(countdownRemaining===0){
        stopCountdown();
        showToast("Countdown selesai");
      }
    },1000);

    showToast("Countdown berjalan");
  });

  $("countdownPause").addEventListener("click",()=>{
    stopCountdown();
    showToast("Countdown dipause");
  });

  $("countdownReset").addEventListener("click",()=>{
    stopCountdown();
    syncCountdownInputs();
    showToast("Countdown direset");
  });

  $("classNotes").value = state.notes;

  $("classNotes").addEventListener("input",event=>{
    state.notes = event.target.value;
    localStorage.setItem("tjkt2-notes",state.notes);

    $("notesState").textContent = "SAVED";

    clearTimeout(initTools.notesTimer);

    initTools.notesTimer = setTimeout(()=>{
      $("notesState").textContent = "LOCAL";
    },900);
  });

  $("clearNotes").addEventListener("click",()=>{
    state.notes = "";
    $("classNotes").value = "";
    localStorage.removeItem("tjkt2-notes");
    $("notesState").textContent = "CLEARED";

    showToast("Catatan dibersihkan");

    setTimeout(()=>{
      $("notesState").textContent = "LOCAL";
    },900);
  });

  $("exportData").addEventListener("click",exportClassData);
  $("printPage").addEventListener("click",()=>window.print());

  syncCountdownInputs();
}

function updateClock(){
  const now = new Date();

  $("liveClock").textContent =
    now.toLocaleTimeString("id-ID",{hour12:false});

  $("liveDate").textContent =
    now.toLocaleDateString("id-ID",{
      weekday:"long",
      day:"2-digit",
      month:"long",
      year:"numeric"
    });
}

function initMobile(){
  $("mobileMenuButton").addEventListener("click",()=>{
    const sidebar = $("sidebar");

    sidebar.style.display =
      sidebar.style.display==="block" ? "none" : "block";

    if(sidebar.style.display==="block"){
      sidebar.style.position = "fixed";
      sidebar.style.width = "260px";
      sidebar.style.zIndex = "150";
      sidebar.style.top = "60px";
      sidebar.style.bottom = "0";
      sidebar.style.left = "0";
    }
  });
}

function init(){
  initHub();
  initSchedule();
  initRotation();
  initTools();
  initMobile();

  updateClock();
  setInterval(updateClock,1000);

  switchView(state.view);
}

document.addEventListener("DOMContentLoaded",init);
