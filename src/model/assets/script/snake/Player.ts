import Component from '@/model/core/Component';
import Event from '@/model/core/Event';
import sk from '@/model/core/sk';
import Vector from '@/model/core/Vector';
import Collider from '../Collider';
import ICollider from '../ICollider';
import Body from './Body';

@sk.skclass
export default class Player extends Component implements ICollider {


    speed = 100;
    distance: number = 0;
    dx: number = 0;
    dy: number = 0;

    newVector: Vector = new Vector(0, 0);
    bodys: Body[] = [];

    start() {
        this.bodys.push(<Body>this.getComponent('Body'));
    }

    update(dt: number) {

        let body = <Body>this.getComponent("Body");
        body.oldVector = new Vector(this.node.x, this.node.y);


        if (Event.input(87)) {
            // 上
            this.newVector = new Vector(0, -this.speed);
        }
        if (Event.input(83)) {
            // 下
            this.newVector = new Vector(0, this.speed);
        }
        if (Event.input(65)) {
            // 左
            this.newVector = new Vector(-this.speed, 0);
        }
        if (Event.input(68)) {
            //右
            this.newVector = new Vector(this.speed, 0);
        }

        // let frameDistance = dt * this.speed;
        // let f = frameDistance / this.distance;
        this.node.x += this.newVector.x * dt;
        this.node.y += this.newVector.y * dt;

        if (this.node.x > 500) {
            this.node.x = 0;
        }

        if (this.node.x < 0) {
            this.node.x = 500;
        }

        if (this.node.y > 500) {
            this.node.y = 0;
        }

        if (this.node.y < 0) {
            this.node.y = 500;
        }

    }

    onCollisionEnter(other: Collider, self: Collider): void {

        if (other.node.name == 'food') {
            let bodyNode = sk.node('body', ["Body", "Collider"]);
            let body = <Body>bodyNode.getComponent("Body");
            body.frontNodeBody = this.bodys[this.bodys.length - 1]
            this.node.app.root.addNode(bodyNode);
            this.bodys.push(body);
            console.warn(this.bodys.length);
        }


    }
    onCollisionStay(other: Collider, self: Collider): void {
        // console.warn(other.node.name);
        // console.warn(self.node.name);
    }
    onCollisionExit(other: Collider, self: Collider): void {
    }

}