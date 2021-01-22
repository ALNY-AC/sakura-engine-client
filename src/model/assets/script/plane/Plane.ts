import Component from '@/model/core/Component';
import Event from '@/model/core/Event';
import sk from '@/model/core/sk';
import Bullet from './Bullet';

@sk.skclass
export default class Plane extends Component {

    start() {
        this.node.w = 10;
        this.node.h = 10;
        this.node.color = new sk.Color(255, 255, 255);
        this.node.addComponent('Sprite');
    }

    fire() {
        let bulletNode = sk.node('bullet', ['Bullet', 'Collider']);
        bulletNode.x = this.node.x;
        bulletNode.y = this.node.y;
        this.node.app.root.addNode(bulletNode);
    }


}