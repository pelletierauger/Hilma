var looping = true;
var exporting = false;
var arr = [];
var radiusAugmenter = 0;
var graphiteWeight = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    // noFill();
    // stroke(255);
    noStroke();
    // stroke(0, 30);
    frameRate(1);
    // arr = [createVector(0, 0),
    //     createVector(10, 10),
    //     createVector(30, 30),
    //     createVector(50, 100),
    //     createVector(100, 20),
    //     createVector(130, 0)
    // ];
    // noLoop();
    blendMode(DARKEST);
}

function draw() {

    translate(width / 2, height / 2);
    var total = 100;
    var increment = TWO_PI / total;
    for (var i = 0; i < TWO_PI + increment; i += increment) {
        var x = cos(i) * cos(i * 2) * (50 + radiusAugmenter);
        var y = sin(i) * (50 + radiusAugmenter);
        var vec = createVector(x, y);
        arr.push(vec);
    }

    // scale(0.5, 0.5);
    // drawGraphiteBasic();
    drawGraphite(arr);
    if (exporting) {
        frameExport();
    }
    radiusAugmenter += 50;
    graphiteWeight += 1;
    arr = [];
}

function drawGraphite(h) {
    var drawCount = 0;
    for (var j = 0; j < h.length - 1; j++) {
        if (h[j + 1]) {
            // stroke(255, 100);
            // line(h[j].x, h[j].y, h[j + 1].x, h[j + 1].y);
            // stroke(0, 30);

            var v1 = h[j];
            var hypotenuse = dist(h[j].x, h[j].y, h[j + 1].x, h[j + 1].y);
            // var opposite = abs(h[j + 1].y - h[j].y);
            // var sinus = opposite / hypotenuse;
            // var angle = Math.asin(sinus);
            var angle = atan2(h[j + 1].y - h[j].y, h[j + 1].x - h[j].x);

            push();
            translate(v1.x, v1.y);
            rotate(angle + PI / 2);
            // if (h[j + 1].y < h[j].y) {
            //     rotate(-angle + (PI / 2));
            // } else {
            //     rotate(angle + (PI / 2));
            // }
            // stroke(0);
            // line(-10, 0, 10, 0);
            // fill(200);
            // ellipse(0, 0, 5);

            for (var i = 0; i < hypotenuse; i++) {
                translate(0, -1);
                drawGraphiteIsolated(drawCount);
                drawCount++;
            }
            // ellipse(0, 0, 5);
            pop();
        }
    }

    //h is an array of vectors
}

function drawGraphiteIsolated(t) {
    for (var i = 0; i < 10; i += 0.12) {
        var x = i - 5;
        var y = -(1 / sqrt(TWO_PI)) * pow(2.71828, -pow(x, 2) / 2);
        var noiseValue = i + t / 100;
        var n = noise(noiseValue) / 200;
        n += noise(noiseValue) * 2 * y;
        y += n;
        y *= 300;
        var n2 = noise(t / 50);
        var n3 = noise(100 + t / 50);
        var lineWidth = graphiteWeight;
        x *= lineWidth;
        if (x <= 0) {
            x *= n2;
        } else {
            x *= n3;
        }
        var mapCrayon = map(y, -200, 0, 80, 255);
        mapCrayon = constrain(mapCrayon, 0, 255);
        fill(round(mapCrayon));
        push();
        var nGrain = noise(t) * lineWidth * 1;
        translate(random(nGrain), random(nGrain));
        ellipse(x, 0, 2);
        pop();
    }
}

function drawGraphiteBasic() {
    // background(51);

    translate(width / 2, 0);
    // scale(2, 2);
    translate(0, frameCount);

    // beginShape();

    for (var i = 0; i < 10; i += 0.12) {
        var x = i - 5;
        var y = -(1 / sqrt(TWO_PI)) * pow(2.71828, -pow(x, 2) / 2);
        var noiseValue = i + frameCount / 100;
        var n = noise(noiseValue) / 200;
        n += noise(noiseValue) * 2 * y;
        y += n;
        y *= 300;
        // console.log(y);
        // x = map(x, -5, 5, -width / 2 + 20, width / 2 - 20);
        var n2 = noise(frameCount / 50);
        var n3 = noise(100 + frameCount / 50);
        var lineWidth = 10;
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
        var nGrain = noise(frameCount) * lineWidth * 1;
        translate(random(nGrain), random(nGrain));
        ellipse(x, 0, 2);
        pop();
        // }
        // vertex(x, y + n);
    }
    // endShape(OPEN);
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
