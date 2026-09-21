'use strict';

/* =========================================================
   XI TJKT 2 — COMMAND CENTER
   Fresh JavaScript architecture
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

const APEL_PAIRS = Array.from(
  { length: 18 },
  (_, i) => [STUDENTS[i * 2], STUDENTS[i * 2 + 1]]
);

const PORTS = [
  ["20", "FTP Data"],
  ["21", "FTP Control"],
  ["22", "SSH"],
  ["23", "Telnet"],
  ["25", "SMTP"],
  ["53", "DNS"],
  ["67/68", "DHCP"],
  ["80", "HTTP"],
  ["110", "POP3"],
  ["143", "IMAP"],
  ["443", "HTTPS"],
  ["3306", "MySQL"],
  ["3389", "RDP"],
  ["8080", "HTTP Alternate"]
];

const OSI = [
  ["7", "Application", "HTTP, DNS, FTP, SMTP"],
  ["6", "Presentation", "Encoding, encryption, compression"],
  ["5", "Session", "Session establishment & control"],
  ["4", "Transport", "TCP, UDP, ports"],
  ["3", "Network", "IP, routing"],
  ["2", "Data Link", "Ethernet, MAC, switching"],
  ["1", "Physical", "Cable, fiber, signal"]
];

const RJ45 = [
  "White/Orange",
  "Orange",
  "White/Green",
  "Blue",
  "White/Blue",
  "Green",
  "White/Brown",
  "Brown"
];

const state = {
  activeDashboard: 1,
  scheduleType: "A",
  scheduleDay: getDayName(),
  studentSearch: "",
  studentFilter: "all",
  agendaTab: "schedule",
  calendarDate: new Date(),
  countdownTimer: null,
  countdownSeconds: 0,
  apelIndex: getApelIndex(),
  announcements: loadJSON("xi-tjkt2-announcements", [
    {
      title: "Selamat datang di Class Command Center",
      text: "Gunakan dashboard ini sebagai pusat informasi XI TJKT 2."
    }
  ]),
  tasks: loadJSON("xi-tjkt2-tasks", []),
  notes: localStorage.getItem("xi-tjkt2-notes") || ""
};

/* =========================================================
   HELPERS
========================================================= */

function $(id) {
  return document.getElementById(id);
}

function $all(selector) {
  return [...document.querySelectorAll(selector)];
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0])
    .join("");
}

function loadJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(
    "xi-tjkt2-announcements",
    JSON.stringify(state.announcements)
  );
  localStorage.setItem(
    "xi-tjkt2-tasks",
    JSON.stringify(state.tasks)
  );
  localStorage.setItem("xi-tjkt2-notes", state.notes);
}

function getDayName(date = new Date()) {
  const map = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
  ];
  return map[date.getDay()];
}

function showToast(message) {
  let container = $("toastContainer");

  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3200);
}

/* =========================================================
   DASHBOARD NAVIGATION
========================================================= */

function switchDashboard(number) {
  state.activeDashboard = Number(number);

  $all(".dashboard").forEach(section => {
    section.classList.toggle(
      "active",
      section.id === `dashboard${state.activeDashboard}`
    );
  });

  $all(".nav-item").forEach(button => {
    button.classList.toggle(
      "active",
      Number(button.dataset.dashboard) === state.activeDashboard
    );
  });

  const title = document.title;
  if (!title.includes("XI TJKT 2")) {
    document.title = "XI TJKT 2 — Command Center";
  }

  closeMobileSidebar();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initNavigation() {
  $all(".nav-item").forEach(button => {
    button.addEventListener("click", () => {
      switchDashboard(button.dataset.dashboard);
    });
  });

  const mobileMenu = $("mobileMenuButton");

  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      $("sidebar")?.classList.toggle("open");
    });
  }

  $("sidebarClose")?.addEventListener("click", closeMobileSidebar);
}

function closeMobileSidebar() {
  $("sidebar")?.classList.remove("open");
}

