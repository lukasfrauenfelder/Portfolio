const q = (p) => {
  p.walkers2 = [];
  let pg;

  var Person1;

  let select = 0;

  // function windowResized2() {
  //   p.resizeCanvas(windowWidth / 5, 550);
  // }

  p.setup = function () {
    p.pixelDensity(1);
    Person1 = p.createCanvas(windowWidth / 5, 550);
    Person1.parent("Person2");

    // p.parent("#Person1");
    // d3.csv("Personas.csv", d3.autoType).then(function (csv) {
    //   data = csv;
    //   //console.log(data);
    // });

    pg = p.createGraphics(400 / 2, 950 / 2);
    for (let i = 0; i < 20; i++) {
      const walk = new Walker2(random(0, 400 / 2), random(0, 950 / 2)); // Changed canvas size
      p.walkers2.push(walk);
    }
    p.angleMode(DEGREES);

    // p.noLoop();

    // console.log("testvar", slider);
  };

  p.draw = function () {
    pg.background(255, 255, 255, 5); // Setze den Hintergrund des Puffers, um die Spuren der Walker zu zeichnen
    // console.log(data);
    let s1 = map(slidervalue, 0, 100, 210, 0);
    // pg.rect(0, 0, 1950, s1);
    //console.log(slidervalue);
    p.background(234, 75, 133);
    p.fill(255, 0, 0);

    weite = windowWidth / 5;
    hi = 550;

    p.windowResized = function () {
      // Resize the canvas when the window is resized
      p.resizeCanvas(p.windowWidth / 5, 550); // Adjust canvas dimensions here
    };

    for (let i = 0; i < p.walkers2.length; i++) {
      p.walkers2[i].display(pg);
      p.walkers2[i].update(); // Added update function call
    }

    const areaWidth = 25;
    const areaHeight = 25;

    p.stroke(12, 45, 87);

    let c = canvases.find((obj) => obj.id === 1);
    select = c !== undefined ? c.select : 5;
    // console.log("select", select);

    select = 1;

    let breite = data[select]["Disposition"];

    let breiteMap = map(breite, 0, 46.96, 0, 67);
    let ark = p.map(breite, 34.1, 46.96, 5, 0);

    //console.log("breite" + breite);

    let hohe = data[select]["Resilienz*3"];
    let satz = data[select]["DispositionSatz"];
    let pers = data[select]["PERSONAS"];
    let dispo = data[select]["Disposition"];

    let s3 = p.map(slidervalue, 0, 800, 0, 10);
    // let s2 = p.map(slidervalue, 0, 800, 0, 550);
    let s2 = slidervalue;

    if (s2 > hohe * 3 - 56) {
      s2 = hohe * 3 - 56;
      s3 = 16;
    }

    for (let y = 0; y < hi; y += areaHeight) {
      for (let x = 0; x < weite; x += areaWidth) {
        let pixelColor = pg.get(x / 2 + areaWidth / 2, y / 2 + areaHeight / 2);
        let brightness =
          (p.red(pixelColor) + p.green(pixelColor) + p.blue(pixelColor)) / 3;

        const imgIndex = p.floor(p.map(brightness, 0, 255, 0, s3));
        const img = images[imgIndex];

        // console.log(images);

        // Zeichne das Bild an der entsprechenden Position

        if (img) {
          p.image(img, x, y, areaWidth, areaHeight);
        }
        // p.noFill();
        // p.strokeWeight(1);
        // p.rect(x, y, areaWidth, areaHeight);
      }
    }

    // for (let i = 0; i < data.length; i++) {
    //   // p.noLoop();
    //   breite = data[i].Disposition;
    //   // console.log(breite);
    // }

    // p.image(pg, 0, 0);

    // if (slidervalue>500){

    // }

    // rotate(-90);

    // //AB HIE GEIZ AB!!
    p.fill(12, 45, 87);
    // p.stroke("red");
    // p.strokeJoin(MITER);
    p.strokeCap(ROUND);
    // p.ellipse(70, 250, 80, 20);

    p.rect(0, 0, weite / 2 - (breiteMap * 3) / 2, hi);
    // p.fill("red");
    p.rect(weite / 2 + (breiteMap * 3) / 2, 0, 150, hi);
    // p.fill("red");
    //p.rect(0, 0, 10, 400);
    p.noFill();
    //p.strokeWeight(2);
    // p.ellipse(50, 200, 80, 280);
    p.fill(0, 50);
    p.noStroke();
    p.ellipse(weite / 2, height - 58 - s2, breiteMap * 3, breiteMap * 0.8);
    p.noFill();
    p.strokeWeight(50);

    // p.stroke("red");
    // p.arc(50, 200, breiteMap * 2.5, breiteMap * 7.5, 90, 270);
    // p.stroke("red");
    p.stroke(12, 45, 87);
    // p.stroke("red");
    // noFill();
    p.arc(
      weite / 2,
      height - 58 - s2 + ark,
      breiteMap * 3.8,
      breiteMap * 1.5,
      180,
      360
    );

    p.noFill();

    p.arc(
      weite / 2,
      height - 53 + ark,
      breiteMap * 3.8,
      breiteMap * 1.5,
      0,
      180
    );

    p.fill(12, 45, 87);
    // p.fill("red");
    p.rect(0, 0, weite, 285 - s2 + 85);
    // p.fill("red");
    p.rect(0, height, width, height);
    // fill("red");

    // p.fill("red");
    // p.noStroke();
    p.fill(12, 45, 87);

    p.noFill();
    p.strokeWeight(20);

    p.stroke(255);
    p.strokeWeight(2);
    // p.line(0, height, width, height);

    p.strokeWeight(2);
    p.stroke(255);
    p.noFill();

    p.ellipse(weite / 2, height - 55, breiteMap * 3, breiteMap * 0.8);
    p.line(
      weite / 2 - (breiteMap * 3) / 2,
      height - 55,
      weite / 2 - (breiteMap * 3) / 2,
      height - hohe * 3
    );
    p.line(
      weite / 2 + (breiteMap * 3) / 2,
      height - 55,
      weite / 2 + (breiteMap * 3) / 2,
      height - hohe * 3
    );
    p.ellipse(weite / 2, height - hohe * 3, breiteMap * 3, breiteMap * 0.8);

    p.noStroke();
    // p.textStyle(100);
    p.textSize(12);
    p.fill(234, 75, 133);
    p.rect(
      weite / 2 - (breiteMap * 3) / 2,
      hi - 70,
      weite / 2 + (breiteMap * 3) / 2 - weite / 5,
      20
    );
    p.fill(239, 236, 236);
    p.text(pers, weite / 2 - (breiteMap * 3) / 2 + 5, hi - 55);

    p.text(
      "DISPOSITION:  " +
        round(dispo) +
        " A." +
        "\n" +
        "RESILIENZ:    " +
        round(hohe / 2) +
        " A." +
        "\n" +
        satz,
      weite / 2 - (breiteMap * 3) / 2,
      hi - 35
    );

    // rotate(90);
    //console.log("he" + height);
    if (select === 5) {
      p.noStroke();
      p.fill(12, 45, 87);
      p.rect(0, 0, 400, 950);
    }

    p.noFill();
    // console.log(s2);

    // p.image(pg, 0, 0);
  };

  class Walker2 {
    constructor(x, y) {
      this.pos = p.createVector(x, y);
      this.posOld = p.createVector(x, y);
      this.vel = p.createVector(0, -1);
    }

    update() {
      let theta = p.noise(this.pos.x * 0.01, this.pos.y * 0.01);

      // this.vel.setHeading(theta);
      this.posOld = this.pos.copy();
      this.pos.add(this.vel);

      if (
        this.pos.x > 400 / 2 ||
        this.pos.x < 0 ||
        this.pos.y > 950 / 2 ||
        this.pos.y < 0
      ) {
        this.pos = p.createVector(p.random(0, 400 / 2), p.random(0, 950 / 2));
        this.posOld = this.pos.copy();
        // console.log(this.pos);
      }
    }

    display(pg) {
      let c1 = pg.noise(this.pos.x * 1.5);
      pg.fill(c1, 0, 0, 50);
      pg.noStroke();

      let rx = p.noise(this.posOld.x * 0.1);
      let ry = p.noise(this.posOld.y * 0.1);

      pg.push();
      pg.translate(this.pos.x, this.pos.y);
      pg.rotate(frameCount * 0.01) * 100;

      pg.ellipse(0, 0, rx * 150, ry * 150); // Fixed ellipse position
      pg.pop();
    }
  }
};
new p5(q);
