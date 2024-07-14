import {Complex} from "./Complex";

export const baseState0 = [new Complex(1, 0), new Complex(0, 0)];
export const baseState1 = [new Complex(0, 0), new Complex(1, 0)];
export const baseStateM = [new Complex(Math.SQRT1_2, 0), new Complex(-Math.SQRT1_2, 0)];
export const baseStateP = [new Complex(Math.SQRT1_2, 0), new Complex(Math.SQRT1_2, 0)];
export const baseStateMi = [new Complex(Math.SQRT1_2, 0), new Complex(0, -Math.SQRT1_2)];
export const baseStatePi = [new Complex(Math.SQRT1_2, 0), new Complex(0, Math.SQRT1_2)];


export class Qubit {
    value;
    
    constructor(complexZero = baseState0[0], complexOne = baseState0[1]) {
        this.value = [complexZero, complexOne];
    }
    
    applyGate(gate) {
        const complexAlpha = this.value[0].clone();
        this.value[0] = gate[0][0].multiply(this.value[0]).addition(gate[0][1].multiply(this.value[1]));
        this.value[1] = gate[1][0].multiply(complexAlpha).addition(gate[1][1].multiply(this.value[1]));
    }

    polarCoordinates() {
        const mag = Math.sqrt(this.value[0].magnitude() * this.value[0].magnitude() + this.value[1].magnitude() * this.value[1].magnitude());
        const alpha = this.value[0].divideByReal(mag)
        const beta = this.value[1].divideByReal(mag)
        
        const theta = 2 * Math.acos(alpha.magnitude());
        
        const absAlphaAbsBeta = alpha.multiply(beta).magnitude();
        let phi = 0;
        if (absAlphaAbsBeta !== 0) {
            const conjAlpha = alpha.conjugate();
            const betaAlphaConjugate = beta.multiply(conjAlpha);
            phi = betaAlphaConjugate.divideByReal(absAlphaAbsBeta).argument()
        }
        return { theta, phi };
    }
}