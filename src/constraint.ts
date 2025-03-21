import { IParticleJSON, Particle } from "./particle.js";

export class Constraint {
    p1: Particle;
    p2: Particle;
    length: number;

    public constructor(p1: Particle, p2: Particle, length: number) {
        this.p1 = p1;
        this.p2 = p2;
        this.length = length;
    }

    static fromJSON(json: IConstraintJSON): Constraint {
        return new Constraint(
            Particle.fromJSON(json.p1),
            Particle.fromJSON(json.p2),
            json.length
        );
    }

    public update() {
        const dx = this.p2.s.x - this.p1.s.x;
        const dy = this.p2.s.y - this.p1.s.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance === 0) return; // Prevent division by zero

        const difference = this.length - distance;
        const percent = difference / distance / 2;
        const offsetX = dx * percent;
        const offsetY = dy * percent;

        this.p1.s.x += offsetX;
        this.p1.s.y += offsetY;
        this.p2.s.x -= offsetX;
        this.p2.s.y -= offsetY;
    }
}
export interface IConstraintJSON {
    p1: IParticleJSON;
    p2: IParticleJSON;
    length: number;
}