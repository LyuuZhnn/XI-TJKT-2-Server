"use strict";

/* =========================================================
   XI TJKT 2 — MAIN JAVASCRIPT
   Semua fitur dibuat modular + aman dari elemen HTML yang
   belum tersedia.
========================================================= */

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

const $ = id => document.getElementById(id);

function exists(id) {
  return Boolean($(id));
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value;
}

function setHTML(id, value) {
  const el = $(id);
  if (el) el.innerHTML = value;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getStored(key, fallback = "") {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

function getStoredJSON(key, fallback = {}) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Ignore storage errors */
  }
}

/* =========================================================
   STATE
========================================================= */

const state = {
  view: getStored("tjkt2-view", "dashboard1"),
  theme: getStored("tjkt2-theme", "light"),
  scheduleBlock: getStored("tjkt2-schedule-block", "A"),
  dutyDay: getStored("tjkt2-duty-day", "Senin"),
  rotationWeek: Math.max(
    1,
    Math.min(18, Number(getStored("tjkt2-rotation-week", "1")) || 1)
  ),
  dutyChecks: getStoredJSON("tjkt2-duty-checks", {}),
  notes: getStored("tjkt2-notes", "")
};

let timer = null;
let timerRemaining = 0;
let toastTimer = null;

/* =========================================================
   STORAGE
========================================================= */

function saveState() {
  save("tjkt2-view", state.view);
  save("tjkt2-theme", state.theme);
  save("tjkt2-schedule-block", state.scheduleBlock);
  save("tjkt2-duty-day", state.dutyDay);
  save("tjkt2-rotation-week", String(state.rotationWeek));
  save("tjkt2-duty-checks", JSON.stringify(state.dutyChecks));
  save("tjkt2-notes", state.notes);
}

/* =========================================================
   TOAST
========================================================= */

function showToast(message) {
  const toast = $("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

/* =========================================================
   CLOCK
========================================================= */

function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const date = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  setText("clock", time);
  setText("topClock", time);
  setText("date", date);
  setText("todayDate", date);
}

/* =========================================================
   THEME
========================================================= */

function applyTheme() {
  document.body.classList.toggle("dark", state.theme === "dark");

  document.documentElement.dataset.theme = state.theme;

  document.querySelectorAll("[data-theme-toggle]").forEach(button => {
    button.textContent = state.theme === "dark" ? "☀️" : "🌙";
  });

  const themeButton = $("themeToggle");
  if (themeButton) {
    themeButton.textContent = state.theme === "dark" ? "☀️" : "🌙";
  }
}

function initTheme() {
  applyTheme();

  const toggleTheme = () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    saveState();
    applyTheme();
  };

  $("themeToggle")?.addEventListener("click", toggleTheme);

  document.querySelectorAll("[data-theme-toggle]").forEach(button => {
    button.addEventListener("click", toggleTheme);
  });
}

/* =========================================================
   NAVIGATION
========================================================= */

function showView(view) {
  const validViews = [
    "dashboard1",
    "dashboard2",
    "dashboard3",
    "dashboard4"
  ];

  if (!validViews.includes(view)) {
    view = "dashboard1";
  }

  state.view = view;
  saveState();

  document.querySelectorAll(".dashboard").forEach(section => {
    section.classList.toggle("active", section.id === view);
  });

  document.querySelectorAll("[data-view]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.view === view
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function initNavigation() {
  document.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", () => {
      showView(button.dataset.view);

      const sidebar = $("sidebar");
      if (sidebar) sidebar.classList.remove("open");
    });
  });

  $("menuToggle")?.addEventListener("click", () => {
    $("sidebar")?.classList.toggle("open");
  });

  $("closeSidebar")?.addEventListener("click", () => {
    $("sidebar")?.classList.remove("open");
  });

  showView(state.view);
}

/* =========================================================
   STUDENTS
========================================================= */

function studentNumber(name) {
  const index = STUDENTS.indexOf(name);
  return index >= 0 ? index + 1 : "-";
}

function renderStudents(query = "") {
  const grid =
    $("studentGrid") ||
    $("studentsGrid") ||
    document.querySelector(".student-grid");

  if (!grid) return;

  const keyword = String(query).trim().toLowerCase();

  const filtered = STUDENTS
    .map((name, index) => ({
      name,
      number: index + 1
    }))
    .filter(item =>
      item.name.toLowerCase().includes(keyword) ||
      String(item.number).includes(keyword)
    );

  grid.innerHTML = filtered.map(student => `
    <article class="student-card">
      <div class="student-number">${student.number}</div>
      <div class="student-info">
        <strong>${escapeHTML(student.name)}</strong>
        <small>XI TJKT 2</small>
      </div>
    </article>
  `).join("");

  setText("studentCount", `${filtered.length} siswa`);
}

