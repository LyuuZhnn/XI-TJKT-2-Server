(() => {
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

  const APEL_PAIRS = Array.from(
    { length: 18 },
    (_, index) => [
      STUDENTS[index * 2],
      STUDENTS[index * 2 + 1]
    ]
  );

  const PORTS = [
    [20, "FTP Data", "TCP"],
    [21, "FTP Control", "TCP"],
    [22, "SSH", "TCP"],
    [23, "Telnet", "TCP"],
    [25, "SMTP", "TCP"],
    [53, "DNS", "TCP/UDP"],
    [67, "DHCP Server", "UDP"],
    [68, "DHCP Client", "UDP"],
    [80, "HTTP", "TCP"],
    [110, "POP3", "TCP"],
    [123, "NTP", "UDP"],
    [143, "IMAP", "TCP"],
    [161, "SNMP", "UDP"],
    [443, "HTTPS", "TCP"],
    [445, "SMB", "TCP"],
    [3389, "RDP", "TCP"]
  ];

  const HTTP = [
    [100, "Continue", "Informational"],
    [200, "OK", "Success"],
    [201, "Created", "Success"],
    [204, "No Content", "Success"],
    [301, "Moved Permanently", "Redirection"],
    [302, "Found", "Redirection"],
    [304, "Not Modified", "Redirection"],
    [400, "Bad Request", "Client Error"],
    [401, "Unauthorized", "Client Error"],
    [403, "Forbidden", "Client Error"],
    [404, "Not Found", "Client Error"],
    [408, "Request Timeout", "Client Error"],
    [429, "Too Many Requests", "Client Error"],
    [500, "Internal Server Error", "Server Error"],
    [502, "Bad Gateway", "Server Error"],
    [503, "Service Unavailable", "Server Error"]
  ];

  const OSI = [
    [7, "Application", "HTTP, DNS, SMTP"],
    [6, "Presentation", "Encoding, TLS, compression"],
    [5, "Session", "Session management"],
    [4, "Transport", "TCP, UDP"],
    [3, "Network", "IP, routing"],
    [2, "Data Link", "MAC, Ethernet"],
    [1, "Physical", "Cable, signal, RJ45"]
  ];

  const RJ45 = [
    ["T568A", "WG, G, WO, B, WB, O, WBr, Br"],
    ["T568B", "WO, O, WG, B, WB, G, WBr, Br"],
    ["Straight-through", "Kedua ujung memakai standar yang sama"],
    ["Crossover", "Ujung memakai standar berbeda"]
  ];

  const DNS = [
    ["A", "IPv4 address"],
    ["AAAA", "IPv6 address"],
    ["CNAME", "Alias name"],
    ["MX", "Mail exchange"],
    ["NS", "Authoritative name server"],
    ["TXT", "Arbitrary text / verification"]
  ];

  const KEY = {
    announcements: "xi-tjkt2-announcements",
    tasks: "xi-tjkt2-tasks",
    notes: "xi-tjkt2-notes",
    apel: "xi-tjkt2-apel-index"
  };

  const state = {
    scheduleType: "A",
    calendar: new Date(),
    announcements: loadJson(
      KEY.announcements,
      [{
        id: "welcome",
        title: "Selamat datang di Class Command Center",
        text: "Gunakan dashboard ini untuk agenda dan kebutuhan XI TJKT 2.",
        createdAt: Date.now()
      }]
    ),
    tasks: loadJson(KEY.tasks, []),
    notes: localStorage.getItem(KEY.notes) || "",
    apelIndex: readApelIndex(),
    countdown: null,
    countdownLeft: 300,
    countdownRunning: false
  };

  const $ = id => document.getElementById(id);

  function esc(value) {
    return String(value).replace(
      /[&<>'"]/g,
      character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        "\"": "&quot;"
      }[character])
    );
  }

  function initials(index) {
    return String(index + 1).padStart(2, "0");
  }

  function loadJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  }

  function readApelIndex() {
    const number = Number(localStorage.getItem(KEY.apel));

    if (
      Number.isInteger(number) &&
      number >= 0 &&
      number < APEL_PAIRS.length
    ) {
      return number;
    }

    return 0;
  }

  function saveState() {
    localStorage.setItem(
      KEY.announcements,
      JSON.stringify(state.announcements)
    );

    localStorage.setItem(
      KEY.tasks,
      JSON.stringify(state.tasks)
    );

    localStorage.setItem(KEY.notes, state.notes);
    localStorage.setItem(KEY.apel, String(state.apelIndex));
  }

  function toast(message) {
    const box = document.createElement("div");
    box.className = "toast";
    box.textContent = message;

    const container = $("toastContainer") || document.body;
    container.appendChild(box);

    setTimeout(() => box.remove(), 2600);
  }

  function currentDay() {
    const names = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu"
    ];

    return names[new Date().getDay()];
  }

  function activeClassDay() {
    const day = currentDay();
    return DAYS.includes(day) ? day : "Senin";
  }

  function formatDate(date = new Date()) {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(date);
  }

  function shortDate(date) {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short"
    }).format(date);
  }

  function switchDashboard(number) {
    document.querySelectorAll(".dashboard").forEach(section => {
      section.classList.toggle(
        "active",
        section.id === `dashboard${number}`
      );
    });

    document.querySelectorAll(".nav-item").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.dashboard === String(number)
      );
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    if (String(number) === "5") {
      renderLabReferences();
    }
  }

  function bindNavigation() {
    document.querySelectorAll("[data-dashboard]").forEach(button => {
      button.addEventListener("click", () => {
        switchDashboard(button.dataset.dashboard);
      });
    });

    document.querySelectorAll("[data-jump]").forEach(button => {
      button.addEventListener("click", () => {
        switchDashboard(button.dataset.jump);
      });
    });
  }

  function renderClock() {
    const now = new Date();

    const time = now.toLocaleTimeString("id-ID", {
      hour12: false
    });

    $("liveClock").textContent = time;
    $("ccClock").textContent = time.slice(0, 5);
    $("ccDate").textContent = formatDate(now);
  }

  function renderCommandCenter() {
    const day = activeClassDay();
    const general = SCHEDULE.A[day] || [];
    const vocational = SCHEDULE.B[day] || [];

    $("ccStudentCount").textContent = STUDENTS.length;
    $("ccTaskCount").textContent =
      state.tasks.filter(task => !task.done).length;
    $("ccAnnouncementCount").textContent =
      state.announcements.length;
    $("ccApelWeek").textContent =
      String(state.apelIndex + 1).padStart(2, "0");
    $("ccTodayLabel").textContent = day.toUpperCase();

    $("ccTodaySchedule").innerHTML =
      general.concat(vocational).map((subject, index) => `
        <div>
          <strong>${esc(subject)}</strong>
          <small>${index < general.length ? "UMUM" : "KEJURUAN"}</small>
        </div>
      `).join("") || `
        <div><small>Tidak ada jadwal.</small></div>
      `;

    $("ccTodayDuty").innerHTML =
      (DUTY[day] || []).map(name => `
        <span class="person-chip">${esc(name)}</span>
      `).join("") || `
        <small>Tidak ada data piket.</small>
      `;

    const todayPair = APEL_PAIRS[state.apelIndex];
    const nextPair =
      APEL_PAIRS[(state.apelIndex + 1) % APEL_PAIRS.length];

    $("ccApelToday").textContent = todayPair[0];
    $("ccApelNext").textContent = nextPair[0];

    $("ccAnnouncements").innerHTML =
      state.announcements
        .slice()
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 3)
        .map(item => `
          <div>
            <strong>${esc(item.title)}</strong>
            <small>${esc(item.text)}</small>
          </div>
        `).join("") || `
          <div><small>Belum ada pengumuman.</small></div>
        `;

    $("ccTasks").innerHTML =
      state.tasks
        .slice()
        .sort((a, b) =>
          (a.deadline || "9999").localeCompare(b.deadline || "9999")
        )
        .slice(0, 5)
        .map(task => `
          <div class="task-row ${task.done ? "done" : ""}">
            <input
              type="checkbox"
              data-task-check="${esc(task.id)}"
              ${task.done ? "checked" : ""}
            >
            <div>
              <strong>${esc(task.title)}</strong>
              <small>
                ${
                  task.deadline
                    ? `Deadline ${esc(
                        shortDate(new Date(`${task.deadline}T00:00:00`))
                      )}`
                    : "Tanpa deadline"
                }
              </small>
            </div>
            <span>${task.done ? "DONE" : "OPEN"}</span>
          </div>
        `).join("") || `
          <div><small>Belum ada task.</small></div>
        `;
  }

  function renderStudents() {
    const query = $("studentSearch").value.trim().toLowerCase();
    const filter = $("studentFilter").value;

    const rows = STUDENTS
      .map((name, index) => ({ name, index }))
      .filter(({ name, index }) => {
        const matchesSearch =
          !query || name.toLowerCase().includes(query);

        const odd = (index + 1) % 2 === 1;

        const matchesFilter =
          filter === "all" ||
          (filter === "odd" && odd) ||
          (filter === "even" && !odd);

        return matchesSearch && matchesFilter;
      });

    $("studentTotal").textContent = STUDENTS.length;
    $("studentVisible").textContent = rows.length;
    $("studentResultCount").textContent = `${rows.length} hasil`;

    $("studentDirectory").innerHTML =
      rows.map(({ name, index }) => `
        <article
          class="student-card"
          data-student-index="${index}"
        >
          <div class="student-top">
            <div class="avatar">${initials(index)}</div>
            <span class="student-no">ABSEN ${index + 1}</span>
          </div>

          <h4>${esc(name)}</h4>
          <small>XI TJKT 2 • Student Node</small>
        </article>
      `).join("") || `
        <div class="panel glass">
          <p>Tidak ada siswa yang cocok.</p>
        </div>
      `;
  }

  function openStudent(index) {
    const name = STUDENTS[index];

    if (!name) {
      return;
    }

    $("studentModalName").textContent = name;
    $("studentModalNumber").textContent = index + 1;
    $("studentModalAvatar").textContent = initials(index);

    $("studentModal").classList.add("show");
    $("studentModal").setAttribute("aria-hidden", "false");
  }

  function closeStudent() {
    $("studentModal").classList.remove("show");
    $("studentModal").setAttribute("aria-hidden", "true");
  }

  function renderSchedule() {
    const today = activeClassDay();

    $("scheduleList").innerHTML = DAYS.map(day => `
      <div class="schedule-day ${day === today ? "active" : ""}">
        <h4>${day}</h4>

        ${
          (SCHEDULE[state.scheduleType][day] || [])
            .map(subject => `
              <div class="subject">${esc(subject)}</div>
            `)
            .join("") || `<div class="subject">—</div>`
        }
      </div>
    `).join("");
  }

  function renderDuty() {
    const today = activeClassDay();

    $("dutyGrid").innerHTML = DAYS.map(day => `
      <div class="duty-day">
        <h4>${day}${day === today ? " • TODAY" : ""}</h4>

        ${(DUTY[day] || []).map(name => `
          <div class="person-chip">${esc(name)}</div>
        `).join("")}
      </div>
    `).join("");
  }

  function renderAnnouncements() {
    $("announcementList").innerHTML =
      state.announcements
        .slice()
        .sort((a, b) => b.createdAt - a.createdAt)
        .map(item => `
          <div class="manage-row">
            <div class="grow">
              <h4>${esc(item.title)}</h4>
              <p>${esc(item.text)}</p>
            </div>

            <button
              class="small-delete"
              data-ann-delete="${esc(item.id)}"
            >
              ×
            </button>
          </div>
        `).join("") || `
          <div class="manage-row">
            <div class="grow">
              <p>Belum ada pengumuman.</p>
            </div>
          </div>
        `;
  }

  function renderTasks() {
    $("taskList").innerHTML =
      state.tasks
        .slice()
        .sort((a, b) =>
          (a.deadline || "9999").localeCompare(b.deadline || "9999")
        )
        .map(task => `
          <div class="manage-row">
            <div class="grow">
              <h4>${esc(task.title)}</h4>
              <p>
                ${
                  task.deadline
                    ? `Deadline: ${esc(task.deadline)}`
                    : "Tanpa deadline"
                }
                •
                ${task.done ? "Selesai" : "Belum selesai"}
              </p>
            </div>

            <div class="button-row">
              <button
                class="small-delete"
                data-task-done="${esc(task.id)}"
              >
                ${task.done ? "↺" : "✓"}
              </button>

              <button
                class="small-delete"
                data-task-delete="${esc(task.id)}"
              >
                ×
              </button>
            </div>
          </div>
        `).join("") || `
          <div class="manage-row">
            <div class="grow">
              <p>Belum ada task.</p>
            </div>
          </div>
        `;
  }

  function addAnnouncement() {
    const title = $("announcementTitle").value.trim();
    const text = $("announcementText").value.trim();

    if (!title || !text) {
      toast("Judul dan isi pengumuman wajib diisi.");
      return;
    }

    state.announcements.push({
      id: makeId(),
      title,
      text,
      createdAt: Date.now()
    });

    saveState();

    $("announcementTitle").value = "";
    $("announcementText").value = "";

    renderAnnouncements();
    renderCommandCenter();

    toast("Pengumuman ditambahkan.");
  }

  function addTask() {
    const title = $("taskTitle").value.trim();
    const deadline = $("taskDeadline").value;

    if (!title) {
      toast("Nama tugas wajib diisi.");
      return;
    }

    state.tasks.push({
      id: makeId(),
      title,
      deadline,
      done: false
    });

    saveState();

    $("taskTitle").value = "";
    $("taskDeadline").value = "";

    renderTasks();
    renderCommandCenter();

    toast("Task ditambahkan.");
  }

  function makeId() {
    if (
      typeof crypto !== "undefined" &&
      typeof crypto.randomUUID === "function"
    ) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function renderGlobalSearch() {
    const query = $("globalSearch").value.trim().toLowerCase();
    const output = $("globalSearchResults");

    if (!query) {
      output.innerHTML = "";
      return;
    }

    const results = [];

    STUDENTS.forEach((name, index) => {
      if (name.toLowerCase().includes(query)) {
        results.push({
          type: "SISWA",
          title: name,
          meta: `Nomor ${index + 1}`
        });
      }
    });

    Object.entries(SCHEDULE).forEach(([type, days]) => {
      Object.entries(days).forEach(([day, subjects]) => {
        subjects.forEach(subject => {
          if (subject.toLowerCase().includes(query)) {
            results.push({
              type: "JADWAL",
              title: subject,
              meta: `${day} • ${type}`
            });
          }
        });
      });
    });

    Object.entries(DUTY).forEach(([day, names]) => {
      names.forEach(name => {
        if (name.toLowerCase().includes(query)) {
          results.push({
            type: "PIKET",
            title: name,
            meta: day
          });
        }
      });
    });

    state.announcements.forEach(item => {
      if (
        `${item.title} ${item.text}`
          .toLowerCase()
          .includes(query)
      ) {
        results.push({
          type: "INFO",
          title: item.title,
          meta: item.text
        });
      }
    });

    output.innerHTML =
      results.slice(0, 20).map(result => `
        <div>
          <span class="search-result-type">
            ${esc(result.type)}
          </span>
          <strong>${esc(result.title)}</strong>
          <small>${esc(result.meta)}</small>
        </div>
      `).join("") || `
        <div><small>Tidak ada hasil.</small></div>
      `;
  }

  function renderApel() {
    const todayPair = APEL_PAIRS[state.apelIndex];
    const nextPair =
      APEL_PAIRS[(state.apelIndex + 1) % APEL_PAIRS.length];

    const todayIndex = STUDENTS.indexOf(todayPair[0]);
    const nextIndex = STUDENTS.indexOf(nextPair[0]);

    $("apelTodayName").textContent = todayPair[0];
    $("apelNextName").textContent = nextPair[0];

    $("apelTodayAvatar").textContent = initials(todayIndex);
    $("apelNextAvatar").textContent = initials(nextIndex);

    $("apelPairNumber").textContent =
      `${String(state.apelIndex + 1).padStart(2, "0")} / 18`;

    $("apelCurrentPair").textContent =
      `${todayPair[0]} × ${todayPair[1]}`;

    $("apelPairGrid").innerHTML =
      APEL_PAIRS.map((pair, index) => `
        <div class="pair-card ${index === state.apelIndex ? "active" : ""}">
          <div class="pair-top">
            <span>WEEK ${String(index + 1).padStart(2, "0")}</span>
            <span>${index === state.apelIndex ? "ACTIVE" : ""}</span>
          </div>

          <strong>${esc(pair[0])}</strong>
          <small>→ selanjutnya: ${esc(pair[1])}</small>
        </div>
      `).join("");

    saveState();
    renderCommandCenter();
  }

  function nextApel() {
    state.apelIndex =
      (state.apelIndex + 1) % APEL_PAIRS.length;

    renderApel();
    toast(`Rotasi pindah ke pasangan ${state.apelIndex + 1}.`);
  }

  function resetApel() {
    state.apelIndex = 0;
    renderApel();
    toast("Rotasi kembali ke pasangan 01.");
  }

  function parseIPv4(value) {
    const parts = value.trim().split("/");
    const ipPart = parts[0];
    const prefixPart = parts[1];

    const octets = ipPart.split(".").map(Number);

    if (
      octets.length !== 4 ||
      octets.some(
        octet =>
          !Number.isInteger(octet) ||
          octet < 0 ||
          octet > 255
      )
    ) {
      throw new Error("IPv4 tidak valid");
    }

    const prefix =
      prefixPart === undefined ? 32 : Number(prefixPart);

    if (
      !Number.isInteger(prefix) ||
      prefix < 0 ||
      prefix > 32
    ) {
      throw new Error("Prefix harus 0–32");
    }

    return {
      ipPart,
      prefix,
      octets
    };
  }

  function ipToInt(octets) {
    return (
      (
        ((octets[0] << 24) >>> 0) +
        ((octets[1] << 16) >>> 0) +
        ((octets[2] << 8) >>> 0) +
        octets[3]
      ) >>> 0
    );
  }

  function intToIp(number) {
    return [
      (number >>> 24) & 255,
      (number >>> 16) & 255,
      (number >>> 8) & 255,
      number & 255
    ].join(".");
  }

  function prefixMask(prefix) {
    if (prefix === 0) {
      return 0;
    }

    return (0xFFFFFFFF << (32 - prefix)) >>> 0;
  }

  function hostsForPrefix(prefix) {
    if (prefix === 31) {
      return 2;
    }

    if (prefix === 32) {
      return 1;
    }

    return Math.pow(2, 32 - prefix) - 2;
  }

  function ipClass(firstOctet) {
    if (firstOctet < 128) return "A";
    if (firstOctet < 192) return "B";
    if (firstOctet < 224) return "C";
    if (firstOctet < 240) return "D";
    return "E";
  }

  function checkIp() {
    try {
      const parsed = parseIPv4($("labIpInput").value);
      const ipNumber = ipToInt(parsed.octets);
      const mask = prefixMask(parsed.prefix);
      const network = (ipNumber & mask) >>> 0;
      const broadcast =
        (network | (~mask >>> 0)) >>> 0;

      $("ipAnalysisResult").innerHTML = `
        <div class="result-grid">
          <div class="result-box">
            <span>IP</span>
            <strong>${intToIp(ipNumber)}</strong>
          </div>

          <div class="result-box">
            <span>Prefix</span>
            <strong>/${parsed.prefix}</strong>
          </div>

          <div class="result-box">
            <span>Mask</span>
            <strong>${intToIp(mask)}</strong>
          </div>

          <div class="result-box">
            <span>Network</span>
            <strong>${intToIp(network)}</strong>
          </div>

          <div class="result-box">
            <span>Broadcast</span>
            <strong>${intToIp(broadcast)}</strong>
          </div>

          <div class="result-box">
            <span>Class</span>
            <strong>${ipClass(parsed.octets[0])}</strong>
          </div>
        </div>
      `;
    } catch (error) {
      $("ipAnalysisResult").innerHTML = `
        <div class="result-box">
          <strong>${esc(error.message)}</strong>
        </div>
      `;
    }
  }

  function calculateSubnet() {
    try {
      const ip = $("subnetIp").value.trim();
      const prefix = Number($("subnetPrefix").value);

      const parsed = parseIPv4(`${ip}/${prefix}`);
      const ipNumber = ipToInt(parsed.octets);
      const mask = prefixMask(prefix);
      const network = (ipNumber & mask) >>> 0;
      const broadcast =
        (network | (~mask >>> 0)) >>> 0;

      $("subnetResult").innerHTML = `
        <div class="result-grid">
          <div class="result-box">
            <span>Network</span>
            <strong>${intToIp(network)}</strong>
          </div>

          <div class="result-box">
            <span>Broadcast</span>
            <strong>${intToIp(broadcast)}</strong>
          </div>

          <div class="result-box">
            <span>Mask</span>
            <strong>${intToIp(mask)}</strong>
          </div>

          <div class="result-box">
            <span>Usable hosts</span>
            <strong>${hostsForPrefix(prefix).toLocaleString("id-ID")}</strong>
          </div>
        </div>
      `;
    } catch (error) {
      $("subnetResult").innerHTML = `
        <div class="result-box">
          <strong>${esc(error.message)}</strong>
        </div>
      `;
    }
  }

  function cidrHelper() {
    try {
      const parsed = parseIPv4($("cidrInput").value);
      const count = Math.pow(2, 32 - parsed.prefix);

      $("cidrResult").innerHTML = `
        <div class="result-grid">
          <div class="result-box">
            <span>Prefix</span>
            <strong>/${parsed.prefix}</strong>
          </div>

          <div class="result-box">
            <span>Mask</span>
            <strong>${intToIp(prefixMask(parsed.prefix))}</strong>
          </div>

          <div class="result-box">
            <span>Address count</span>
            <strong>${count.toLocaleString("id-ID")}</strong>
          </div>

          <div class="result-box">
            <span>Usable hosts</span>
            <strong>${hostsForPrefix(parsed.prefix).toLocaleString("id-ID")}</strong>
          </div>
        </div>
      `;
    } catch (error) {
      $("cidrResult").innerHTML = `
        <div class="result-box">
          <strong>${esc(error.message)}</strong>
        </div>
      `;
    }
  }

  function decimalToBinary() {
    const number = Number($("decimalInput").value);

    if (
      !Number.isInteger(number) ||
      number < 0 ||
      number > 4294967295
    ) {
      $("binaryResult").innerHTML = `
        <div class="result-box">
          <strong>Masukkan integer 0–4294967295.</strong>
        </div>
      `;
      return;
    }

    $("binaryResult").innerHTML = `
      <div class="result-box">
        <span>Binary</span>
        <strong>${number.toString(2).padStart(32, "0")}</strong>
      </div>
    `;
  }

  function binaryToDecimal() {
    const raw = $("binaryInput").value.trim();

    if (!/^[01]{1,32}$/.test(raw)) {
      $("decimalResult").innerHTML = `
        <div class="result-box">
          <strong>Binary harus 1–32 digit 0/1.</strong>
        </div>
      `;
      return;
    }

    $("decimalResult").innerHTML = `
      <div class="result-box">
        <span>Decimal</span>
        <strong>${parseInt(raw, 2).toLocaleString("id-ID")}</strong>
      </div>
    `;
  }

  function formatMac() {
    const raw = $("macInput").value
      .replace(/[^a-fA-F0-9]/g, "");

    if (raw.length !== 12) {
      $("macResult").innerHTML = `
        <div class="result-box">
          <strong>MAC harus memiliki 12 digit hex.</strong>
        </div>
      `;
      return;
    }

    const upper = raw.toUpperCase();
    const pairs = upper.match(/.{2}/g);
    const quartets = upper.match(/.{4}/g);

    $("macResult").innerHTML = `
      <div class="result-grid">
        <div class="result-box">
          <span>Colon</span>
          <strong>${pairs.join(":")}</strong>
        </div>

        <div class="result-box">
          <span>Hyphen</span>
          <strong>${pairs.join("-")}</strong>
        </div>

        <div class="result-box">
          <span>Cisco</span>
          <strong>${quartets.join(".")}</strong>
        </div>

        <div class="result-box">
          <span>Raw</span>
          <strong>${upper}</strong>
        </div>
      </div>
    `;
  }

  function renderPorts() {
    const query = $("portSearch").value.trim().toLowerCase();

    const rows = PORTS.filter(([port, name, protocol]) => {
      return (
        !query ||
        String(port).includes(query) ||
        name.toLowerCase().includes(query) ||
        protocol.toLowerCase().includes(query)
      );
    });

    $("portResults").innerHTML =
      rows.map(([port, name, protocol]) => `
        <div class="reference-item">
          <strong>${port} • ${esc(name)}</strong>
          <small>${esc(protocol)}</small>
        </div>
      `).join("") || `
        <div class="reference-item">
          <small>Tidak ada hasil.</small>
        </div>
      `;
  }

  function renderHttp() {
    const query =
      $("httpStatusSearch").value.trim().toLowerCase();

    const rows = HTTP.filter(([code, name, type]) => {
      return (
        !query ||
        String(code).includes(query) ||
        name.toLowerCase().includes(query) ||
        type.toLowerCase().includes(query)
      );
    });

    $("httpStatusResults").innerHTML =
      rows.map(([code, name, type]) => `
        <div class="reference-item">
          <strong>${code} • ${esc(name)}</strong>
          <small>${esc(type)}</small>
        </div>
      `).join("") || `
        <div class="reference-item">
          <small>Tidak ada hasil.</small>
        </div>
      `;
  }

  function renderLabReferences() {
    $("dnsResult").innerHTML =
      DNS.map(([type, description]) => `
        <div class="dns-card">
          <strong>${type}</strong>
          <small>${esc(description)}</small>
        </div>
      `).join("");

    $("osiReference").innerHTML =
      OSI.map(([number, name, example]) => `
        <div class="layer-item">
          <span class="layer-num">${number}</span>

          <div>
            <strong>${esc(name)}</strong>
            <small>${esc(example)}</small>
          </div>
        </div>
      `).join("");

    $("rj45Reference").innerHTML =
      RJ45.map(([name, description]) => `
        <div class="layer-item">
          <span class="layer-num">⌁</span>

          <div>
            <strong>${esc(name)}</strong>
            <small>${esc(description)}</small>
          </div>
        </div>
      `).join("");

    renderPorts();
    renderHttp();
  }

  function randomStudentLab() {
    const index =
      Math.floor(Math.random() * STUDENTS.length);

    $("labRandomStudentResult").innerHTML = `
      <div>
        <strong>${esc(STUDENTS[index])}</strong>
        <small>Nomor absen ${index + 1}</small>
      </div>
    `;
  }

  function renderCountdown() {
    const total = Math.max(0, state.countdownLeft);
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;

    $("countdownDisplay").textContent =
      `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function readCountdownInput() {
    const minutes =
      Math.max(0, Number($("countdownMinutes").value) || 0);

    const seconds =
      Math.min(
        59,
        Math.max(0, Number($("countdownSeconds").value) || 0)
      );

    state.countdownLeft =
      Math.round(minutes * 60 + seconds);

    renderCountdown();
  }

  function startCountdown() {
    if (state.countdownRunning) {
      return;
    }

    state.countdownRunning = true;

    state.countdown = setInterval(() => {
      if (state.countdownLeft <= 0) {
        clearInterval(state.countdown);
        state.countdown = null;
        state.countdownRunning = false;
        renderCountdown();
        toast("Countdown selesai.");
        return;
      }

      state.countdownLeft -= 1;
      renderCountdown();
    }, 1000);
  }

  function pauseCountdown() {
    if (state.countdown) {
      clearInterval(state.countdown);
      state.countdown = null;
    }

    state.countdownRunning = false;
  }

  function resetCountdown() {
    pauseCountdown();
    readCountdownInput();
  }

  function renderCalendar() {
    const date = state.calendar;
    const year = date.getFullYear();
    const month = date.getMonth();

    const title =
      new Intl.DateTimeFormat("id-ID", {
        month: "long",
        year: "numeric"
      }).format(date);

    $("calendarMonth").textContent = title;

    const firstDay =
      new Date(year, month, 1).getDay();

    const offset = (firstDay + 6) % 7;
    const totalDays =
      new Date(year, month + 1, 0).getDate();

    const today = new Date();

    let html = [
      "Sen",
      "Sel",
      "Rab",
      "Kam",
      "Jum",
      "Sab",
      "Min"
    ]
      .map(day => `<div class="dow">${day}</div>`)
      .join("");

    for (let index = 0; index < offset; index++) {
      html += `<div class="calendar-day empty"></div>`;
    }

    for (let day = 1; day <= totalDays; day++) {
      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      html += `
        <div class="calendar-day ${isToday ? "today" : ""}">
          ${day}
        </div>
      `;
    }

    $("calendarGrid").innerHTML = html;
  }

  function exportClassData() {
    const data = {
      class: "XI TJKT 2",
      students: STUDENTS,
      schedule: SCHEDULE,
      duty: DUTY,
      apelPairs: APEL_PAIRS,
      announcements: state.announcements,
      tasks: state.tasks,
      notes: state.notes,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "xi-tjkt-2-class-data.json";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    toast("Data berhasil diexport.");
  }

  function bindEvents() {
    $("studentSearch")
      .addEventListener("input", renderStudents);

    $("studentFilter")
      .addEventListener("change", renderStudents);

    $("randomStudentButton")
      .addEventListener("click", () => {
        openStudent(
          Math.floor(Math.random() * STUDENTS.length)
        );
      });

    $("studentModalClose")
      .addEventListener("click", closeStudent);

    $("studentModal")
      .addEventListener("click", event => {
        if (event.target.id === "studentModal") {
          closeStudent();
        }
      });

    $("studentDirectory")
      .addEventListener("click", event => {
        const card =
          event.target.closest("[data-student-index]");

        if (card) {
          openStudent(
            Number(card.dataset.studentIndex)
          );
        }
      });

    document.querySelectorAll(".schedule-type").forEach(button => {
      button.addEventListener("click", () => {
        state.scheduleType = button.dataset.scheduleType;

        document
          .querySelectorAll(".schedule-type")
          .forEach(item => {
            item.classList.toggle("active", item === button);
          });

        renderSchedule();
      });
    });

    $("addAnnouncementButton")
      .addEventListener("click", addAnnouncement);

    $("addTaskButton")
      .addEventListener("click", addTask);

    $("announcementText")
      .addEventListener("keydown", event => {
        if (
          (event.ctrlKey || event.metaKey) &&
          event.key === "Enter"
        ) {
          addAnnouncement();
        }
      });

    $("taskList")
      .addEventListener("click", event => {
        const done =
          event.target.closest("[data-task-done]");

        const deleted =
          event.target.closest("[data-task-delete]");

        if (done) {
          const task =
            state.tasks.find(
              item => item.id === done.dataset.taskDone
            );

          if (task) {
            task.done = !task.done;
            saveState();
            renderTasks();
            renderCommandCenter();
          }
        }

        if (deleted) {
          state.tasks =
            state.tasks.filter(
              item => item.id !== deleted.dataset.taskDelete
            );

          saveState();
          renderTasks();
          renderCommandCenter();
          toast("Task dihapus.");
        }
      });

    $("announcementList")
      .addEventListener("click", event => {
        const deleted =
          event.target.closest("[data-ann-delete]");

        if (!deleted) {
          return;
        }

        state.announcements =
          state.announcements.filter(
            item => item.id !== deleted.dataset.annDelete
          );

        saveState();
        renderAnnouncements();
        renderCommandCenter();
        toast("Pengumuman dihapus.");
      });

    $("globalSearch")
      .addEventListener("input", renderGlobalSearch);

    $("ccTasks")
      .addEventListener("click", event => {
        const check =
          event.target.closest("[data-task-check]");

        if (!check) {
          return;
        }

        const task =
          state.tasks.find(
            item => item.id === check.dataset.taskCheck
          );

        if (task) {
          task.done = !task.done;
          saveState();
          renderTasks();
          renderCommandCenter();
        }
      });

    $("nextApelButton")
      .addEventListener("click", nextApel);

    $("resetApelButton")
      .addEventListener("click", resetApel);

    $("analyzeIpButton")
      .addEventListener("click", checkIp);

    $("labIpInput")
      .addEventListener("keydown", event => {
        if (event.key === "Enter") {
          checkIp();
        }
      });

    $("subnetButton")
      .addEventListener("click", calculateSubnet);

    $("cidrButton")
      .addEventListener("click", cidrHelper);

    $("decimalButton")
      .addEventListener("click", decimalToBinary);

    $("binaryButton")
      .addEventListener("click", binaryToDecimal);

    $("macButton")
      .addEventListener("click", formatMac);

    $("portSearch")
      .addEventListener("input", renderPorts);

    $("httpStatusSearch")
      .addEventListener("input", renderHttp);

    $("labRandomStudentButton")
      .addEventListener("click", randomStudentLab);

    $("notesArea")
      .addEventListener("input", () => {
        state.notes = $("notesArea").value;
        localStorage.setItem(KEY.notes, state.notes);
      });

    $("startCountdownButton")
      .addEventListener("click", startCountdown);

    $("pauseCountdownButton")
      .addEventListener("click", pauseCountdown);

    $("resetCountdownButton")
      .addEventListener("click", resetCountdown);

    $("calendarPrev")
      .addEventListener("click", () => {
        state.calendar = new Date(
          state.calendar.getFullYear(),
          state.calendar.getMonth() - 1,
          1
        );

        renderCalendar();
      });

    $("calendarNext")
      .addEventListener("click", () => {
        state.calendar = new Date(
          state.calendar.getFullYear(),
          state.calendar.getMonth() + 1,
          1
        );

        renderCalendar();
      });

    $("calendarToday")
      .addEventListener("click", () => {
        state.calendar = new Date();
        renderCalendar();
      });

    $("exportButton")
      .addEventListener("click", exportClassData);

    $("printButton")
      .addEventListener("click", () => {
        window.print();
      });
  }

  function init() {
    bindNavigation();
    bindEvents();

    renderClock();
    setInterval(renderClock, 1000);

    renderCommandCenter();
    renderStudents();
    renderSchedule();
    renderDuty();
    renderAnnouncements();
    renderTasks();
    renderApel();
    renderLabReferences();
    renderCalendar();

    $("notesArea").value = state.notes;

    readCountdownInput();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
