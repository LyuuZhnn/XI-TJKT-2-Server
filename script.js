"use strict";

const STUDENTS = [
  "AHLIF ANNISA",
  "ARINA MAZIYA",
  "AULA SHABIRINA",
  "BAITI CAHAYA ANDINI",
  "CANDRA NILA OKTAVIANA",
  "DAFFI AL HAMMAMI",
  "DANIKA FARHANI",
  "DONISAH",
  "FARADILA MAULA",
  "FARHAN AZHAR",
  "HAFIZH AKMAL RIYADI",
  "HANA MAHEERA MUTHIANIQA",
  "LUTFIANAZWA RAMADHAN N",
  "M. FAHRI JAVIER SATYA PRADITA",
  "M. RAHMATUL ARIFIN",
  "MISHEL RAMADHANI",
  "MUHAMMAD RIFQI FAIZAL",
  "MUHAMMAD RIZKI AKBAR",
  "MUSYAFFA HANIF SUNNI",
  "NADYA SHAFWAH",
  "NASYA ANAYA PUTRI",
  "NAWAL FAUZIATUL AWLIYA",
  "NAYRA CELLIA ANKADIRA",
  "NAZLIZA ARLIANA PUTRI",
  "NUR NADYA ULYA",
  "NURLIA AZIZAH",
  "NURUL QONITA ASRIYA",
  "RAFA ADITYA",
  "RIFFI GUNAWAN",
  "SELINAFYA ELDIANA",
  "SITI NUR HIKMAH",
  "SYIFA FADILLAH MURTONO",
  "TALITA YUMNA AL - MUDZAKIRAH",
  "TIARA ZENITA SARI",
  "TITIN SOFIYATUN NISA",
  "WAFIYATU SYAFA MAULIDA"
];

const SCHEDULE = {
  A: {
    Senin: ["Matematika", "PAI BP", "Bahasa Inggris"],
    Selasa: ["Bahasa Indonesia", "Bahasa Jawa", "Sejarah", "PP"],
    Rabu: ["Sejarah", "PAI BP", "Bahasa Jawa", "Bahasa Inggris"],
    Kamis: ["Matematika", "Bahasa Indonesia", "KIK"],
    Jumat: ["KIK"]
  },
  B: {
    Senin: ["Kejuruan"],
    Selasa: ["Kejuruan", "Mapil", "PJOK"],
    Rabu: ["Kejuruan"],
    Kamis: ["Kejuruan Infra"],
    Jumat: ["Bahasa Jepang"]
  }
};

const DUTY = {
  Senin: [
    "DAFFI AL HAMMAMI",
    "FARHAN AZHAR",
    "AHLIF ANNISA",
    "ARINA MAZIYA",
    "AULA SHABIRINA",
    "BAITI CAHAYA ANDINI",
    "CANDRA NILA OKTAVIANA"
  ],
  Selasa: [
    "HAFIZH AKMAL RIYADI",
    "M. FAHRI JAVIER SATYA PRADITA",
    "DANIKA FARHANI",
    "DONISAH",
    "FARADILA MAULA",
    "HANA MAHEERA MUTHIANIQA",
    "LUTFIANAZWA RAMADHAN N"
  ],
  Rabu: [
    "M. RAHMATUL ARIFIN",
    "MISHEL RAMADHANI",
    "NADYA SHAFWAH",
    "NASYA ANAYA PUTRI",
    "NAWAL FAUZIATUL AWLIYA",
    "NAYRA CELLIA ANKADIRA",
    "NAZLIZA ARLIANA PUTRI"
  ],
  Kamis: [
    "MUHAMMAD RIFQI FAIZAL",
    "MUHAMMAD RIZKI AKBAR",
    "NUR NADYA ULYA",
    "NURLIA AZIZAH",
    "NURUL QONITA ASRIYA",
    "RIFFI GUNAWAN",
    "SELINAFYA ELDIANA"
  ],
  Jumat: [
    "MUSYAFFA HANIF SUNNI",
    "RAFA ADITYA",
    "SITI NUR HIKMAH",
    "SYIFA FADILLAH MURTONO",
    "TALITA YUMNA AL - MUDZAKIRAH",
    "TIARA ZENITA SARI",
    "TITIN SOFIYATUN NISA",
    "WAFIYATU SYAFA MAULIDA"
  ]
};

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