/* =========================================================
   CLOCK / DATE
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

  $all("[data-live-clock]").forEach(el => {
    el.textContent = time;
  });

  $all("[data-live-date]").forEach(el => {
    el.textContent = date;
  });

  const day = getDayName(now);
  if (DAYS.includes(day) && state.scheduleDay !== day) {
    state.scheduleDay = day;
    renderSchedule();
    renderDuty();
    renderCommandCenter();
  }

  renderCalendarIfVisible();
}

/* =========================================================
   COMMAND CENTER
========================================================= */

function renderCommandCenter() {
  const day = DAYS.includes(state.scheduleDay)
    ? state.scheduleDay
    : "Senin";

  const normalSubjects = SCHEDULE.A[day] || [];
  const kejuruanSubjects = SCHEDULE.B[day] || [];
  const duty = DUTY[day] || [];

  const commandSchedule = $("ccTodaySchedule");

  if (commandSchedule) {
    commandSchedule.innerHTML = [
      ...normalSubjects,
      ...kejuruanSubjects
    ]
      .slice(0, 6)
      .map(subject => `<div>${escapeHTML(subject)}</div>`)
      .join("");
  }

  const dutyList = $("ccTodayDuty");

  if (dutyList) {
    dutyList.innerHTML = duty
      .slice(0, 6)
      .map(name => `<div>${escapeHTML(name)}</div>`)
      .join("");
  }

  const apel = getCurrentApelPair();

  if ($("ccApelToday")) {
    $("ccApelToday").textContent = apel.today;
  }

  if ($("ccApelNext")) {
    $("ccApelNext").textContent = apel.next;
  }

  if ($("ccStudentCount")) {
    $("ccStudentCount").textContent = STUDENTS.length;
  }

  if ($("ccTaskCount")) {
    $("ccTaskCount").textContent =
      state.tasks.filter(task => !task.done).length;
  }

  renderAnnouncements();
  renderTasks();
  renderWeeklyAgenda();
}

/* =========================================================
   STUDENTS
========================================================= */

function renderStudents() {
  const grid = $("studentDirectory");

  if (!grid) return;

  const query = state.studentSearch.trim().toLowerCase();

  let filtered = STUDENTS.map((name, index) => ({
    name,
    number: index + 1
  }));

  if (query) {
    filtered = filtered.filter(student =>
      student.name.toLowerCase().includes(query)
    );
  }

  if (state.studentFilter === "odd") {
    filtered = filtered.filter(student => student.number % 2 === 1);
  }

  if (state.studentFilter === "even") {
    filtered = filtered.filter(student => student.number % 2 === 0);
  }

  grid.innerHTML = filtered
    .map(student => {
      const avatar = initials(student.name);

      return `
        <article class="student-card" data-student="${escapeHTML(student.name)}">
          <div class="student-card-top">
            <div class="student-number">#${String(student.number).padStart(2, "0")}</div>
            <div class="student-avatar">${escapeHTML(avatar)}</div>
          </div>
          <h3>${escapeHTML(student.name)}</h3>
          <p>XI TJKT 2 · Student Directory</p>
        </article>
      `;
    })
    .join("");

  const counter = $("studentResultCount");

  if (counter) {
    counter.textContent = `${filtered.length} siswa`;
  }

  $all(".student-card").forEach(card => {
    card.addEventListener("click", () => {
      openStudentModal(card.dataset.student);
    });
  });

  if ($("studentTotal")) {
    $("studentTotal").textContent = STUDENTS.length;
  }

  if ($("studentVisible")) {
    $("studentVisible").textContent = filtered.length;
  }
}

function openStudentModal(name) {
  const index = STUDENTS.indexOf(name);
  const modal = $("studentModal");

  if (!modal || index < 0) return;

  const nameElement = $("studentModalName");
  const numberElement = $("studentModalNumber");
  const avatarElement = $("studentModalAvatar");

  if (nameElement) nameElement.textContent = name;
  if (numberElement) {
    numberElement.textContent =
      `Nomor absen ${String(index + 1).padStart(2, "0")}`;
  }
  if (avatarElement) avatarElement.textContent = initials(name);

  modal.classList.add("open");
}

function closeStudentModal() {
  $("studentModal")?.classList.remove("open");
}

