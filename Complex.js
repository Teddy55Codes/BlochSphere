export class Complex {
    real;
    imaginary;
    
    constructor(real = 0, imaginary= 0) {
        this.real = real;
        this.imaginary = imaginary;
    }
    
    clone() {
        return new Complex(this.real, this.imaginary);
    }
    
    addition(byComplex) {
        return new Complex(this.real + byComplex.real, this.imaginary + byComplex.imaginary)
    }

    multiply(byComplex) {
        return new Complex(
            this.real * byComplex.real - this.imaginary * byComplex.imaginary,
            this.real * byComplex.imaginary + this.imaginary * byComplex.real);
    }
    
    multiplyByReal(byReal) {
        return new Complex(this.real * byReal, this.imaginary * byReal)
    }

    divide(byComplex) {
        if (byComplex.real + byComplex.imaginary === 0) {
            return new Complex();
        }
        const realPart = (this.real * byComplex.real + this.imaginary * byComplex.imaginary) / (byComplex.real * byComplex.real + byComplex.imaginary * byComplex.imaginary); 
        const imagPart = (this.imaginary * byComplex.real - this.real * byComplex.imaginary) / (byComplex.real * byComplex.real + byComplex.imaginary * byComplex.imaginary);
        return new Complex(realPart, imagPart);
    }
    
    divideByReal(byReal) {
        return new Complex(this.real / byReal, this.imaginary / byReal);
    }
    
    magnitude() {
        return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
    }

    conjugate() {
        return new Complex(this.real, -this.imaginary);
    }
    
    argument() {
        return Math.atan2(this.imaginary, this.real);
    }
    
    logarithm() {
        return new Complex(Math.log10(this.magnitude()), this.argument());
    }
    
    exponent() {
        const expReal = Math.exp(this.real);
        return new Complex(expReal * Math.cos(this.imaginary), expReal * Math.sin(this.imaginary));
    }
}