export default class Color {
    r: number = 255
    g: number = 255
    b: number = 255
    constructor(r: number = 0, g: number = 0, b: number = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    get rgb() {
        return `rgb(${this.r},${this.g},${this.b})`
    }
}