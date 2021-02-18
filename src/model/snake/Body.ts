import Component from '@/model/core/Component';
import Event from '@/model/core/Event';
import Node from '@/model/core/Node';
import sk from '@/model/core/sk';
import Vector from '@/model/core/Vector';
import Collider from '../assets/script/Collider';
import ICollider from '../assets/script/ICollider';
import Player from './Player';

@sk.skclass
export default class Body extends Component {


    speed = 100;///s

    frontNodeBody: Body = null;
    oldVector: Vector = new Vector(0, 0);

    distance: number = null;
    dx: number = 0;
    dy: number = 0;

    start() {
        this.node.w = 10;
        this.node.h = 10;
        this.node.color = new sk.Color(255, 255, 255);
        this.node.addComponent('Sprite');
    }

    update(dt: number) {
        // this.oldVector = new Vector(this.node.x, this.node.y);

        // if (this.frontNodeBody) {
        //     let frameDistance = dt * this.speed;
        //     this.dx = this.frontNodeBody.node.x - this.node.x;
        //     this.dy = this.frontNodeBody.node.y - this.node.y;
        //     this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        //     let f = frameDistance / this.distance;
        //     this.node.x += f * this.dx;
        //     this.node.y += f * this.dy;
        // }
    }



}