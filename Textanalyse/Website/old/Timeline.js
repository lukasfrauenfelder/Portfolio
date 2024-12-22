const original = document.querySelector(".left p");

let data;
let bool = true;
let slider;
let pos = [];
let previousValue = 0;
let txt = [];
let z = 1;

function preload() {
  data = loadJSON("assets/All_albums.json");
}

document.addEventListener("mousemove", (event) => {
  let spans = document.querySelectorAll(".word");
  let gr = map(event.clientY, 0, height, 0, 200);
  spans.forEach((span) => {
    // span.style.fontSize = `${gr}px`; // Use clientX for mouseX equivalent
    // span.style.textShadow = `rgba(250, 237, 169, 100) 0px 0px ${gr}px`;
  });
});

function load_text(data) {
  // for (d in data) {
  //   txt[d] = data[d][0];
  // }

  original.innerHTML = makeFit(data);
}

function makeFit(txt) {
  txt = txt.Graduation;
  let html_txt = "";

  for (t in txt) {
  }
  for (let i = txt.length - 400; i > 0; i--) {
    let words = txt[i].word;
    let count = txt[i].score;
    html_txt += make_span(words, count) + " ";
  }

  return html_txt;
}

let placedWords = []; // Array, um die Positionen der bereits platzierten Wörter zu speichern

function make_span(words, count) {
  let b = map(count, 1, 85, 5, 0); // Mapping für die Distanzkontrolle

  // Bildschirmmitte
  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;

  // Maximale Distanz basierend auf `b`
  let maxDistance = b * 100; // Distanzbereich von Zentrum abhängig machen

  let randomTop, randomLeft;
  let attempts = 0;
  let wordWidth = count * 10; // Schätzen der Wortbreite basierend auf der Fontgröße
  let wordHeight = count * 3; // Schätzen der Worthöhe

  do {
    attempts++;
    // Zufällige Distanz und Winkel für Positionierung
    let angle = Math.random() * 2 * Math.PI; // Winkel in Bogenmaß
    let distance = Math.random() * maxDistance; // Distanz innerhalb von `maxDistance`

    // Berechne Offsets basierend auf Winkel und Distanz
    let offsetX = distance * Math.cos(angle);
    let offsetY = distance * Math.sin(angle);

    // Berechne Position
    randomLeft = centerX + offsetX;
    randomTop = centerY + offsetY;

    // Prüfen, ob sich das Wort mit anderen überschneidet
    let overlaps = placedWords.some(({ x, y, w, h }) => {
      return (
        randomLeft < x + w &&
        randomLeft + wordWidth > x &&
        randomTop < y + h &&
        randomTop + wordHeight > y
      );
    });

    if (!overlaps) {
      break; // Keine Überlappung, Position ist gültig
    }
  } while (attempts < 100); // Max. Versuche, um Endlosschleifen zu vermeiden

  // Position speichern
  placedWords.push({
    x: randomLeft,
    y: randomTop,
    w: wordWidth,
    h: wordHeight,
  });

  // Span zurückgeben
  return `<span class="word" style="font-size:${count}px; position:absolute; top:${randomTop}px; left:${randomLeft}px; 
   text-shadow: 0 0 ${b}px rgba(0,0,0,${count});">${words}</span>`;
}

function setup() {
  windowWidth = 3000;
  createCanvas(windowWidth, windowHeight);

  load_text(data);
  noLoop();
  textAlign(CENTER);
}

// function draw() {
//   // console.log(data.length);
//   for (d in data) {
//     console.log(d);

//     let border = 20;
//     console.log();
//     year = parseInt(data[d].release_date.slice(-2));
//     month = data[d].release_date.split(".")[1];
//     let z = map(month, 0, 12, 0, 1);
//     date = year + z;
//     console.log(date);
//     xValue = map(date, 4, 20, 0 + border, windowWidth - border);

//     y = windowHeight / 3;
//     ellipse(xValue, y, 30);
//     text(d, xValue, y + 30);
//   }
// }
