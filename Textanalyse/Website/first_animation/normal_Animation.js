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
      text.style.paddingTop = "5px";
      text.style.paddingInline = "3rem";
    }
  });
}

document.addEventListener("mousemove", (event) => {
  const menuLeiste = document.querySelector(".menu_leiste");
  const mouseY = event.clientY;
  const windowHeight = window.innerHeight;
  // Check if the mouse is near the bottom of the screen
  if (mouseY < 70) {
    // Adjust the threshold as needed
    menuLeiste.classList.add("open");
  } else {
    menuLeiste.classList.remove("open");
  }
});

function highlightVerbs() {
  let Verbs = document.querySelectorAll(".verb");

  Verbs.forEach((verb) => {
    // span.style.fontSize = `${gr}px`; // Use clientX for mouseX equivalent
    verb.style.transition = "all 0.5s ease-in-out";
    verb.style.backgroundColor = "rgb(255,255,255)";
    verb.style.fontSize = "25px";
    verb.style.color = "rgb(0, 0, 0, 0.5)";
    verb.style.position = "relative";
    // console.log(span.style.fontSize);
  });

  for (let i = 0; i < 6; i++) {
    let auswahl = Math.floor(Math.random() * Verbs.length);
    Verbs[auswahl].style.backgroundColor = "rgb(250, 0, 0)";
    Verbs[auswahl].style.color = "rgb(0,0,0)";
    Verbs[auswahl].style.fontSize = "32px";
    // Verbs[auswahl].style.position = "absolute";
  }
}

function highlightNoun() {
  let Nouns = document.querySelectorAll(".noun");

  Nouns.forEach((noun) => {
    // span.style.fontSize = `${gr}px`; // Use clientX for mouseX equivalent
    noun.style.backgroundColor = "rgb(255,255,255)";
    noun.style.fontSize = "25px";
    noun.style.color = "rgb(0, 0, 0, 0.5)";
    noun.style.transition = "all 0.5s ease-in-out";
    // console.log(span.style.fontSize);
  });

  for (let i = 0; i < 6; i++) {
    let auswahl = Math.floor(Math.random() * Nouns.length);
    Nouns[auswahl].style.backgroundColor = "rgb(0, 250, 0)";
    Nouns[auswahl].style.color = "rgb(0,0,0)";
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
function navigateToNewPage() {
  console.log("gugus?");
  const baseURL = "../big_animation/index.html"; // Update with your new page's path
  const query = selectedAlbums.map(encodeURIComponent).join(","); // Encode album titles
  window.location.href = `${baseURL}?albums=${query}`;
}
