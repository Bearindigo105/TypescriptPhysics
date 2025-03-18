import { IVectorJSON, Vector } from "./vector.js";

export class Force {
    public s: Vector;

    public constructor(s = new Vector()) {
        this.s = s;
    }

    fromJSON(json: IForceJSON): Force {
        return new Force(Vector.fromJSON(json.s));
    }
}

export interface IForceJSON {
    s: IVectorJSON;
}