const state = {
  view: localStorage.getItem("tjkt2-view") || "dashboard1",
  theme: localStorage.getItem("tjkt2-theme") || "light",
  scheduleBlock: localStorage.getItem("tjkt2-schedule-block") || "A",
  dutyDay: localStorage.getItem("tjkt2-duty-day") || "Senin",
  rotationStart: Number(localStorage.getItem("tjkt2-rotation-start") || 23),
  rotationSize: Number(localStorage.getItem("tjkt2-rotation-size") || 18),
  rotationWeek: Number(localStorage.getItem("tjkt2-rotation-week") || 1),
  dutyChecks: JSON.parse(localStorage.getItem("tjkt2-duty-checks") || "{}"),
  notes: localStorage.getItem("tjkt2-notes") || ""
};

let timer = null;
let timerRemaining = 0;

const $ = (id) => document.getElementById(id);

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function saveState() {
  localStorage.setItem("tjkt2-view", state.view);
  localStorage.setItem("tjkt2-theme", state.theme);
  localStorage.setItem("tjkt2-schedule-block", state.scheduleBlock);
  localStorage.setItem("tjkt2-duty-day", state.dutyDay);
  localStorage.setItem("tjkt2-rotation-start", state.rotationStart);
  localStorage.setItem("tjkt2-rotation-size", state.rotationSize);
  localStorage.setItem("tjkt2-rotation-week", state.rotationWeek);
  localStorage.setItem("tjkt2-duty-checks", JSON.stringify(state.dutyChecks));
  localStorage.setItem("tjkt2-notes", state.notes);
}

function updateClock() {
  const now = new Date();

  $("clock").textContent = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  $("date").textContent = now.toLocaleDateString("id-ID", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function initTheme() {
  document.body.classList.toggle("dark", state.theme === "dark");

  $("themeToggle").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.body.classList.toggle("dark", state.theme === "dark");
    saveState();
    showToast(state.theme === "dark" ? "Mode gelap aktif" : "Mode terang aktif");
  });
}

function switchView(view) {
  state.view = view;
  saveState();

  document.querySelectorAll(".view").forEach(el => {
    el.classList.toggle("active", el.id === view);
  });

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });

  const titles = {
    dashboard1: "Class Hub",
    dashboard2: "Jadwal & Piket",
    dashboard3: "Apel & Baris",
    dashboard4: "TJKT Tools"
  };

  $("pageTitle").textContent = titles[view] || "Class Hub";

  $("sidebar").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initNavigation() {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => switchView(btn.dataset.view));
  });

  $("mobileMenu").addEventListener("click", () => {
    $("sidebar").classList.toggle("open");
  });

  switchView(state.view);
}

function renderStudents(query = "") {
  const q = query.trim().toLowerCase();

  const filtered = STUDENTS
    .map((name, index) => ({ name, no: index + 1 }))
    .filter(item => item.name.toLowerCase().includes(q));

  $("studentGrid").innerHTML = filtered.map(item => `
    <article class="student-card">
      <div class="student-no">NO. ${item.no}</div>
      <div class="student-name">${escapeHTML(item.name)}</div>
    </article>
  `).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#039;"
  }[char]));
}

function randomStudent(targetId = "toolRandomResult") {
  const student = STUDENTS[Math.floor(Math.random() * STUDENTS.length)];
  $(targetId).textContent = student;
  showToast(`Terpilih: ${student}`);
  return student;
}

function renderSchedule() {
  document.querySelectorAll("#scheduleSwitch .seg").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.block === state.scheduleBlock);
  });

  $("scheduleDays").innerHTML = Object.entries(SCHEDULE[state.scheduleBlock])
    .map(([day, subjects]) => `
      <div class="schedule-card">
        <h4>${day}</h4>
        <div class="subject-list">
          ${subjects.map((subject, i) => `
            <div class="subject">${i + 1}. ${escapeHTML(subject)}</div>
          `).join("")}
        </div>
      </div>
    `).join("");
}

