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

const SCHEDULE_A = {
  Senin: ["Matematika", "PAI BP", "Bahasa Inggris"],
  Selasa: ["Bahasa Indonesia", "Bahasa Jawa", "Sejarah", "PP"],
  Rabu: ["Sejarah", "PAI BP", "Bahasa Jawa", "Bahasa Inggris"],
  Kamis: ["Matematika", "Bahasa Indonesia", "KIK"],
  Jumat: ["KIK"]
};

const SCHEDULE_B = {
  Senin: ["Kejuruan"],
  Selasa: ["Kejuruan", "Mapil", "PJOK"],
  Rabu: ["Kejuruan"],
  Kamis: ["Kejuruan Infra"],
  Jumat: ["Bahasa Jepang"]
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

let currentDashboard = Number(localStorage.getItem("tjkt_dashboard")) || 1;
let rotationStart = Number(localStorage.getItem("tjkt_rotation_start")) || 23;
let rotationSize = Number(localStorage.getItem("tjkt_rotation_size")) || 18;

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
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

function init() {
  setupNavigation();
  setupClock();
  setupTheme();
  renderStudents();
  renderSchedules();
  renderDuty();
  renderRotation();
  setupTools();
  updateDashboard();

  const search = $("#studentSearch");
  if (search) {
    search.addEventListener("input", renderStudents);
  }

  const randomBtn = $("#randomStudentBtn");
  if (randomBtn) {
    randomBtn.addEventListener("click", randomStudent);
  }

  const rotationStartInput = $("#rotationStart");
  const rotationSizeInput = $("#rotationSize");

  if (rotationStartInput) {
    rotationStartInput.value = rotationStart;
    rotationStartInput.addEventListener("change", () => {
      rotationStart = clamp(Number(rotationStartInput.value) || 23, 1, 36);
      saveRotation();
      renderRotation();
    });
  }

  if (rotationSizeInput) {
    rotationSizeInput.value = rotationSize;
    rotationSizeInput.addEventListener("change", () => {
      rotationSize = clamp(Number(rotationSizeInput.value) || 18, 1, 36);
      saveRotation();
      renderRotation();
    });
  }

  const generateBtn = $("#generateRotation");
  if (generateBtn) generateBtn.addEventListener("click", renderRotation);

  const nextBtn = $("#nextRotation");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      rotationStart = rotationStart + rotationSize;
      while (rotationStart > 36) rotationStart -= 36;
      saveRotation();
      renderRotation();
    });
  }

  const shiftBtn = $("#shiftRotation");
  if (shiftBtn) {
    shiftBtn.addEventListener("click", () => {
      rotationStart++;
      if (rotationStart > 36) rotationStart = 1;
      saveRotation();
      renderRotation();
    });
  }

  const saveBtn = $("#saveRotation");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      saveRotation();
      showToast("Pembagian apel berhasil disimpan.");
    });
  }

  setupDutyChecklist();
  restoreNotes();
  updateDate();
}

document.addEventListener("DOMContentLoaded", init);

function setupNavigation() {
  $$(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const target = Number(button.dataset.dashboard);

      $$(".nav-btn").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      $$(".dashboard").forEach((panel) => {
        panel.classList.toggle(
          "active",
          Number(panel.dataset.dashboard) === target
        );
      });

      currentDashboard = target;
      localStorage.setItem("tjkt_dashboard", String(target));

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });
}

function updateDashboard() {
  const targetButton = $(`.nav-btn[data-dashboard="${currentDashboard}"]`);
  const targetPanel = $(`.dashboard[data-dashboard="${currentDashboard}"]`);

  if (targetButton) targetButton.classList.add("active");
  if (targetPanel) targetPanel.classList.add("active");
}

