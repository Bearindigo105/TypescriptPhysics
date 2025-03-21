import { IParticleJSON, Particle } from "./particle.js";

export class Rope {
    public particles: Particle[];
    public length: number;

    public constructor(numParticles = 0, length = 0) {
        this.particles = Array.from({ length: numParticles }, (_, i) => new Particle());
        this.length = length;
    }

    public static fromJSON(json: IRopeJSON): Rope {
        return new Rope(json.numParticles, json.length);
    }

}

export interface IRopeJSON {
    numParticles: number;
    length: number;
}