function initSchedule() {
  document.querySelectorAll("#scheduleSwitch .seg").forEach(btn => {
    btn.addEventListener("click", () => {
      state.scheduleBlock = btn.dataset.block;
      saveState();
      renderSchedule();
    });
  });

  renderSchedule();
}

function renderDutyButtons() {
  $("dutyDaySwitch").innerHTML = DAYS.map(day => `
    <button class="day-chip ${day === state.dutyDay ? "active" : ""}" data-day="${day}">
      ${day}
    </button>
  `).join("");

  document.querySelectorAll("#dutyDaySwitch .day-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      state.dutyDay = btn.dataset.day;
      saveState();
      renderDutyButtons();
      renderDuty();
    });
  });
}

function renderDuty() {
  const list = DUTY[state.dutyDay];

  $("dutyView").innerHTML = `
    <div class="duty-meta">
      ${state.dutyDay}: ${list.length} siswa piket.
      Piket dilakukan sebelum dan sesudah jam pelajaran.
    </div>

    <div class="duty-list">
      ${list.map((name, index) => {
        const key = `${state.dutyDay}-${index}-${name}`;
        const checked = !!state.dutyChecks[key];

        return `
          <div class="duty-item ${checked ? "done" : ""}">
            <input
              type="checkbox"
              data-duty-key="${escapeHTML(key)}"
              ${checked ? "checked" : ""}
            >
            <label>${index + 1}. ${escapeHTML(name)}</label>
          </div>
        `;
      }).join("")}
    </div>
  `;

  document.querySelectorAll("[data-duty-key]").forEach(box => {
    box.addEventListener("change", () => {
      state.dutyChecks[box.dataset.dutyKey] = box.checked;
      saveState();
      renderDuty();
    });
  });
}

function getRotationPair() {
  const weekIndex = Math.max(0, state.rotationWeek - 1);
  const firstIndex = (weekIndex * 2) % STUDENTS.length;
  const secondIndex = (firstIndex + 1) % STUDENTS.length;

  return {
    today: STUDENTS[firstIndex],
    next: STUDENTS[secondIndex]
  };
}

function renderRotation() {
  const pair = getRotationPair();

  $("rotationWeek").value = state.rotationWeek;

  if ($("rotationWeekLabel")) {
    $("rotationWeekLabel").textContent =
      String(state.rotationWeek).padStart(2, "0");
  }

  $("group1Count").textContent = "APEL HARI INI";
  $("group2Count").textContent = "APEL SELANJUTNYA";

  $("group1").innerHTML = `
    <div class="member featured-member">
      <span>${studentNumber(pair.today)}</span>
      <strong>${escapeHTML(pair.today)}</strong>
    </div>
  `;

  $("group2").innerHTML = `
    <div class="member featured-member">
      <span>${studentNumber(pair.next)}</span>
      <strong>${escapeHTML(pair.next)}</strong>
    </div>
  `;

  const pairs = [];
  for (let i = 0; i < STUDENTS.length; i += 2) {
    const first = STUDENTS[i];
    const second = STUDENTS[(i + 1) % STUDENTS.length];

    pairs.push(`
      <div class="seq-chip ${i / 2 === (state.rotationWeek - 1) % 18 ? "active-pair" : ""}">
        <b>M${Math.floor(i / 2) + 1}</b>
        <span>${studentNumber(first)} · ${studentNumber(second)}</span>
      </div>
    `);
  }

  $("rotationSequence").innerHTML = pairs.join("");

  $("rotationStatus").textContent =
    `Minggu ${state.rotationWeek}: ${pair.today} → ${pair.next}`;
}

