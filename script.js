"use strict";

/* =========================================================
   XI TJKT 2 — CLASS SERVER
   Vanilla JS / No External Library
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

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

const STORAGE = {
  theme: "xi-tjkt-2-theme",
  notes: "xi-tjkt-2-notes",
  dutyDone: "xi-tjkt-2-duty-done",
  rotationManual: "xi-tjkt-2-rotation-manual"
};

let timerId = null;
let timerSeconds = 300;
let timerRunning = false;

let activeBlock = "A";
let activeDutyDay = "Senin";
let manualRotationWeek = null;

const $ = (id) => document.getElementById(id);

function exists(id) {
  return Boolean($(id));
}

function getStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

function toast(message) {
  const el = $("toast");
  if (!el) return;

  el.textContent = message;
  el.classList.add("show");

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    el.classList.remove("show");
  }, 2200);
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

  if (exists("liveClock")) $("liveClock").textContent = time;
  if (exists("liveDate")) $("liveDate").textContent = date;
}

/* =========================================================
   THEME
   ========================================================= */

function initTheme() {
  const saved = getStorage(STORAGE.theme, "light");

  if (saved === "dark") {
    document.body.classList.add("dark");
  }

  $("themeToggle")?.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const mode = document.body.classList.contains("dark") ? "dark" : "light";
    setStorage(STORAGE.theme, mode);

    toast(mode === "dark" ? "Dark mode aktif." : "Light mode aktif.");
  });
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function showDashboard(viewId) {
  document.querySelectorAll(".dashboard").forEach((section) => {
    section.classList.toggle("active-dashboard", section.id === viewId);
  });

  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewId);
  });

  document.body.classList.remove("menu-open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initNavigation() {
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      showDashboard(button.dataset.view);
    });
  });

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => {
      showDashboard(button.dataset.go);
    });
  });

  $("mobileMenuBtn")?.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });

  document.addEventListener("click", (event) => {
    const sidebar = document.querySelector(".sidebar");
    const menuBtn = $("mobileMenuBtn");

    if (!document.body.classList.contains("menu-open")) return;
    if (!sidebar || !menuBtn) return;

    if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
      document.body.classList.remove("menu-open");
    }
  });
}

/* =========================================================
   STUDENTS
   ========================================================= */

function studentNumber(name) {
  return STUDENTS.indexOf(name) + 1;
}

function renderStudents(search = "") {
  const grid = $("studentGrid");
  const empty = $("studentEmpty");
  const count = $("studentCountLabel");

  if (!grid) return;

  const query = search.trim().toLowerCase();

  const filtered = STUDENTS
    .map((name, index) => ({ name, index: index + 1 }))
    .filter((item) => item.name.toLowerCase().includes(query));

  grid.innerHTML = filtered.map((student) => `
    <div class="student-card">
      <div class="student-number">${String(student.index).padStart(2, "0")}</div>
      <div>
        <strong>${escapeHtml(student.name)}</strong>
        <span>No. ${student.index} • XI TJKT 2</span>
      </div>
    </div>
  `).join("");

  if (count) {
    count.textContent = `${filtered.length} siswa`;
  }

  if (empty) {
    empty.classList.toggle("hidden", filtered.length !== 0);
  }
}

function renderDutyDistribution() {
  const holder = $("dutyDistribution");
  if (!holder) return;

  const max = Math.max(...Object.values(DUTY).map((list) => list.length));

  holder.innerHTML = DAYS.map((day) => {
    const value = DUTY[day].length;
    const percent = max ? Math.round((value / max) * 100) : 0;

    return `
      <div class="bar-item">
        <div class="bar-meta">
          <span>${day}</span>
          <span>${value} siswa</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${percent}%"></div>
        </div>
      </div>
    `;
  }).join("");
}

