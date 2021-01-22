import Color from '@/model/core/Color';
import sk from '@/model/core/sk';
import Component from '../../core/Component'

@sk.skclass
export default class Main extends Component {

    start() {
        this.node.w = this.node.app.w;
        this.node.h = this.node.app.h;
        this.node.addComponent("Build");
        let node = sk.node('Player', ['Sprite', 'Player'])
        this.node.addNode(node);
    }

    update(dt: number) {

    }
}