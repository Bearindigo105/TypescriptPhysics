import { Force } from "./force.js";
import { Particle } from "./particle.js";
import { Vector } from "./vector.js";

export class Physics {
    public particles: Particle[] = [];
    public gravforce: Force;

    public constructor(
        particles: Particle[] = [],
        gravforce: Force = new Force(new Vector(0, 2)),
    ) {
        this.particles = this.particles.concat(particles);
        this.gravforce = gravforce;
        this.particles.forEach((particle) => {
            particle.forces.push(this.gravforce);
        });
    }

    public update(canvas: HTMLCanvasElement) {
        this.particles.forEach((particle) => {
            particle.update(canvas);
            this.particles.forEach((otherParticle) => {
                if (particle !== otherParticle) {
                    if (particle.collision(otherParticle)) {
                        particle.resolveCollision(otherParticle);
                    }
                }
            });
        });
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.particles.forEach((particle) => {
            particle.draw(ctx);
        });
    }

    static fromJSON(json: IPhysicsJSON): Physics {
        const particles = json.particles.map((p) => Particle.fromJSON(p));
        const gravforce = new Force(Vector.fromJSON(json.gravforce.s));
        particles.forEach((particle) => {
            particle.forces.push(gravforce);
        });
        return new Physics(particles, gravforce);
    }
}

export interface IPhysicsJSON {
    particles: Particle[];
    gravforce: Force;
}
