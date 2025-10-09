let table;
let col0 = [], col1 = [], col2 = [], col3 = [], col4 = [];

function preload() {
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

for(let r = 0; r < table.getRowCount(); r++) {
  const c0 = float(table.get(r, 0));
  const c1 = float(table.get(r, 1));
  const c2 = float(table.get(r, 2));
  const c3 = float(table.get(r, 3));
  const c4 = float(table.get(r, 4));

  if (c3 % 3 === 0 && c0 > 0) {
    col0.push(c1);
    col1.push(c2);
    col2.push(c2);
    col3.push(c3);
    col4.push(c4);
  }
}

const mean = mean(col0);
const sd = sd(col1);
const mode = mode(col2);
const median = median(col3);
const msd = msd(col4);

function mean(values) {
  return values.reduce((a, b) => a+b, 0) / values.length;
}

function sd(values) {
  const = mean(values);
  
}