function randomStudent(target = "dashboard") {
  const index = Math.floor(Math.random() * STUDENTS.length);
  const name = STUDENTS[index];
  const number = index + 1;

  if (target === "dashboard") {
    if (exists("dashboardRandomResult")) {
      $("dashboardRandomResult").textContent = name;
    }

    if (exists("dashboardRandomMeta")) {
      $("dashboardRandomMeta").textContent = `No. ${number} • XI TJKT 2`;
    }
  }

  if (target === "tool") {
    if (exists("toolRandomResult")) {
      $("toolRandomResult").textContent = name;
    }

    if (exists("toolRandomMeta")) {
      $("toolRandomMeta").textContent = `No. ${number} • terpilih secara acak`;
    }
  }

  return name;
}

function initStudents() {
  renderStudents();
  renderDutyDistribution();

  $("studentSearch")?.addEventListener("input", (event) => {
    renderStudents(event.target.value);
  });

  $("clearStudentSearch")?.addEventListener("click", () => {
    if ($("studentSearch")) $("studentSearch").value = "";
    renderStudents("");
  });

  $("dashboardRandomBtn")?.addEventListener("click", () => {
    randomStudent("dashboard");
    toast("Siswa berhasil diacak.");
  });

  $("toolRandomBtn")?.addEventListener("click", () => {
    randomStudent("tool");
    toast("Siswa berhasil dipilih.");
  });
}

/* =========================================================
   SCHEDULE
   ========================================================= */

function renderSchedule() {
  const grid = $("scheduleGrid");
  if (!grid) return;

  const todayName = new Intl.DateTimeFormat("id-ID", {
    weekday: "long"
  }).format(new Date());

  $("scheduleTitle").textContent = `Jadwal Block ${activeBlock}`;
  $("scheduleCount").textContent = `${DAYS.length} hari`;

  grid.innerHTML = DAYS.map((day) => {
    const subjects = SCHEDULE[activeBlock][day] || [];
    const isToday = todayName === day;

    return `
      <article class="day-card ${isToday ? "active-today" : ""}">
        <div class="day-name">${day}</div>
        <div class="day-sub">${isToday ? "Hari ini" : "Jadwal kelas"}</div>

        <ul class="subject-list">
          ${subjects.map((subject) => `<li>${escapeHtml(subject)}</li>`).join("")}
        </ul>
      </article>
    `;
  }).join("");

  document.querySelectorAll("[data-block]").forEach((button) => {
    button.classList.toggle("active", button.dataset.block === activeBlock);
  });
}

function renderDutyTabs() {
  const holder = $("dutyDayTabs");
  if (!holder) return;

  holder.innerHTML = DAYS.map((day) => `
    <button class="day-tab ${day === activeDutyDay ? "active" : ""}" data-duty-day="${day}">
      ${day}
    </button>
  `).join("");

  holder.querySelectorAll("[data-duty-day]").forEach((button) => {
    button.addEventListener("click", () => {
      activeDutyDay = button.dataset.dutyDay;
      renderDutyTabs();
      renderDutyList();
    });
  });
}

function getDutyState() {
  try {
    return JSON.parse(getStorage(STORAGE.dutyDone, "{}")) || {};
  } catch {
    return {};
  }
}

function saveDutyState(state) {
  setStorage(STORAGE.dutyDone, JSON.stringify(state));
}

function renderDutyList() {
  const list = $("dutyList");
  if (!list) return;

  const state = getDutyState();
  const current = state[activeDutyDay] || {};

  list.innerHTML = (DUTY[activeDutyDay] || []).map((name) => {
    const id = `duty-${activeDutyDay}-${studentNumber(name)}`;
    const checked = Boolean(current[name]);

    return `
      <div class="duty-row ${checked ? "done" : ""}">
        <label for="${id}">
          <input id="${id}" type="checkbox" data-duty-name="${escapeAttribute(name)}" ${checked ? "checked" : ""}>
          <span>${escapeHtml(name)}</span>
        </label>

        <small>No. ${studentNumber(name)}</small>
      </div>
    `;
  }).join("");

  list.querySelectorAll("input[data-duty-name]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const latest = getDutyState();

      if (!latest[activeDutyDay]) latest[activeDutyDay] = {};

      latest[activeDutyDay][checkbox.dataset.dutyName] = checkbox.checked;
      saveDutyState(latest);

      renderDutyList();
      updateDutySummary();

      toast(
        checkbox.checked
          ? "Piket ditandai selesai."
          : "Checklist piket dibatalkan."
      );
    });
  });

  updateDutySummary();
}

