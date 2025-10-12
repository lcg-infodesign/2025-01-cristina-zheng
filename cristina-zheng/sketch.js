let table;
let col0 = [], col1 = [], col2 = [], col3 = [], col4 = [];
let dato1, dato2, dato3, dato4, dato5a, dato5b;

function preload() {
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {
  createCanvas(800, 800);
  //lettura e filtraggio righe valide
  for(let r = 0; r < table.getRowCount(); r++) {
  const c0 = float(table.get(r, 0));
  const c1 = float(table.get(r, 1));
  const c2 = float(table.get(r, 2));
  const c3 = float(table.get(r, 3));
  const c4 = float(table.get(r, 4));

  //regole: col3 multipla di 3, col0 > 0
  if (c3 % 3 === 0 && c0 > 0) { //=== se i valori numeri corrispondono; && e logicamente, la booleana è vera se e solo se entrambe le affermazioni sono vere
    col0.push(c0);
    col1.push(c1);
    col2.push(c2);
    col3.push(c3);
    col4.push(c4);
  }
}

//calcoli nomeVariabile = nomeFunzione();
dato1 = mean(col0); //media colonna 0
dato2 = sd(col1); //deviazione standard colonna 1
dato3 = float(mode(col2)); //moda colonna 2
dato4 = median(col3); //mediana colonna 3
dato5a = mean(col4); //media colonna 4
dato5b = sd(col4); //deviaizone standard colonna 4
}

function draw() {
  background(230);

  noStroke();
  fill(30, 100, 200);
  textSize(18);
  text('Rappresentazioni testuali:', 20, 45);

  textSize(14);
  fill(0);

  /*text("mouseX:"+ mouseX + ", \
    mouseY: " + mouseY,20,20);*/

  text(`Media colonna 0: ${dato1.toFixed(2)}`, 20, 70);
  text(`Deviazione standard colonna 1: ${dato2.toFixed(2)}`, 20, 95);

  drawFrecciaUnica();
}

function drawFrecciaUnica() {
  //centro di partenza della freccia (dato5a; dato5b)
  let startX = 30 + dato5a;
  let startY = 200 + dato5b;

  //lunghezza e angolo di inclinazione (dato3)
  let lunghezza = 300;
  let angolo = radians(-dato3);

  //coordinate punto finale
  let endX = startX + lunghezza * cos(angolo);
  let endY = startY + lunghezza * sin(angolo);

  //disegno freccia con spessore dato4
  stroke(20, 100, 200);
  strokeWeight(dato4);
  line(startX, startY, endX, endY);

  //punta della freccia
  push();
  translate(endX, endY);
  rotate(angolo);
  fill(30, 100, 200);
  stroke(0);
  triangle(0, 0, -20, -10, -20, 10);
  pop();

  noStroke();
  fill(30, 100, 200);
  textSize(18);
  text('Freccia = dati combinati', startX + 150, startY);

  noStroke();
  fill(0);
  textSize(14);
  text(`Coordinate del punto di partenza -> (${dato5a.toFixed(2)}; ${dato5b.toFixed(2)})`, startX + 150, startY + 25);
  text(`Spessore freccia -> ${dato4.toFixed(2)}`, startX + 150, startY + 50);
  text(`Angolo di inclinazione della freccia -> ${dato3.toFixed(2)}°`, startX + 150, startY + 75);
}

//funzioni statistiche
function mean(values) {
  //values.reduce() -> somma tutti i numeri dell'array
  //reduce((accumulatore, elementoCorrente) => operazioni, valoreIniziale) -> riduce l'array a un solo valore
  //values.length -> numero totale di elementi
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function sd(values) {
  //deviazione standard: quanto i valori si discostano dalla media
  const m = mean(values);
  return Math.sqrt(values.reduce((a, b) => a + (b - m) ** 2, 0) / values.length);
}

function mode(values) {
  //valore che compare più spesso
  const freq = {};
  //se il numero non esiste ancora -> parte da 0, se esiste -> aggiunge 1
  //forEach(elemento => ...) -> eseguire una funzione
  //  su ogni elementi dell'array, ma senza restituire nulla
  //freq -> tiene traccia di quante volte compare ciasun numero
  //Object.keys() -> restituisce i nomi delle proprietà di un array
  values.forEach(v => freq[v] = (freq[v] || 0) + 1);
  return Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b);
}

function median(values) {
  //valore centrale dei dati ordinati
  //[...values] -> copia l'array
  //sort -> ordina l'array in ordine crescente
  //Math.floor() -> arrotonda per difetto
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  //se i valori sono pari
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    //se non sono pari
    : sorted[mid];
}