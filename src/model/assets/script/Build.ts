import Color from '@/model/core/Color';
import Event from '@/model/core/Event';
import Node from '@/model/core/Node';
import sk from '@/model/core/sk';
import Component from '../../core/Component'
import Block from './Block';

@sk.skclass
export default class Build extends Component {


    buildNode: Node;

    start() {

        this.buildNode = sk.node('Block', ['Sprite', 'Block']);
        this.node.addNode(this.buildNode);

        this.node.on('mouseup', (e: any) => {
            if (!this.buildNode.active) return;

            let node = sk.node('Block', ['Sprite', 'Block']);

            node.w = this.buildNode.w;
            node.h = this.buildNode.h;
            node.x = this.buildNode.x;
            node.y = this.buildNode.y;
            this.node.addNode(node);
        });

    }

    oldx = 0;
    oldy = 0;

    update(dt: number) {
        if (Event.input(32)) {
            this.buildNode.active = true;
            let num = 1 / 20
            this.buildNode.x = Math.round(Event.mouse.x * num) / num;
            this.buildNode.y = Math.round(Event.mouse.y * num) / num;
        } else {
            this.buildNode.active = false;
        }
    }
}