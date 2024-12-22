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
let maxgr = -Infinity;
let Textboxes = [];
let Titleboxes = [];
let gr = 0;

let minCount = Infinity; // Start with the highest possible value
let maxCount = -Infinity; // Start with the lowest possible value

function preload() {
  data = loadJSON("../assets/All_albums.json");

  Textboxes.push(original1, original2, original3, original4, original5);
  Titleboxes.push(Title1, Title2, Title3, Title4, Title5);
  console.log(data);
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
    const h1 = l.querySelector("h1");
    // console.log(l.outerText === "");
    l.style.width = "0%";

    // Check if the text element has content
    if (h1.innerHTML.trim() !== "") {
      l.style.width = "100%";
      text.style.paddingTop = "5px";
      text.style.paddingInline = "3rem";
    }
  });
}

document.addEventListener("mousemove", (event) => {
  const menuLeiste = document.querySelector(".menu_leiste");
  const mouseY = event.clientY;

  gr = map(
    event.clientY,
    100,
    height - 200,
    0,
    data[selectedAlbums[0]].tracks.length
  );

  load_text(data, gr);

  if (mouseY < 70) {
    // Adjust the threshold as needed
    menuLeiste.classList.add("open");
  } else {
    menuLeiste.classList.remove("open");
  }
});

function load_text(data, gr) {
  console.log(gr);
  for (let i = 0; i < selectedAlbums.length; i++) {
    Textboxes[i].innerHTML = makeFit(data[selectedAlbums[i]].tracks, gr);
    Titleboxes[i].innerHTML = `${selectedAlbums[i]}`;
  }

  checkFilledTextboxes();
}

function makeFit(txt, gr) {
  let html_txt = "";

  // Dynamically calculate minCount and maxCount for the current `gr` range
  const subset = txt.slice(Math.max(0, txt.length - gr), txt.length); // Get the last `gr` elements
  let minCount = Math.min(...subset.map((t) => t.score)); // Find minimum score in the subset
  let maxCount = Math.max(...subset.map((t) => t.score)); // Find maximum score in the subset
  if (gr > txt.length) gr = txt.length + 1;
  for (let i = txt.length - 1; i >= txt.length - gr && i >= 0; i--) {
    let words = txt[i].word;
    let count = txt[i].score;
    html_txt += make_span(words, count, minCount, maxCount) + " ";
  }

  return html_txt;
}

function make_span(words, count, minCount, maxCount) {
  // Map the count dynamically within the current range

  let b = map(count, minCount, maxCount, 20, 1);
  let f = map(count, minCount, maxCount, 0, 40);
  return `<span class="word" style="font-size:20px; text-shadow: 0 0 ${b}px rgb(250, 237, 169,${b});">${words}</span>`;
  // return `<span class="word" style="font-size:20px; text-shadow: 0 0 0px rgba(250, 237, 169,${b});">${words}</span>`;
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  load_text(data, gr);
  noLoop();
}

function navigateToNewPage() {
  console.log("gugus?");
  const baseURL = "/Textanalyse/Website/first_animation/index.html"; // Update with your new page's path
  const query = selectedAlbums.map(encodeURIComponent).join(","); // Encode album titles
  window.location.href = `${baseURL}?albums=${query}`;
}
