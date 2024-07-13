export class Complex {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }
    
    real = 0;
    imaginary = 0;
    
    addition(byComplex) {
        return new Complex(this.real + byComplex.real, this.imaginary + byComplex.imaginary)
    }

    multiply(byComplex) {
        return new Complex(
            this.real * byComplex.real - this.imaginary * byComplex.imaginary,
            this.real * byComplex.imaginary + this.imaginary * byComplex.real);
    }

    divide(byComplex) {
        if (byComplex.real + byComplex.imaginary === 0) {
            return new Complex();
        }
        return (this.multiply(byComplex.conjugate()) / (byComplex.real * byComplex.real) + (byComplex.imaginary * byComplex.imaginary)) ;
    }
    
    magnitude() {
        return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
    }

    conjugate() {
        return new Complex(this.real, -this.imaginary);
    }
}