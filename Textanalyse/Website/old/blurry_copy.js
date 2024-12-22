const original = document.querySelector(".left p");
const titles = document.querySelector(".left h1");

let data;
let bool = true;
let slider;
let colors = ["#8E5CED", "#8AF05D", "#F0D05D", "#F0342F", "#ED5CBF"];
let pos = [];
let previousValue = 0;
let txt = [];
let z = 1;
let images = [];

function preload() {
  data = loadJSON("assets/All_albums.json");

  Jesus_Is_King = loadImage("/assets/Album_covers/Jesus_Is_King.png");
  Graduation = loadImage("/assets/Album_covers/Graduation.png");
  Heartbreaks = loadImage("/assets/Album_covers/808_Heartbreaks.png");
  Kids_see_Ghosts = loadImage("/assets/Album_covers/Kids_see_Ghosts.png");
  Late_Registration = loadImage("/assets/Album_covers/Late_Registration.png");
  My_Fantasy = loadImage("/assets/Album_covers/My_Fantasy.png");
  The_College_Dopout = loadImage("/assets/Album_covers/The_College_Dopout.png");
  The_Life_Of_Pablo = loadImage("/assets/Album_covers/The_Life_Of_Pablo.png");
  Watch_the_Throne = loadImage("/assets/Album_covers/Watch_the_Throne.png");
  ye = loadImage("/assets/Album_covers/ye.png");
  Yeezus = loadImage("/assets/Album_covers/Yeezus.png");

  console.log(data);
}

// Handle window resize
window.addEventListener("resize", () => {
  draw();
});

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
  windowWidth = 1500;
  // createCanvas(windowWidth, windowHeight);

  load_text(data);
  noLoop();
  textAlign(CENTER);
  slider = createSlider(2100, 3500);
  slider.position(30, 30);

  // rectMode(mode);
}

function draw() {
  titles.innerHTML = " ";
  createCanvas(windowWidth, windowHeight);

  console.log(slider.value());
  for (d in data) {
    let border = 20;

    year = parseInt(data[d].release_date.slice(-2));
    month = data[d].release_date.split(".")[1];
    date = year + z;
    xValue = map(date, 4, 20, 0 + border, windowWidth - border);

    y = windowHeight * 0.79;
    console.log(d, xValue);

    // ellipse(xValue, y, 30);
    rect(xValue, y, 121, -121);
    // text(d, xValue, y + 30);
    // image(images[i], xValue, y);
    titles.innerHTML += `<span class="title" style="position:absolute; top:${y}px; left:${xValue}px; font-size:14px; width: 130px;">${d}</span>`;
  }
  y = 642.84;
  // image(The_College_Dopout, 187.5, y);
  // image(Late_Registration, 375, y);

  // image(Graduation, 750, y);
  // image(Heartbreaks, 937.5, y);
  // image(My_Fantasy, 1312.5, y);
  // image(Watch_the_Throne, 1500, y);
  // image(Yeezus, 1875, y);
  // image(The_Life_Of_Pablo, 2437.5, y);
  // // image(ye, 2812.5, y);
  // image(Jesus_Is_King, 2850, y, 121, 121);
  // image(Late_Registration, 375, y);
}
