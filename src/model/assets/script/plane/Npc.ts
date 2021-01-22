import Component from '@/model/core/Component';
import Event from '@/model/core/Event';
import sk from '@/model/core/sk';
import Label from '../Lable';
import Control from './Control';
import Plane from './plane';

@sk.skclass
export default class Npc extends Component {


    speed = 100;//500像素/s
    timeCount = 0;
    label: Label;
    frame: number = 0;
    distance: number = null;

    targetPosition = {
        x: 0,
        y: 0
    };
    dx: number = 0;
    dy: number = 0;

    start() {

        this.node.w = 15;
        this.node.h = 15;

        let control = <Control>this.node.getComponent('Control');
        let plane = <Plane>this.node.getComponent('Plane');

        let x = Math.round(Math.random() * 500);
        let y = 0;

        this.node.x = x;
        this.node.y = y;

        this.targetPosition.x = Math.round(Math.random() * 500);
        this.targetPosition.y = 500;

    }

    update(dt: number) {



        let frameDistance = dt * this.speed;
        if (this.distance === null) {
            this.dx = this.targetPosition.x - this.node.x;
            this.dy = this.targetPosition.y - this.node.y;
            this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        }
        let f = frameDistance / this.distance;
        this.node.x += f * this.dx;
        this.node.y += f * this.dy;
        // this.label.text = `time:${this.timeCount},x:${this.node.x},y:${this.node.y}`;
        this.timeCount += parseInt((dt * 1000).toFixed(0));

        if (this.node.y > 500) {
            this.node.destroy();
        }

        // if (this.timeCount >= 2000) {
        // }

    }
}