function updateDutySummary() {
  const state = getDutyState();

  let total = 0;

  Object.values(state).forEach((dayState) => {
    total += Object.values(dayState || {}).filter(Boolean).length;
  });

  if (exists("dutyDoneSummary")) {
    $("dutyDoneSummary").textContent = `${total} selesai`;
  }
}

function initSchedule() {
  document.querySelectorAll("[data-block]").forEach((button) => {
    button.addEventListener("click", () => {
      activeBlock = button.dataset.block;
      renderSchedule();
      toast(`Jadwal Block ${activeBlock} aktif.`);
    });
  });

  renderSchedule();
  renderDutyTabs();
  renderDutyList();
}

/* =========================================================
   APEL ROTATION
   18 PASANGAN / 36 SISWA
   WEEK 1 = AHLIF ANNISA + ARINA MAZIYA
   ANCHOR MONDAY = 14 SEPTEMBER 2026
   ========================================================= */

const ROTATION_START = new Date("2026-09-14T00:00:00");

function getMonday(date) {
  const copy = new Date(date);
  const day = copy.getDay();

  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);

  return copy;
}

function getAutoRotationWeek() {
  const nowMonday = getMonday(new Date());

  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const diffWeeks = Math.floor(
    (nowMonday.getTime() - ROTATION_START.getTime()) / msPerWeek
  );

  let week = (diffWeeks % 18) + 1;

  if (week <= 0) week += 18;

  return week;
}

function getRotationPair(week) {
  const safeWeek = Math.min(18, Math.max(1, Number(week)));
  const firstIndex = (safeWeek - 1) * 2;

  return {
    week: safeWeek,
    first: STUDENTS[firstIndex],
    second: STUDENTS[firstIndex + 1]
  };
}

function getNextWeek(week) {
  return week >= 18 ? 1 : week + 1;
}

function renderRotationSelect() {
  const select = $("rotationWeek");
  if (!select) return;

  select.innerHTML = Array.from({ length: 18 }, (_, index) => {
    const week = index + 1;
    return `<option value="${week}">Minggu ${week}</option>`;
  }).join("");

  const selected = manualRotationWeek ?? getAutoRotationWeek();
  select.value = String(selected);
}

function renderRotationCards() {
  const autoWeek = getAutoRotationWeek();
  const currentWeek = manualRotationWeek ?? autoWeek;
  const nextWeek = getNextWeek(currentWeek);

  const current = getRotationPair(currentWeek);
  const next = getRotationPair(nextWeek);

  if (exists("currentStudentName")) {
    $("currentStudentName").textContent = current.first;
  }

  if (exists("currentStudentNumber")) {
    $("currentStudentNumber").textContent =
      `No. ${studentNumber(current.first)} • XI TJKT 2`;
  }

  if (exists("currentPairNumber")) {
    $("currentPairNumber").textContent = current.week;
  }

  if (exists("nextStudentName")) {
    $("nextStudentName").textContent = current.second;
  }

  if (exists("nextStudentNumber")) {
    $("nextStudentNumber").textContent =
      `No. ${studentNumber(current.second)} • XI TJKT 2`;
  }

  if (exists("nextPairNumber")) {
    $("nextPairNumber").textContent = current.week;
  }

  if (exists("rotationWeekText")) {
    $("rotationWeekText").textContent = `MINGGU ${current.week}`;
  }

  if (exists("rotationStatus")) {
    $("rotationStatus").textContent =
      manualRotationWeek ? `MANUAL • ${current.week}` : `AUTO • ${current.week}`;
  }

  if (exists("rotationModeBadge")) {
    $("rotationModeBadge").textContent =
      manualRotationWeek ? "MODE MANUAL" : "MODE OTOMATIS";
  }

  renderRotationSelect();
  renderRotationSequence(currentWeek);
}