function randomStudent() {
  const student =
    STUDENTS[Math.floor(Math.random() * STUDENTS.length)];

  openStudentModal(student);
  showToast(`Random student: ${student}`);
}

/* =========================================================
   SCHEDULE + DUTY
========================================================= */

function renderSchedule() {
  const day = state.scheduleDay;

  $all("[data-schedule-type]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.scheduleType === state.scheduleType
    );
  });

  $all("[data-schedule-day]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.scheduleDay === day
    );
  });

  const target = $("scheduleList");

  if (!target) return;

  target.innerHTML = DAYS.map(dayName => {
    const subjects = SCHEDULE[state.scheduleType][dayName] || [];
    const active = dayName === day;

    return `
      <div class="schedule-day ${active ? "active" : ""}">
        <strong>${dayName}</strong>
        <div class="subjects">
          ${subjects.map(subject =>
            `<span class="subject">${escapeHTML(subject)}</span>`
          ).join("")}
        </div>
      </div>
    `;
  }).join("");
}

function renderDuty() {
  const target = $("dutyGrid");

  if (!target) return;

  target.innerHTML = DAYS.map(day => `
    <div class="duty-day ${day === state.scheduleDay ? "active" : ""}">
      <h4>${day}</h4>
      <ol>
        ${(DUTY[day] || [])
          .map(name => `<li>${escapeHTML(name)}</li>`)
          .join("")}
      </ol>
    </div>
  `).join("");
}

/* =========================================================
   ANNOUNCEMENTS
========================================================= */

function renderAnnouncements() {
  const targets = [
    $("announcementList"),
    $("ccAnnouncements")
  ].filter(Boolean);

  targets.forEach(target => {
    if (!state.announcements.length) {
      target.innerHTML =
        `<div class="empty-state">Belum ada pengumuman.</div>`;
      return;
    }

    target.innerHTML = state.announcements
      .slice()
      .reverse()
      .slice(0, 5)
      .map(item => `
        <article class="announcement-item">
          <strong>${escapeHTML(item.title)}</strong>
          <p>${escapeHTML(item.text)}</p>
        </article>
      `)
      .join("");
  });
}

function addAnnouncement() {
  const title = $("announcementTitle")?.value.trim();
  const text = $("announcementText")?.value.trim();

  if (!title || !text) {
    showToast("Isi judul dan isi pengumuman dulu.");
    return;
  }

  state.announcements.push({ title, text });
  saveState();
  renderAnnouncements();

  if ($("announcementTitle")) $("announcementTitle").value = "";
  if ($("announcementText")) $("announcementText").value = "";

  showToast("Pengumuman ditambahkan.");
}

/* =========================================================
   TASK MANAGER
========================================================= */

function renderTasks() {
  const targets = [
    $("taskList"),
    $("ccTasks")
  ].filter(Boolean);

  targets.forEach(target => {
    if (!state.tasks.length) {
      target.innerHTML =
        `<div class="empty-state">Belum ada tugas.</div>`;
      return;
    }

    target.innerHTML = state.tasks
      .map((task, index) => `
        <article class="task-item ${task.done ? "done" : ""}">
          <input
            class="task-check"
            type="checkbox"
            data-task-index="${index}"
            ${task.done ? "checked" : ""}
          >
          <div>
            <strong>${escapeHTML(task.title)}</strong>
            <p>${escapeHTML(task.deadline || "Tanpa deadline")}</p>
          </div>
        </article>
      `)
      .join("");
  });

  $all(".task-check").forEach(check => {
    check.addEventListener("change", () => {
      const index = Number(check.dataset.taskIndex);
      if (state.tasks[index]) {
        state.tasks[index].done = check.checked;
        saveState();
        renderTasks();
        renderCommandCenter();
      }
    });
  });
}

function addTask() {
  const title = $("taskTitle")?.value.trim();
  const deadline = $("taskDeadline")?.value.trim();

  if (!title) {
    showToast("Isi nama tugas dulu.");
    return;
  }

  state.tasks.push({
    title,
    deadline,
    done: false
  });

  saveState();
  renderTasks();
  renderCommandCenter();

  if ($("taskTitle")) $("taskTitle").value = "";
  if ($("taskDeadline")) $("taskDeadline").value = "";

  showToast("Tugas ditambahkan.");
}

