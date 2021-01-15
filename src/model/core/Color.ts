export default class Color {
    r: number = 255
    g: number = 255
    b: number = 255
    get rgb() {
        return `rgb(${this.r},${this.g},${this.b})`
    }
}