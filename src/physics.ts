import { Force } from "./force.js";
import { IParticleJSON, Particle } from "./particle.js";
import { IRopeJSON, Rope } from "./rope.js";
import { Vector } from "./vector.js";

export class Physics {
    public particles: Particle[] = [];
    public gravconst: Vector;

    public constructor(
        particles: Particle[] = [],
        gravconst: Vector = new Vector(),
    ) {
        this.particles = this.particles.concat(particles);
        this.gravconst = gravconst;
    }

    public update(canvas: HTMLCanvasElement) {
        this.particles.forEach((particle) => {
            particle.update();
            particle.applyBoundary(0, canvas.width, 0, canvas.height);
            for (var i = 0; i < this.particles.length/100; i++) {
                this.particles.forEach((otherParticle) => {
                    if (particle !== otherParticle) {
                        if (particle.collision(otherParticle)) {
                            particle.resolveCollision(otherParticle);
                        }
                    }
                });
            }
        });
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.particles.forEach((particle) => {
            particle.draw(ctx);
        });
    }

    static fromJSON(json: IPhysicsJSON): Physics {
        const particles = json.particles?.map((p) => Particle.fromJSON(p)) || [];
        const ropes = json.ropes?.map((r) => Rope.fromJSON(r)) || [];
        particles.push(...ropes.flatMap((rope) => rope.particles));
        const gravconst = Vector.fromJSON(json.gravconst);
        particles.forEach((particle) => {
            particle.forces.push(
                new Force(
                    new Vector(
                        gravconst.x * particle.m,
                        gravconst.y * particle.m,
                    ),
                ),
            );
        });
        return new Physics(particles, gravconst);
    }
}

export interface IPhysicsJSON {
    particles: IParticleJSON[];
    ropes: IRopeJSON[];
    gravconst: Vector;
}
