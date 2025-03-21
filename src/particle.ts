import { IVectorJSON, Vector } from "./vector.js";
import { Force } from "./force.js";
import { Constraint } from "./constraint.js";

export class Particle {
    public s: Vector;
    public v: Vector;
    public a: Vector;
    public m: number;
    public forces: Force[] = [];
    public elasticity: number;
    public color: string;
    public hasCollision: boolean;
    public constraints: Constraint[] = [];
    public dt: number;

    public constructor(
        s = new Vector(),
        v = new Vector(),
        m = 1,
        elasticity = 0.9,
        color = "rgba(0, 0, 0, 1)",
        constraints: Constraint[] = [],
        hasCollision = true,
        dt = 0.5,
    ) {
        this.s = s;
        this.v = v;
        this.a = new Vector();
        this.m = m;
        this.forces = [];
        this.elasticity = elasticity;
        this.color = color;
        this.constraints = constraints;
        this.hasCollision = hasCollision;
        this.dt = dt;
    }

    public update() {
        var new_s = this.s
            .copy()
            .add(this.v.copy().multiply(this.dt*this.dt*0.5))
            .add(this.a.copy().multiply(this.dt));
        var new_a = this.sumForces().multiply(1 / this.m);
        var new_v = this.v.copy().add(this.a.add(new_a)).multiply(1);
        this.s = new_s;
        this.v = new_v;
        this.a = new_a;
    }

    public applyBoundary(
        xMin: number,
        xMax: number,
        yMin: number,
        yMax: number,
    ) {
        if (this.s.x - this.m / 2 < xMin) {
            this.s.x = xMin + this.m / 2;
            this.v.x *= -this.elasticity;
        }
        if (this.s.x + this.m / 2 > xMax) {
            this.s.x = xMax - this.m / 2;
            this.v.x *= -this.elasticity;
        }
        if (this.s.y - this.m / 2 < yMin) {
            this.s.y = yMin + this.m / 2;
            this.v.y *= -this.elasticity;
        }
        if (this.s.y + this.m / 2 > yMax) {
            this.s.y = yMax - this.m / 2;
            this.v.y *= -this.elasticity;
        }
    }

    public collision(p: Particle): boolean {
        if (!this.hasCollision || !p.hasCollision) return false;
        const dx = this.s.x - p.s.x;
        const dy = this.s.y - p.s.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (this.m + p.m) / 2;
    }
    public resolveCollision(p: Particle) {
        const dx = this.s.x - p.s.x;
        const dy = this.s.y - p.s.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < (this.m + p.m) / 2) {
            const overlap = (this.m + p.m) / 2 - distance;
            const nx = dx / distance;
            const ny = dy / distance;

            this.s.x += (nx * overlap) / 2;
            this.s.y += (ny * overlap) / 2;
            p.s.x -= (nx * overlap) / 2;
            p.s.y -= (ny * overlap) / 2;

            const relativeVelocity = new Vector(
                this.v.x - p.v.x,
                this.v.y - p.v.y,
            );
            const dotProduct = relativeVelocity.dot(new Vector(nx, ny));
            if (dotProduct > 0) return;

            this.v.subtract(new Vector(nx, ny).multiply(dotProduct));
            p.v.add(new Vector(nx, ny).multiply(dotProduct));
            this.v.multiply(this.elasticity);
            p.v.multiply(this.elasticity);
        }
    }

    public sumForces(): Vector {
        var sum = new Vector();
        this.forces.forEach((force) => {
            sum.add(force.s);
        });
        return sum;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.s.x, this.s.y, this.m / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    static fromJSON(json: IParticleJSON): Particle {
        return new Particle(
            Vector.fromJSON(json.s),
            Vector.fromJSON(json.v),
            json.m,
            json.elasticity,
            json.color,
            json.constraints,
            json.hasCollision,
        );
    }
}

export interface IParticleJSON {
    s: IVectorJSON;
    v: IVectorJSON;
    a: IVectorJSON;
    m: number;
    elasticity: number;
    color: string;
    constraints: Constraint[];
    hasCollision: boolean;
}
