let table;
let col0 = [], col1 = [], col2 = [], col3 = [], col4 = [];
let dato1, dato2, dato3, dato4, dato5a, dato5b;
let index = 0;

function preload() {
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {
  let cnv = createCanvas(900, 600);
  cnv.parent("canvas-container");
  textFont("Poppins");

  // --- Lettura e filtraggio dati ---
  for (let r = 0; r < table.getRowCount(); r++) {
    const c0 = float(table.get(r, 0));
    const c1 = float(table.get(r, 1));
    const c2 = float(table.get(r, 2));
    const c3 = float(table.get(r, 3));
    const c4 = float(table.get(r, 4));

    if (c3 % 3 === 0 && c0 > 0) {
      col0.push(c0);
      col1.push(c1);
      col2.push(c2);
      col3.push(c3);
      col4.push(c4);
    }
  }

  // --- Calcoli ---
  dato1 = mean(col0);
  dato2 = sd(col1);
  dato3 = float(mode(col2));
  dato4 = median(col3);
  dato5a = mean(col4);
  dato5b = sd(col4);

  // --- Aggiornamento testo HTML ---
  document.getElementById("d1").innerHTML = `Media colonna 0: <b>${dato1.toFixed(2)}</b>`;
  document.getElementById("d2").innerHTML = `Deviazione standard colonna 1: <b>${dato2.toFixed(2)}</b>`;
}

function draw() {
  background(255);
  fill(30);
  textAlign(CENTER);
  textSize(22);
  text("Clicca sul grafico per cambiare visualizzazione", width / 2, 40);

  if (index === 0) drawModa();
  else if (index === 1) drawMediana();
  else drawMediaSD();
}

function mousePressed() {
  index = (index + 1) % 3;
}

// --- GRAFICO 1: Moda ---
function drawModa() {
  background("#f4f6f7");
  textAlign(CENTER);
  textSize(22);
  fill("#2c3e50");
  text("Moda - Colonna 2", width / 2, 60);

  // Calcola la frequenza di ogni valore
  const freq = {};
  col2.forEach(v => freq[v] = (freq[v] || 0) + 1);
  const keys = Object.keys(freq);
  const values = Object.values(freq);

  // Trova la frequenza massima
  const maxFreq = max(values);
  const barWidth = width / (keys.length + 4);

  // Linea base
  stroke(180);
  strokeWeight(1);
  line(60, height - 180, width - 60, height - 180);

  // Disegna le barre
  noStroke();
  for (let i = 0; i < keys.length; i++) {
    let x = 80 + i * barWidth;
    let h = map(freq[keys[i]], 0, maxFreq, 0, 250);
    // Se la chiave è la moda, usa un colore diverso
    fill(keys[i] == dato3 ? "#e67e22" : "#3498db");
    rect(x, height - 180 - h, barWidth * 0.6, h, 8);

  // Etichette ruotate per leggibilità
  push();
  translate(x + barWidth * 0.3, height - 150);
  rotate(-PI / 6);
  textSize(11);
  fill(50);

// Mostra etichetta solo ogni 2 valori
if (i % 2 === 0) {
  text(keys[i], 0, 0);
}
pop();


    // Frequenza sopra ogni barra
    if (freq[keys[i]] > 0) {
      fill(0);
      textSize(10);
      text(freq[keys[i]], x + barWidth * 0.3, height - 190 - h);
    }
  }

  // Testo esplicativo sotto
  noStroke();
  fill("#2c3e50");
  textSize(16);
  textAlign(LEFT);
  text(`Valore più frequente: ${dato3}`, 80, height - 100);
  text("Ogni barra rappresenta la frequenza dei valori nella colonna 2", 80, height - 70);
}


// --- GRAFICO 2: Mediana ---
function drawMediana() {
  textAlign(CENTER);
  textSize(18);
  fill(50);
  text("Mediana (colonna 3): Box Plot", width / 2, 100);

  const sorted = [...col3].sort((a, b) => a - b);
  const q1 = median(sorted.slice(0, sorted.length / 2));
  const q3 = median(sorted.slice(sorted.length / 2));
  const minVal = sorted[0];
  const maxVal = sorted[sorted.length - 1];
  const y = height / 2 + 50;
  const x0 = 150, x1 = width - 150;

  function mapVal(v) {
    return map(v, minVal, maxVal, x0, x1);
  }

  stroke(0);
  strokeWeight(2);
  line(x0, y, x1, y);
  fill("#cfe2ff");
  rect(mapVal(q1), y - 40, mapVal(q3) - mapVal(q1), 80, 10);
  stroke("#8e44ad");
  strokeWeight(4);
  line(mapVal(dato4), y - 40, mapVal(dato4), y + 40);

  noStroke();
  fill(0);
  textSize(14);
  text(`Mediana: ${dato4}`, mapVal(dato4), y + 70);
}

// --- GRAFICO 3: Media + Deviazione standard ---
function drawMediaSD() {
  textAlign(CENTER);
  textSize(18);
  fill(50);
  text("Media e deviazione standard (colonna 4)", width / 2, 100);

  const m = dato5a;
  const sdv = dato5b;

  const barX = width / 2 - 150;
  const barY = height / 2 + 50;
  const barWidth = 300;
  const barHeight = 30;

  fill("#a9d6ff");
  rect(barX, barY - barHeight / 2, barWidth, barHeight, 8);

  stroke("#1f618d");
  strokeWeight(4);
  line(barX + barWidth / 2, barY - 60, barX + barWidth / 2, barY + 60);

  stroke("#e74c3c");
  strokeWeight(3);
  line(barX + barWidth / 2 - sdv * 10, barY, barX + barWidth / 2 + sdv * 10, barY);

  noStroke();
  fill(0);
  textSize(16);
  text(`Media = ${m.toFixed(2)} | Deviazione standard = ±${sdv.toFixed(2)}`, width / 2, barY + 100);
}

// --- FUNZIONI STATISTICHE ---
function mean(values) {
  return values.reduce((a, b) => a + b, 0) / values.length;
}
function sd(values) {
  const m = mean(values);
  return Math.sqrt(values.reduce((a, b) => a + (b - m) ** 2, 0) / values.length);
}
function mode(values) {
  const freq = {};
  values.forEach(v => freq[v] = (freq[v] || 0) + 1);
  return Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b);
}
function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}
