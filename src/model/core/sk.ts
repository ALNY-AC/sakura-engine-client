import Component from "./Component";
import Node from "./Node";
import Color from "./Color";

let script: any = {};

export function skclass(target: any) {
    script[target.prototype.constructor.name] = target;
}

export function prop(opt?: any) {
    return (target: any, propertyName: string) => {
    }
}

export function node(name: string, comp: Component[] | string[]): Node {
    let node = new Node();
    node.name = name;
    comp.forEach((c: any) => node.addComponent(c));
    return node;
}




const sk = {
    node,
    script,
    skclass,
    prop,
    Node,
    Color
}


export default sk