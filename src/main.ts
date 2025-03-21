import { Particle } from "./particle.js";
import { IPhysicsJSON, Physics } from "./physics.js";
import { Vector } from "./vector.js";

var physics = new Physics();

function parseJSON(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        const reader = new FileReader();
        reader.readAsText(input.files[0]);
        reader.onload = (e) => {
            const content = e.target?.result as string;
            console.log(content);
            try {
                const json = JSON.parse(content) as IPhysicsJSON;
                physics = Physics.fromJSON(json);
                console.log("Parsed JSON:", json);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        };
    }
}

const file = document.getElementById("load") as HTMLInputElement | null;
if (file) {
    file.addEventListener("change", (event: Event) => {parseJSON(event);file.hidden = true;}, false);
}

if (typeof document !== "undefined") {
    var canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) throw new Error("Could not get canvas element");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
    if (!ctx) throw new Error("Could not get canvas context");

    document.addEventListener("wheel", (event: WheelEvent) => {
        physics.particles.forEach((particle) => {
            particle.v.y -= Math.sqrt(Math.abs(event.deltaY * 20 / particle.m)) * Math.sign(event.deltaY);
            particle.v.x -= Math.sqrt(Math.abs(event.deltaX * 10 / particle.m)) * Math.sign(event.deltaX);
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