/* =========================================================
   GLOBAL SEARCH
========================================================= */

function globalSearch(query) {
  const target = $("globalSearchResults");

  if (!target) return;

  const q = query.trim().toLowerCase();

  if (!q) {
    target.innerHTML =
      `<div class="empty-state">Ketik nama siswa, mapel, atau kata kunci.</div>`;
    return;
  }

  const results = [];

  STUDENTS.forEach((name, index) => {
    if (name.toLowerCase().includes(q)) {
      results.push({
        type: "SISWA",
        title: name,
        detail: `Nomor ${index + 1}`
      });
    }
  });

  Object.entries(SCHEDULE).forEach(([type, days]) => {
    Object.entries(days).forEach(([day, subjects]) => {
      subjects.forEach(subject => {
        if (subject.toLowerCase().includes(q)) {
          results.push({
            type: "JADWAL",
            title: subject,
            detail: `${day} · Block ${type}`
          });
        }
      });
    });
  });

  Object.entries(DUTY).forEach(([day, names]) => {
    names.forEach(name => {
      if (name.toLowerCase().includes(q)) {
        results.push({
          type: "PIKET",
          title: name,
          detail: `Piket ${day}`
        });
      }
    });
  });

  if (!results.length) {
    target.innerHTML =
      `<div class="empty-state">Tidak ada hasil untuk "${escapeHTML(query)}".</div>`;
    return;
  }

  target.innerHTML = results
    .slice(0, 15)
    .map(result => `
      <article class="announcement-item">
        <span class="badge">${escapeHTML(result.type)}</span>
        <strong>${escapeHTML(result.title)}</strong>
        <p>${escapeHTML(result.detail)}</p>
      </article>
    `)
    .join("");
}

/* =========================================================
   WEEKLY AGENDA
========================================================= */

function renderWeeklyAgenda() {
  const target = $("weeklyAgenda");

  if (!target) return;

  target.innerHTML = DAYS.map(day => {
    const normal = SCHEDULE.A[day] || [];
    const kejuruan = SCHEDULE.B[day] || [];

    return `
      <div class="week-card ${day === state.scheduleDay ? "active" : ""}">
        <span>${day.toUpperCase()}</span>
        <strong>${normal.length + kejuruan.length} sesi</strong>
        <p>${escapeHTML([...normal, ...kejuruan].slice(0, 3).join(" · "))}</p>
      </div>
    `;
  }).join("");
}

/* =========================================================
   APEL — 18 PAIRS
========================================================= */

function getApelIndex() {
  const stored = Number(localStorage.getItem("xi-tjkt2-apel-index"));

  if (
    Number.isInteger(stored) &&
    stored >= 0 &&
    stored < APEL_PAIRS.length
  ) {
    return stored;
  }

  return 0;
}

function getCurrentApelPair() {
  const todayPair = APEL_PAIRS[state.apelIndex];
  const nextPair = APEL_PAIRS[(state.apelIndex + 1) % APEL_PAIRS.length];

  return {
    today: todayPair[0],
    next: todayPair[1],
    nextPair,
    pair: todayPair
  };
}

function renderApel() {
  const current = getCurrentApelPair();

  if ($("apelTodayName")) {
    $("apelTodayName").textContent = current.today;
  }

  if ($("apelNextName")) {
    $("apelNextName").textContent = current.next;
  }

  if ($("apelTodayAvatar")) {
    $("apelTodayAvatar").textContent = initials(current.today);
  }

  if ($("apelNextAvatar")) {
    $("apelNextAvatar").textContent = initials(current.next);
  }

  if ($("apelPairNumber")) {
    $("apelPairNumber").textContent =
      `PAIR ${state.apelIndex + 1}`;
  }

  if ($("apelCurrentPair")) {
    $("apelCurrentPair").textContent =
      `${current.pair[0]} + ${current.pair[1]}`;
  }

  const pairGrid = $("apelPairGrid");

  if (pairGrid) {
    pairGrid.innerHTML = APEL_PAIRS.map((pair, index) => `
      <div class="apel-pair ${index === state.apelIndex ? "active" : ""}">
        <span>WEEK ${index + 1}</span>
        <strong>${escapeHTML(pair[0])}</strong>
        <small>${escapeHTML(pair[1])}</small>
      </div>
    `).join("");
  }
}

