let canvases = [];
let idArray = [1, 2, 3];

let data = [
  {
    PERSONAS: "SOPHIE (17)",
    DisposionProzent: 8,
    Disposition: 42,
    Resilienz: 23.23829937,
    "Resilienz*3": 69.71489812,
    Volumen: 1385.44236,
    DispositionSatz: "BILDUNG SEK II",
  },
  {
    PERSONAS: "ROLAND (60)",
    DisposionProzent: 3.04,
    Disposition: 46.96,
    Resilienz: 46.46629091,
    "Resilienz*3": 139.3988727,
    Volumen: 1731.992702,
    DispositionSatz: "«WOHNT AM GENFERSEE»",
  },
  {
    PERSONAS: "JOHANNES (34)",
    DisposionProzent: 11.35,
    Disposition: 38.65,
    Resilienz: 38.82080065,
    "Resilienz*3": 116.462402,
    Volumen: 1173.245448,
    DispositionSatz: "«IST OFT EINSAM»",
  },
  {
    PERSONAS: "JAQUELINE (43)",
    DisposionProzent: 15.9,
    Disposition: 34.1,
    Resilienz: 37.06652479,
    "Resilienz*3": 111.1995744,
    Volumen: 913.2688384,
    DispositionSatz: "«IST ARBEITSUNFÄHIG»",
  },
  {
    PERSONAS: "SANDRA (22)",
    DisposionProzent: 6.25,
    Disposition: 43.75,
    Resilienz: 23.23829937,
    "Resilienz*3": 69.71489812,
    Volumen: 1503.301172,
    DispositionSatz: "«HAT BIOLOGIE STUDIERT»",
  },
  {
    PERSONAS: "Null",
    DisposionProzent: 0,
    Disposition: 0,
    Resilienz: 0,
    "Resilienz*3": 0,
    Volumen: 0,
    DispositionSatz: "«Null»",
  },
];

let img0;
let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;
let img9;
let img10;
let img11;
let img12;
let img13;
let img14;
let img15;
let img16;
let img17;
let img18;
let img19;
let img20;
let img21;
let img22;
let img23;

let images = [];

let walkers = [];
let buffer;

let walkers2 = [];

let osc;

let slider;

let slidervalue = 0;

let button1 = 0;
let button2 = 0;
let button3 = 0;
let button4 = 0;
let button5 = 0;

let traumaArray = [
  "MISSBRAUCH",
  "VERNACHLÄSSIGUNG",
  "UNFALL",
  "NATURKATASTROPHE",
  "KRIEG",
  "GEWALT",
  "ENTFÜHRUNG",
  "VERLUST",
  "KRANKHEIT",
  "MOBBING",
  "TRAUMA",
  "BELÄSTIGUNG",
  "KÖRPERVERLETZUNG",
  "GEBURT",
  "GEWALT",
  "MIGRATION",
  "VERBRECHEN",
  "FOLTER",
  "KRIEGSTRAUMA",
  "VERGEWALTIGUNG",
];

// Zum Testen, gib das Array in der Konsole aus
console.log(traumaArray);

function preload() {
  img0 = loadImage("assets/t-00.jpg");
  img1 = loadImage("assets/t-01.jpg");
  img2 = loadImage("assets/t-02.jpg");
  img3 = loadImage("assets/t-03.jpg");
  img4 = loadImage("assets/t-04.jpg");
  img5 = loadImage("assets/t-05.jpg");
  img6 = loadImage("assets/t-06.jpg");
  img7 = loadImage("assets/t-07.jpg");
  img8 = loadImage("assets/t-08.jpg");
  img9 = loadImage("assets/t-09.jpg");
  img10 = loadImage("assets/t-10.jpg");
  img21 = loadImage("assets/t-11.jpg");
  img22 = loadImage("assets/t-12.jpg");
  img23 = loadImage("assets/t-13.jpg");

  // Store images in the array only after they have finished loading
  images = [
    //img1,
    //img2,
    //img0,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img21,
    img21,
    img21,
    img22,
    img22,
    img22,
    img23,
    img23,
    img23,
  ];
}

let s3;

let wid = 1750;
let hei = 1288;

var cnv;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight / 2);
}

let capture;

function setup() {
  pixelDensity(1);
  cnv = createCanvas(windowWidth, windowHeight / 2);
  // cnv.position(0, 0);
  cnv.style("z-index", "-1");
  cnv.parent("sketch1");

  // d3.csv("Personas.csv", d3.autoType).then(function (csv) {
  //   data = csv;
  //   console.log(data);
  // });

  // setupOsc(12000, 3334);

  buffer = createGraphics(400, 200); // Erstelle einen Grafikpuffer mit derselben Größe wie das Canvas
  for (let i = 0; i < 20; i++) {
    let walker = new Walker(random(0, 400), random(0, 200));

    walkers.push(walker);
  }

  slider = createSlider(0, 800, 0);
  slider.position(0, 0);
  slider.class("myCustomSlider");
    slider.style("position", "relative");
  slider.style("z-index", "10");


  slider.size(140);
  // slider.input(slidervalue);

  angleMode(DEGREES);
  textFont("Helvetica");

  // noLoop();
}

