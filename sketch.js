var looping = true;
var exporting = true;


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(51);
    // noLoop();
    // noStroke();
    // fill(255);
    // noFill();
    // fill(255, 50);
    stroke(255);
    frameRate(30);

}

function draw() {
    background(51);
    translate(width / 2, 0);
    for (var j = 0; j < 20; j++) {
        push();
        translate(0, j * 20 + 350);
        var mapFill = map(j, 0, 20, 40, 255);
        var mapFill2 = map(j, 0, 20, 255, 40);
        fill(mapFill);
        stroke(mapFill2)
        beginShape();
        for (var i = 0; i < 10; i += 0.01) {
            // var mapY = map(abs(i - width / 2), 0, 100, 0, 5);
            var mapX = map(i, 0, 1000, 0, width);
            var x = i - 5;
            var y = -(1 / sqrt(TWO_PI)) * pow(2.71828, -pow(x, 2) / 2);
            var n = noise(i + j / 10 + frameCount / 10) / 20;
            n += noise(i + j / 10 + frameCount / 10) * 2 * y;
            y += n;
            y *= 300;
            x = map(x, -5, 5, -width / 2 + 20, width / 2 - 20);

            vertex(x, y + n);

        }
        if (j == 19) {
            vertex(x, 50);
            vertex(-x, 50);
        } else {
            vertex(x, y + n + 30);
            vertex(-x, y + n + 30);
        }

        endShape(CLOSE);
        // stroke(255, 10);
        // line(0, height / 2, 0, -height / 2);
        // line(width / 2, 0, -width / 2, 0);
        pop();
    }
    if (exporting) {
        frameExport();
    }
}

function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            noLoop();
            looping = false;
        } else {
            loop();
            looping = true;
        }
    }
}

function frameExport() {
    var formattedFrameCount = "" + frameCount;
    while (formattedFrameCount.length < 5) {
        formattedFrameCount = "0" + formattedFrameCount;
    }
    save("grooves" + formattedFrameCount + ".png");
}
