import Component from '@/model/core/Component';
import Event from '@/model/core/Event';
import Node from '@/model/core/Node';
import sk from '@/model/core/sk';
import Vector from '@/model/core/Vector';
import Collider from '../Collider';
import ICollider from '../ICollider';
import Player from './Player';

@sk.skclass
export default class Body extends Component {



    frontNodeBody: Body = null;
    oldVector: Vector = new Vector(0, 0);

    start() {
        this.node.w = 10;
        this.node.h = 10;
        this.node.color = new sk.Color(255, 255, 255);
        this.node.addComponent('Sprite');
    }

    update(dt: number) {
        if (this.frontNodeBody) {
            this.oldVector = new Vector(this.node.x, this.node.y);
            this.node.x = this.frontNodeBody.oldVector.x;
            this.node.y = this.frontNodeBody.oldVector.y;
        }
    }



}