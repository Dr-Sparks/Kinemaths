const title = document.getElementById("title");
const frame = document.querySelector(".frame");
const pencilLayer = document.getElementById("pencil-layer");
const startButton = document.getElementById("start-game");
const debugToggle = document.getElementById("debug-toggle");
const modulesScroll = document.getElementById("modules-scroll");
const moduleCards = Array.from(document.querySelectorAll(".module-card"));

const moduleView = document.getElementById("m0-view");
const modulePath = document.getElementById("m0-path");
const moduleBack = document.getElementById("m0-back");
const moduleKicker = document.querySelector(".m0-kicker");
const moduleTitle = document.querySelector(".m0-title");
const moduleSteps = document.getElementById("m0-steps");
const siGameBack = document.getElementById("si-game-back");
const siSideToggle = document.getElementById("si-side-toggle");
const siGameKicker = document.getElementById("si-game-kicker");
const siGameTitle = document.getElementById("si-game-title");
const siGameStage = document.getElementById("si-game-stage");
const siSideContent = document.getElementById("si-side-content");

const STEP_ICONS = {
  units: `<svg viewBox="0 0 24 24" fill="none"><rect x="4.8" y="8.5" width="14.4" height="6.8" rx="1.2"></rect><path d="M7.3 8.5V12M9.7 8.5V10.9M12.1 8.5V12M14.5 8.5V10.9M16.9 8.5V12"></path></svg>`,
  graph: `<svg viewBox="0 0 24 24" fill="none"><path d="M4.9 5.2V18.8H19"></path><path d="M7.2 15.8L10.2 12.6L13 13.7L17 8.6"></path></svg>`,
  vector: `<svg viewBox="0 0 24 24" fill="none"><circle cx="8.1" cy="15.7" r="1.25" fill="currentColor" stroke="none"></circle><path d="M7.2 8.6H12.8"></path><path d="M11.7 7.5L12.8 8.6L11.7 9.7"></path><path d="M9.2 14.8L16.8 9.2"></path><path d="M15.3 9.1H16.8V10.6"></path></svg>`,
  frame: `<svg viewBox="0 0 24 24" fill="none"><rect x="4.8" y="7" width="6.6" height="4.8" rx="1"></rect><rect x="12.6" y="12.3" width="6.6" height="4.8" rx="1"></rect><path d="M6 13H11.4"></path><path d="M12.6 10.5H18"></path><path d="M9.8 13L11.4 11.5L9.8 10"></path></svg>`,
  point: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.2 5.2V18.8H18.8"></path><circle cx="13.9" cy="10.1" r="1.7"></circle><path d="M13.9 8.2V6.5M12 10.1H10.3"></path></svg>`,
  displacement: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.4 13.8C7.7 11.2 10 10.5 12.5 10.1C14.9 9.7 16.9 8.8 19 6.8"></path><path d="M16.9 6.8H19V8.9"></path><path d="M5 17.2H13.8"></path><path d="M12.6 16L13.8 17.2L12.6 18.4"></path></svg>`,
  formula: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.2 8.6H10.8"></path><path d="M13.2 8.6H18.8"></path><path d="M12 6.7V10.5"></path><path d="M6 15.9H18"></path><path d="M7 13.5L5 15.9L7 18.3"></path><path d="M17 13.5L19 15.9L17 18.3"></path></svg>`,
  speed: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.5 15.7C5.5 11.8 8.5 8.8 12.3 8.8C16 8.8 19 11.8 19 15.7"></path><path d="M12.3 15.6L16.2 11.7"></path><circle cx="12.3" cy="15.7" r="1.1" fill="currentColor" stroke="none"></circle></svg>`,
  encounter: `<svg viewBox="0 0 24 24" fill="none"><rect x="4.8" y="9.6" width="5.5" height="3.5" rx="0.8"></rect><rect x="13.7" y="9.6" width="5.5" height="3.5" rx="0.8"></rect><path d="M10.8 11.3H13.2"></path><path d="M11.8 10.3L13.2 11.3L11.8 12.3"></path></svg>`,
  acceleration: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.2 16.2C7.3 13.8 9.3 12.9 11.6 12.2C14.2 11.4 16.2 10.2 18.8 7.8"></path><path d="M15.8 7.9H18.9V11"></path><circle cx="8" cy="16.2" r="1.15" fill="currentColor" stroke="none"></circle><circle cx="12.2" cy="12.1" r="1.15" fill="currentColor" stroke="none"></circle><circle cx="16.5" cy="9.4" r="1.15" fill="currentColor" stroke="none"></circle></svg>`,
  brake: `<svg viewBox="0 0 24 24" fill="none"><circle cx="8.4" cy="15.7" r="2.1"></circle><path d="M9.9 14.3L15.5 10.6"></path><path d="M14.6 9.3H17.9V12.6"></path></svg>`,
  sign: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 8.2H18"></path><path d="M6 15.8H18"></path><path d="M9 5.8V10.6"></path><path d="M15 13.4V18.2"></path></svg>`,
  fall: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 5.2C11.5 3.9 12.2 3 13.6 3"></path><path d="M10.5 7.2C8.2 7.2 6.3 9.1 6.3 11.5C6.3 14.5 8.6 17.1 12 17.1C15.4 17.1 17.7 14.5 17.7 11.5C17.7 9.1 15.8 7.2 13.5 7.2C12.5 7.2 11.4 7.8 10.5 7.2Z"></path><path d="M12 19.1V22"></path><path d="M10.3 20.3L12 22L13.7 20.3"></path></svg>`,
  throw: `<svg viewBox="0 0 24 24" fill="none"><path d="M4.9 15.8C7.2 10.5 11 8 18.9 8"></path><path d="M16.8 6.2H18.9V8.3"></path><circle cx="18.9" cy="8.3" r="2.2"></circle><circle cx="18.9" cy="8.3" r="0.9" fill="currentColor" stroke="none"></circle></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 5.2V18.8H19"></path><path d="M7.2 15.6L10.1 12.4L12.8 13.4L16.8 8.4"></path><path d="M14.9 8.4H16.8V10.3"></path></svg>`,
  slope: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.2 18.2L16.6 8.6"></path><path d="M5.2 18.2H12.6"></path><path d="M12.6 18.2V11.9"></path></svg>`,
  area: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 5.2V18.8H19"></path><path d="M7.3 15.4L11.3 12.8L15.8 10.9V18.8H7.3Z"></path></svg>`,
  components: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.2 18.4H18.8"></path><path d="M5.2 18.4V7.2"></path><path d="M5.2 18.4L14.7 10.1"></path><path d="M13.4 10.2H14.8V11.6"></path></svg>`,
  relative: `<svg viewBox="0 0 24 24" fill="none"><rect x="4.6" y="7.2" width="6.6" height="4.6" rx="1"></rect><rect x="12.8" y="12.2" width="6.6" height="4.6" rx="1"></rect><path d="M5.8 13.2H11.3"></path><path d="M12.8 10.8H18.2"></path><path d="M9.8 13.2L11.3 11.8L9.8 10.4"></path><path d="M14.3 9.4L12.8 10.8L14.3 12.2"></path></svg>`,
  observer: `<svg viewBox="0 0 24 24" fill="none"><path d="M4.8 12C6.8 8.9 9 7.4 12 7.4C15 7.4 17.2 8.9 19.2 12C17.2 15.1 15 16.6 12 16.6C9 16.6 6.8 15.1 4.8 12Z"></path><circle cx="12" cy="12" r="1.9"></circle></svg>`,
  measure: `<svg viewBox="0 0 24 24" fill="none"><path d="M9 5H15"></path><path d="M10.2 5V9.8L7 15.7C6.2 17.2 7.2 19 8.9 19H15.1C16.8 19 17.8 17.2 17 15.7L13.8 9.8V5"></path><path d="M8.7 14.6H15.3"></path><circle cx="10.1" cy="12.9" r="0.75" fill="currentColor" stroke="none"></circle></svg>`,
  error: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.2 6.2H18.8V17.8H5.2Z"></path><path d="M7.4 10.6H16.6"></path><path d="M12 8.4V13"></path><path d="M10.2 13.8H13.8"></path></svg>`,
  model: `<svg viewBox="0 0 24 24" fill="none"><circle cx="8.2" cy="9.6" r="2"></circle><circle cx="15.8" cy="9.6" r="2"></circle><path d="M8.2 11.6V16.9"></path><path d="M15.8 11.6V16.9"></path><path d="M8.2 14.3H15.8"></path></svg>`,
};