function renderRotationSequence(activeWeek) {
  const holder = $("rotationSequence");
  if (!holder) return;

  holder.innerHTML = Array.from({ length: 18 }, (_, index) => {
    const week = index + 1;
    const pair = getRotationPair(week);

    return `
      <article class="rotation-item ${week === activeWeek ? "active" : ""}">
        <div class="rotation-item-head">
          <strong>MINGGU ${week}</strong>
          <span class="rotation-status">${week === activeWeek ? "AKTIF" : "PAIR"}</span>
        </div>
        <p><strong>01</strong> ${escapeHtml(pair.first)}</p>
        <p><strong>02</strong> ${escapeHtml(pair.second)}</p>
      </article>
    `;
  }).join("");
}

function initRotation() {
  const savedManual = getStorage(STORAGE.rotationManual, "");
  manualRotationWeek = savedManual ? Number(savedManual) : null;

  renderRotationCards();

  $("rotationWeek")?.addEventListener("change", (event) => {
    const value = Number(event.target.value);

    manualRotationWeek = value;
    setStorage(STORAGE.rotationManual, String(value));

    renderRotationCards();
    toast(`Minggu ${value} dipilih.`);
  });

  $("rotationAutoBtn")?.addEventListener("click", () => {
    manualRotationWeek = null;
    removeStorage(STORAGE.rotationManual);

    renderRotationCards();
    toast(`Mode otomatis aktif — Minggu ${getAutoRotationWeek()}.`);
  });

  $("rotationPrevBtn")?.addEventListener("click", () => {
    const current = manualRotationWeek ?? getAutoRotationWeek();
    const next = current <= 1 ? 18 : current - 1;

    manualRotationWeek = next;
    setStorage(STORAGE.rotationManual, String(next));

    renderRotationCards();
    toast(`Pindah ke Minggu ${next}.`);
  });

  $("rotationNextBtn")?.addEventListener("click", () => {
    const current = manualRotationWeek ?? getAutoRotationWeek();
    const next = current >= 18 ? 1 : current + 1;

    manualRotationWeek = next;
    setStorage(STORAGE.rotationManual, String(next));

    renderRotationCards();
    toast(`Pindah ke Minggu ${next}.`);
  });

  setInterval(() => {
    if (!manualRotationWeek) {
      renderRotationCards();
    }
  }, 60 * 1000);
}

/* =========================================================
   IP CHECKER
   ========================================================= */

function parseIPv4(value) {
  const parts = String(value).trim().split(".");

  if (parts.length !== 4) return null;

  const nums = parts.map((part) => {
    if (!/^\d+$/.test(part)) return NaN;
    return Number(part);
  });

  if (nums.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
    return null;
  }

  return nums;
}

function ipToInt(parts) {
  return (
    ((parts[0] << 24) >>> 0) +
    (parts[1] << 16) +
    (parts[2] << 8) +
    parts[3]
  ) >>> 0;
}

function intToIp(value) {
  return [
    (value >>> 24) & 255,
    (value >>> 16) & 255,
    (value >>> 8) & 255,
    value & 255
  ].join(".");
}

function getIpClass(firstOctet) {
  if (firstOctet >= 1 && firstOctet <= 126) return "A";
  if (firstOctet >= 128 && firstOctet <= 191) return "B";
  if (firstOctet >= 192 && firstOctet <= 223) return "C";
  if (firstOctet >= 224 && firstOctet <= 239) return "D";
  if (firstOctet >= 240 && firstOctet <= 255) return "E";
  return "Reserved";
}

function isPrivateIp(parts) {
  const [a, b] = parts;

  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;

  return false;
}

