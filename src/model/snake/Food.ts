import Component from '@/model/core/Component';
import Event from '@/model/core/Event';
import sk from '@/model/core/sk';
import Collider from '../assets/script/Collider';

@sk.skclass
export default class Food extends Component {

    timeCount = 0;

    start() {
        this.node.w = 10;
        this.node.h = 10;

        this.node.x = 20; // Math.round(Math.random() * 500);
        this.node.y = 20; // Math.round(Math.random() * 500);

        this.node.color = new sk.Color(255, 255, 0);
        this.node.addComponent('Sprite');
    }

    update(dt: number) {


    }

    render(ctx: CanvasRenderingContext2D) {

    }


}