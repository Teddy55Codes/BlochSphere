import {Complex} from "./Complex";

export class Qubit {
    value;
    
    constructor(complexZero = new Complex(1, 0), complexOne = new Complex(0, 0)) {
        this.value = [complexZero, complexOne];
    }
    
    applyGate(gate) {
        const complexAlpha = this.value[0].clone();
        this.value[0] = gate[0][0].multiply(this.value[0]).addition(gate[0][1].multiply(this.value[1]));
        this.value[1] = gate[1][0].multiply(complexAlpha).addition(gate[1][1].multiply(this.value[1]));
        
        this.normalize();
    }
    
    normalize() {
        const mag = Math.sqrt(this.value[0].magnitude() * this.value[0].magnitude() + this.value[1].magnitude() * this.value[1].magnitude());
        this.value[0] = this.value[0].divideByReal(mag)
        this.value[1] = this.value[1].divideByReal(mag)
    }

    polarCoordinates() {
        const alpha = this.value[0];
        const beta = this.value[1];
        
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