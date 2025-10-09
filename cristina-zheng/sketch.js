let table;
let col0 = [], col1 = [], col2 = [], col3 = [], col4 = [];

function preload() {
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {
  createCanvas(400, 400);
  //
  for(let r = 0; r < table.getRowCount(); r++) {
  const c0 = float(table.get(r, 0));
  const c1 = float(table.get(r, 1));
  const c2 = float(table.get(r, 2));
  const c3 = float(table.get(r, 3));
  const c4 = float(table.get(r, 4));
  //regole: col3 multipla di 3, col0 > 0
  if (c3 % 3 === 0 && c0 > 0) {
    col0.push(c1);
    col1.push(c2);
    col2.push(c2);
    col3.push(c3);
    col4.push(c4);
  }
}
}

function draw() {
  background(220);

  text(`Media colonna 0: ${dato1.toFixed(2)}`, 20, 70);
  text(`Deviazione standard colonna 1: ${dato2.toFixed(2)}`, 20, 100);
}

const dato1 = mean(col0);
const dato2 = sd(col1);
const dato3 = mode(col2);
const dato4 = median(col3);
const dato5a = msd(col4);
const dato5b = sd(col4);

function mean(values) {
  return values.reduce((a, b) => a+b, 0) / values.length;
}

function sd(values) {
  const m = mean(values);
  return Math.sqrt(values.reduce((a,b) => a + (b - m) ** 2, 0) / values.length);
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