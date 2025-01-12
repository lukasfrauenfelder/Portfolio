let data;
let slider;
let colors = ["#8E5CED", "#8AF05D", "#F0D05D", "#F0342F", "#ED5CBF"];
let pos = [];
let activeAlbum = null;
let txt = [];
let maxgr = -Infinity;
let albumTitle = null;
// Define and update `currentAlben`
let currentAlben = [];
window.currentAlben = currentAlben; // Expose it globally

window.currentAlben = "ahaaa"; // Keep the global copy updated

let minCount = Infinity; // Start with the highest possible value
let maxCount = -Infinity; // Start with the lowest possible value

function preload() {
  data = loadJSON("assets/All_albums.json");

  console.log(data);
}

function navigateToNewPage() {
  console.log("gugus?");
  const baseURL = "interactive_blur/index.html"; // Update with your new page's path
  const query = currentAlben.map(encodeURIComponent).join(","); // Encode album titles
  window.location.href = `${baseURL}?albums=${query}`;
}

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Select all album elements
  const albums = document.querySelectorAll(".Textboxes div");

  // Add event listeners for each album
  albums.forEach((album) => {
    const img = album.querySelector("img");
    const title = album.querySelector("h1");

    // Add click listener to the image
    img.addEventListener("click", () => {
      handleClick(album, "image");
    });

    // Add click listener to the title
    title.addEventListener("click", () => {
      handleClick(album, "title");
    });
  });
});

// Function to handle the click event
function handleClick(album, type) {
  const txt = album.querySelector("p");

  const albumTitle = album.querySelector("h1").innerText;
  // console.log(`Clicked on ${type} of album: ${albumTitle}`);
  // Trigger your desired functionality here
  updateCurrentAlben(albumTitle);
  draw(albumTitle);

  if (activeAlbum === album) {
    txt.innerHTML = " ";
    activeAlbum = null;
    return;
  }
  // Update the active album
  activeAlbum = album;

  load_text(data, txt, albumTitle);
}

function updateCurrentAlben(albumTitle) {
  if (currentAlben.includes(albumTitle)) {
    currentAlben = currentAlben.filter((item) => item !== albumTitle);
  } else {
    currentAlben.push(albumTitle);
  }

  window.currentAlben = currentAlben; // Keep the global copy updated
}

// document.addEventListener("mousemove", (event) => {
//   let spans = document.querySelectorAll(".word");
//   let gr = map(event.clientY, 0, height / 2, 0, data.Graduation.length);
//   spans.forEach((span) => {
//     let textShadow = span.style.textShadow; // Get the textShadow value
//   });

//   load_text(data, gr);
// });

function load_text(data, txt, albumTitle) {
  let keys = Object.keys(data);
  // console.log(txt.innerHTML);

  if (txt) {
    txt.innerHTML = makeFitGraduation(data, albumTitle);
  }

  // right.innerHTML = makeFitJesus(data, gr);
}

function makeFitGraduation(txt, albumTitle) {
  let html_txt = "";
  txt = txt[albumTitle].tracks;
  // Dynamically calculate minCount and maxCount for the current `gr` range
  const subset = txt.slice(Math.max(0), txt.length); // Get the last `gr` elements
  let minCount = Math.min(...subset.map((t) => t.ranking)); // Find minimum score in the subset
  let maxCount = Math.max(...subset.map((t) => t.ranking)); // Find maximum score in the subset
  // if (gr > txt.length) gr = txt.length + 1;

  for (let i = 0; i < 11; i++) {
    let words = txt[i].word;
    let count = txt[i].ranking;
    // console.log(count);
    html_txt += make_span(words, count, minCount, maxCount) + " ";
  }

  return html_txt;
}

function make_span(words, count, minCount, maxCount) {
  // Map the count dynamically within the current range

  let m = 9;
  let b = map(count, minCount, maxCount, m, 0);
  let f = map(b, 0, m, 100, 0);
  // return `<span class="word" style="font-size:20px; text-shadow: 0 0 ${b}px rgba(0,0,0,${f});">${words}</span>`;
  return `<span class="word" style="font-size:
  30px;  text-shadow: 0 0 ${b}px rgba(0,0,0,${f}); display: block;">${words}</span>`;
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style("position", "fixed"); // Makes the canvas fixed
  cnv.style("top", "0px"); // Adjusts vertical position
  cnv.style("left", "0px"); // Adjusts horizontal position
  cnv.style("z-index", "-1"); // Ensures it's behind other elements (optional)

  load_text(data);
  noLoop();
}

function draw(albumTitle) {
  console.log(albumTitle);
  // if (currentAlben.includes(albumTitle)) {
  //   // Remove the element using filter or splice
  //   currentAlben = currentAlben.filter((item) => item !== albumTitle);
  // } else {
  //   currentAlben.push(albumTitle);
  // }

  createCanvas(windowWidth, 100);
  background(251);
  textSize(15);
  textAlign(LEFT);
  text("2000", 10, 30);
  textAlign(RIGHT);
  text("2020", windowWidth - 10, 30);
  // fill("red");
  // rect(windowWidth - 60, 0, windowWidth, 40);
  // rect(0, 0, 60, 40);

  line(0, 55, windowWidth, 55);
  console.log(currentAlben);
  for (d in data) {
    let border = 20;
    if (currentAlben.includes(d)) {
      fullyear = parseInt(data[d].release_date.slice(-4));
      year = parseInt(data[d].release_date.slice(-2));
      month = data[d].release_date.split(".")[1];
      z = map(month, 0, 12, 0, 1);
      date = year + z;
      xValue = map(date, 4, 20, 0 + border, windowWidth - border);

      y = 55;

      ellipse(xValue, y, 20);
      textAlign(CENTER);
      text(fullyear, xValue, 30);
    }
  }
}

function redrawHeaderLeft() {
  fill("red");
  rect(0, 0, 60, 40);
}
