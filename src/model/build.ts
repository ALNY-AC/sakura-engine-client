import Node from "./core/Node";
import config from "./config.json";

export default function build(): Node[] {


    let nodes: Node[] = [];


    return nuxt(config);


}


function nuxt(nodes: []): Node[] {

    return nodes.map((el: any) => {

        let node = new Node();
        node.name = el.name;
        el.components.forEach((comp: any) => {
            node.addComponent(comp.type);
        });
        return node;

    })

}