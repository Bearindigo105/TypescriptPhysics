import { Vector } from "./vector.js";

export class Force {
    public s: Vector;

    public constructor(s = new Vector()) {
        this.s = s;
    }
}
