var t = [],
   tI = [],
   c = 0,
   lC;

function setup() {
   createCanvas(1920, 1080);
   for (i = 0; i < 32; i++) {
      t[i] = [];
      tI[i] = [];
      for (j = 0; j < 18; j++) {
         t[i][j] = round(random(1));
         tI[i][j] = 0;
      }
   }
   lC = color(12, 91, 249);
   frameRate(5);
   strokeWeight(2.5);
}

function draw() {
   for (i = 0; i < 32; i++) {
      for (j = 0; j < 18; j++) {
         c = -t[i][j];
         for (x = -1; x <= 1; x++) {
            for (y = -1; y <= 1; y++) {
               c += t[(i + x + 32) % 32][(j + y + 18) % 18];
            }
         }
         if (c === 3) {
            tI[i][j] = 1;
         } else if (c === 2) {
            tI[i][j] = t[i][j];
         } else {
            tI[i][j] = 0;
         }
      }
   }
   for (i in t) {
      for (j in t[i]) {
         if (t[i][j] === 1) {
            fill(lC);
         } else {
            fill(255);
         }
         rect(i * 60, j * 60, 60, 60);
         if (t[i][j] === 0 && tI[i][j] === 1) {
            fill(lC);
            rect(i * 60 + 15, j * 60 + 15, 30, 30);
         } else if (t[i][j] === 1 && tI[i][j] === 0) {
            fill(255);
            rect(i * 60 + 15, j * 60 + 15, 30, 30);
         }
         t[i][j] = tI[i][j];
      }
   }
}

function mouseMoved() {
   var sX = round(mouseX / 60 - 0.5);
   var sY = round(mouseY / 60 - 0.5);
   t[sX][sY] = 1;
}

function mousePressed() {
   for (i in t) {
      for (j in t[i]) {
         t[i][j] = 0;
      }
   }
}