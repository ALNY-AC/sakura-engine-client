import Collider from "../assets/script/Collider";
import ICollider from "../assets/script/ICollider";
import Node from "./Node";

export default class Component {

    id: number = Math.random();

    node: Node = null;
    name: string = '';
    start() {
    }
    update(dt: number) { }
    render(ctx: CanvasRenderingContext2D) { }
    getComponent(name: string | Component | any): Component {
        return this.node.getComponent(name)
    }

}