function randomStudent(targetId = "toolRandomResult") {
  const index = Math.floor(Math.random() * STUDENTS.length);
  const name = STUDENTS[index];

  setHTML(
    targetId,
    `<strong>${escapeHTML(name)}</strong><br>No. ${index + 1}`
  );

  return name;
}

function initStudents() {
  setText("statStudents", STUDENTS.length);
  setText("statStudentCount", STUDENTS.length);
  setText("totalStudents", STUDENTS.length);

  renderStudents();

  $("studentSearch")?.addEventListener("input", event => {
    renderStudents(event.target.value);
  });

  $("randomStudentBtn")?.addEventListener("click", () => {
    const name = randomStudent();

    if ($("randomStudentBox")) {
      $("randomStudentBox").textContent =
        `Siswa terpilih: ${name}`;
      $("randomStudentBox").classList.remove("hidden");
    }

    showToast("Siswa berhasil diacak");
  });
}

/* =========================================================
   SCHEDULE
========================================================= */

function renderSchedule() {
  const block = state.scheduleBlock;

  const container =
    $("scheduleDays") ||
    $("scheduleGrid") ||
    document.querySelector(".schedule-days") ||
    document.querySelector(".schedule-grid");

  if (container) {
    container.innerHTML = DAYS.map(day => {
      const subjects = SCHEDULE[block][day] || [];

      return `
        <div class="schedule-day-card">
          <div class="schedule-day-title">
            <span>${day}</span>
            <small>${subjects.length} mapel</small>
          </div>

          <div class="subject-list">
            ${
              subjects.length
                ? subjects.map((subject, index) => `
                    <div class="subject-item">
                      <span>${index + 1}</span>
                      <strong>${escapeHTML(subject)}</strong>
                    </div>
                  `).join("")
                : `<div class="empty-state">Tidak ada jadwal</div>`
            }
          </div>
        </div>
      `;
    }).join("");
  }

  document.querySelectorAll("[data-schedule-block]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.scheduleBlock === block
    );
  });

  setText("activeScheduleBlock", `Blok ${block}`);
}

function initSchedule() {
  document.querySelectorAll("[data-schedule-block]").forEach(button => {
    button.addEventListener("click", () => {
      state.scheduleBlock = button.dataset.scheduleBlock;
      saveState();
      renderSchedule();

      showToast(`Jadwal Blok ${state.scheduleBlock}`);
    });
  });

  $("scheduleA")?.addEventListener("click", () => {
    state.scheduleBlock = "A";
    saveState();
    renderSchedule();
  });

  $("scheduleB")?.addEventListener("click", () => {
    state.scheduleBlock = "B";
    saveState();
    renderSchedule();
  });

  renderSchedule();
}

/* =========================================================
   DUTY / PIKET
========================================================= */

function renderDutyButtons() {
  const container =
    $("dutyDays") ||
    $("dutyDayButtons") ||
    document.querySelector(".duty-days");

  if (!container) return;

  container.innerHTML = DAYS.map(day => `
    <button
      type="button"
      class="duty-day-btn ${state.dutyDay === day ? "active" : ""}"
      data-duty-day="${day}">
      ${day}
    </button>
  `).join("");

  container.querySelectorAll("[data-duty-day]").forEach(button => {
    button.addEventListener("click", () => {
      state.dutyDay = button.dataset.dutyDay;
      saveState();

      renderDutyButtons();
      renderDuty();

      showToast(`Piket ${state.dutyDay}`);
    });
  });
}

function dutyKey(day, name) {
  return `${day}::${name}`;
}

function renderDuty() {
  const day = state.dutyDay;
  const members = DUTY[day] || [];

  const container =
    $("dutyList") ||
    $("dutyStudents") ||
    document.querySelector(".duty-list");

  if (!container) return;

  container.innerHTML = members.map((name, index) => {
    const key = dutyKey(day, name);
    const checked = Boolean(state.dutyChecks[key]);

    return `
      <label class="duty-item ${checked ? "checked" : ""}">
        <input
          type="checkbox"
          data-duty-check="${escapeHTML(key)}"
          ${checked ? "checked" : ""}
        >
        <span class="duty-number">${index + 1}</span>
        <span class="duty-name">${escapeHTML(name)}</span>
      </label>
    `;
  }).join("");

  container.querySelectorAll("[data-duty-check]").forEach(input => {
    input.addEventListener("change", event => {
      const key = event.target.dataset.dutyCheck;

      state.dutyChecks[key] = event.target.checked;

      saveState();

      event.target.closest(".duty-item")
        ?.classList.toggle("checked", event.target.checked);
    });
  });

  setText("dutyCount", `${members.length} siswa`);
}