function initRotation() {
  $("rotationWeek").addEventListener("change", () => {
    const value = Number($("rotationWeek").value);

    if (value >= 1) {
      state.rotationWeek = value;
    }

    saveState();
    renderRotation();
  });

  $("generateRotation").addEventListener("click", () => {
    state.rotationWeek =
      Math.max(1, Number($("rotationWeek").value) || 1);

    saveState();
    renderRotation();

    showToast(`Minggu ${state.rotationWeek} dimuat`);
  });

  $("nextRotation").addEventListener("click", () => {
    state.rotationWeek += 1;

    if (state.rotationWeek > 18) {
      state.rotationWeek = 1;
    }

    saveState();
    renderRotation();

    showToast(`Masuk minggu ${state.rotationWeek}`);
  });

  $("resetRotation").addEventListener("click", () => {
    state.rotationWeek = 1;

    saveState();
    renderRotation();

    showToast("Rotasi kembali ke Minggu 1");
  });

  renderRotation();
}

function ipParts(ip) {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) return null;

  const nums = parts.map(Number);

  if (
    nums.some(n =>
      !Number.isInteger(n) ||
      n < 0 ||
      n > 255
    )
  ) {
    return null;
  }

  return nums;
}

function ipClass(ip) {
  const parts = ipParts(ip);
  if (!parts) return null;

  const first = parts[0];

  if (first >= 1 && first <= 126) return "A";
  if (first >= 128 && first <= 191) return "B";
  if (first >= 192 && first <= 223) return "C";
  if (first >= 224 && first <= 239) return "D";
  if (first >= 240 && first <= 255) return "E";

  return null;
}

function initIpChecker() {
  $("checkIpBtn").addEventListener("click", () => {
    const ip = $("ipInput").value.trim();
    const parts = ipParts(ip);
    const cls = ipClass(ip);

    if (!parts || !cls) {
      $("ipResult").textContent = "IP tidak valid atau termasuk alamat khusus.";
      showToast("Alamat IP tidak valid");
      return;
    }

    const masks = {
      A: "255.0.0.0",
      B: "255.255.0.0",
      C: "255.255.255.0",
      D: "-",
      E: "-"
    };

    $("ipResult").innerHTML = `
      <strong>Class ${cls}</strong><br>
      Oktet pertama: ${parts[0]}<br>
      Default mask: ${masks[cls]}
    `;

    showToast(`IP ${ip} = Class ${cls}`);
  });
}

function cidrToMask(cidr) {
  if (!Number.isInteger(cidr) || cidr < 0 || cidr > 32) {
    return null;
  }

  const bits = "1".repeat(cidr) + "0".repeat(32 - cidr);
  const out = [];

  for (let i = 0; i < 32; i += 8) {
    out.push(parseInt(bits.slice(i, i + 8), 2));
  }

  return out.join(".");
}

function ipToInt(ip) {
  const parts = ipParts(ip);
  if (!parts) return null;

  return (
    ((parts[0] << 24) >>> 0) +
    (parts[1] << 16) +
    (parts[2] << 8) +
    parts[3]
  ) >>> 0;
}

function intToIp(value) {
  return [
    value >>> 24,
    (value >>> 16) & 255,
    (value >>> 8) & 255,
    value & 255
  ].join(".");
}

function initSubnet() {
  $("checkSubnetBtn").addEventListener("click", () => {
    const raw = $("subnetInput").value.trim();
    const match = raw.match(/^(.+)\/(\d{1,2})$/);

    if (!match) {
      $("subnetResult").textContent = "Format harus seperti 192.168.10.0/24.";
      showToast("Format CIDR salah");
      return;
    }

    const ip = match[1];
    const cidr = Number(match[2]);

    const ipInt = ipToInt(ip);
    const mask = cidrToMask(cidr);

    if (ipInt === null || !mask) {
      $("subnetResult").textContent = "Subnet tidak valid.";
      showToast("Subnet tidak valid");
      return;
    }

    const maskInt = ipToInt(mask);
    const network = (ipInt & maskInt) >>> 0;
    const wildcard = (~maskInt) >>> 0;
    const broadcast = (network | wildcard) >>> 0;
    const total = 2 ** (32 - cidr);

    let usable = 0;

    if (cidr <= 30) {
      usable = Math.max(0, total - 2);
    } else {
      usable = total;
    }

    const firstHost = cidr <= 30 ? intToIp(network + 1) : intToIp(network);
    const lastHost = cidr <= 30 ? intToIp(broadcast - 1) : intToIp(broadcast);

    $("subnetResult").innerHTML = `
      <strong>Network:</strong> ${intToIp(network)}<br>
      <strong>Broadcast:</strong> ${intToIp(broadcast)}<br>
      <strong>Mask:</strong> ${mask}<br>
      <strong>Host:</strong> ${firstHost} — ${lastHost}<br>
      <strong>Total:</strong> ${total}<br>
      <strong>Usable:</strong> ${usable}
    `;

    showToast("Subnet berhasil dihitung");
  });
}

