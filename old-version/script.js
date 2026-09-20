/* =========================================================
   XI TJKT 2 — CLEAN FRONTEND CONTROLLER
   Rebuilt to be defensive: missing elements won't crash
   the whole page.
========================================================= */

(() => {
  "use strict";

  /* =========================
     DATA KELAS
  ========================= */

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

  /* =========================
     HELPERS
  ========================= */

  const $ = (selector, root = document) => {
    try {
      return root.querySelector(selector);
    } catch {
      return null;
    }
  };

  const $$ = (selector, root = document) => {
    try {
      return [...root.querySelectorAll(selector)];
    } catch {
      return [];
    }
  };

  function byIds(...ids) {
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) return el;
    }
    return null;
  }

  function setText(el, value) {
    if (el) el.textContent = value;
  }

  function esc(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function notify(message) {
    let box = document.getElementById("tjkt-toast");

    if (!box) {
      box = document.createElement("div");
      box.id = "tjkt-toast";
      Object.assign(box.style, {
        position: "fixed",
        left: "50%",
        bottom: "24px",
        transform: "translateX(-50%)",
        zIndex: "99999",
        padding: "12px 18px",
        borderRadius: "12px",
        background: "rgba(10,10,20,.94)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,.15)",
        boxShadow: "0 12px 35px rgba(0,0,0,.35)",
        pointerEvents: "none",
        opacity: "0",
        transition: "opacity .2s ease"
      });
      document.body.appendChild(box);
    }

    box.textContent = message;
    box.style.opacity = "1";

    clearTimeout(box._timer);
    box._timer = setTimeout(() => {
      box.style.opacity = "0";
    }, 1800);
  }

  /* =========================
     CLOCK
  ========================= */

  function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    const date = now.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

    const timeEls = [
      byIds("clock", "liveClock", "currentTime", "topClock"),
      $('[data-clock]')
    ];

    const dateEls = [
      byIds("date", "currentDate", "todayDate"),
      $('[data-date]')
    ];

    timeEls.filter(Boolean).forEach(el => setText(el, time));
    dateEls.filter(Boolean).forEach(el => setText(el, date));

    $$("[data-clock]").forEach(el => setText(el, time));
    $$("[data-date]").forEach(el => setText(el, date));
  }

  /* =========================
     THEME
  ========================= */

  function initTheme() {
    const saved = load("tjkt2-theme", "dark");

    document.documentElement.dataset.theme = saved;

    if (saved === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }

    const toggle =
      byIds("themeToggle", "theme-toggle", "toggleTheme") ||
      $('[data-action="theme"]');

    if (toggle) {
      toggle.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light");
        const theme = isLight ? "light" : "dark";

        document.documentElement.dataset.theme = theme;
        save("tjkt2-theme", theme);
        notify(`Mode ${theme === "light" ? "terang" : "gelap"} aktif`);
      });
    }
  }

  /* =========================
     NAVIGASI DASHBOARD
  ========================= */

  function initNavigation() {
    const panels = $$(
      "[data-dashboard], .dashboard-panel, .dashboard, .workspace-panel"
    );

    const buttons = $$(
      "[data-dashboard-target], [data-target-dashboard], .nav-btn, .menu-btn, .sidebar-btn"
    );

    if (!buttons.length) return;

    function showDashboard(target) {
      buttons.forEach(btn => {
        const btnTarget =
          btn.dataset.dashboardTarget ||
          btn.dataset.targetDashboard ||
          btn.dataset.dashboard;

        btn.classList.toggle("active", btnTarget === target);
      });

      panels.forEach(panel => {
        const panelTarget =
          panel.dataset.dashboard ||
          panel.dataset.dashboardId ||
          panel.id;

        if (
          panelTarget === target ||
          panel.id === target ||
          panel.id === `dashboard-${target}`
        ) {
          panel.classList.add("active");
          panel.hidden = false;
          panel.style.display = "";
        } else {
          panel.classList.remove("active");
          if (panel.dataset.dashboard || panel.dataset.dashboardId) {
            panel.hidden = true;
          }
        }
      });

      save("tjkt2-dashboard", target);
    }

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const target =
          btn.dataset.dashboardTarget ||
          btn.dataset.targetDashboard ||
          btn.dataset.dashboard ||
          btn.getAttribute("href")?.replace("#", "");

        if (target) showDashboard(target);
      });
    });

    const saved = load("tjkt2-dashboard", null);

    if (saved) {
      showDashboard(saved);
    } else {
      const first =
        buttons[0]?.dataset.dashboardTarget ||
        buttons[0]?.dataset.targetDashboard ||
        buttons[0]?.dataset.dashboard ||
        "dashboard1";

      showDashboard(first);
    }
  }

  /* =========================
     SISWA
  ========================= */

  function findStudentContainer() {
    return byIds(
      "studentList",
      "studentsList",
      "roster",
      "studentRoster",
      "studentGrid",
      "studentContainer"
    ) || $("[data-students]");
  }

  function renderStudents(query = "") {
    const container = findStudentContainer();
    if (!container) return;

    const q = query.trim().toLowerCase();

    const filtered = STUDENTS
      .map((name, index) => ({
        no: index + 1,
        name
      }))
      .filter(item => item.name.toLowerCase().includes(q));

    container.innerHTML = filtered.map(item => `
      <div class="student-card" data-student="${esc(item.name)}">
        <div class="student-number">${item.no}</div>
        <div class="student-name">${esc(item.name)}</div>
      </div>
    `).join("");

    const count = byIds("studentCount", "totalStudents", "studentsCount");
    setText(count, filtered.length);
  }

  function initStudents() {
    renderStudents();

    const search =
      byIds(
        "studentSearch",
        "searchStudent",
        "student-search",
        "searchStudents"
      ) || $('[data-student-search]');

    if (search) {
      search.addEventListener("input", e => {
        renderStudents(e.target.value);
      });
    }

    const randomButtons = $$(
      '[data-action="random-student"], #randomStudent, #random-student'
    );

    randomButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const name = STUDENTS[Math.floor(Math.random() * STUDENTS.length)];
        const output =
          byIds("randomStudentResult", "studentRandomResult", "randomStudentName") ||
          $('[data-random-student-result]');

        setText(output, name);
        notify(`Siswa terpilih: ${name}`);
      });
    });
  }

  /* =========================
     STATISTIK
  ========================= */

  function updateStats() {
    const values = {
      total: STUDENTS.length,
      days: 5,
      duty: Object.values(DUTY).reduce((n, arr) => n + arr.length, 0),
      subjects:
        [...new Set([
          ...Object.values(SCHEDULE_A).flat(),
          ...Object.values(SCHEDULE_B).flat()
        ])].length
    };

    setText(
      byIds("totalStudents", "studentTotal", "statStudents"),
      values.total
    );

    setText(
      byIds("totalDays", "dayTotal", "statDays"),
      values.days
    );

    setText(
      byIds("totalDuty", "dutyTotal", "statDuty"),
      values.duty
    );

    setText(
      byIds("totalSubjects", "subjectTotal", "statSubjects"),
      values.subjects
    );

    $$("[data-stat]").forEach(el => {
      const key = el.dataset.stat;
      if (key in values) el.textContent = values[key];
    });
  }

  /* =========================
     JADWAL
  ========================= */

  function renderScheduleBlock(data, selector) {
    const container =
      typeof selector === "string" ? $(selector) : selector;

    if (!container) return;

    container.innerHTML = Object.entries(data).map(([day, subjects]) => `
      <div class="schedule-day">
        <div class="schedule-day-title">${esc(day)}</div>
        <div class="schedule-subjects">
          ${subjects.map((subject, index) => `
            <div class="schedule-item">
              <span>${index + 1}</span>
              <strong>${esc(subject)}</strong>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  function initSchedule() {
    const a =
      byIds("scheduleA", "jadwalA", "blockA", "scheduleBlockA") ||
      $('[data-schedule="A"]');

    const b =
      byIds("scheduleB", "jadwalB", "blockB", "scheduleBlockB") ||
      $('[data-schedule="B"]');

    renderScheduleBlock(SCHEDULE_A, a);
    renderScheduleBlock(SCHEDULE_B, b);

    $$("[data-schedule-type]").forEach(el => {
      const type = el.dataset.scheduleType;
      renderScheduleBlock(
        type === "B" ? SCHEDULE_B : SCHEDULE_A,
        el
      );
    });
  }

  /* =========================
     PIKET
  ========================= */

  function renderDuty() {
    const containers = [
      byIds("dutyGrid", "piketGrid", "dutySchedule", "piketSchedule"),
      $('[data-duty]')
    ].filter(Boolean);

    if (!containers.length) return;

    containers.forEach(container => {
      container.innerHTML = Object.entries(DUTY).map(([day, students]) => `
        <div class="duty-card">
          <div class="duty-header">
            <h3>${esc(day)}</h3>
            <span>${students.length} siswa</span>
          </div>

          <div class="duty-list">
            ${students.map((name, index) => `
              <label class="duty-row">
                <input
                  type="checkbox"
                  data-duty-check="${esc(day)}"
                  data-student-check="${esc(name)}"
                />
                <span>${index + 1}. ${esc(name)}</span>
              </label>
            `).join("")}
          </div>
        </div>
      `).join("");
    });

    restoreDutyChecks();

    $$("[data-duty-check]").forEach(box => {
      box.addEventListener("change", saveDutyChecks);
    });
  }

  function saveDutyChecks() {
    const state = {};

    $$("[data-duty-check]").forEach(el => {
      const key = `${el.dataset.dutyCheck}|${el.dataset.studentCheck}`;
      state[key] = el.checked;
    });

    save("tjkt2-duty-checks", state);
  }

  function restoreDutyChecks() {
    const state = load("tjkt2-duty-checks", {});

    $$("[data-duty-check]").forEach(el => {
      const key = `${el.dataset.dutyCheck}|${el.dataset.studentCheck}`;
      el.checked = !!state[key];
    });
  }

  /* =========================
     APEL / BARIS
  ========================= */

  let rotationStart = Number(load("tjkt2-rotation-start", 23)) || 23;
  let groupSize = Number(load("tjkt2-group-size", 18)) || 18;

  function getRotationStudents(start = rotationStart) {
    const normalized = ((start - 1) % STUDENTS.length + STUDENTS.length) % STUDENTS.length;

    return Array.from({ length: STUDENTS.length }, (_, i) => {
      return STUDENTS[(normalized + i) % STUDENTS.length];
    });
  }

  function renderRotation() {
    const ordered = getRotationStudents(rotationStart);

    const group1 = ordered.slice(0, groupSize);
    const group2 = ordered.slice(groupSize, groupSize * 2);

    const g1 =
      byIds("group1", "apelGroup1", "rotationGroup1") ||
      $('[data-rotation-group="1"]');

    const g2 =
      byIds("group2", "apelGroup2", "rotationGroup2") ||
      $('[data-rotation-group="2"]');

    const strip =
      byIds("rotationSequence", "apelSequence", "rotationStrip") ||
      $('[data-rotation-sequence]');

    const startInput =
      byIds("rotationStart", "startStudent", "apelStart");

    const sizeInput =
      byIds("groupSize", "apelGroupSize");

    if (startInput) startInput.value = rotationStart;
    if (sizeInput) sizeInput.value = groupSize;

    const renderGroup = (container, group, title) => {
      if (!container) return;

      container.innerHTML = `
        <div class="rotation-group-title">${title}</div>
        <div class="rotation-count">${group.length} siswa</div>
        <div class="rotation-list">
          ${group.map(name => {
            const no = STUDENTS.indexOf(name) + 1;
            return `
              <div class="rotation-student">
                <span>${no}</span>
                <strong>${esc(name)}</strong>
              </div>
            `;
          }).join("")}
        </div>
      `;
    };

    renderGroup(g1, group1, "Kelompok 1");
    renderGroup(g2, group2, "Kelompok 2");

    if (strip) {
      strip.innerHTML = ordered.map((name, i) => `
        <span class="rotation-chip">
          ${STUDENTS.indexOf(name) + 1}. ${esc(name)}
        </span>
      `).join("");
    }
  }

  function initRotation() {
    renderRotation();

    const start =
      byIds("rotationStart", "startStudent", "apelStart");

    const size =
      byIds("groupSize", "apelGroupSize");

    const generateButtons = $$(
      "#generateRotation, #generateApel, [data-action='generate-rotation']"
    );

    const shiftButtons = $$(
      "#shiftRotation, #shiftApel, [data-action='shift-rotation']"
    );

    const saveButtons = $$(
      "#saveRotation, #saveApel, [data-action='save-rotation']"
    );

    const nextButtons = $$(
      "#nextWeekRotation, #nextWeek, [data-action='next-week']"
    );

    function applyInputs() {
      const s = Number(start?.value);

      if (Number.isFinite(s) && s >= 1 && s <= STUDENTS.length) {
        rotationStart = s;
      }

      const g = Number(size?.value);

      if (Number.isFinite(g) && g > 0 && g <= STUDENTS.length) {
        groupSize = Math.min(Math.floor(g), STUDENTS.length);
      }

      save("tjkt2-rotation-start", rotationStart);
      save("tjkt2-group-size", groupSize);

      renderRotation();
    }

    generateButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        applyInputs();
        notify("Pembagian apel dibuat");
      });
    });

    shiftButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        rotationStart += groupSize;

        if (rotationStart > STUDENTS.length) {
          rotationStart =
            ((rotationStart - 1) % STUDENTS.length) + 1;
        }

        save("tjkt2-rotation-start", rotationStart);

        renderRotation();

        if (start) start.value = rotationStart;

        notify(`Mulai dari nomor ${rotationStart}`);
      });
    });

    saveButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        applyInputs();
        notify("Pembagian disimpan");
      });
    });

    nextButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        rotationStart += groupSize;

        if (rotationStart > STUDENTS.length) {
          rotationStart =
            ((rotationStart - 1) % STUDENTS.length) + 1;
        }

        save("tjkt2-rotation-start", rotationStart);
        renderRotation();

        if (start) start.value = rotationStart;

        notify("Jadwal minggu berikutnya dibuat");
      });
    });

    [start, size].filter(Boolean).forEach(el => {
      el.addEventListener("change", applyInputs);
    });
  }

  /* =========================
     RANDOM SISWA
  ========================= */

  function initRandomStudent() {
    $$("[data-random]").forEach(btn => {
      btn.addEventListener("click", () => {
        const student =
          STUDENTS[Math.floor(Math.random() * STUDENTS.length)];

        const target =
          byIds(
            "randomStudent",
            "randomStudentResult",
            "randomName",
            "randomOutput"
          ) || $('[data-random-output]');

        setText(target, student);
        notify(student);
      });
    });
  }

  /* =========================
     IP CLASS CHECKER
  ========================= */

  function ipv4Parts(ip) {
    const parts = ip.trim().split(".");

    if (parts.length !== 4) return null;

    const nums = parts.map(Number);

    if (
      nums.some(
        n => !Number.isInteger(n) || n < 0 || n > 255
      )
    ) {
      return null;
    }

    return nums;
  }

  function getIPClass(ip) {
    const parts = ipv4Parts(ip);

    if (!parts) return null;

    const first = parts[0];

    if (first >= 1 && first <= 126) {
      return {
        class: "A",
        defaultMask: "255.0.0.0",
        range: "1.0.0.0 – 126.255.255.255"
      };
    }

    if (first >= 128 && first <= 191) {
      return {
        class: "B",
        defaultMask: "255.255.0.0",
        range: "128.0.0.0 – 191.255.255.255"
      };
    }

    if (first >= 192 && first <= 223) {
      return {
        class: "C",
        defaultMask: "255.255.255.0",
        range: "192.0.0.0 – 223.255.255.255"
      };
    }

    if (first >= 224 && first <= 239) {
      return {
        class: "D",
        defaultMask: "-",
        range: "224.0.0.0 – 239.255.255.255"
      };
    }

    if (first >= 240 && first <= 255) {
      return {
        class: "E",
        defaultMask: "-",
        range: "240.0.0.0 – 255.255.255.255"
      };
    }

    return null;
  }

  function initIPChecker() {
    const input =
      byIds("ipInput", "ipAddress", "ipCheckerInput");

    const button =
      byIds("checkIP", "checkIp", "ipCheckButton") ||
      $('[data-action="check-ip"]');

    const output =
      byIds("ipResult", "ipCheckerResult");

    if (!input || !button) return;

    button.addEventListener("click", () => {
      const result = getIPClass(input.value);

      if (!result) {
        setText(output, "IP tidak valid.");
        notify("Format IPv4 tidak valid");
        return;
      }

      if (output) {
        output.innerHTML = `
          <div><strong>Kelas:</strong> ${result.class}</div>
          <div><strong>Default Mask:</strong> ${result.defaultMask}</div>
          <div><strong>Range:</strong> ${result.range}</div>
        `;
      }

      notify(`IP ${input.value} = Class ${result.class}`);
    });
  }

  /* =========================
     SUBNET HELPER
  ========================= */

  function maskToCIDR(mask) {
    const parts = ipv4Parts(mask);

    if (!parts) return null;

    let binary = "";

    for (const part of parts) {
      binary += part.toString(2).padStart(8, "0");
    }

    if (!/^1*0*$/.test(binary)) return null;

    return binary.split("1").length - 1;
  }

  function cidrToMask(cidr) {
    cidr = Number(cidr);

    if (
      !Number.isInteger(cidr) ||
      cidr < 0 ||
      cidr > 32
    ) {
      return null;
    }

    let bits = "1".repeat(cidr) + "0".repeat(32 - cidr);

    const parts = [];

    for (let i = 0; i < 32; i += 8) {
      parts.push(parseInt(bits.slice(i, i + 8), 2));
    }

    return parts.join(".");
  }

  function ipToInt(ip) {
    const p = ipv4Parts(ip);
    if (!p) return null;

    return (
      ((p[0] << 24) >>> 0) +
      (p[1] << 16) +
      (p[2] << 8) +
      p[3]
    ) >>> 0;
  }

  function intToIP(int) {
    return [
      int >>> 24,
      (int >>> 16) & 255,
      (int >>> 8) & 255,
      int & 255
    ].join(".");
  }

  function initSubnet() {
    const ipInput =
      byIds("subnetIP", "networkIP", "subnetIpInput");

    const cidrInput =
      byIds("subnetCIDR", "cidrInput", "prefixInput");

    const button =
      byIds("calculateSubnet", "subnetCalculate") ||
      $('[data-action="calculate-subnet"]');

    const output =
      byIds("subnetResult", "subnetOutput");

    if (!ipInput || !cidrInput || !button) return;

    button.addEventListener("click", () => {
      const ipInt = ipToInt(ipInput.value);
      const cidr = Number(cidrInput.value);

      if (
        ipInt === null ||
        !Number.isInteger(cidr) ||
        cidr < 0 ||
        cidr > 32
      ) {
        setText(output, "Input subnet tidak valid.");
        notify("Subnet tidak valid");
        return;
      }

      const mask = cidrToMask(cidr);
      const maskInt = ipToInt(mask);

      const network = (ipInt & maskInt) >>> 0;
      const broadcast =
        (network | (~maskInt >>> 0)) >>> 0;

      const total = 2 ** (32 - cidr);

      const usable =
        cidr <= 30 ? Math.max(0, total - 2) : total;

      if (output) {
        output.innerHTML = `
          <div><strong>Network:</strong> ${intToIP(network)}</div>
          <div><strong>Broadcast:</strong> ${intToIP(broadcast)}</div>
          <div><strong>Mask:</strong> ${mask}</div>
          <div><strong>Prefix:</strong> /${cidr}</div>
          <div><strong>Total Address:</strong> ${total}</div>
          <div><strong>Usable Host:</strong> ${usable}</div>
        `;
      }

      notify("Subnet berhasil dihitung");
    });
  }

  /* =========================
     COUNTDOWN
  ========================= */

  let countdownTimer = null;

  function initCountdown() {
    const input =
      byIds(
        "countdownMinutes",
        "countdownInput",
        "timerMinutes"
      );

    const start =
      byIds("startCountdown", "countdownStart") ||
      $('[data-action="countdown-start"]');

    const stop =
      byIds("stopCountdown", "countdownStop") ||
      $('[data-action="countdown-stop"]');

    const output =
      byIds(
        "countdownDisplay",
        "countdownResult",
        "timerDisplay"
      );

    if (!start) return;

    start.addEventListener("click", () => {
      const minutes = Number(input?.value);

      if (!Number.isFinite(minutes) || minutes <= 0) {
        notify("Masukkan durasi countdown");
        return;
      }

      let seconds = Math.floor(minutes * 60);

      clearInterval(countdownTimer);

      const draw = () => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;

        setText(
          output,
          `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
        );

        if (seconds <= 0) {
          clearInterval(countdownTimer);
          notify("Countdown selesai");
          return;
        }

        seconds--;
      };

      draw();
      countdownTimer = setInterval(draw, 1000);
    });

    stop?.addEventListener("click", () => {
      clearInterval(countdownTimer);
      notify("Countdown dihentikan");
    });
  }

  /* =========================
     CATATAN KELAS
  ========================= */

  function initNotes() {
    const textarea =
      byIds(
        "classNotes",
        "notes",
        "notesArea",
        "classNotesInput"
      );

    const saveButton =
      byIds("saveNotes", "saveClassNotes") ||
      $('[data-action="save-notes"]');

    const clearButton =
      byIds("clearNotes", "clearClassNotes") ||
      $('[data-action="clear-notes"]');

    if (!textarea) return;

    textarea.value = load("tjkt2-notes", "");

    saveButton?.addEventListener("click", () => {
      save("tjkt2-notes", textarea.value);
      notify("Catatan disimpan");
    });

    clearButton?.addEventListener("click", () => {
      textarea.value = "";
      save("tjkt2-notes", "");
      notify("Catatan dikosongkan");
    });
  }

  /* =========================
     EXPORT JSON
  ========================= */

  function initExport() {
    const buttons = $$(
      "#exportData, #exportJSON, [data-action='export-json']"
    );

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const data = {
          class: "XI TJKT 2",
          exportedAt: new Date().toISOString(),
          students: STUDENTS,
          scheduleA: SCHEDULE_A,
          scheduleB: SCHEDULE_B,
          duty: DUTY,
          rotation: {
            start: rotationStart,
            groupSize
          },
          notes: load("tjkt2-notes", "")
        };

        const blob = new Blob(
          [JSON.stringify(data, null, 2)],
          { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = "XI-TJKT-2-data.json";
        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(url);

        notify("Data JSON diekspor");
      });
    });
  }

  /* =========================
     PRINT
  ========================= */

  function initPrint() {
    $$(
      "#printPage, #printData, [data-action='print']"
    ).forEach(btn => {
      btn.addEventListener("click", () => window.print());
    });
  }

  /* =========================
     CHART
  ========================= */

  function initChart() {
    if (typeof Chart === "undefined") return;

    const canvas =
      byIds(
        "dutyChart",
        "classChart",
        "trafficChart",
        "activityChart"
      );

    if (!canvas) return;

    const days = Object.keys(DUTY);
    const values = days.map(day => DUTY[day].length);

    try {
      if (canvas._tjktChart) {
        canvas._tjktChart.destroy();
      }

      canvas._tjktChart = new Chart(canvas, {
        type: "bar",
        data: {
          labels: days,
          datasets: [{
            label: "Jumlah Siswa Piket",
            data: values,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          plugins: {
            legend: {
              display: true
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              }
            }
          }
        }
      });
    } catch {
      // Chart gagal tidak boleh mematikan fungsi lain.
    }
  }

  /* =========================
     KEYBOARD
  ========================= */

  function initKeyboard() {
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        $$(".modal.open, .modal.active").forEach(modal => {
          modal.classList.remove("open", "active");
        });
      }
    });
  }

  /* =========================
     GLOBAL EXPORT
  ========================= */

  window.TJKT2 = {
    STUDENTS,
    SCHEDULE_A,
    SCHEDULE_B,
    DUTY,
    getIPClass,
    cidrToMask,
    renderStudents,
    renderRotation
  };

  /* =========================
     START
  ========================= */

  function boot() {
    try { updateClock(); } catch {}
    try { setInterval(updateClock, 1000); } catch {}

    try { initTheme(); } catch {}
    try { initNavigation(); } catch {}
    try { initStudents(); } catch {}
    try { updateStats(); } catch {}
    try { initSchedule(); } catch {}
    try { renderDuty(); } catch {}
    try { initRotation(); } catch {}
    try { initRandomStudent(); } catch {}
    try { initIPChecker(); } catch {}
    try { initSubnet(); } catch {}
    try { initCountdown(); } catch {}
    try { initNotes(); } catch {}
    try { initExport(); } catch {}
    try { initPrint(); } catch {}
    try { initChart(); } catch {}
    try { initKeyboard(); } catch {}

    document.documentElement.classList.add("tjkt2-ready");
    document.body.classList.add("tjkt2-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

})();
