const original1 = document.querySelector(".left p");
const original2 = document.querySelector(".left2 p");
const original3 = document.querySelector(".left3 p");
const original4 = document.querySelector(".left4 p");
const original5 = document.querySelector(".left5 p");

const Title1 = document.querySelector(".left h1");
const Title2 = document.querySelector(".left2 h1");
const Title3 = document.querySelector(".left3 h1");
const Title4 = document.querySelector(".left4 h1");
const Title5 = document.querySelector(".left5 h1");

const selectedAlbums = getSelectedAlbumsFromURL();

let data;
let bool = true;
let slider;
let colors = ["#8E5CED", "#8AF05D", "#F0D05D", "#F0342F", "#ED5CBF"];
let pos = [];
let previousValue = 0;
let txt = [];
let verb;
let noun;
let Textboxes = [];
let Titleboxes = [];

function preload() {
  data = loadJSON("../assets/All_albums.json");
  // console.log(data);

  Textboxes.push(original1, original2, original3, original4, original5);
  Titleboxes.push(Title1, Title2, Title3, Title4, Title5);
}

function getSelectedAlbumsFromURL() {
  const params = new URLSearchParams(window.location.search); // Get query string parameters
  const albums = params.get("albums"); // Retrieve the "albums" parameter
  return albums ? albums.split(",").map(decodeURIComponent) : []; // Decode and split the album titles
}

function checkFilledTextboxes() {
  // Select all album elements
  const left = document.querySelectorAll(".Textboxes div");

  // Add event listeners for each album
  left.forEach((l) => {
    const text = l.querySelector("p");
    // console.log(l.outerText === "");
    l.style.width = "0%";
    // Check if the text element has content
    console.log(l);
    if (text.childElementCount > 0) {
      l.style.width = "100%";
    }
  });
}

document.addEventListener("mousemove", (event) => {
  let spans = document.querySelectorAll(".word");
  // console.log(spans);

  let gr = map(event.clientY, 0, height, 20, 500);
  spans.forEach((span) => {
    // span.style.fontSize = `${gr}px`; // Use clientX for mouseX equivalent
    span.style.fontSize = `25px`; // Use clientX for mouseX equivalent
    // console.log(span.style.fontSize);
  });
});

function highlightVerbs() {
  let Verbs = document.querySelectorAll(".verb");

  Verbs.forEach((verb) => {
    // span.style.fontSize = `${gr}px`; // Use clientX for mouseX equivalent
    verb.style.transition = "all 0.5s ease-in-out";
    verb.style.fontSize = "25px";
    verb.style.color = "rgb(0, 0, 0, 0.5)";
    verb.style.position = "relative";
    verb.style.textShadow = "";

    // console.log(span.style.fontSize);
  });

  for (let i = 0; i < 10; i++) {
    let auswahl = Math.floor(Math.random() * Verbs.length);
    // Verbs[auswahl].style.backgroundColor = "rgb(250, 0, 0)";
    Verbs[auswahl].style.color = "rgb(0,0,0)";
    Verbs[auswahl].style.fontSize = "32px";

    Verbs[auswahl].style.textShadow = make_text_shadow();
    ("3px 3px 0px #8CB1FA, 6px 6px 0px #8CB1FA, 9px 9px 0px #8CB1FA"); // Correct syntax

    // Verbs[auswahl].style.position = "absolute";
  }
}

function make_text_shadow() {
  let shadows = [];
  for (let j = -4; j > -80; j -= 4) {
    shadows.push(`${j}px ${j}px 0px #8CB1FA`);
  }
  return shadows;
}

function highlightNoun() {
  let Nouns = document.querySelectorAll(".noun");

  Nouns.forEach((noun) => {
    // span.style.fontSize = `${gr}px`; // Use clientX for mouseX equivalent
    noun.style.fontSize = "25px";
    noun.style.color = "rgb(0, 0, 0, 0.5)";
    noun.style.transition = "all 0.5s ease-in-out";
    noun.style.textShadow = "";
  });

  for (let i = 0; i < 10; i++) {
    let auswahl = Math.floor(Math.random() * Nouns.length);
    // Nouns[auswahl].style.backgroundColor = "#8CB1FA";
    Nouns[auswahl].style.color = "rgb(0,0,0)"; // Correct syntax

    Nouns[auswahl].style.textShadow = "5px 5px 2px #8CB1FA"; // Correct syntax
    Nouns[auswahl].style.fontSize = "32px";
  }
}

function load_text(data) {
  for (let i = 0; i < selectedAlbums.length; i++) {
    console.log(selectedAlbums[i]);
    Textboxes[i].innerHTML = makeFit(data[selectedAlbums[i]].tracks);
    Titleboxes[i].innerHTML = `${selectedAlbums[i]}`;
  }

  checkFilledTextboxes();
  // original.innerHTML = makeFit(data);

  highlightVerbs();
  setInterval(() => {
    highlightVerbs();
    highlightNoun();
  }, 2000); // 3000 milliseconds = 3 seconds
}

function makeFit(txt) {
  let html_txt = "";
  // txt = data.Graduation.tracks;
  console.log(txt);

  for (t in txt) {
    let words = txt[t].word;
    let count = txt[t][1];
    verb = false;
    if (RiTa.pos(words, { simple: true })[0] === "a") {
      verb = words;
    }
    noun = false;
    if (RiTa.pos(words)[0] === "vb") {
      noun = words;
    }

    html_txt += make_span(words, count, verb, noun) + " ";
  }

  return html_txt;
}

function make_span(words, count, verb, noun) {
  let b = map(count, 1, 74, 20, 0);
  if (verb) {
    return `<span class="verb" style="font-size:25px; text-shadow: 0 0 ${b}px rgba(250, 237, 169,0.1});">${words}</span>`;
  }
  if (noun) {
    return `<span class="noun" style="font-size:25px; text-shadow: 0 0 ${b}px rgba(250, 237, 169,0.1});">${words}</span>`;
  } else {
    return `<span class="word" style="font-size:25px; text-shadow: 0 0 ${b}px rgba(250, 237, 169,0.1});">${words}</span>`;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // noLoop();
  load_text(data);
}

function draw() {
  // console.log(mouseX);
}
