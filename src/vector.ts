export class Vector {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v: Vector) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    subtract(v: Vector) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    multiply(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    divide(scalar: number) {
        if (scalar === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    magnitude() {
        const mag = Math.sqrt(this.x * this.x + this.y * this.y);
        return mag;
    }

    normalize() {
        const mag = this.magnitude();
        if (mag !== 0) {
            this.divide(mag);
        }
        return this;
    }

    dot(v: Vector) {
        const dotProduct = this.x * v.x + this.y * v.y;
        return dotProduct;
    }

    angle() {
        const angle = Math.atan2(this.y, this.x);
        return angle;
    }

    static fromJSON(v: IVectorJSON): Vector {
        return new Vector(v.x, v.y);
    }
}

export interface IVectorJSON{
    x: number;
    y: number;
}