function formatTimer(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  $("timerDisplay").textContent = formatTimer(timerRemaining);
}

function initTimer() {
  $("startTimerBtn").addEventListener("click", () => {
    const minutes = Number($("countdownMinutes").value);

    if (!Number.isFinite(minutes) || minutes <= 0) {
      showToast("Masukkan durasi menit");
      return;
    }

    clearInterval(timer);
    timerRemaining = Math.floor(minutes * 60);
    updateTimerDisplay();

    timer = setInterval(() => {
      timerRemaining -= 1;
      updateTimerDisplay();

      if (timerRemaining <= 0) {
        clearInterval(timer);
        timer = null;
        showToast("Countdown selesai");
      }
    }, 1000);
  });

  $("stopTimerBtn").addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    showToast("Countdown dihentikan");
  });
}

function updateNotesCounter() {
  $("notesCount").textContent =
    `${$("classNotes").value.length} karakter`;
}

function initNotes() {
  $("classNotes").value = state.notes;
  updateNotesCounter();

  $("classNotes").addEventListener("input", () => {
    state.notes = $("classNotes").value;
    saveState();
    updateNotesCounter();
  });

  $("clearNotesBtn").addEventListener("click", () => {
    $("classNotes").value = "";
    state.notes = "";
    saveState();
    updateNotesCounter();
    showToast("Catatan dibersihkan");
  });
}

function buildExportData() {
  return {
    className: "XI TJKT 2",
    school: "SMK Negeri 1 Adiwerna",
    academicYear: "2026/2027",
    students: STUDENTS,
    schedule: SCHEDULE,
    duty: DUTY,
    rotation: {
      start: state.rotationStart,
      size: state.rotationSize,
      week: state.rotationWeek
    },
    notes: state.notes,
    exportedAt: new Date().toISOString()
  };
}

function initExport() {
  $("exportBtn").addEventListener("click", () => {
    const data = JSON.stringify(buildExportData(), null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "XI-TJKT-2-data.json";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
    showToast("Data berhasil diekspor");
  });

  $("printBtn").addEventListener("click", () => {
    window.print();
  });
}

function initRandomTools() {
  $("randomStudentBtn").addEventListener("click", () => {
    const name = randomStudent("toolRandomResult");
    $("randomStudentBox").textContent = `Siswa terpilih: ${name}`;
    $("randomStudentBox").classList.remove("hidden");
  });

  $("toolRandomBtn").addEventListener("click", () => {
    randomStudent("toolRandomResult");
  });
}

function initKeyboard() {
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      $("sidebar").classList.remove("open");
    }
  });
}

function boot() {
  $("statStudents").textContent = STUDENTS.length;

  updateClock();
  setInterval(updateClock, 1000);

  initTheme();
  initNavigation();
  renderStudents();
  initSchedule();
  renderDutyButtons();
  renderDuty();
  initRotation();
  initIpChecker();
  initSubnet();
  initTimer();
  initNotes();
  initExport();
  initRandomTools();
  initKeyboard();

  $("studentSearch").addEventListener("input", event => {
    renderStudents(event.target.value);
  });

  showToast("XI TJKT 2 siap digunakan");
}

document.addEventListener("DOMContentLoaded", boot);