const MODULE_CONTENT = {
  "0": {
    title: "Grundlagen der Bewegung",
    steps: [
      { title: "SI-Einheiten", text: "Einheitensystem sicher lesen, umrechnen und korrekt notieren.", icon: "units", colorA: "#59a3ff", colorB: "#8ed0ff" },
      { title: "Funktionen und Koordinatensysteme", text: "Punkte, Achsen und Funktionsverläufe sauber deuten.", icon: "graph", colorA: "#3dd18d", colorB: "#94ecb8" },
      { title: "Skalar und Vektoren", text: "Größen mit Betrag und Richtung sicher unterscheiden.", icon: "vector", colorA: "#8f73ff", colorB: "#c2b6ff" },
      { title: "Bezugssystem", text: "Bewegung immer relativ zu einem gewählten System interpretieren.", icon: "frame", colorA: "#ff8753", colorB: "#ffc173" },
      { title: "Position", text: "Lage im Raum eindeutig über Koordinaten angeben.", icon: "point", colorA: "#21b7d8", colorB: "#7de1f2" },
      { title: "Strecke und Verschiebung", text: "Zurückgelegten Weg und Ortsänderung präzise trennen.", icon: "displacement", colorA: "#f86785", colorB: "#f9a8bd" },
    ],
  },
  "1": {
    title: "Geradlinig gleichförmige Bewegung",
    steps: [
      { title: "Bewegung mit konstantem v", text: "Gleichförmige Bewegung in 1D erkennen und beschreiben.", icon: "speed", colorA: "#5ea2ff", colorB: "#9bc8ff" },
      { title: "Formel s = s0 + v · t", text: "Weg-Zeit-Zusammenhang sicher in Aufgaben anwenden.", icon: "formula", colorA: "#65d78a", colorB: "#a4f0be" },
      { title: "Durchschnittsgeschwindigkeit", text: "Zeit- und Wegintervalle korrekt auswerten.", icon: "speed", colorA: "#7e74ff", colorB: "#c3bcff" },
      { title: "Begegnungsaufgaben", text: "Zwei Bewegungen im selben Bezugssystem rechnen.", icon: "encounter", colorA: "#ff9c58", colorB: "#ffd58a" },
      { title: "s-t und v-t Diagramme", text: "Lineare Verläufe in beiden Diagrammen erkennen.", icon: "chart", colorA: "#24b7d8", colorB: "#88e4f2" },
    ],
  },
  "2": {
    title: "Geradlinig gleichmäßig beschleunigte Bewegung",
    steps: [
      { title: "Beschleunigung als Änderungsrate", text: "Bedeutung von a im Zeitverlauf klar deuten.", icon: "acceleration", colorA: "#5f9dff", colorB: "#9dc9ff" },
      { title: "Formel v = v0 + a · t", text: "Geschwindigkeit unter konstanter Beschleunigung berechnen.", icon: "formula", colorA: "#60ce88", colorB: "#9ce7b6" },
      { title: "Formel s = s0 + v0 t + 1/2 a t²", text: "Ortsänderung mit Startwerten sicher einsetzen.", icon: "formula", colorA: "#8a73ff", colorB: "#cabdff" },
      { title: "Vorzeichen richtig deuten", text: "Negative Werte bei v und a korrekt interpretieren.", icon: "sign", colorA: "#ff8e5a", colorB: "#ffc981" },
      { title: "Bremsen und Anfahren", text: "Typische Bewegungsphasen physikalisch modellieren.", icon: "brake", colorA: "#27b6d7", colorB: "#84dff0" },
      { title: "Formel- und Diagrammlösung", text: "Zwischen Rechnung und Graphen sicher wechseln.", icon: "chart", colorA: "#f66d93", colorB: "#f8acbf" },
    ],
  },
  "3": {
    title: "Freier Fall und vertikaler Wurf",
    steps: [
      { title: "Erdbeschleunigung g", text: "Richtung und Größe von g im Modell festlegen.", icon: "fall", colorA: "#5ea3ff", colorB: "#9acbff" },
      { title: "Fallzeit berechnen", text: "Zeit bis zum Auftreffen aus Startbedingungen bestimmen.", icon: "formula", colorA: "#65d48a", colorB: "#a2edbe" },
      { title: "Höhe und Ort", text: "Höhenwerte und Positionen über die Zeit berechnen.", icon: "point", colorA: "#8573ff", colorB: "#c6bcff" },
      { title: "Aufwärts- und Abwärtsphase", text: "Phasenwechsel beim vertikalen Wurf sauber trennen.", icon: "throw", colorA: "#ff8f5b", colorB: "#ffd184" },
      { title: "Spezialfall von Modul 2", text: "Freier Fall als beschleunigte Bewegung sicher anwenden.", icon: "acceleration", colorA: "#2ab8d8", colorB: "#89e3f2" },
    ],
  },
  "4": {
    title: "Bewegungsdiagramme und Darstellungen",
    steps: [
      { title: "s-t Diagramm", text: "Ortsverlauf über die Zeit korrekt lesen.", icon: "chart", colorA: "#5fa4ff", colorB: "#9fcfff" },
      { title: "v-t Diagramm", text: "Geschwindigkeitsverlauf in Intervallen interpretieren.", icon: "speed", colorA: "#62d38a", colorB: "#9de9b8" },
      { title: "a-t Diagramm", text: "Beschleunigungsabschnitte physikalisch deuten.", icon: "acceleration", colorA: "#8c76ff", colorB: "#c8beff" },
      { title: "Steigung", text: "Steigungen als Änderungsraten verwenden.", icon: "slope", colorA: "#ff9657", colorB: "#ffd182" },
      { title: "Flächeninhalt", text: "Flächen unter Kurven physikalisch auswerten.", icon: "area", colorA: "#25b7d8", colorB: "#86e1f1" },
      { title: "Darstellungen umwandeln", text: "Zwischen s-t, v-t und a-t sicher wechseln.", icon: "graph", colorA: "#f56e92", colorB: "#f7aec1" },
    ],
  },
  "5": {
    title: "Bewegungen in zwei Dimensionen",
    steps: [
      { title: "x- und y-Komponente", text: "Bewegung in unabhängige Richtungen zerlegen.", icon: "components", colorA: "#5ea3ff", colorB: "#9ac9ff" },
      { title: "Komponenten getrennt lösen", text: "Zwei 1D-Probleme getrennt rechnen.", icon: "vector", colorA: "#65d489", colorB: "#a0ecb8" },
      { title: "Wurf als Überlagerung", text: "Horizontale und vertikale Bewegung kombinieren.", icon: "throw", colorA: "#8972ff", colorB: "#c5bbff" },
      { title: "Flugzeit und Reichweite", text: "Zentrale Größen aus den Komponenten bestimmen.", icon: "formula", colorA: "#ff8f5d", colorB: "#ffcf85" },
      { title: "2D-Transferaufgaben", text: "Kontextaufgaben systematisch und sauber lösen.", icon: "chart", colorA: "#24b7d8", colorB: "#84e1f1" },
    ],
  },
  "6": {
    title: "Relative Bewegung und Bezugssysteme",
    steps: [
      { title: "Passendes Bezugssystem wählen", text: "Systemwahl begründet und zielgerichtet treffen.", icon: "frame", colorA: "#5ea3ff", colorB: "#9ccaff" },
      { title: "Relativgeschwindigkeit", text: "Geschwindigkeiten abhängig vom Beobachter berechnen.", icon: "relative", colorA: "#63d48b", colorB: "#9feab9" },
      { title: "Gegen- und Gleichrichtung", text: "Fälle korrekt unterscheiden und Vorzeichen prüfen.", icon: "sign", colorA: "#8a73ff", colorB: "#c3b8ff" },
      { title: "Ergebnisse interpretieren", text: "Physikalische Aussage im gewählten System formulieren.", icon: "observer", colorA: "#ff925a", colorB: "#ffd083" },
    ],
  },
  "7": {
    title: "Messung, Modellierung, Grenzen",
    steps: [
      { title: "Datenerfassung", text: "Messreihen strukturiert aufnehmen und dokumentieren.", icon: "measure", colorA: "#5ca2ff", colorB: "#9bc9ff" },
      { title: "Einfache Auswertung", text: "Messwerte tabellarisch und grafisch aufbereiten.", icon: "chart", colorA: "#64d38b", colorB: "#a2e9b9" },
      { title: "Messfehler", text: "Absolute und relative Abweichungen bestimmen.", icon: "error", colorA: "#8a73ff", colorB: "#c6bcff" },
      { title: "Modellannahmen", text: "Annahmen wie ohne Luftwiderstand bewusst einsetzen.", icon: "model", colorA: "#ff915a", colorB: "#ffd083" },
      { title: "Modell und Realität", text: "Grenzen des Rechenmodells mit Daten reflektieren.", icon: "observer", colorA: "#24b6d8", colorB: "#84dff1" },
    ],
  },
};

const moduleOrder = Object.keys(MODULE_CONTENT).sort((a, b) => Number(a) - Number(b));
const SI_SCALAR_VALUES = Array.from({ length: 21 }, (_, index) => index - 10);
const SI_AIR_SLIDERS = [
  {
    id: "length",
    label: "Länge",
    values: ["km", "hm", "dam", "m", "dm", "cm", "mm", "µm", "nm"],
    baseIndex: 3,
    baseValue: "m",
  },
  {
    id: "time",
    label: "Zeit",
    values: ["ks", "hs", "das", "s", "ds", "cs", "ms", "µs", "ns"],
    baseIndex: 3,
    baseValue: "s",
  },
  {
    id: "mass",
    label: "Masse",
    values: ["Pg", "Tg", "Gg", "Mg", "kg", "g", "mg", "µg", "ng"],
    baseIndex: 4,
    baseValue: "kg",
  },
  {
    id: "scalar",
    label: "Skalar",
    values: SI_SCALAR_VALUES,
    baseIndex: 10,
    baseValue: 0,
    isScalar: true,
  },
];