function nextApelPair() {
  state.apelIndex =
    (state.apelIndex + 1) % APEL_PAIRS.length;

  localStorage.setItem(
    "xi-tjkt2-apel-index",
    String(state.apelIndex)
  );

  renderApel();
  renderCommandCenter();

  showToast(`Apel berpindah ke Week ${state.apelIndex + 1}.`);
}

function resetApel() {
  state.apelIndex = 0;

  localStorage.setItem(
    "xi-tjkt2-apel-index",
    "0"
  );

  renderApel();
  renderCommandCenter();

  showToast("Siklus apel kembali ke Week 1.");
}

/* =========================================================
   IPv4 ANALYZER
========================================================= */

function ipToNumber(ip) {
  const parts = ip.split(".").map(Number);

  if (
    parts.length !== 4 ||
    parts.some(
      part => !Number.isInteger(part) || part < 0 || part > 255
    )
  ) {
    return null;
  }

  return (
    ((parts[0] << 24) >>> 0) +
    (parts[1] << 16) +
    (parts[2] << 8) +
    parts[3]
  ) >>> 0;
}

function numberToIp(number) {
  return [
    (number >>> 24) & 255,
    (number >>> 16) & 255,
    (number >>> 8) & 255,
    number & 255
  ].join(".");
}

function prefixToMask(prefix) {
  if (prefix < 0 || prefix > 32) return null;

  if (prefix === 0) return 0;

  return (0xffffffff << (32 - prefix)) >>> 0;
}

