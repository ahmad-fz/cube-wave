import P5 from "p5";

const sk = (p5) => {

    const boxNum = 20,
        boxWidth = 10,
        boxHeight = 100,
        boxPadding = 3,
        waveHeight = 60,
        wavePower = 0.04,
        magicAngle = {
            x: Math.PI / 4,
            y: Math.atan(1 / Math.sqrt(2))
        };

    let angle = 0,
        gridWidth = boxNum * (boxPadding + boxWidth);

    p5.preload = () => {
        // load assets here
    }

    p5.setup = () => {
        p5.createCanvas(800, 800, p5.WEBGL);
        p5.normalMaterial();
        p5.ortho(-p5.width / 2, p5.width / 2, p5.height / 2, -p5.height / 2, 0, 1000);
    }

    p5.draw = () => {
        p5.background(200);
        p5.rotateX(magicAngle.x);
        p5.rotateY(magicAngle.y);
        enableOrbit(false);
        enableDebug(false);

        p5.push();

        for (let x = 0; x < boxNum; x++) {
            for (let z = 0; z < boxNum; z++) {
                let boxX = x * (boxWidth + boxPadding) - gridWidth / 2;
                let boxZ = z * (boxWidth + boxPadding) - gridWidth / 2;
                p5.push();
                p5.translate(boxX, 0, boxZ);
                p5.box(boxWidth, calcBoxHeight(boxX, boxZ, angle), boxWidth);
                p5.pop();
            }
        }

        p5.pop();
        angle += 0.1;
    }

    function calcBoxHeight(x, z, angle) {
        let dist = p5.dist(x, z, 0, 0);
        return boxHeight + (waveHeight * Math.sin(dist * wavePower + angle));
    }

    function cam(type) {
        if (type == 'normal') {
            p5.camera(0, -300, 600, 0, 0, 0, 0, 1, 0);
        }
        if (type == 'ortho') {
            p5.ortho(-p5.width / 2, p5.width / 2, p5.height / 2, -p5.height / 2, 0, 1000);
        }
    }

    function enableOrbit(flag) {
        if (flag) p5.orbitControl();
    }

    function enableDebug(flag) {
        if (flag) p5.debugMode(500, 10, 0, 0, 0, 100, 0, -100, 0);
    }
}

new P5(sk);