const SI_JUMP_QUESTIONS = [
  {
    text: "Ordne die Slider so, dass \\(10\\,\\mathrm{cm}\\) raus kommt.",
    targets: { scalar: 10, length: "cm" },
  },
  {
    text: "Ordne die Slider so, dass \\(3\\,\\mathrm{ms}\\) raus kommt.",
    targets: { scalar: 3, time: "ms" },
  },
  {
    text: "Ordne die Slider so, dass \\(2\\,\\mathrm{kg}\\) raus kommt.",
    targets: { scalar: 2, mass: "kg" },
  },
  {
    text: "Ordne die Slider so, dass \\(-5\\,\\mathrm{\\mu s}\\) raus kommt.",
    targets: { scalar: -5, time: "µs" },
  },
];

const SI_READOUT_ICONS = {
  length: "📏",
  time: "⏱️",
  mass: "⚖️",
  scalar: "🧮",
};

if (title && frame && pencilLayer instanceof HTMLCanvasElement) {
  const ctx = pencilLayer.getContext("2d");
  let frameRect = frame.getBoundingClientRect();
  let layerRect = pencilLayer.getBoundingClientRect();
  let cssWidth = 0;
  let cssHeight = 0;
  let lastPoint = null;
  let gameStarted = false;
  let activeModuleId = null;
  let activeNodes = [];
  let sidePanelHidden = false;
  const moduleFlashTimers = new WeakMap();

  const applySidePanelVisibility = () => {
    document.body.classList.toggle("side-panel-hidden", sidePanelHidden);
    if (siSideToggle instanceof HTMLButtonElement) {
      siSideToggle.textContent = sidePanelHidden ? "Panel einblenden" : "Panel ausblenden";
      siSideToggle.setAttribute("aria-pressed", sidePanelHidden ? "true" : "false");
    }
  };

  const clampProgress = (value) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      return 0;
    }
    return Math.max(0, Math.min(100, parsed));
  };

  const moduleState = moduleOrder.reduce((acc, moduleId) => {
    const card = moduleCards.find((entry) => entry.dataset.module === moduleId);
    const progress = clampProgress(card?.dataset.progress || "0");
    const steps = MODULE_CONTENT[moduleId].steps.length;
    const segments = Math.max(1, steps - 1);
    const reached = Math.max(0, Math.min(segments, Math.round((progress / 100) * segments)));
    acc[moduleId] = { current: reached, maxReached: reached };
    return acc;
  }, {});
  const siJumpState = {
    running: false,
    rafId: 0,
    worldEl: null,
    playerEl: null,
    questionEl: null,
    statEl: null,
    feedbackEl: null,
    checkButton: null,
    nextButton: null,
    restartButton: null,
    readoutContainer: null,
    readoutEls: new Map(),
    readoutCardEls: new Map(),
    readoutPulseTimers: new Map(),
    sliders: [],
    activeSliderId: null,
    questionIndex: 0,
    score: 0,
    questionSolved: false,
    keys: { left: false, right: false, q: false, e: false },
    jumpQueued: false,
    lastSliderStepAt: 0,
    mathTimer: 0,
    player: { x: 90, y: 0, vx: 0, vy: 0, w: 38, h: 38 },
    groundY: 0,
    platformOffsetX: 0,
    airBoostsLeft: 5,
  };

  const getModulePercent = (moduleId) => {
    const state = moduleState[moduleId];
    const steps = MODULE_CONTENT[moduleId].steps.length;
    if (!state || steps <= 1) {
      return 0;
    }

    const segments = steps - 1;
    return Math.round((state.maxReached / segments) * 100);
  };

  const isModuleUnlocked = (moduleId, forceUnlocked = false) => {
    if (forceUnlocked) {
      return true;
    }

    const index = moduleOrder.indexOf(moduleId);
    if (index <= 0) {
      return true;
    }

    const prevId = moduleOrder[index - 1];
    return getModulePercent(prevId) >= 100;
  };

  const renderCard = (card, forceUnlocked = false) => {
    const moduleId = card.dataset.module || "0";
    const unlocked = isModuleUnlocked(moduleId, forceUnlocked);
    const progress = getModulePercent(moduleId);
    const statusBadge = card.querySelector(".status-badge");
    const progressLabel = card.querySelector(".progress-label");
    const progressFill = card.querySelector(".progress-fill");

    card.classList.toggle("is-locked", !unlocked);
    card.classList.toggle("is-unlocked", unlocked);
    card.setAttribute("aria-disabled", unlocked ? "false" : "true");
    card.disabled = !unlocked;

    if (statusBadge) {
      statusBadge.textContent = unlocked ? "Unlocked" : "Locked";
      statusBadge.classList.toggle("is-locked", !unlocked);
    }

    if (progressLabel) {
      progressLabel.textContent = `${progress}%`;
    }

    if (progressFill) {
      progressFill.style.width = `${progress}%`;
    }
  };

  const applyModuleStates = () => {
    const forceUnlocked = debugToggle instanceof HTMLInputElement && debugToggle.checked;
    moduleCards.forEach((card) => renderCard(card, forceUnlocked));
  };

  const flashModuleCard = (card) => {
    card.classList.add("is-active-temp");

    const existingTimer = moduleFlashTimers.get(card);
    if (existingTimer) {
      window.clearTimeout(existingTimer);
    }

    const timerId = window.setTimeout(() => {
      card.classList.remove("is-active-temp");
    }, 280);
    moduleFlashTimers.set(card, timerId);
  };

  const clampStep = (step, moduleId) => {
    const maxStep = MODULE_CONTENT[moduleId].steps.length - 1;
    return Math.max(0, Math.min(maxStep, step));
  };

  const getNodeDotCenter = (node) => {
    const dot = node.querySelector(".m0-dot");
    if (!(dot instanceof HTMLElement)) {
      return 0;
    }

    return node.offsetTop + dot.offsetTop + dot.offsetHeight / 2;
  };

  const updateModuleLine = () => {
    if (!(modulePath instanceof HTMLElement) || activeNodes.length === 0 || !activeModuleId) {
      return;
    }

    const state = moduleState[activeModuleId];
    const firstCenter = getNodeDotCenter(activeNodes[0]);
    const lastCenter = getNodeDotCenter(activeNodes[activeNodes.length - 1]);
    const currentCenter = getNodeDotCenter(activeNodes[state.current]);
    const lineHeight = Math.max(0, lastCenter - firstCenter);
    const progressHeight = Math.max(0, currentCenter - firstCenter);

    modulePath.style.setProperty("--m0-line-top", `${firstCenter}px`);
    modulePath.style.setProperty("--m0-line-height", `${lineHeight}px`);
    modulePath.style.setProperty("--m0-line-progress", `${progressHeight}px`);
  };

  const applyActiveNodeLockState = () => {
    if (!activeModuleId) {
      return;
    }

    const state = moduleState[activeModuleId];
    const debugOn = debugToggle instanceof HTMLInputElement && debugToggle.checked;

    activeNodes.forEach((node, index) => {
      const unlocked = debugOn || index <= state.maxReached + 1;
      node.classList.toggle("is-locked", !unlocked);
      node.disabled = !unlocked;
      node.setAttribute("aria-disabled", unlocked ? "false" : "true");
    });
  };

  const setActiveStep = (step, focusStep = false) => {
    if (!activeModuleId) {
      return;
    }

    const state = moduleState[activeModuleId];
    const nextStep = clampStep(step, activeModuleId);

    state.current = nextStep;
    state.maxReached = Math.max(state.maxReached, nextStep);

    activeNodes.forEach((node, index) => {
      node.classList.toggle("is-current", index === state.current);
      node.classList.toggle("is-complete", index < state.current);
    });

    applyActiveNodeLockState();
    updateModuleLine();
    applyModuleStates();

    if (focusStep) {
      const activeNode = activeNodes[state.current];
      if (activeNode instanceof HTMLElement) {
        activeNode.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleNodeClick = (index) => {
    if (!activeModuleId) {
      return;
    }

    const node = activeNodes[index];
    if (!(node instanceof HTMLButtonElement) || node.classList.contains("is-locked")) {
      return;
    }

    setActiveStep(index);
    openSIGame(index);
  };

  const renderActiveModuleView = () => {
    if (!activeModuleId || !(moduleSteps instanceof HTMLElement)) {
      return;
    }

    const moduleData = MODULE_CONTENT[activeModuleId];
    if (moduleKicker instanceof HTMLElement) {
      moduleKicker.textContent = `Module ${activeModuleId}`;
    }
    if (moduleTitle instanceof HTMLElement) {
      moduleTitle.textContent = moduleData.title;
    }

    moduleSteps.innerHTML = moduleData.steps
      .map((step, index) => {
        const icon = STEP_ICONS[step.icon] || STEP_ICONS.graph;
        return `
          <button class="m0-node" type="button" data-step="${index}">
            <span class="m0-dot" aria-hidden="true"></span>
            <span class="m0-node-body">
              <span class="m0-node-title">${step.title}</span>
              <span class="m0-node-text">${step.text}</span>
            </span>
            <span class="m0-node-visual" style="--step-grad-start:${step.colorA}; --step-grad-end:${step.colorB};" aria-hidden="true">
              ${icon}
            </span>
          </button>
        `;
      })
      .join("");

    activeNodes = Array.from(moduleSteps.querySelectorAll(".m0-node"));
    activeNodes.forEach((node, index) => {
      node.addEventListener("click", () => {
        handleNodeClick(index);
      });
    });
  };

  const openModuleView = (moduleId) => {
    if (!gameStarted || !(moduleView instanceof HTMLElement) || !MODULE_CONTENT[moduleId]) {
      return;
    }

    activeModuleId = moduleId;
    closeSIGame();
    renderActiveModuleView();

    document.body.classList.add("module0-open", "module0-zooming");
    window.setTimeout(() => {
      document.body.classList.remove("module0-zooming");
    }, 440);

    const state = moduleState[moduleId];
    setActiveStep(state.current);
    window.requestAnimationFrame(() => {
      updateModuleLine();
    });
  };

  const closeModuleView = () => {
    stopSIUnitsJumpGame();
    sidePanelHidden = false;
    applySidePanelVisibility();
    document.body.classList.remove("module0-open", "module0-zooming", "si-game-open");
  };

  const shuffleArray = (items) => {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  const renderGenericGame = (step) => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    siGameStage.innerHTML = `
      <p class="si-game-placeholder">${step.title} Spiel startet hier als nächstes.</p>
    `;
  };

  const renderSIUnitsTutorial = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    stopSIUnitsJumpGame();
    siGameStage.innerHTML = `
      <section class="si-tutorial">
        <header class="si-tutorial-head">
          <h3 class="si-tutorial-title">Tutorial: SI-Einheiten Jump Game</h3>
          <p class="si-tutorial-subtitle">Lerne zuerst kurz die Steuerung und den Lösungsweg. Danach startet das Spiel.</p>
        </header>
        <section class="si-tutorial-grid">
          <article class="si-tutorial-card">
            <p class="si-tutorial-card-title">1) Bewegung</p>
            <div class="si-tutorial-demo si-tutorial-demo-move" aria-hidden="true">
              <div class="si-tutorial-ground"></div>
              <div class="si-tutorial-player"></div>
              <div class="si-tutorial-keys">
                <span>A</span>
                <span>D</span>
              </div>
            </div>
            <p class="si-tutorial-text">Mit <strong>A/D</strong> oder <strong>←/→</strong> läufst du nach links/rechts.</p>
          </article>

          <article class="si-tutorial-card">
            <p class="si-tutorial-card-title">2) Springen + Boost</p>
            <div class="si-tutorial-demo si-tutorial-demo-jump" aria-hidden="true">
              <div class="si-tutorial-ground"></div>
              <div class="si-tutorial-player"></div>
              <div class="si-tutorial-space">SPACE ×5</div>
            </div>
            <p class="si-tutorial-text"><strong>Space</strong> springt. In der Luft kannst du bis zu <strong>5x</strong> boosten.</p>
          </article>

          <article class="si-tutorial-card">
            <p class="si-tutorial-card-title">3) Slider steuern</p>
            <div class="si-tutorial-demo si-tutorial-demo-slider" aria-hidden="true">
              <div class="si-tutorial-track">
                <span>km</span><span>m</span><span>cm</span>
                <div class="si-tutorial-platform"></div>
              </div>
              <div class="si-tutorial-readout">Länge: \\(10\\,\\mathrm{cm}\\)</div>
            </div>
            <p class="si-tutorial-text">Lande auf einer Plattform. Dann verschieben <strong>←/→</strong> genau diesen Slider.</p>
          </article>

          <article class="si-tutorial-card">
            <p class="si-tutorial-card-title">4) Aufgabe lösen</p>
            <div class="si-tutorial-demo si-tutorial-demo-solve" aria-hidden="true">
              <p class="si-tutorial-question">Beispiel: \\(10\\,\\mathrm{cm}\\)</p>
              <ol class="si-tutorial-mini-steps">
                <li>Skalar auf <strong>10</strong></li>
                <li>Länge auf <strong>cm</strong></li>
                <li><strong>Prüfen</strong> drücken</li>
              </ol>
            </div>
            <p class="si-tutorial-text">Masse und Zeit bleiben auf der Mitte, wenn sie in der Frage nicht vorkommen.</p>
          </article>
        </section>
        <div class="si-tutorial-actions">
          <button class="si-jumpgame-button" type="button" id="si-tutorial-skip">Tutorial überspringen</button>
          <button class="si-jumpgame-button" type="button" id="si-tutorial-start">Spiel starten</button>
        </div>
      </section>
    `;

    const startButton = siGameStage.querySelector("#si-tutorial-start");
    if (startButton instanceof HTMLButtonElement) {
      startButton.addEventListener("click", () => {
        startSIUnitsJumpGame();
      });
    }

    const skipButton = siGameStage.querySelector("#si-tutorial-skip");
    if (skipButton instanceof HTMLButtonElement) {
      skipButton.addEventListener("click", () => {
        startSIUnitsJumpGame();
      });
    }

    queueSIJumpTypeset();
  };

  const formatNumber = (value, maximumFractionDigits = 2) =>
    new Intl.NumberFormat("de-DE", {
      maximumFractionDigits,
      minimumFractionDigits: 0,
    }).format(value);

  const unitToLatex = (unit) => unit.replace("µ", "\\mu ");
  const SI_BASE_UNITS = {
    length: "m",
    time: "s",
    mass: "g",
  };
  const SI_PREFIX_EXPONENTS = {
    length: {
      km: 3,
      hm: 2,
      dam: 1,
      m: 0,
      dm: -1,
      cm: -2,
      mm: -3,
      "µm": -6,
      nm: -9,
    },
    time: {
      ks: 3,
      hs: 2,
      das: 1,
      s: 0,
      ds: -1,
      cs: -2,
      ms: -3,
      "µs": -6,
      ns: -9,
    },
    mass: {
      Pg: 15,
      Tg: 12,
      Gg: 9,
      Mg: 6,
      kg: 3,
      g: 0,
      mg: -3,
      "µg": -6,
      ng: -9,
    },
  };

  const queueSIJumpTypeset = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    if (siJumpState.mathTimer) {
      window.clearTimeout(siJumpState.mathTimer);
    }

    siJumpState.mathTimer = window.setTimeout(() => {
      const mathJax = window.MathJax;
      if (mathJax && typeof mathJax.typesetPromise === "function") {
        mathJax.typesetPromise([siGameStage]).catch(() => {
          // Keep interaction smooth even if one typeset call fails.
        });
      }
    }, 16);
  };

  const SI_GROUND_BOTTOM = 17;
  const SI_GROUND_HEIGHT = 14;
  const SI_MAX_AIR_BOOSTS = 5;

  const getSliderById = (sliderId) =>
    siJumpState.sliders.find((slider) => slider.id === sliderId) || null;

  const getSliderCurrentValue = (sliderId) => {
    const slider = getSliderById(sliderId);
    if (!slider) {
      return null;
    }
    return slider.values[slider.index];
  };

  const measureSliderGeometry = () => {
    if (!(siJumpState.worldEl instanceof HTMLElement)) {
      return;
    }

    const worldRect = siJumpState.worldEl.getBoundingClientRect();
    siJumpState.sliders.forEach((slider) => {
      if (!(slider.trackEl instanceof HTMLElement) || !(slider.platformEl instanceof HTMLElement)) {
        return;
      }
      const trackRect = slider.trackEl.getBoundingClientRect();
      const platformRect = slider.platformEl.getBoundingClientRect();
      slider.geom.x1 = trackRect.left - worldRect.left;
      slider.geom.x2 = trackRect.right - worldRect.left;
      slider.geom.y = trackRect.top - worldRect.top;
      slider.geom.px1 = platformRect.left - worldRect.left;
      slider.geom.px2 = platformRect.right - worldRect.left;
      slider.geom.py = platformRect.top - worldRect.top;
    });
  };

  const getSliderPlatformCenterX = (slider) => {
    if (!slider) {
      return 0;
    }
    return slider.geom.px1 + (slider.geom.px2 - slider.geom.px1) * 0.5;
  };

  const updateSliderKnobVisuals = () => {
    siJumpState.sliders.forEach((slider) => {
      if (!(slider.platformEl instanceof HTMLElement)) {
        return;
      }
      const span = Math.max(1, slider.values.length - 1);
      const ratio = slider.index / span;
      slider.platformEl.style.left = `${ratio * 100}%`;
    });
  };

  const updateSIJumpReadouts = () => {
    const scalarCurrent = Number(getSliderCurrentValue("scalar") ?? 0);
    const scalarShown = `${scalarCurrent}`;

    siJumpState.sliders.forEach((slider) => {
      const valueEl = siJumpState.readoutEls.get(slider.id);
      if (!(valueEl instanceof HTMLElement)) {
        return;
      }

      const value = slider.values[slider.index];
      if (slider.isScalar) {
        const shown = value > 0 ? `+${value}` : `${value}`;
        valueEl.innerHTML = `<span class="si-jump-readout-main">\\(s = ${shown}\\)</span>`;
      } else {
        const unit = String(value);
        const exponent = SI_PREFIX_EXPONENTS[slider.id]?.[unit];
        const baseUnit = SI_BASE_UNITS[slider.id] || unit;

        if (typeof exponent === "number") {
          const formulaLine = `\\(${scalarShown}\\cdot10^{${exponent}}\\,\\mathrm{${unitToLatex(baseUnit)}}\\)`;
          valueEl.innerHTML = `<span class="si-jump-readout-main">${formulaLine}</span>`;
        } else {
          valueEl.innerHTML = `<span class="si-jump-readout-main">\\(${scalarShown}\\,\\mathrm{${unitToLatex(baseUnit)}}\\)</span>`;
        }
      }
    });
    queueSIJumpTypeset();
  };

  const updateActiveReadoutHighlight = () => {
    siJumpState.readoutCardEls.forEach((cardEl, sliderId) => {
      if (!(cardEl instanceof HTMLElement)) {
        return;
      }
      cardEl.classList.toggle("is-active", sliderId === siJumpState.activeSliderId);
    });
  };

  const setActiveSlider = (sliderId) => {
    siJumpState.activeSliderId = sliderId;
    updateActiveReadoutHighlight();
  };

  const pulseReadout = (sliderId) => {
    const cardEl = siJumpState.readoutCardEls.get(sliderId);
    if (!(cardEl instanceof HTMLElement)) {
      return;
    }

    const existingTimer = siJumpState.readoutPulseTimers.get(sliderId);
    if (existingTimer) {
      window.clearTimeout(existingTimer);
    }

    cardEl.classList.remove("is-pulse");
    void cardEl.offsetWidth;
    cardEl.classList.add("is-pulse");

    const timer = window.setTimeout(() => {
      cardEl.classList.remove("is-pulse");
    }, 260);
    siJumpState.readoutPulseTimers.set(sliderId, timer);
  };

  const buildSIJumpWorldMarkup = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    const readouts = SI_AIR_SLIDERS.map(
      (slider) => {
        const icon = SI_READOUT_ICONS[slider.id] || "⚙️";
        return `
        <article class="si-jump-readout" data-readout-card="${slider.id}">
          <p class="si-jump-readout-title">
            <span class="si-jump-readout-icon" aria-hidden="true">${icon}</span>
            <span>${slider.label}</span>
          </p>
          <p class="si-jump-readout-value" data-readout-id="${slider.id}"></p>
        </article>
      `;
      },
    ).join("");

    const sliderLines = SI_AIR_SLIDERS.map((slider) => {
      const icon = SI_READOUT_ICONS[slider.id] || "⚙️";
      const span = Math.max(1, slider.values.length - 1);
      const baseRatio = (slider.baseIndex / span) * 100;
      const centerLabel = slider.isScalar ? "Mitte: 0" : `Mitte: ${slider.baseValue}`;
      const tickMarkup = slider.values
        .map((entry, index) => {
          const ratio = (index / span) * 100;
          const label = slider.isScalar ? (Number(entry) % 5 === 0 ? `${entry}` : "") : `${entry}`;
          return `
            <span class="si-air-tick" style="left:${ratio}%">
              <span class="si-air-tick-mark"></span>
              ${label ? `<span class="si-air-tick-label">${label}</span>` : ""}
            </span>
          `;
        })
        .join("");

      return `
        <div class="si-air-slider" data-slider-id="${slider.id}">
          <div class="si-air-slider-head">
            <span class="si-air-slider-label">
              <span class="si-air-slider-icon" aria-hidden="true">${icon}</span>
              <span>${slider.label}</span>
            </span>
            <span>${centerLabel}</span>
          </div>
          <div class="si-air-track" data-slider-track="${slider.id}">
            <span class="si-air-track-center" style="left:${baseRatio}%"></span>
            <span class="si-air-platform" data-slider-platform="${slider.id}"></span>
          </div>
          <div class="si-air-ticks">
            ${tickMarkup}
          </div>
        </div>
      `;
    }).join("");

    siGameStage.innerHTML = `
      <section class="si-jumpgame">
        <header class="si-jumpgame-top">
          <p class="si-jumpgame-question" id="si-jump-question"></p>
          <p class="si-jumpgame-stat" id="si-jump-stat"></p>
        </header>
        <section class="si-jumpgame-readouts" id="si-jump-readouts">
          ${readouts}
        </section>
        <p class="si-jumpgame-feedback" id="si-jump-feedback"></p>
        <div class="si-jumpgame-actions">
          <button class="si-jumpgame-button" type="button" id="si-jump-check">Prüfen</button>
          <button class="si-jumpgame-button" type="button" id="si-jump-next" disabled>Nächste Frage</button>
          <button class="si-jumpgame-button" type="button" id="si-jump-reset">Neu starten</button>
        </div>
        <div class="si-jumpgame-world" id="si-jump-world">
          <div class="si-jump-ground"></div>
          ${sliderLines}
          <div class="si-jump-player" id="si-jump-player"></div>
        </div>
        <p class="si-jumpgame-help">A/D oder ←/→ bewegen. Space springt und gibt in der Luft bis zu 5x Boost. Auf einer Slider-Linie verschieben ←/→ den Slider. Mit Q/E bewegst du dich auf der Plattform, ohne den Slider zu ändern. Space springt heraus.</p>
      </section>
    `;
  };

  const initSIJumpDomRefs = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    siJumpState.worldEl = siGameStage.querySelector("#si-jump-world");
    siJumpState.playerEl = siGameStage.querySelector("#si-jump-player");
    siJumpState.questionEl = siGameStage.querySelector("#si-jump-question");
    siJumpState.statEl = siGameStage.querySelector("#si-jump-stat");
    siJumpState.feedbackEl = siGameStage.querySelector("#si-jump-feedback");
    siJumpState.checkButton = siGameStage.querySelector("#si-jump-check");
    siJumpState.nextButton = siGameStage.querySelector("#si-jump-next");
    siJumpState.restartButton = siGameStage.querySelector("#si-jump-reset");
    siJumpState.readoutContainer = siGameStage.querySelector("#si-jump-readouts");
    siJumpState.readoutEls = new Map(
      Array.from(siGameStage.querySelectorAll("[data-readout-id]")).map((entry) => [
        entry.getAttribute("data-readout-id"),
        entry,
      ]),
    );
    siJumpState.readoutCardEls = new Map(
      Array.from(siGameStage.querySelectorAll("[data-readout-card]")).map((entry) => [
        entry.getAttribute("data-readout-card"),
        entry,
      ]),
    );

    siJumpState.sliders = SI_AIR_SLIDERS.map((slider) => ({
      ...slider,
      index: slider.baseIndex,
      wrapperEl: siGameStage.querySelector(`[data-slider-id="${slider.id}"]`),
      trackEl: siGameStage.querySelector(`[data-slider-track="${slider.id}"]`),
      platformEl: siGameStage.querySelector(`[data-slider-platform="${slider.id}"]`),
      geom: { x1: 0, x2: 0, y: 0, px1: 0, px2: 0, py: 0 },
    }));
  };

  const layoutSIJumpWorld = () => {
    if (!(siJumpState.worldEl instanceof HTMLElement)) {
      return;
    }

    const worldHeight = siJumpState.worldEl.clientHeight;
    const topGap = Math.max(44, worldHeight * 0.12);
    const stepGap = Math.max(52, worldHeight * 0.16);

    siJumpState.sliders.forEach((slider, index) => {
      if (slider.wrapperEl instanceof HTMLElement) {
        slider.wrapperEl.style.top = `${topGap + index * stepGap}px`;
      }
    });
    measureSliderGeometry();
    updateSliderKnobVisuals();
  };

  const updateSIJumpQuestion = () => {
    const question = SI_JUMP_QUESTIONS[siJumpState.questionIndex];
    if (!question) {
      return;
    }

    if (siJumpState.questionEl instanceof HTMLElement) {
      siJumpState.questionEl.textContent = question.text;
    }
    if (siJumpState.statEl instanceof HTMLElement) {
      siJumpState.statEl.textContent = `Frage ${siJumpState.questionIndex + 1}/${SI_JUMP_QUESTIONS.length} | Punkte ${siJumpState.score}`;
    }
    if (siJumpState.feedbackEl instanceof HTMLElement) {
      siJumpState.feedbackEl.classList.remove("is-good", "is-warn");
      siJumpState.feedbackEl.textContent = "Stelle die Slider passend ein und drücke dann Prüfen.";
    }
    if (siJumpState.nextButton instanceof HTMLButtonElement) {
      siJumpState.nextButton.disabled = true;
      siJumpState.nextButton.textContent = "Nächste Frage";
    }
    if (siJumpState.checkButton instanceof HTMLButtonElement) {
      siJumpState.checkButton.disabled = false;
    }
    siJumpState.questionSolved = false;
    queueSIJumpTypeset();
  };

  const renderSIJumpCompletion = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    const maxScore = SI_JUMP_QUESTIONS.length;
    const percent = Math.round((siJumpState.score / maxScore) * 100);
    const summary =
      percent >= 90
        ? "Stark. Du hast sehr gutes Einheitengefühl."
        : percent >= 60
          ? "Gute Basis. Noch eine Runde macht es stabiler."
          : "Guter Start. Spiele die Runde noch einmal für mehr Sicherheit.";

    siGameStage.innerHTML = `
      <section class="si-jump-complete">
        <h3 class="si-jump-complete-title">Runde abgeschlossen</h3>
        <p class="si-jump-complete-text">Punkte: <strong>${siJumpState.score}/${maxScore}</strong> (${percent}%).</p>
        <p class="si-jump-complete-text">${summary}</p>
        <div class="si-jumpgame-actions">
          <button class="si-jumpgame-button" type="button" id="si-jump-restart-final">Nochmal spielen</button>
          <button class="si-jumpgame-button" type="button" id="si-jump-back-final">Zum Pfad</button>
        </div>
      </section>
    `;

    const restartButton = siGameStage.querySelector("#si-jump-restart-final");
    if (restartButton instanceof HTMLButtonElement) {
      restartButton.addEventListener("click", () => {
        renderSIUnitsTutorial();
      });
    }
    const backButton = siGameStage.querySelector("#si-jump-back-final");
    if (backButton instanceof HTMLButtonElement) {
      backButton.addEventListener("click", () => {
        closeSIGame();
      });
    }
  };

  const checkSIJumpQuestion = () => {
    const question = SI_JUMP_QUESTIONS[siJumpState.questionIndex];
    if (!question || siJumpState.questionSolved) {
      return;
    }

    const mismatches = [];
    Object.entries(question.targets).forEach(([sliderId, expected]) => {
      const current = getSliderCurrentValue(sliderId);
      if (current === expected) {
        return;
      }

      if (sliderId === "scalar") {
        mismatches.push(`Skalar: ${current} statt ${expected}`);
      } else {
        const label = SI_AIR_SLIDERS.find((slider) => slider.id === sliderId)?.label || sliderId;
        mismatches.push(`${label}: ${current} statt ${expected}`);
      }
    });

    if (mismatches.length === 0) {
      siJumpState.questionSolved = true;
      siJumpState.score += 1;
      if (siJumpState.feedbackEl instanceof HTMLElement) {
        siJumpState.feedbackEl.classList.remove("is-warn");
        siJumpState.feedbackEl.classList.add("is-good");
        siJumpState.feedbackEl.textContent = "Richtig. Sehr gut eingestellt.";
      }
      if (siJumpState.statEl instanceof HTMLElement) {
        siJumpState.statEl.textContent = `Frage ${siJumpState.questionIndex + 1}/${SI_JUMP_QUESTIONS.length} | Punkte ${siJumpState.score}`;
      }
      if (siJumpState.nextButton instanceof HTMLButtonElement) {
        siJumpState.nextButton.disabled = false;
        siJumpState.nextButton.textContent =
          siJumpState.questionIndex >= SI_JUMP_QUESTIONS.length - 1 ? "Ergebnis anzeigen" : "Nächste Frage";
      }
      if (siJumpState.checkButton instanceof HTMLButtonElement) {
        siJumpState.checkButton.disabled = true;
      }
      return;
    }

    if (siJumpState.feedbackEl instanceof HTMLElement) {
      siJumpState.feedbackEl.classList.remove("is-good");
      siJumpState.feedbackEl.classList.add("is-warn");
      siJumpState.feedbackEl.textContent = `Noch nicht passend: ${mismatches.join(" | ")}`;
    }
  };

  const goToNextSIJumpQuestion = () => {
    if (!siJumpState.questionSolved) {
      return;
    }

    siJumpState.questionIndex += 1;
    if (siJumpState.questionIndex >= SI_JUMP_QUESTIONS.length) {
      stopSIUnitsJumpGame();
      renderSIJumpCompletion();
      return;
    }
    updateSIJumpQuestion();
  };

  const shiftActiveSlider = (step) => {
    const slider = getSliderById(siJumpState.activeSliderId);
    if (!slider) {
      return;
    }
    const maxIndex = slider.values.length - 1;
    const nextIndex = Math.max(0, Math.min(maxIndex, slider.index + step));
    if (nextIndex === slider.index) {
      return;
    }
    slider.index = nextIndex;
    updateSliderKnobVisuals();
    updateSIJumpReadouts();
    pulseReadout(slider.id);
  };

  const updateSIJumpPlayerVisual = () => {
    if (!(siJumpState.playerEl instanceof HTMLElement)) {
      return;
    }
    siJumpState.playerEl.style.transform = `translate(${siJumpState.player.x}px, ${siJumpState.player.y}px)`;
  };

  const jumpFromSurface = () => {
    setActiveSlider(null);
    siJumpState.platformOffsetX = 0;
    siJumpState.player.vy = -12.8;
    siJumpState.player.y -= 1;
    siJumpState.airBoostsLeft = SI_MAX_AIR_BOOSTS;
  };

  const applySIJumpPhysics = () => {
    if (!(siJumpState.worldEl instanceof HTMLElement)) {
      return;
    }

    const player = siJumpState.player;
    const worldWidth = siJumpState.worldEl.clientWidth;
    const worldHeight = siJumpState.worldEl.clientHeight;
    siJumpState.groundY = worldHeight - SI_GROUND_BOTTOM - SI_GROUND_HEIGHT;
    const groundY = siJumpState.groundY;

    const activeSlider = getSliderById(siJumpState.activeSliderId);
    if (activeSlider) {
      const now = performance.now();
      if (now - siJumpState.lastSliderStepAt > 92) {
        if (siJumpState.keys.left) {
          shiftActiveSlider(-1);
          siJumpState.lastSliderStepAt = now;
        } else if (siJumpState.keys.right) {
          shiftActiveSlider(1);
          siJumpState.lastSliderStepAt = now;
        }
      }

      const platformCenterX = getSliderPlatformCenterX(activeSlider);
      const platformWidth = Math.max(0, activeSlider.geom.px2 - activeSlider.geom.px1);
      const maxOffset = Math.max(0, (platformWidth - player.w) * 0.5);
      const platformWalk = (siJumpState.keys.e ? 1 : 0) - (siJumpState.keys.q ? 1 : 0);
      if (platformWalk !== 0) {
        siJumpState.platformOffsetX += platformWalk * 2.6;
      }
      siJumpState.platformOffsetX = Math.max(-maxOffset, Math.min(maxOffset, siJumpState.platformOffsetX));
      player.x = platformCenterX + siJumpState.platformOffsetX - player.w / 2;
      player.y = activeSlider.geom.py - player.h;
      player.vx = 0;
      player.vy = 0;
      siJumpState.airBoostsLeft = SI_MAX_AIR_BOOSTS;

      if (siJumpState.jumpQueued) {
        jumpFromSurface();
      }

      updateSIJumpPlayerVisual();
      siJumpState.jumpQueued = false;
      return;
    }

    const targetVx = ((siJumpState.keys.right ? 1 : 0) - (siJumpState.keys.left ? 1 : 0)) * 4.2;
    player.vx += (targetVx - player.vx) * 0.24;
    if (Math.abs(player.vx) < 0.04 && targetVx === 0) {
      player.vx = 0;
    }

    const previousBottom = player.y + player.h;
    player.x += player.vx;
    player.vy += 0.72;
    player.y += player.vy;

    if (player.x < 0) {
      player.x = 0;
    }
    if (player.x + player.w > worldWidth) {
      player.x = worldWidth - player.w;
    }

    let landedSlider = null;
    if (player.vy >= 0) {
      const centerX = player.x + player.w * 0.5;
      for (const slider of siJumpState.sliders) {
        if (!slider.geom) {
          continue;
        }
        const currentBottom = player.y + player.h;
        const hitsY = previousBottom <= slider.geom.py && currentBottom >= slider.geom.py;
        const hitsX = centerX >= slider.geom.px1 && centerX <= slider.geom.px2;
        if (hitsY && hitsX) {
          if (!landedSlider || slider.geom.py < landedSlider.geom.py) {
            landedSlider = slider;
          }
        }
      }
    }

    if (landedSlider) {
      setActiveSlider(landedSlider.id);
      const platformCenterX = getSliderPlatformCenterX(landedSlider);
      const minX = landedSlider.geom.px1;
      const maxX = landedSlider.geom.px2 - player.w;
      player.x = Math.max(minX, Math.min(maxX, player.x));
      siJumpState.platformOffsetX = player.x + player.w * 0.5 - platformCenterX;
      player.y = landedSlider.geom.py - player.h;
      player.vy = 0;
      siJumpState.airBoostsLeft = SI_MAX_AIR_BOOSTS;
    } else if (player.y + player.h >= groundY) {
      setActiveSlider(null);
      siJumpState.platformOffsetX = 0;
      player.y = groundY - player.h;
      player.vy = 0;
      siJumpState.airBoostsLeft = SI_MAX_AIR_BOOSTS;
    }

    const onGround = player.y + player.h >= groundY - 0.1 && player.vy === 0;
    if (siJumpState.jumpQueued) {
      if (onGround) {
        jumpFromSurface();
      } else if (siJumpState.airBoostsLeft > 0) {
        player.vy = -10.9;
        siJumpState.airBoostsLeft -= 1;
      }
    }

    updateSIJumpPlayerVisual();
    siJumpState.jumpQueued = false;
  };

  const stepSIJumpFrame = () => {
    if (!siJumpState.running) {
      return;
    }

    measureSliderGeometry();
    applySIJumpPhysics();
    siJumpState.rafId = window.requestAnimationFrame(stepSIJumpFrame);
  };

  const startSIUnitsJumpGame = () => {
    if (!(siGameStage instanceof HTMLElement)) {
      return;
    }

    stopSIUnitsJumpGame();
    buildSIJumpWorldMarkup();
    initSIJumpDomRefs();
    layoutSIJumpWorld();

    siJumpState.questionIndex = 0;
    siJumpState.score = 0;
    siJumpState.questionSolved = false;
    setActiveSlider(null);
    siJumpState.keys.left = false;
    siJumpState.keys.right = false;
    siJumpState.keys.q = false;
    siJumpState.keys.e = false;
    siJumpState.jumpQueued = false;
    siJumpState.platformOffsetX = 0;
    siJumpState.airBoostsLeft = SI_MAX_AIR_BOOSTS;
    siJumpState.player.x = 72;
    siJumpState.player.vx = 0;
    siJumpState.player.vy = 0;
    siJumpState.groundY =
      siJumpState.worldEl instanceof HTMLElement
        ? siJumpState.worldEl.clientHeight - SI_GROUND_BOTTOM - SI_GROUND_HEIGHT
        : 0;
    siJumpState.player.y = siJumpState.groundY - siJumpState.player.h;

    siJumpState.sliders.forEach((slider) => {
      slider.index = slider.baseIndex;
    });
    updateSliderKnobVisuals();
    updateSIJumpReadouts();
    updateSIJumpQuestion();
    updateSIJumpPlayerVisual();

    if (siJumpState.checkButton instanceof HTMLButtonElement) {
      siJumpState.checkButton.addEventListener("click", () => {
        checkSIJumpQuestion();
      });
    }
    if (siJumpState.nextButton instanceof HTMLButtonElement) {
      siJumpState.nextButton.addEventListener("click", () => {
        goToNextSIJumpQuestion();
      });
    }
    if (siJumpState.restartButton instanceof HTMLButtonElement) {
      siJumpState.restartButton.addEventListener("click", () => {
        startSIUnitsJumpGame();
      });
    }

    siJumpState.running = true;
    siJumpState.rafId = window.requestAnimationFrame(stepSIJumpFrame);
  };

  const stopSIUnitsJumpGame = () => {
    siJumpState.running = false;
    if (siJumpState.rafId) {
      window.cancelAnimationFrame(siJumpState.rafId);
      siJumpState.rafId = 0;
    }
    if (siJumpState.mathTimer) {
      window.clearTimeout(siJumpState.mathTimer);
      siJumpState.mathTimer = 0;
    }
    siJumpState.keys.left = false;
    siJumpState.keys.right = false;
    siJumpState.keys.q = false;
    siJumpState.keys.e = false;
    siJumpState.jumpQueued = false;
    siJumpState.platformOffsetX = 0;
    setActiveSlider(null);
    siJumpState.readoutPulseTimers.forEach((timerId) => {
      window.clearTimeout(timerId);
    });
    siJumpState.readoutPulseTimers.clear();
    siJumpState.readoutCardEls.forEach((cardEl) => {
      if (cardEl instanceof HTMLElement) {
        cardEl.classList.remove("is-pulse", "is-active");
      }
    });
  };

  const handleSIJumpKeyDown = (event) => {
    if (!siJumpState.running) {
      return;
    }

    if (event.code === "ArrowLeft" || event.code === "KeyA") {
      siJumpState.keys.left = true;
      event.preventDefault();
      return;
    }
    if (event.code === "ArrowRight" || event.code === "KeyD") {
      siJumpState.keys.right = true;
      event.preventDefault();
      return;
    }
    if (event.code === "KeyQ") {
      siJumpState.keys.q = true;
      event.preventDefault();
      return;
    }
    if (event.code === "KeyE") {
      siJumpState.keys.e = true;
      event.preventDefault();
      return;
    }
    if (event.code === "Space") {
      if (!event.repeat) {
        siJumpState.jumpQueued = true;
      }
      event.preventDefault();
    }
  };

  const handleSIJumpKeyUp = (event) => {
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
      siJumpState.keys.left = false;
      return;
    }
    if (event.code === "ArrowRight" || event.code === "KeyD") {
      siJumpState.keys.right = false;
      return;
    }
    if (event.code === "KeyQ") {
      siJumpState.keys.q = false;
      return;
    }
    if (event.code === "KeyE") {
      siJumpState.keys.e = false;
    }
  };

  window.addEventListener("keydown", handleSIJumpKeyDown);
  window.addEventListener("keyup", handleSIJumpKeyUp);

  const typesetSidePanelMath = () => {
    if (!(siSideContent instanceof HTMLElement)) {
      return;
    }

    const mathJax = window.MathJax;
    if (mathJax && typeof mathJax.typesetPromise === "function") {
      mathJax.typesetPromise([siSideContent]).catch(() => {
        // Keep UI responsive even if math rendering fails once.
      });
    }
  };

  const renderSidePanel = (moduleId, step) => {
    if (!(siSideContent instanceof HTMLElement) || !step) {
      return;
    }

    const isSIUnits = moduleId === "0" && step.title === "SI-Einheiten";

    if (isSIUnits) {
      siSideContent.innerHTML = `
        <article class="side-card">
          <h3 class="side-title"><strong>1) SI-Basiseinheiten</strong></h3>
          <div class="side-si-base-list" aria-label="SI Basiseinheiten">
            <div class="side-si-base-item" style="--item-delay: 0s;">
              <span class="side-si-base-name">Länge</span>
              <span class="side-si-base-unit">\\(\\mathrm{m}\\) (Meter)</span>
            </div>
            <div class="side-si-base-item" style="--item-delay: 0.07s;">
              <span class="side-si-base-name">Masse</span>
              <span class="side-si-base-unit">\\(\\mathrm{kg}\\) (Kilogramm)</span>
            </div>
            <div class="side-si-base-item" style="--item-delay: 0.14s;">
              <span class="side-si-base-name">Zeit</span>
              <span class="side-si-base-unit">\\(\\mathrm{s}\\) (Sekunde)</span>
            </div>
            <div class="side-si-base-item" style="--item-delay: 0.21s;">
              <span class="side-si-base-name">Stromstärke</span>
              <span class="side-si-base-unit">\\(\\mathrm{A}\\) (Ampere)</span>
            </div>
            <div class="side-si-base-item" style="--item-delay: 0.28s;">
              <span class="side-si-base-name">Temperatur</span>
              <span class="side-si-base-unit">\\(\\mathrm{K}\\) (Kelvin)</span>
            </div>
            <div class="side-si-base-item" style="--item-delay: 0.35s;">
              <span class="side-si-base-name">Stoffmenge</span>
              <span class="side-si-base-unit">\\(\\mathrm{mol}\\) (Mol)</span>
            </div>
            <div class="side-si-base-item" style="--item-delay: 0.42s;">
              <span class="side-si-base-name">Lichtstärke</span>
              <span class="side-si-base-unit">\\(\\mathrm{cd}\\) (Candela)</span>
            </div>
          </div>
        </article>
        <article class="side-card">
          <h3 class="side-title"><strong>2) Präfixe = Potenzen von 10</strong></h3>
          <p class="side-text">Jedes Präfix bedeutet einen festen Faktor \\(10^n\\).</p>
          <div class="side-prefix-grid" aria-hidden="true">
            <div class="side-prefix-item" style="--prefix-delay: 0s;">
              <span class="side-prefix-symbol">k</span>
              <span class="side-prefix-name">kilo</span>
              <span class="side-prefix-power">\\(10^3\\)</span>
            </div>
            <div class="side-prefix-item" style="--prefix-delay: 0.08s;">
              <span class="side-prefix-symbol">h</span>
              <span class="side-prefix-name">hekto</span>
              <span class="side-prefix-power">\\(10^2\\)</span>
            </div>
            <div class="side-prefix-item" style="--prefix-delay: 0.16s;">
              <span class="side-prefix-symbol">da</span>
              <span class="side-prefix-name">deka</span>
              <span class="side-prefix-power">\\(10^1\\)</span>
            </div>
            <div class="side-prefix-item side-prefix-item-base" style="--prefix-delay: 0.24s;">
              <span class="side-prefix-symbol">-</span>
              <span class="side-prefix-name">Basis</span>
              <span class="side-prefix-power">\\(10^0\\)</span>
            </div>
            <div class="side-prefix-item" style="--prefix-delay: 0.32s;">
              <span class="side-prefix-symbol">d</span>
              <span class="side-prefix-name">dezi</span>
              <span class="side-prefix-power">\\(10^{-1}\\)</span>
            </div>
            <div class="side-prefix-item" style="--prefix-delay: 0.4s;">
              <span class="side-prefix-symbol">c</span>
              <span class="side-prefix-name">zenti</span>
              <span class="side-prefix-power">\\(10^{-2}\\)</span>
            </div>
            <div class="side-prefix-item" style="--prefix-delay: 0.48s;">
              <span class="side-prefix-symbol">m</span>
              <span class="side-prefix-name">milli</span>
              <span class="side-prefix-power">\\(10^{-3}\\)</span>
            </div>
            <div class="side-prefix-item" style="--prefix-delay: 0.56s;">
              <span class="side-prefix-symbol">µ</span>
              <span class="side-prefix-name">mikro</span>
              <span class="side-prefix-power">\\(10^{-6}\\)</span>
            </div>
            <div class="side-prefix-item" style="--prefix-delay: 0.64s;">
              <span class="side-prefix-symbol">n</span>
              <span class="side-prefix-name">nano</span>
              <span class="side-prefix-power">\\(10^{-9}\\)</span>
            </div>
          </div>
          <p class="side-eq">\\[\\text{Präfix-Einheit}=10^n\\cdot\\text{Basiseinheit}\\]</p>
        </article>
        <article class="side-card">
          <h3 class="side-title"><strong>3) Umrechnung: Meter und Gramm</strong></h3>
          <p class="side-text">Gleiche Präfix-Reihenfolge, andere Basiseinheit.</p>
          <div class="side-convert-block" aria-hidden="true">
            <p class="side-convert-label">Länge</p>
            <div class="side-convert-track">
              <span class="side-convert-chip">km<br><small>10³</small></span>
              <span class="side-convert-chip">hm<br><small>10²</small></span>
              <span class="side-convert-chip">dam<br><small>10¹</small></span>
              <span class="side-convert-chip side-convert-chip-base">m<br><small>10⁰</small></span>
              <span class="side-convert-chip">dm<br><small>10⁻¹</small></span>
              <span class="side-convert-chip">cm<br><small>10⁻²</small></span>
              <span class="side-convert-chip">mm<br><small>10⁻³</small></span>
              <span class="side-convert-chip">µm<br><small>10⁻⁶</small></span>
              <span class="side-convert-chip">nm<br><small>10⁻⁹</small></span>
              <span class="side-convert-dot"></span>
            </div>
            <p class="side-eq">\\[2\\,\\mathrm{m}=200\\,\\mathrm{cm}=2000\\,\\mathrm{mm}\\]</p>
          </div>
          <div class="side-convert-block" aria-hidden="true">
            <p class="side-convert-label">Masse</p>
            <div class="side-convert-track">
              <span class="side-convert-chip">kg<br><small>10³</small></span>
              <span class="side-convert-chip">hg<br><small>10²</small></span>
              <span class="side-convert-chip">dag<br><small>10¹</small></span>
              <span class="side-convert-chip side-convert-chip-base">g<br><small>10⁰</small></span>
              <span class="side-convert-chip">dg<br><small>10⁻¹</small></span>
              <span class="side-convert-chip">cg<br><small>10⁻²</small></span>
              <span class="side-convert-chip">mg<br><small>10⁻³</small></span>
              <span class="side-convert-chip">µg<br><small>10⁻⁶</small></span>
              <span class="side-convert-chip">ng<br><small>10⁻⁹</small></span>
              <span class="side-convert-dot side-convert-dot-second"></span>
            </div>
            <p class="side-eq">\\[3\\,\\mathrm{g}=3000\\,\\mathrm{mg}=3\\cdot10^6\\,\\mathrm{\\mu g}\\]</p>
          </div>
        </article>
      `;
      typesetSidePanelMath();
      return;
    }

    siSideContent.innerHTML = `
      <article class="side-card">
        <h3 class="side-title"><strong>${step.title}</strong></h3>
        <p class="side-text">Zusammenfassung folgt hier.</p>
      </article>
    `;
    typesetSidePanelMath();
  };

  const openSIGame = (stepIndex) => {
    if (!activeModuleId) {
      return;
    }

    const moduleData = MODULE_CONTENT[activeModuleId];
    const step = moduleData?.steps?.[stepIndex];
    if (!step) {
      return;
    }

    if (siGameKicker instanceof HTMLElement) {
      siGameKicker.textContent = `Module ${activeModuleId} Game`;
    }
    if (siGameTitle instanceof HTMLElement) {
      siGameTitle.textContent = step.title;
    }
    const isSIUnits = activeModuleId === "0" && step.title === "SI-Einheiten";
    if (isSIUnits) {
      renderSIUnitsTutorial();
    } else {
      stopSIUnitsJumpGame();
      renderGenericGame(step);
    }
    renderSidePanel(activeModuleId, step);

    document.body.classList.add("si-game-open");
  };

  const closeSIGame = () => {
    stopSIUnitsJumpGame();
    sidePanelHidden = false;
    applySidePanelVisibility();
    document.body.classList.remove("si-game-open");
    document.body.classList.add("module0-open");
    window.requestAnimationFrame(() => {
      updateModuleLine();
    });
  };

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const resizeCanvas = () => {
    cssWidth = Math.max(1, Math.floor(frame.clientWidth));
    cssHeight = Math.max(1, Math.floor(frame.clientHeight));
    pencilLayer.width = Math.floor(cssWidth * dpr);
    pencilLayer.height = Math.floor(cssHeight * dpr);
    pencilLayer.style.width = `${cssWidth}px`;
    pencilLayer.style.height = `${cssHeight}px`;

    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssWidth, cssHeight);
    }

    frameRect = frame.getBoundingClientRect();
    layerRect = pencilLayer.getBoundingClientRect();
    updateModuleLine();
  };

  const jitter = (amount = 0.9) => (Math.random() - 0.5) * amount;

  const drawPencilSegment = (from, to) => {
    if (!ctx) {
      return;
    }

    for (let i = 0; i < 3; i += 1) {
      ctx.strokeStyle = `rgba(43, 50, 58, ${0.13 + Math.random() * 0.13})`;
      ctx.lineWidth = 0.85 + Math.random() * 1.15;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(from.x + jitter(1.1), from.y + jitter(1.1));
      ctx.lineTo(to.x + jitter(1.1), to.y + jitter(1.1));
      ctx.stroke();
    }

    if (Math.random() > 0.58) {
      ctx.fillStyle = `rgba(43, 50, 58, ${0.08 + Math.random() * 0.08})`;
      ctx.beginPath();
      ctx.arc(to.x + jitter(2.3), to.y + jitter(2.3), 0.7 + Math.random() * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const fadeTrail = () => {
    if (ctx) {
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(255, 255, 255, 0.045)";
      ctx.fillRect(0, 0, cssWidth, cssHeight);
      ctx.restore();
    }
    window.requestAnimationFrame(fadeTrail);
  };

  resizeCanvas();
  fadeTrail();

  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });
    observer.observe(frame);
  } else {
    window.addEventListener("resize", () => {
      resizeCanvas();
    });
  }

  frame.addEventListener("pointerenter", () => {
    frameRect = frame.getBoundingClientRect();
    layerRect = pencilLayer.getBoundingClientRect();
  });

  frame.addEventListener("pointermove", (event) => {
    if (gameStarted) {
      return;
    }

    const x = (event.clientX - frameRect.left) / frameRect.width - 0.5;
    const y = (event.clientY - frameRect.top) / frameRect.height - 0.5;
    const rotateX = (-y * 2.4).toFixed(2);
    const rotateY = (x * 2.4).toFixed(2);

    title.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const point = {
      x: event.clientX - layerRect.left,
      y: event.clientY - layerRect.top,
    };

    if (lastPoint) {
      drawPencilSegment(lastPoint, point);
    }
    lastPoint = point;
  });

  frame.addEventListener("pointerleave", () => {
    title.style.transform = "";
    lastPoint = null;
  });

  if (startButton instanceof HTMLButtonElement) {
    startButton.addEventListener("click", () => {
      if (gameStarted) {
        return;
      }

      gameStarted = true;
      document.body.classList.add("game-started");
      title.style.transform = "";
      lastPoint = null;

      if (ctx) {
        ctx.clearRect(0, 0, cssWidth, cssHeight);
      }
    });
  }

  moduleCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("is-locked")) {
        return;
      }

      flashModuleCard(card);
      const moduleId = card.dataset.module || "0";
      openModuleView(moduleId);
    });
  });

  if (debugToggle instanceof HTMLInputElement) {
    debugToggle.addEventListener("change", () => {
      applyModuleStates();
      applyActiveNodeLockState();

      if (activeModuleId && !isModuleUnlocked(activeModuleId, false)) {
        closeModuleView();
      }
    });
  }

  if (moduleBack instanceof HTMLButtonElement) {
    moduleBack.addEventListener("click", () => {
      closeModuleView();
    });
  }

  if (siGameBack instanceof HTMLButtonElement) {
    siGameBack.addEventListener("click", () => {
      closeSIGame();
    });
  }

  if (siSideToggle instanceof HTMLButtonElement) {
    siSideToggle.addEventListener("click", () => {
      sidePanelHidden = !sidePanelHidden;
      applySidePanelVisibility();
    });
  }

  window.addEventListener("resize", () => {
    updateModuleLine();
    if (siJumpState.running) {
      layoutSIJumpWorld();
      updateSIJumpPlayerVisual();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("si-game-open")) {
      closeSIGame();
      return;
    }

    if (event.key === "Escape" && document.body.classList.contains("module0-open")) {
      closeModuleView();
    }
  });

  if (modulesScroll instanceof HTMLElement) {
    // Keep default scrolling without edge bounce to avoid stutter.
  }

  applySidePanelVisibility();
  applyModuleStates();
}