function setupClock() {
  const clock = $("#clock");
  if (!clock) return;

  function tick() {
    const now = new Date();

    clock.textContent = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  tick();
  setInterval(tick, 1000);
}

function updateDate() {
  const date = $("#currentDate");
  if (!date) return;

  const now = new Date();

  date.textContent = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function setupTheme() {
  const button = $("#themeToggle");
  const saved = localStorage.getItem("tjkt_theme");

  if (saved === "light") {
    document.body.classList.add("light-theme");
  }

  if (!button) return;

  button.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const mode = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";

    localStorage.setItem("tjkt_theme", mode);
  });
}

function renderStudents() {
  const container = $("#studentList");
  if (!container) return;

  const search = ($("#studentSearch")?.value || "").trim().toLowerCase();

  const filtered = STUDENTS
    .map((name, index) => ({
      number: index + 1,
      name
    }))
    .filter((student) =>
      student.name.toLowerCase().includes(search) ||
      String(student.number).includes(search)
    );

  container.innerHTML = filtered
    .map(
      (student) => `
        <div class="student-card">
          <span class="student-number">${student.number}</span>
          <div>
            <strong>${escapeHTML(student.name)}</strong>
            <small>Siswa XI TJKT 2</small>
          </div>
        </div>
      `
    )
    .join("");

  const count = $("#studentCount");
  if (count) count.textContent = `${filtered.length} siswa`;
}

function randomStudent() {
  const index = Math.floor(Math.random() * STUDENTS.length);
  const name = STUDENTS[index];

  const output = $("#randomStudentOutput");

  if (output) {
    output.innerHTML = `
      <span class="random-number">#${index + 1}</span>
      <strong>${escapeHTML(name)}</strong>
      <small>XI TJKT 2</small>
    `;
  }
}

function renderSchedules() {
  renderScheduleBlock("#scheduleA", SCHEDULE_A);
  renderScheduleBlock("#scheduleB", SCHEDULE_B);
}

function renderScheduleBlock(selector, schedule) {
  const container = $(selector);
  if (!container) return;

  container.innerHTML = DAYS.map((day) => {
    const subjects = schedule[day] || [];

    return `
      <div class="schedule-day">
        <div class="schedule-day-title">
          <span>${day}</span>
          <b>${subjects.length}</b>
        </div>

        <div class="subject-list">
          ${
            subjects.length
              ? subjects
                  .map(
                    (subject) =>
                      `<span class="subject-chip">${escapeHTML(subject)}</span>`
                  )
                  .join("")
              : `<span class="muted">Tidak ada jadwal</span>`
          }
        </div>
      </div>
    `;
  }).join("");
}

function renderDuty() {
  const container = $("#dutyGrid");
  if (!container) return;

  container.innerHTML = DAYS.map((day) => {
    const names = DUTY[day] || [];

    return `
      <div class="duty-card">
        <div class="duty-header">
          <strong>${day}</strong>
          <span>${names.length} siswa</span>
        </div>

        <ol>
          ${names
            .map((name) => `<li>${escapeHTML(name)}</li>`)
            .join("")}
        </ol>
      </div>
    `;
  }).join("");
}

function setupDutyChecklist() {
  const key = "tjkt_duty_checked";
  const saved = JSON.parse(localStorage.getItem(key) || "{}");

  $$(".duty-check").forEach((checkbox) => {
    const id = checkbox.dataset.id;

    checkbox.checked = Boolean(saved[id]);

    checkbox.addEventListener("change", () => {
      saved[id] = checkbox.checked;
      localStorage.setItem(key, JSON.stringify(saved));
    });
  });
}

function buildRotation(start, size) {
  const groupA = [];
  const groupB = [];

  for (let i = 0; i < size; i++) {
    const index = (start - 1 + i) % STUDENTS.length;
    groupA.push({
      number: index + 1,
      name: STUDENTS[index]
    });
  }

  for (let i = 0; i < size; i++) {
    const index = (start - 1 + size + i) % STUDENTS.length;
    groupB.push({
      number: index + 1,
      name: STUDENTS[index]
    });
  }

  return {
    groupA,
    groupB
  };
}

