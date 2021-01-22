import Color from '@/model/core/Color';
import Event from '@/model/core/Event';
import sk from '@/model/core/sk';
import Component from '../../core/Component'

@sk.skclass
export default class Player extends Component {


    speed = 50;


    start() {


        this.node.on('keydown', (e: any) => {
        });
        this.node.x = 100;
        this.node.y = 100;
    }

    update(dt: number) {

        if (Event.input(87)) {
            this.node.y -= this.speed * dt;
        }
        if (Event.input(83)) {
            this.node.y += this.speed * dt;
        }
        if (Event.input(65)) {
            this.node.x -= this.speed * dt;
        }
        if (Event.input(68)) {
            this.node.x += this.speed * dt;
        }

    }
}