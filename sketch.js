var looping = true;
var exporting = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(250);
    // noFill();
    // stroke(255);
    noStroke();
    frameRate(30);
    // noLoop();
}

function draw() {
    // background(51);

    translate(width / 2, 0);
    // scale(2, 2);
    translate(0, frameCount);

    // beginShape();

    for (var i = 0; i < 10; i += 0.12) {
        var x = i - 5;
        var y = -(1 / sqrt(TWO_PI)) * pow(2.71828, -pow(x, 2) / 2);
        var noiseValue = i + frameCount / 10;
        var n = noise(noiseValue) / 200;
        n += noise(noiseValue) * 2 * y;
        y += n;
        y *= 300;
        // console.log(y);
        // x = map(x, -5, 5, -width / 2 + 20, width / 2 - 20);
        var n2 = noise(frameCount / 50);
        var n3 = noise(100 + frameCount / 50);
        var lineWidth = 3;
        x *= lineWidth;
        if (x <= 0) {
            x *= n2;
        } else {
            x *= n3;
        }
        var mapCrayon = map(y, -200, 0, 0, 250);
        mapCrayon = constrain(mapCrayon, 0, 250);
        // console.log(mapCrayon);
        fill(round(mapCrayon));
        // var rando = random(255);
        // fill((round(mapCrayon) + rando) * 2);
        // if (random(2) < 1) {
        push();
        var nGrain = noise(frameCount) * lineWidth * 2;
        translate(random(nGrain), random(nGrain));
        ellipse(x, 0, 2);
        pop();
        // }
        // vertex(x, y + n);
    }
    // endShape(OPEN);

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
