import Node from "./Node";

export default class Component {
    node: Node = null;
    name: string = '';
    start() {
    }
    update(dt: number) { }
    render(ctx: CanvasRenderingContext2D) { }
}
