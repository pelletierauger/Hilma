var looping = true;
var exporting = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(51);
    noFill();
    stroke(255);
    frameRate(30);
}

function draw() {
    background(51);
    translate(width / 2, height / 2);
    beginShape();
    for (var i = 0; i < 10; i += 0.01) {
        // var mapY = map(abs(i - width / 2), 0, 100, 0, 5);
        var mapX = map(i, 0, 1000, 0, width);
        var x = i - 5;
        var y = -(1 / sqrt(TWO_PI)) * pow(2.71828, -pow(x, 2) / 2);
        var n = noise(i + frameCount / 10) / 20;
        n += noise(i + frameCount / 10) * 2 * y;
        y += n;
        y *= 300;
        x = map(x, -5, 5, -width / 2 + 20, width / 2 - 20);
        vertex(x, y + n);
    }
    endShape(OPEN);

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