/* =========================================================
   APEL — 2 SISWA PER MINGGU
========================================================= */

function getRotationPair() {
  const weekIndex = Math.max(
    0,
    Math.min(17, state.rotationWeek - 1)
  );

  const firstIndex = (weekIndex * 2) % STUDENTS.length;
  const secondIndex = (firstIndex + 1) % STUDENTS.length;

  return {
    today: STUDENTS[firstIndex],
    next: STUDENTS[secondIndex]
  };
}

function renderRotation() {
  const pair = getRotationPair();

  setText(
    "rotationWeekLabel",
    String(state.rotationWeek).padStart(2, "0")
  );

  const weekInput = $("rotationWeek");
  if (weekInput) weekInput.value = state.rotationWeek;

  setText("group1Count", "APEL HARI INI");
  setText("group2Count", "APEL SELANJUTNYA");

  setHTML(
    "group1",
    `
      <div class="member featured-member">
        <span>${studentNumber(pair.today)}</span>
        <strong>${escapeHTML(pair.today)}</strong>
      </div>
    `
  );

  setHTML(
    "group2",
    `
      <div class="member featured-member">
        <span>${studentNumber(pair.next)}</span>
        <strong>${escapeHTML(pair.next)}</strong>
      </div>
    `
  );

  const sequence = [];

  for (let i = 0; i < STUDENTS.length; i += 2) {
    const week = i / 2 + 1;
    const first = STUDENTS[i];
    const second = STUDENTS[(i + 1) % STUDENTS.length];

    sequence.push(`
      <div class="seq-chip ${
        week === state.rotationWeek
          ? "active-pair"
          : ""
      }">
        <b>M${week}</b>
        <span>
          ${studentNumber(first)}
          ·
          ${studentNumber(second)}
        </span>
      </div>
    `);
  }

  setHTML("rotationSequence", sequence.join(""));

  setText(
    "rotationStatus",
    `Minggu ${state.rotationWeek}: ${pair.today} → ${pair.next}`
  );
}

function initRotation() {
  $("rotationWeek")?.addEventListener("change", event => {
    let week = Number(event.target.value) || 1;

    week = Math.max(1, Math.min(18, week));

    state.rotationWeek = week;
    saveState();
    renderRotation();
  });

  $("generateRotation")?.addEventListener("click", () => {
    let week = Number($("rotationWeek")?.value) || 1;

    week = Math.max(1, Math.min(18, week));

    state.rotationWeek = week;
    saveState();
    renderRotation();

    showToast(`Minggu ${week} dimuat`);
  });

  $("nextRotation")?.addEventListener("click", () => {
    state.rotationWeek += 1;

    if (state.rotationWeek > 18) {
      state.rotationWeek = 1;
    }

    saveState();
    renderRotation();

    showToast(`Masuk Minggu ${state.rotationWeek}`);
  });

  $("resetRotation")?.addEventListener("click", () => {
    state.rotationWeek = 1;

    saveState();
    renderRotation();

    showToast("Rotasi kembali ke Minggu 1");
  });

  renderRotation();
}

/* =========================================================
   IP CLASS CHECKER
========================================================= */