function initIpChecker() {
  $("checkIpBtn")?.addEventListener("click", () => {
    const value = $("ipInput")?.value || "";
    const parts = parseIPv4(value);

    if (!parts) {
      $("ipResult").innerHTML =
        `<strong>IP tidak valid.</strong><br>Gunakan format IPv4 seperti 192.168.1.1.`;
      return;
    }

    const ipClass = getIpClass(parts[0]);
    const privateLabel = isPrivateIp(parts) ? "Private" : "Public / Other";

    $("ipResult").innerHTML = `
      <strong>${escapeHtml(value.trim())}</strong><br>
      Kelas: <strong>${ipClass}</strong><br>
      Oktet: ${parts.join(" • ")}<br>
      Tipe: <strong>${privateLabel}</strong>
    `;
  });

  $("ipInput")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      $("checkIpBtn")?.click();
    }
  });
}

/* =========================================================
   SUBNET HELPER
   ========================================================= */

function prefixToMask(prefix) {
  if (prefix === 0) return 0;

  return (0xffffffff << (32 - prefix)) >>> 0;
}

function cidrParse(value) {
  const match = String(value).trim().match(/^(.+)\/(\d{1,2})$/);

  if (!match) return null;

  const parts = parseIPv4(match[1]);
  const prefix = Number(match[2]);

  if (!parts || prefix < 0 || prefix > 32) return null;

  const ipInt = ipToInt(parts);
  const mask = prefixToMask(prefix);
  const network = (ipInt & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;

  let total = 2 ** (32 - prefix);
  let usable = total;

  if (prefix <= 30) {
    usable = total - 2;
  }

  if (prefix === 31) {
    usable = 2;
  }

  if (prefix === 32) {
    usable = 1;
  }

  return {
    prefix,
    mask,
    network,
    broadcast,
    total,
    usable
  };
}

function initSubnet() {
  $("checkSubnetBtn")?.addEventListener("click", () => {
    const value = $("subnetInput")?.value || "";
    const result = cidrParse(value);

    if (!result) {
      $("subnetResult").innerHTML =
        `<strong>CIDR tidak valid.</strong><br>Contoh yang benar: 192.168.10.0/24`;
      return;
    }

    const firstHost =
      result.prefix <= 30
        ? intToIp((result.network + 1) >>> 0)
        : intToIp(result.network);

    const lastHost =
      result.prefix <= 30
        ? intToIp((result.broadcast - 1) >>> 0)
        : intToIp(result.broadcast);

    $("subnetResult").innerHTML = `
      <strong>/${result.prefix}</strong><br>
      Network: <strong>${intToIp(result.network)}</strong><br>
      Broadcast: <strong>${intToIp(result.broadcast)}</strong><br>
      First Host: ${firstHost}<br>
      Last Host: ${lastHost}<br>
      Subnet Mask: ${intToIp(result.mask)}<br>
      Total Address: ${result.total.toLocaleString("id-ID")}<br>
      Usable Host: ${result.usable.toLocaleString("id-ID")}
    `;
  });

  $("subnetInput")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      $("checkSubnetBtn")?.click();
    }
  });
}

/* =========================================================
   TIMER
   ========================================================= */

function formatTime(seconds) {
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60);
  const secs = safe % 60;

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  if (exists("timerDisplay")) {
    $("timerDisplay").textContent = formatTime(timerSeconds);
  }
}

