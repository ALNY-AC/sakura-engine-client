import Color from '@/model/core/Color';
import Event from '@/model/core/Event';
import sk, { prop } from '@/model/core/sk';
import Component from '../../core/Component'

@sk.skclass
export default class Block extends Component {



    @prop()
    type: string = 'm';


    start() {

        // let node = sk.node('Block2', ['Sprite']);
        // node.w = 100;
        // node.h = 10;
        // this.node.addNode(node);

    }


    old = new Date().valueOf();
    update(dt: number) {

        // if (new Date().valueOf() >= this.old + 1000) {
        //     this.old = new Date().valueOf();
        // }
        this.node.rotation += (90 * dt);
    }
}