function draw() {
  background(255);

  rect(0, 0, windowWidth, windowHeight / 2);
  rect(0, windowHeight / 2, windowWidth / 5, windowHeight);

  // Definiere die Höhe des Rechtecks basierend auf dem Slider-Wert
  let s1 = map(slidervalue, 0, 800, 0, windowHeight / 2);

  buffer.background(255, 255, 255, 5);
  buffer.fill(12, 45, 87);

  // Zeichne das Rechteck mit der definierten Höhe
  //buffer.rect(0, 0, width, s1);
  //console.log("value" + slidervalue);
  //console.log("s1" + s1);
  // console.log(s1);

  slidervalue = slider.value();
  // console.log(slidervalue);

  // console.log(slider.value());

  noStroke();
  for (let i = 0; i < walkers.length; i++) {
    walkers[i].display(buffer); // Passe die display() Funktion an, um den Puffer als Argument zu akzeptieren
    walkers[i].update();
  }

  // Zeichne den Puffer auf das Canvas

  // Bestimme die Breite und Höhe der Zellen basierend auf der Größe des Canvas und der Größe des Hintergrundbuffers
  // const cellWidth = width / buffer.width;
  // const cellHeight = height / buffer.height;

  // Definiere die Größe des Bereichs, über den der Durchschnitt berechnet werden soll
  const areaWidth = 20;
  const areaHeight = 20;

  stroke(0);
  let s3 = map(slidervalue, 0, 800, 0, 12);
  // console.log(s3);

  for (let y = 0; y < windowHeight / 2; y += areaHeight) {
    for (let x = 0; x < windowWidth; x += areaWidth) {
      let pixelColor = buffer.get(
        x / 4.6 + areaWidth / 2,
        y / 3.1 + areaHeight / 2
      );
      let brightness =
        (red(pixelColor) + green(pixelColor) + blue(pixelColor)) / 5;

      // console.log(s3);

      const imgIndex = floor(map(brightness, 0, 255, 0, s3 + 4));
      //const img = images[imgIndex];
      const img = images[imgIndex];

      // Zeichne das Bild an der entsprechenden Position

      if (img) {
        image(img, x, y, areaWidth, areaHeight);
      }
      noFill();
      noStroke();
      rect(x, y, areaWidth, areaHeight);
    }
  }

  let hscale = map(slidervalue, 0, 800, 0, 100);
  let barscale = map(slidervalue, 0, 800, 20, windowHeight / 2);
  let barscale2 = map(slidervalue, 0, 800, 20, windowHeight / 2 + 20);
  randomSeed(13);

  // Array mit den Farben
  let colors = [
    color(234, 75, 133),
    color(255, 176, 176),
    color(252, 103, 54),
    //color(12, 45, 87),
  ];

  for (let i = 0; i < barscale; i += 20) {
    noStroke();
    // Zufällige Farbe aus dem Array auswählen
    let randomColor = random(colors);
    //let randomTrauma = random(traumaArray);
    fill(randomColor);
    rect(0, i, windowWidth, 20);
    //text(randomTrauma, 0, i);
  }

  for (let k = 40; k < barscale2; k += 20) {
    noStroke();
    let randomColor = random(colors);
    let randomTrauma = random(traumaArray);
    fill(randomColor);
    text(randomTrauma, 0, k);
  }

  fill(12, 45, 87);
  rect(0, 0, windowWidth, 20);

  noStroke();
  textStyle(100);
  textSize(25);
  fill(239, 236, 236);
  textAlign(RIGHT);
  text(round(hscale) + "%", windowWidth - 80, 19);
  textAlign(LEFT);
  text("TRAUMA TANK", 10, 19);
  // fill(12, 45, 87);
  // rect(0, 0, 20, windowHeight / 2);
  // rect(windowWidth - 50, 0, 20, windowHeight / 2);

  // image(buffer, 0, 0);

  fill(0);
  stroke(2);
  // rect(0, 0, 800, wid);
  // rect(0, 620, 800, 350);
  // text(frameRate(), 20, 200);
}

class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.posOld = createVector(x, y);
    this.vel = createVector(0, 1);
  }

  update() {
    let theta = noise(this.pos.x * 0.01, this.pos.y * 0.01);

    // this.vel.setHeading(theta);
    this.posOld = this.pos.copy();
    this.pos.add(this.vel);

    if (
      this.pos.x > 400 ||
      this.pos.x < 0 ||
      this.pos.y > 200 ||
      this.pos.y < 0
    ) {
      this.pos = createVector(random(0, 400), random(0, 200));
      this.posOld = this.pos.copy();
      // console.log(this.pos);
    }
  }

  display(pg) {
    let c1 = pg.noise(this.pos.x * 1.5);
    pg.fill(c1, 0, 0, 50);
    pg.noStroke();

    let rx = noise(this.posOld.x * 0.1);
    let ry = noise(this.posOld.y * 0.1);

    pg.push();
    pg.translate(this.pos.x, this.pos.y);
    pg.rotate(frameCount * 0.01) * 100;

    pg.ellipse(0, 0, rx * 100, ry * 100); // Fixed ellipse position
    pg.pop();
  }
}

function onSliderChanged() {
  slidervalue = slider.value();
}