function renderRotation() {
  const groupAContainer = $("#apelGroupA");
  const groupBContainer = $("#apelGroupB");
  const sequenceContainer = $("#rotationSequence");

  if (!groupAContainer || !groupBContainer) return;

  rotationStart = clamp(rotationStart, 1, 36);
  rotationSize = clamp(rotationSize, 1, 36);

  const { groupA, groupB } = buildRotation(
    rotationStart,
    rotationSize
  );

  groupAContainer.innerHTML = groupA
    .map(
      (student) => `
        <div class="rotation-student">
          <span>${student.number}</span>
          <strong>${escapeHTML(student.name)}</strong>
        </div>
      `
    )
    .join("");

  groupBContainer.innerHTML = groupB
    .map(
      (student) => `
        <div class="rotation-student">
          <span>${student.number}</span>
          <strong>${escapeHTML(student.name)}</strong>
        </div>
      `
    )
    .join("");

  if (sequenceContainer) {
    sequenceContainer.innerHTML = Array.from(
      { length: STUDENTS.length },
      (_, i) => {
        const number = ((rotationStart - 1 + i) % 36) + 1;
        const activeA = i < rotationSize;
        const activeB = i >= rotationSize && i < rotationSize * 2;

        let className = "sequence-number";

        if (activeA) className += " group-a";
        if (activeB) className += " group-b";

        return `<span class="${className}">${number}</span>`;
      }
    ).join("");
  }

  const label = $("#rotationInfo");
  if (label) {
    const endA = ((rotationStart - 1 + rotationSize - 1) % 36) + 1;
    const endB =
      ((rotationStart - 1 + rotationSize * 2 - 1) % 36) + 1;

    label.textContent =
      `Mulai nomor ${rotationStart}. ` +
      `Apel 1: ${rotationStart}–${endA}. ` +
      `Apel 2 dilanjutkan sampai nomor ${endB}.`;
  }

  const startInput = $("#rotationStart");
  const sizeInput = $("#rotationSize");

  if (startInput) startInput.value = rotationStart;
  if (sizeInput) sizeInput.value = rotationSize;
}

function saveRotation() {
  localStorage.setItem(
    "tjkt_rotation_start",
    String(rotationStart)
  );

  localStorage.setItem(
    "tjkt_rotation_size",
    String(rotationSize)
  );
}

function setupTools() {
  const ipButton = $("#checkIpBtn");
  if (ipButton) {
    ipButton.addEventListener("click", checkIP);
  }

  const subnetButton = $("#subnetBtn");
  if (subnetButton) {
    subnetButton.addEventListener("click", calculateSubnet);
  }

  const countdownButton = $("#countdownBtn");
  if (countdownButton) {
    countdownButton.addEventListener("click", startCountdown);
  }

  const exportButton = $("#exportBtn");
  if (exportButton) {
    exportButton.addEventListener("click", exportClassData);
  }

  const printButton = $("#printBtn");
  if (printButton) {
    printButton.addEventListener("click", () => window.print());
  }

  const note = $("#classNotes");

  if (note) {
    note.addEventListener("input", () => {
      localStorage.setItem("tjkt_notes", note.value);
    });
  }
}

function checkIP() {
  const input = $("#ipInput");
  const output = $("#ipOutput");

  if (!input || !output) return;

  const ip = input.value.trim();

  if (!isValidIPv4(ip)) {
    output.innerHTML =
      `<span class="error-text">IPv4 tidak valid.</span>`;
    return;
  }

  const first = Number(ip.split(".")[0]);

  let ipClass = "";
  let range = "";

  if (first >= 1 && first <= 126) {
    ipClass = "A";
    range = "1.0.0.0 – 126.255.255.255";
  } else if (first >= 128 && first <= 191) {
    ipClass = "B";
    range = "128.0.0.0 – 191.255.255.255";
  } else if (first >= 192 && first <= 223) {
    ipClass = "C";
    range = "192.0.0.0 – 223.255.255.255";
  } else if (first >= 224 && first <= 239) {
    ipClass = "D";
    range = "224.0.0.0 – 239.255.255.255";
  } else {
    ipClass = "E";
    range = "240.0.0.0 – 255.255.255.255";
  }

  output.innerHTML = `
    <strong>IPv4: ${escapeHTML(ip)}</strong>
    <span>Class ${ipClass}</span>
    <small>Rentang: ${range}</small>
  `;
}