function initTimer() {
  const minuteInput = $("countdownMinutes");

  function loadFromInput() {
    const minutes = Math.max(
      1,
      Math.min(180, Number(minuteInput?.value || 5))
    );

    timerSeconds = Math.round(minutes * 60);
    updateTimerDisplay();
  }

  minuteInput?.addEventListener("change", () => {
    if (timerRunning) return;
    loadFromInput();
  });

  $("startTimerBtn")?.addEventListener("click", () => {
    if (timerRunning) return;

    if (timerSeconds <= 0) {
      loadFromInput();
    }

    timerRunning = true;

    timerId = setInterval(() => {
      timerSeconds -= 1;
      updateTimerDisplay();

      if (timerSeconds <= 0) {
        timerSeconds = 0;
        timerRunning = false;
        clearInterval(timerId);
        timerId = null;
        updateTimerDisplay();
        toast("Countdown selesai.");
      }
    }, 1000);

    toast("Countdown dimulai.");
  });

  $("pauseTimerBtn")?.addEventListener("click", () => {
    if (!timerRunning) return;

    timerRunning = false;
    clearInterval(timerId);
    timerId = null;

    toast("Countdown dipause.");
  });

  $("resetTimerBtn")?.addEventListener("click", () => {
    timerRunning = false;
    clearInterval(timerId);
    timerId = null;

    loadFromInput();
    toast("Countdown direset.");
  });

  loadFromInput();
}

/* =========================================================
   NOTES
   ========================================================= */

function updateNotesCounter() {
  const text = $("classNotes")?.value || "";

  if (exists("notesCount")) {
    $("notesCount").textContent = `${text.length} karakter`;
  }
}

function initNotes() {
  const saved = getStorage(STORAGE.notes, "");

  if (exists("classNotes")) {
    $("classNotes").value = saved;
    updateNotesCounter();

    $("classNotes").addEventListener("input", () => {
      const value = $("classNotes").value;

      setStorage(STORAGE.notes, value);
      updateNotesCounter();
    });
  }

  $("clearNotesBtn")?.addEventListener("click", () => {
    if (!confirm("Hapus semua catatan kelas?")) return;

    if (exists("classNotes")) {
      $("classNotes").value = "";
    }

    removeStorage(STORAGE.notes);
    updateNotesCounter();

    toast("Catatan dibersihkan.");
  });
}

/* =========================================================
   EXPORT
   ========================================================= */

function buildExportData() {
  const dutyState = getDutyState();

  return {
    project: "XI TJKT 2 Class Server",
    exportedAt: new Date().toISOString(),
    students: STUDENTS.map((name, index) => ({
      number: index + 1,
      name
    })),
    schedule: SCHEDULE,
    duty: DUTY,
    dutyProgress: dutyState,
    rotation: {
      totalStudents: STUDENTS.length,
      totalPairs: 18,
      automaticWeek: getAutoRotationWeek(),
      selectedWeek: manualRotationWeek ?? getAutoRotationWeek(),
      rule: "2 students per week",
      pairs: Array.from({ length: 18 }, (_, index) => {
        const week = index + 1;
        const pair = getRotationPair(week);

        return {
          week,
          today: pair.first,
          next: pair.second
        };
      })
    }
  };
}

function initExport() {
  $("exportBtn")?.addEventListener("click", () => {
    const data = buildExportData();
    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "XI-TJKT-2-data.json";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);

    if (exists("exportStatus")) {
      $("exportStatus").textContent =
        "Export berhasil dibuat: XI-TJKT-2-data.json";
    }

    toast("JSON berhasil diexport.");
  });

  $("printBtn")?.addEventListener("click", () => {
    window.print();
  });
}

/* =========================================================
   KEYBOARD
   ========================================================= */

function initKeyboard() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.body.classList.remove("menu-open");
    }
  });
}

/* =========================================================
   UTILS
   ========================================================= */

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

/* =========================================================
   BOOT
   ========================================================= */

function boot() {
  updateClock();
  setInterval(updateClock, 1000);

  initTheme();
  initNavigation();
  initStudents();
  initSchedule();
  initRotation();
  initIpChecker();
  initSubnet();
  initTimer();
  initNotes();
  initExport();
  initKeyboard();

  if (exists("statStudents")) {
    $("statStudents").textContent = STUDENTS.length;
  }

  console.log("[XI TJKT 2] Class Server aktif.");
}

document.addEventListener("DOMContentLoaded", boot);
