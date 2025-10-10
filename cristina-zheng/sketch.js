let table;
let col0 = [], col1 = [], col2 = [], col3 = [], col4 = [];
let dato1, dato2, dato3, dato4, dato5a, dato5b;
let position_image;

function preload() {
  table = loadTable("dataset.csv", "csv", "header");
  position_image = loadImage("gps.png");
}

function setup() {
  createCanvas(800, 800);
  //
  for(let r = 0; r < table.getRowCount(); r++) {
  const c0 = float(table.get(r, 0));
  const c1 = float(table.get(r, 1));
  const c2 = float(table.get(r, 2));
  const c3 = float(table.get(r, 3));
  const c4 = float(table.get(r, 4));
  //regole: col3 multipla di 3, col0 > 0
  if (c3 % 3 === 0 && c0 > 0) {
    col0.push(c0);
    col1.push(c1);
    col2.push(c2);
    col3.push(c3);
    col4.push(c4);
  }
}

//calcoli
dato1 = mean(col0);
dato2 = sd(col1);
dato3 = mode(col2);
dato4 = median(col3);
dato5a = mean(col4);
dato5b = sd(col4);

dato3 = float(dato3);
}

function draw() {
  background(220);
  textSize(16);
  fill(0);

  text(`Media colonna 0: ${dato1.toFixed(2)}`, 20, 70);
  text(`Deviazione standard colonna 1: ${dato2.toFixed(2)}`, 20, 100);
  text(`Moda colonna 2: ${dato3}`, 20, 130);
  text(`Mediana colonna 3: ${dato4.toFixed(2)}`, 20, 160);
  text(`Media colonna 4: ${dato5a.toFixed(2)}`, 20, 190);
  text(`Deviazione standard colonna 4: ${dato5b.toFixed(2)}`, 20, 220);

  drawDato3();
  drawDato4();
  drawDato5();
}

function drawDato3() {
  let x1 = 50;
  let y1 = 300;
  let lunghezza = 150;
  let angolo = radians(-dato3);

  stroke(0);

  let x2 = x1 + lunghezza * cos(angolo);
  let y2 = y1 + lunghezza * sin(angolo);

  line(x1, y1, x2, y2);

  noStroke();
  fill(0);
  text('Moda colonna 2 -> inclinazione -80°', x1 + 120, y1);
}

function drawDato4() {
  let circX = 50;
  let circY = 560;

  circle (circX, circY, dato4);

  noStroke();
  fill(0);
  text("Mediana colonna 4 -> diametro cerchio", circX + 120, circY);
}

function drawDato5() {
  let rectX = 50;
  let rectY = 600;

  fill("yellow");
  stroke(0);
  rect(rectX, rectY, 100, 100);

  imageMode(CENTER);
  image(position_image, rectX + dato5a, rectY + dato5b, 30, 30);

  noStroke();
  fill(0);
  textAlign(LEFT);
  text("Media colonna 5 -> X", rectX + 120, rectY + 15);
  text("Media standard colonna 5 -> Y", rectX + 120, rectY + 30);
}

//funzioni statistiche
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