function ipParts(ip) {
  if (typeof ip !== "string") return null;

  const parts = ip.trim().split(".");

  if (parts.length !== 4) return null;

  const nums = parts.map(Number);

  if (
    nums.some(
      value =>
        !Number.isInteger(value) ||
        value < 0 ||
        value > 255
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
  $("checkIpBtn")?.addEventListener("click", () => {
    const ip = $("ipInput")?.value.trim() || "";
    const parts = ipParts(ip);
    const cls = ipClass(ip);

    if (!parts || !cls) {
      setText(
        "ipResult",
        "IP tidak valid. Gunakan format IPv4 seperti 192.168.1.1."
      );

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

    const typeMap = {
      A: "Unicast",
      B: "Unicast",
      C: "Unicast",
      D: "Multicast",
      E: "Experimental"
    };

    setHTML(
      "ipResult",
      `
        <strong>Class ${cls}</strong><br>
        Oktet pertama: ${parts[0]}<br>
        Default mask: ${masks[cls]}<br>
        Tipe: ${typeMap[cls]}
      `
    );

    showToast(`IP ${ip} = Class ${cls}`);
  });
}

/* =========================================================
   SUBNET CALCULATOR
========================================================= */

function cidrToMask(cidr) {
  if (
    !Number.isInteger(cidr) ||
    cidr < 0 ||
    cidr > 32
  ) {
    return null;
  }

  const bits =
    "1".repeat(cidr) +
    "0".repeat(32 - cidr);

  const output = [];

  for (let i = 0; i < 32; i += 8) {
    output.push(
      parseInt(bits.slice(i, i + 8), 2)
    );
  }

  return output.join(".");
}

function ipToInt(ip) {
  const parts = ipParts(ip);
  if (!parts) return null;

  return (
    (
      ((parts[0] << 24) >>> 0) +
      ((parts[1] << 16) >>> 0) +
      ((parts[2] << 8) >>> 0) +
      parts[3]
    ) >>> 0
  );
}

function intToIp(value) {
  value >>>= 0;

  return [
    value >>> 24,
    (value >>> 16) & 255,
    (value >>> 8) & 255,
    value & 255
  ].join(".");
}

function initSubnet() {
  $("checkSubnetBtn")?.addEventListener("click", () => {
    const raw =
      $("subnetInput")?.value.trim() || "";

    const match =
      raw.match(/^(.+?)\/(\d{1,2})$/);

    if (!match) {
      setText(
        "subnetResult",
        "Format harus seperti 192.168.10.0/24."
      );

      showToast("Format CIDR salah");
      return;
    }

    const ip = match[1];
    const cidr = Number(match[2]);

    const ipInt = ipToInt(ip);
    const mask = cidrToMask(cidr);

    if (ipInt === null || !mask) {
      setText(
        "subnetResult",
        "Subnet tidak valid."
      );

      showToast("Subnet tidak valid");
      return;
    }

    const maskInt = ipToInt(mask);

    const network =
      (ipInt & maskInt) >>> 0;

    const wildcard =
      (~maskInt) >>> 0;

    const broadcast =
      (network | wildcard) >>> 0;

    const total =
      2 ** (32 - cidr);

    let usable;

    if (cidr === 31) {
      usable = 2;
    } else if (cidr === 32) {
      usable = 1;
    } else {
      usable = Math.max(0, total - 2);
    }

    let firstHost;
    let lastHost;

    if (cidr <= 30) {
      firstHost = intToIp(network + 1);
      lastHost = intToIp(broadcast - 1);
    } else {
      firstHost = intToIp(network);
      lastHost = intToIp(broadcast);
    }

    setHTML(
      "subnetResult",
      `
        <strong>Network:</strong> ${intToIp(network)}<br>
        <strong>Broadcast:</strong> ${intToIp(broadcast)}<br>
        <strong>Mask:</strong> ${mask}<br>
        <strong>Host:</strong> ${firstHost} — ${lastHost}<br>
        <strong>Total:</strong> ${total}<br>
        <strong>Usable:</strong> ${usable}
      `
    );

    showToast("Subnet berhasil dihitung");
  });
}

/* =========================================================
   RANDOM TOOLS
========================================================= */

function initRandomTools() {
  $("toolRandomBtn")?.addEventListener("click", () => {
    const name = randomStudent(
      "toolRandomResult"
    );

    showToast(`Terpilih: ${name}`);
  });
}

/* =========================================================
   COUNTDOWN TIMER
========================================================= */

function formatTimer(seconds) {
  const safeSeconds =
    Math.max(0, Math.floor(seconds));

  const mins =
    Math.floor(safeSeconds / 60);

  const secs =
    safeSeconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  setText(
    "timerDisplay",
    formatTimer(timerRemaining)
  );
}

function stopTimer(showMessage = true) {
  clearInterval(timer);
  timer = null;

  if (showMessage) {
    showToast("Countdown dihentikan");
  }
}

function initTimer() {
  updateTimerDisplay();

  $("startTimerBtn")?.addEventListener("click", () => {
    const minutes =
      Number($("countdownMinutes")?.value);

    if (!Number.isFinite(minutes) || minutes <= 0) {
      showToast("Masukkan durasi menit");
      return;
    }

    stopTimer(false);

    timerRemaining =
      Math.floor(minutes * 60);

    updateTimerDisplay();

    timer = setInterval(() => {
      timerRemaining -= 1;

      updateTimerDisplay();

      if (timerRemaining <= 0) {
        stopTimer(false);
        timerRemaining = 0;
        updateTimerDisplay();
        showToast("Countdown selesai");
      }
    }, 1000);

    showToast("Countdown dimulai");
  });

  $("stopTimerBtn")?.addEventListener("click", () => {
    stopTimer(true);
  });
}

/* =========================================================
   NOTES
========================================================= */

function updateNotesCounter() {
  const notes = $("classNotes");
  if (!notes) return;

  setText(
    "notesCount",
    `${notes.value.length} karakter`
  );
}

function initNotes() {
  const notes = $("classNotes");

  if (!notes) return;

  notes.value = state.notes;
  updateNotesCounter();

  notes.addEventListener("input", () => {
    state.notes = notes.value;
    saveState();
    updateNotesCounter();
  });

  $("clearNotesBtn")?.addEventListener("click", () => {
    notes.value = "";
    state.notes = "";

    saveState();
    updateNotesCounter();

    showToast("Catatan dibersihkan");
  });
}

/* =========================================================
   EXPORT + PRINT
========================================================= */

function buildExportData() {
  return {
    className: "XI TJKT 2",
    school: "SMK Negeri 1 Adiwerna",
    academicYear: "2026/2027",

    students: STUDENTS,

    schedule: SCHEDULE,

    duty: DUTY,

    rotation: {
      system: "2 siswa per minggu",
      currentWeek: state.rotationWeek,
      totalWeeks: 18,
      currentPair: getRotationPair()
    },

    notes: state.notes,

    exportedAt: new Date().toISOString()
  };
}

function downloadJSON(filename, data) {
  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: "application/json" }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function initExport() {
  $("exportBtn")?.addEventListener("click", () => {
    try {
      downloadJSON(
        "XI-TJKT-2-data.json",
        buildExportData()
      );

      showToast("Data berhasil diekspor");
    } catch (error) {
      console.error(error);
      showToast("Export gagal");
    }
  });

  $("printBtn")?.addEventListener("click", () => {
    window.print();
  });
}

/* =========================================================
   KEYBOARD + EXTRA
========================================================= */

function initKeyboard() {
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      $("sidebar")?.classList.remove("open");
    }

    if (
      event.ctrlKey &&
      event.key.toLowerCase() === "k"
    ) {
      event.preventDefault();

      const search = $("studentSearch");

      if (search) {
        search.focus();
        showToast("Search siswa aktif");
      }
    }

    if (
      event.ctrlKey &&
      event.key.toLowerCase() === "p"
    ) {
      event.preventDefault();

      window.print();
    }
  });
}

