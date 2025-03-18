import { Constants } from "./constants.js";
import { Particle } from "./particle.js";
import { Physics } from "./physics.js";
import { Vector } from "./vector.js";

var physics = new Physics([
    new Particle(
        new Vector(0, 0),
        new Vector(5, 0),
        50,
        [Constants.gravforce],
        1
    ),
    new Particle(
        new Vector(500, 80),
        new Vector(-5, -3),
        50,
        [Constants.gravforce],
        0.9,
        "rgba(255, 0, 0, 1)"
    ),
    new Particle(
        new Vector(600, 70),
        new Vector(-10, 1),
        50,
        [Constants.gravforce],
        0.9,
        "rgba(0, 255, 0, 1)"
    ),
    new Particle(
        new Vector(700, 60),
        new Vector(10, 2),
        50,
        [Constants.gravforce],
        0.9,
        "rgba(255, 255, 0, 1)"
    ),
    new Particle(
        new Vector(800, 50),
        new Vector(-14, -12),
        50,
        [Constants.gravforce],
        0.9,
        "rgba(255, 0, 255, 1)"
    ),
    new Particle(
        new Vector(900, 40),
        new Vector(12, 6),
        50,
        [Constants.gravforce],
        0.9,
        "rgba(0, 255, 255, 1)"
    ),
    new Particle(
        new Vector(100, 30),
        new Vector(2, 8),
        50,
        [Constants.gravforce],
        0.9,
        "rgba(150, 150, 0, 1)"
    ),
    new Particle(
        new Vector(200, 20),
        new Vector(7, 1),
        50,
        [Constants.gravforce],
        0.9,
        "rgba(0, 150, 150, 1)"
    ),
    new Particle(
        new Vector(300, 10),
        new Vector(-2, 2),
        50,
        [Constants.gravforce],
        0.9,
        "rgba(150, 0, 150, 1)"
    ),
]);

if (typeof document !== "undefined") {
    var canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) throw new Error("Could not get canvas element");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
    if (!ctx) throw new Error("Could not get canvas context");

    document.addEventListener("wheel", (event: WheelEvent) => {
        physics.particles.forEach((particle) => {
            particle.v.y -= event.deltaY / particle.m;
            particle.v.x -= event.deltaX / particle.m;
        });
    });
}

function animate() {
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        physics.update(canvas);
        physics.draw(ctx);
    }
    requestAnimationFrame(animate);
}

animate();