function isValidIPv4(ip) {
  const parts = ip.split(".");

  if (parts.length !== 4) return false;

  return parts.every((part) => {
    if (!/^\d+$/.test(part)) return false;

    const number = Number(part);
    return number >= 0 && number <= 255;
  });
}

function calculateSubnet() {
  const cidrInput = $("#cidrInput");
  const output = $("#subnetOutput");

  if (!cidrInput || !output) return;

  const cidr = Number(cidrInput.value);

  if (!Number.isInteger(cidr) || cidr < 0 || cidr > 32) {
    output.innerHTML =
      `<span class="error-text">CIDR harus antara /0 sampai /32.</span>`;
    return;
  }

  const addresses = Math.pow(2, 32 - cidr);
  const usable =
    cidr >= 31 ? addresses : Math.max(addresses - 2, 0);

  const mask = cidrToMask(cidr);

  output.innerHTML = `
    <div><strong>Subnet Mask</strong><span>${mask}</span></div>
    <div><strong>Total Address</strong><span>${addresses.toLocaleString("id-ID")}</span></div>
    <div><strong>Usable Host</strong><span>${usable.toLocaleString("id-ID")}</span></div>
  `;
}

function cidrToMask(cidr) {
  const mask = [];

  for (let i = 0; i < 4; i++) {
    const bits = Math.max(0, Math.min(8, cidr - i * 8));

    if (bits === 0) {
      mask.push(0);
    } else {
      mask.push(256 - Math.pow(2, 8 - bits));
    }
  }

  return mask.join(".");
}

function startCountdown() {
  const input = $("#countdownMinutes");
  const output = $("#countdownOutput");

  if (!input || !output) return;

  let seconds = Math.max(
    1,
    Math.floor(Number(input.value) * 60)
  );

  clearInterval(window.tjktCountdown);

  function update() {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;

    output.textContent =
      `${String(minutes).padStart(2, "0")}:` +
      `${String(remaining).padStart(2, "0")}`;

    if (seconds <= 0) {
      clearInterval(window.tjktCountdown);
      showToast("Waktu habis.");
      return;
    }

    seconds--;
  }

  update();

  window.tjktCountdown = setInterval(update, 1000);
}

function restoreNotes() {
  const note = $("#classNotes");
  if (!note) return;

  note.value = localStorage.getItem("tjkt_notes") || "";
}

function exportClassData() {
  const data = {
    className: "XI TJKT 2",
    totalStudents: STUDENTS.length,
    students: STUDENTS.map((name, index) => ({
      no: index + 1,
      name
    })),
    scheduleA: SCHEDULE_A,
    scheduleB: SCHEDULE_B,
    duty: DUTY,
    rotation: {
      start: rotationStart,
      groupSize: rotationSize
    },
    exportedAt: new Date().toISOString()
  };

  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "XI-TJKT-2-data.json";
  link.click();

  URL.revokeObjectURL(url);

  showToast("Data XI TJKT 2 berhasil diekspor.");
}

function showToast(message) {
  let toast = $("#tjktToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "tjktToast";
    toast.className = "tjkt-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.tjktToastTimer);

  window.tjktToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

window.TJKT2 = {
  students: STUDENTS,
  scheduleA: SCHEDULE_A,
  scheduleB: SCHEDULE_B,
  duty: DUTY,
  buildRotation,
  randomStudent
};