function analyzeIPv4(value) {
  const input = value.trim();
  const match = input.match(/^(\d+\.\d+\.\d+\.\d+)(?:\/(\d{1,2}))?$/);

  if (!match) {
    return "Format tidak valid. Contoh: 192.168.1.10/24";
  }

  const ip = match[1];
  const prefix = match[2] === undefined
    ? 24
    : Number(match[2]);

  const ipNumber = ipToNumber(ip);
  const mask = prefixToMask(prefix);

  if (ipNumber === null || mask === null) {
    return "IPv4 atau prefix tidak valid.";
  }

  const network = (ipNumber & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;

  const hosts =
    prefix >= 31
      ? Math.pow(2, 32 - prefix)
      : Math.max(0, Math.pow(2, 32 - prefix) - 2);

  const firstHost =
    prefix >= 31
      ? numberToIp(network)
      : numberToIp((network + 1) >>> 0);

  const lastHost =
    prefix >= 31
      ? numberToIp(broadcast)
      : numberToIp((broadcast - 1) >>> 0);

  const binary =
    ip.split(".")
      .map(part => Number(part).toString(2).padStart(8, "0"))
      .join(".");

  return `
    <strong>Network:</strong> ${numberToIp(network)}<br>
    <strong>Broadcast:</strong> ${numberToIp(broadcast)}<br>
    <strong>First Host:</strong> ${firstHost}<br>
    <strong>Last Host:</strong> ${lastHost}<br>
    <strong>Prefix:</strong> /${prefix}<br>
    <strong>Usable / addresses:</strong> ${hosts.toLocaleString("id-ID")}<br>
    <strong>Binary:</strong> ${binary}
  `;
}

function checkIp() {
  const input = $("labIpInput")?.value || "";
  const result = $("labIpResult");

  if (!result) return;

  result.innerHTML = analyzeIPv4(input);
}

/* =========================================================
   SUBNET CALCULATOR
========================================================= */

function calculateSubnet() {
  const ip = $("subnetIp")?.value.trim() || "";
  const prefix = Number($("subnetPrefix")?.value || 24);
  const result = $("subnetResult");

  if (!result) return;

  const ipNumber = ipToNumber(ip);
  const mask = prefixToMask(prefix);

  if (ipNumber === null || mask === null) {
    result.textContent = "Masukkan IPv4 dan prefix yang valid.";
    return;
  }

  const network = (ipNumber & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const total = Math.pow(2, 32 - prefix);
  const usable = prefix <= 30 ? Math.max(total - 2, 0) : total;

  result.innerHTML = `
    Network: <strong>${numberToIp(network)}</strong><br>
    Broadcast: <strong>${numberToIp(broadcast)}</strong><br>
    Total addresses: <strong>${total}</strong><br>
    Usable hosts: <strong>${usable}</strong>
  `;
}

/* =========================================================
   DECIMAL / BINARY
========================================================= */

function decimalToBinary() {
  const input = $("decimalInput")?.value.trim() || "";
  const result = $("binaryResult");

  if (!result) return;

  const number = Number(input);

  if (!Number.isInteger(number) || number < 0) {
    result.textContent = "Masukkan bilangan bulat positif.";
    return;
  }

  result.textContent = number.toString(2);
}

function binaryToDecimal() {
  const input = $("binaryInput")?.value.trim() || "";
  const result = $("decimalResult");

  if (!result) return;

  if (!/^[01]+$/.test(input)) {
    result.textContent = "Binary hanya boleh berisi 0 dan 1.";
    return;
  }

  result.textContent = parseInt(input, 2).toString(10);
}

/* =========================================================
   MAC FORMATTER
========================================================= */

function formatMac() {
  const input = $("macInput")?.value || "";
  const result = $("macResult");

  if (!result) return;

  const clean = input
    .replace(/[^a-fA-F0-9]/g, "")
    .slice(0, 12)
    .toUpperCase();

  if (clean.length !== 12) {
    result.textContent = "MAC harus terdiri dari 12 digit hex.";
    return;
  }

  const colon = clean.match(/.{2}/g).join(":");
  const hyphen = clean.match(/.{2}/g).join("-");
  const cisco = clean.match(/.{4}/g).join(".");

  result.innerHTML = `
    Colon: ${colon}<br>
    Hyphen: ${hyphen}<br>
    Cisco: ${cisco}
  `;
}

/* =========================================================
   PORT SEARCH
========================================================= */

function searchPort(query) {
  const target = $("portResults");

  if (!target) return;

  const q = query.trim().toLowerCase();

  const results = PORTS.filter(([port, service]) =>
    `${port} ${service}`.toLowerCase().includes(q)
  );

  if (!results.length) {
    target.innerHTML =
      `<div class="empty-state compact">Port tidak ditemukan.</div>`;
    return;
  }

  target.innerHTML = results.map(([port, service]) => `
    <div class="reference-row">
      <b>${escapeHTML(port)}</b>
      <span>${escapeHTML(service)}</span>
    </div>
  `).join("");
}

/* =========================================================
   HTTP STATUS
========================================================= */

const HTTP_STATUS = [
  ["200", "OK"],
  ["201", "Created"],
  ["204", "No Content"],
  ["301", "Moved Permanently"],
  ["302", "Found"],
  ["400", "Bad Request"],
  ["401", "Unauthorized"],
  ["403", "Forbidden"],
  ["404", "Not Found"],
  ["405", "Method Not Allowed"],
  ["408", "Request Timeout"],
  ["429", "Too Many Requests"],
  ["500", "Internal Server Error"],
  ["502", "Bad Gateway"],
  ["503", "Service Unavailable"],
  ["504", "Gateway Timeout"]
];

function searchHttpStatus(query = "") {
  const target = $("httpStatusResults");

  if (!target) return;

  const q = query.trim().toLowerCase();

  const results = HTTP_STATUS.filter(([code, text]) =>
    `${code} ${text}`.toLowerCase().includes(q)
  );

  target.innerHTML = results.map(([code, text]) => `
    <div class="reference-row">
      <b>${code}</b>
      <span>${text}</span>
    </div>
  `).join("");
}

/* =========================================================
   DNS
========================================================= */

function showDnsInfo() {
  const target = $("dnsResult");

  if (!target) return;

  target.innerHTML = `
    <strong>A</strong> → IPv4 address<br>
    <strong>AAAA</strong> → IPv6 address<br>
    <strong>CNAME</strong> → Canonical name<br>
    <strong>MX</strong> → Mail server<br>
    <strong>NS</strong> → Authoritative nameserver<br>
    <strong>TXT</strong> → Text / verification data
  `;
}

/* =========================================================
   NOTES
========================================================= */

function initNotes() {
  const notes = $("notesArea");

  if (!notes) return;

  notes.value = state.notes;

  notes.addEventListener("input", () => {
    state.notes = notes.value;
    localStorage.setItem("xi-tjkt2-notes", state.notes);
  });
}

/* =========================================================
   COUNTDOWN
========================================================= */

function renderCountdown() {
  const target = $("countdownDisplay");

  if (!target) return;

  const total = Math.max(0, state.countdownSeconds);

  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  target.textContent =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}

function startCountdown() {
  const minutes = Number($("countdownMinutes")?.value || 0);
  const seconds = Number($("countdownSeconds")?.value || 0);

  state.countdownSeconds =
    Math.max(0, Math.floor(minutes * 60 + seconds));

  if (!state.countdownSeconds) {
    showToast("Masukkan durasi countdown.");
    return;
  }

  clearInterval(state.countdownTimer);

  renderCountdown();

  state.countdownTimer = setInterval(() => {
    state.countdownSeconds--;

    renderCountdown();

    if (state.countdownSeconds <= 0) {
      clearInterval(state.countdownTimer);
      showToast("Countdown selesai.");
    }
  }, 1000);
}

function pauseCountdown() {
  clearInterval(state.countdownTimer);
  state.countdownTimer = null;
}

function resetCountdown() {
  pauseCountdown();
  state.countdownSeconds = 0;
  renderCountdown();
}

/* =========================================================
   CALENDAR
========================================================= */

function renderCalendar() {
  const target = $("calendarGrid");

  if (!target) return;

  const year = state.calendarDate.getFullYear();
  const month = state.calendarDate.getMonth();

  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);

  const startDay = (first.getDay() + 6) % 7;
  const totalDays = last.getDate();

  const previousMonthDays =
    new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = startDay - 1; i >= 0; i--) {
    cells.push({
      day: previousMonthDays - i,
      muted: true
    });
  }

  for (let day = 1; day <= totalDays; day++) {
    cells.push({
      day,
      muted: false
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({
      day: cells.length - totalDays - startDay + 1,
      muted: true
    });
  }

  target.innerHTML = cells.map(cell => {
    const today = new Date();
    const isToday =
      !cell.muted &&
      cell.day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    return `
      <div class="calendar-cell ${cell.muted ? "muted" : ""} ${isToday ? "today" : ""}">
        <div class="calendar-number">${cell.day}</div>
      </div>
    `;
  }).join("");

  const title = $("calendarMonth");

  if (title) {
    title.textContent =
      state.calendarDate.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric"
      });
  }
}