/* =========================================================
   AUTO OPEN DASHBOARD
========================================================= */

function initPageDefaults() {
  document.querySelectorAll(".dashboard").forEach(section => {
    section.classList.remove("active");
  });

  const active =
    $(state.view);

  if (active) {
    active.classList.add("active");
  }
}

/* =========================================================
   GLOBAL ERROR PROTECTION
========================================================= */

window.addEventListener("error", event => {
  console.error(
    "[XI TJKT 2 ERROR]",
    event.error || event.message
  );
});

/* =========================================================
   BOOT
========================================================= */

function boot() {
  try {
    updateClock();
    setInterval(updateClock, 1000);
  } catch (error) {
    console.error("[CLOCK]", error);
  }

  const modules = [
    ["Theme", initTheme],
    ["Navigation", initNavigation],
    ["Students", initStudents],
    ["Schedule", initSchedule],
    ["Duty Buttons", renderDutyButtons],
    ["Duty", renderDuty],
    ["Rotation", initRotation],
    ["IP Checker", initIpChecker],
    ["Subnet", initSubnet],
    ["Timer", initTimer],
    ["Notes", initNotes],
    ["Export", initExport],
    ["Random Tools", initRandomTools],
    ["Keyboard", initKeyboard],
    ["Page Defaults", initPageDefaults]
  ];

  for (const [name, fn] of modules) {
    try {
      fn();
      console.log(`[BOOT] ${name}: OK`);
    } catch (error) {
      console.error(`[BOOT] ${name}: ERROR`, error);
    }
  }

  showToast("XI TJKT 2 siap digunakan");
}

document.addEventListener(
  "DOMContentLoaded",
  boot
);
