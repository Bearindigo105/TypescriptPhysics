import { Particle } from "./particle.js";

export class Physics {
    public particles: Particle[] = [];

    public constructor(particles: Particle[] = []) {
        this.particles = this.particles.concat(particles);
    }

    public update(canvas: HTMLCanvasElement) {
        this.particles.forEach((particle) => {
            particle.update(canvas);
            this.particles.forEach((otherParticle) => {
                if (particle !== otherParticle) {
                    if(particle.collision(otherParticle)){
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
}
