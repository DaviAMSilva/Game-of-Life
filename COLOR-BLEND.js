var t = [],
   tI = [],
   c = 0,
   lC,
   sC = [];

function setup() {
   createCanvas(1920, 1080);
   for (i = 0; i < 32; i++) {
      t[i] = [];
      tI[i] = [];
      sC[i] = [];
      for (j = 0; j < 18; j++) {
         t[i][j] = round(random(1));
         tI[i][j] = 0;
         sC[i][j] = 360 * i / 32;
      }
   }
   lC = color(12, 91, 249);
   frameRate(5);
   strokeWeight(2.5);
   colorMode(HSL);
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
         cC = sC[i][j];
         if (t[i][j] === 0) {
            cC = 0;
            for (x = -1; x <= 1; x++) {
               for (y = -1; y <= 1; y++) {
                  if (t[(i + x + 32) % 32][(j + y + 18) % 18] === 1) {
                     cC += ((sC[(i + x + 32) % 32][(j + y + 18) % 18] / c));
                  }
               }
            }
         }
         if (c === 3) {
            tI[i][j] = 1;
            sC[i][j] = cC;
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
            fill(sC[i][j], 255, 45);
         } else {
            fill(sC[i][j], 255, 92.5);
         }
         rect(i * 60, j * 60, 60, 60);
         if (t[i][j] === 0 && tI[i][j] === 1) {
            fill(sC[i][j], 255, 45);
            rect(i * 60 + 15, j * 60 + 15, 30, 30);
         } else if (t[i][j] === 1 && tI[i][j] === 0) {
            fill(sC[i][j], 255, 92.5);
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