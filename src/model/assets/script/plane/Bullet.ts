import Component from '@/model/core/Component';
import Event from '@/model/core/Event';
import sk from '@/model/core/sk';
import Collider from '../Collider';
import Label from '../Lable';
import Plane from './Plane';

@sk.skclass
export default class Bullet extends Component {


    speed = 500;///s
    dps: number = 100;
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

    plane: Plane = null;

    start() {
        this.node.w = 5;
        this.node.h = 5;
        this.node.color = new sk.Color(255, 255, 255);
        this.node.addComponent('Sprite');
        this.label = <Label>this.node.addComponent('Label');

        let deviationX = Math.round(Math.random() * 20);
        let deviationY = Math.round(Math.random() * 20);

        if (Math.round(Math.random() * 1) == 0) {
            deviationX = -deviationX;
        } else {
            deviationY = -deviationY;
        }
        this.targetPosition.x = Event.mouse.x //+ deviationX;
        this.targetPosition.y = Event.mouse.y //+ deviationY;
    }

    update(dt: number) {
        if (this.distance === null) {
            this.dx = this.targetPosition.x - this.node.x;
            this.dy = this.targetPosition.y - this.node.y;
            this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        }
        let frameDistance = dt * this.speed;
        let f = frameDistance / this.distance;
        this.node.x += f * this.dx;
        this.node.y += f * this.dy;
        // this.label.text = `time:${this.timeCount},x:${this.node.x},y:${this.node.y}`;
        this.timeCount += parseInt((dt * 1000).toFixed(0));

        if (this.timeCount >= 2000) {
            this.node.destroy();
        }
    }


    /**
 * 当碰撞产生的时候调用
 * @param  {Collider} other 产生碰撞的另一个碰撞组件
 * @param  {Collider} self  产生碰撞的自身的碰撞组件
 */
    onCollisionEnter(other: Collider, self: Collider): void {
        if (other.node.id == this.plane.node.id) {
            return;
        }
        if (other.node.name == 'Plane') {
            // other.node.destroy();
            let plane = <Plane>other.node.getComponent("Plane");
            if (plane.shield > 0) {
                plane.shield -= this.dps;
                return;
            }
            if (plane.armor > 0) {
                plane.armor -= this.dps;
                return;
            }
            if (plane.structure > 0) {
                plane.structure -= this.dps;
                return;
            }
            if (plane.structure <= 0) {
                other.node.destroy();
            }
        }
    }

    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
    */
    onCollisionStay(other: Collider, self: Collider): void {

    }

    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionExit(other: Collider, self: Collider): void {
    }


}