function renderCalendarIfVisible() {
  if ($("dashboard3")?.classList.contains("active")) {
    renderCalendar();
  }
}

function changeCalendarMonth(offset) {
  state.calendarDate = new Date(
    state.calendarDate.getFullYear(),
    state.calendarDate.getMonth() + offset,
    1
  );

  renderCalendar();
}

function resetCalendar() {
  state.calendarDate = new Date();
  renderCalendar();
}

/* =========================================================
   EXPORT / PRINT
========================================================= */

function exportClassData() {
  const payload = {
    class: "XI TJKT 2",
    exportedAt: new Date().toISOString(),
    students: STUDENTS,
    schedule: SCHEDULE,
    duty: DUTY,
    apelPairs: APEL_PAIRS,
    activeApelPair: state.apelIndex + 1,
    announcements: state.announcements,
    tasks: state.tasks,
    notes: state.notes
  };

  const blob = new Blob(
    [JSON.stringify(payload, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = "XI-TJKT-2-class-data.json";
  anchor.click();

  URL.revokeObjectURL(url);

  showToast("Data class berhasil diexport.");
}

function printDashboard() {
  window.print();
}

/* =========================================================
   STATIC REFERENCES
========================================================= */

function renderReferences() {
  const osiTarget = $("osiReference");

  if (osiTarget) {
    osiTarget.innerHTML = OSI.map(([layer, name, detail]) => `
      <div class="reference-row">
        <b>L${layer}</b>
        <span><strong>${name}</strong> · ${detail}</span>
      </div>
    `).join("");
  }

  const rjTarget = $("rj45Reference");

  if (rjTarget) {
    rjTarget.innerHTML = RJ45.map((wire, index) => `
      <div class="rj45-pin">
        <b>${index + 1}</b>
        <span>${wire}</span>
      </div>
    `).join("");
  }

  searchPort("");

  searchHttpStatus("");

  showDnsInfo();
}

/* =========================================================
   EVENT BINDINGS
========================================================= */

function bindEvents() {

  $all("[data-schedule-type]").forEach(button => {
    button.addEventListener("click", () => {
      state.scheduleType = button.dataset.scheduleType;
      renderSchedule();
    });
  });

  $all("[data-schedule-day]").forEach(button => {
    button.addEventListener("click", () => {
      state.scheduleDay = button.dataset.scheduleDay;
      renderSchedule();
      renderDuty();
      renderCommandCenter();
    });
  });

  $("studentSearch")?.addEventListener("input", event => {
    state.studentSearch = event.target.value;
    renderStudents();
  });

  $("studentFilter")?.addEventListener("change", event => {
    state.studentFilter = event.target.value;
    renderStudents();
  });

  $("randomStudentButton")?.addEventListener(
    "click",
    randomStudent
  );

  $("studentModalClose")?.addEventListener(
    "click",
    closeStudentModal
  );

  $("studentModal")?.addEventListener("click", event => {
    if (event.target.classList.contains("modal-backdrop")) {
      closeStudentModal();
    }
  });

  $("addAnnouncementButton")?.addEventListener(
    "click",
    addAnnouncement
  );

  $("addTaskButton")?.addEventListener(
    "click",
    addTask
  );

  $("globalSearch")?.addEventListener(
    "input",
    event => globalSearch(event.target.value)
  );

  $("nextApelButton")?.addEventListener(
    "click",
    nextApelPair
  );

  $("resetApelButton")?.addEventListener(
    "click",
    resetApel
  );

  $("labIpButton")?.addEventListener(
    "click",
    checkIp
  );

  $("subnetButton")?.addEventListener(
    "click",
    calculateSubnet
  );

  $("decimalButton")?.addEventListener(
    "click",
    decimalToBinary
  );

  $("binaryButton")?.addEventListener(
    "click",
    binaryToDecimal
  );

  $("macButton")?.addEventListener(
    "click",
    formatMac
  );

  $("portSearch")?.addEventListener(
    "input",
    event => searchPort(event.target.value)
  );

  $("httpStatusSearch")?.addEventListener(
    "input",
    event => searchHttpStatus(event.target.value)
  );

  $("startCountdownButton")?.addEventListener(
    "click",
    startCountdown
  );

  $("pauseCountdownButton")?.addEventListener(
    "click",
    pauseCountdown
  );

  $("resetCountdownButton")?.addEventListener(
    "click",
    resetCountdown
  );

  $("calendarPrev")?.addEventListener(
    "click",
    () => changeCalendarMonth(-1)
  );

  $("calendarNext")?.addEventListener(
    "click",
    () => changeCalendarMonth(1)
  );

  $("calendarToday")?.addEventListener(
    "click",
    resetCalendar
  );

  $("exportButton")?.addEventListener(
    "click",
    exportClassData
  );

  $("printButton")?.addEventListener(
    "click",
    printDashboard
  );
}

/* =========================================================
   INITIAL RENDER
========================================================= */

function init() {
  initNavigation();
  bindEvents();

  renderStudents();
  renderSchedule();
  renderDuty();
  renderApel();
  renderCommandCenter();
  renderCalendar();
  renderReferences();
  initNotes();
  renderCountdown();

  updateClock();

  setInterval(updateClock, 1000);

  switchDashboard(1);

  console.log(
    `%cXI TJKT 2%c Command Center initialized`,
    "color:#38e8ff;font-weight:800",
    "color:#a855ff;font-weight:800"
  );
}

document.addEventListener("DOMContentLoaded", init);
