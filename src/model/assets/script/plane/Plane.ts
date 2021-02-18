import Component from '@/model/core/Component';
import Event from '@/model/core/Event';
import sk from '@/model/core/sk';
import Collider from '../Collider';
import Bullet from './Bullet';

@sk.skclass
export default class Plane extends Component {

    //护盾
    shield: number = 100;
    max_shield: number = 100;
    //装甲
    armor: number = 100;
    max_armor: number = 100;
    //结构
    structure: number = 100;
    max_structure: number = 100;

    start() {
        this.node.w = 10;
        this.node.h = 10;
        this.node.color = new sk.Color(255, 255, 255);
        this.node.addComponent('Sprite');
    }

    render(ctx: CanvasRenderingContext2D) {

        ctx.fillStyle = new sk.Color(255, 0, 0).rgb;
        ctx.fillRect(this.node.x, this.node.y - 10, this.shield, 2);

        ctx.fillStyle = new sk.Color(0, 255, 0).rgb;
        ctx.fillRect(this.node.x, this.node.y - 7, this.armor, 2);

        ctx.fillStyle = new sk.Color(0, 0, 255).rgb;
        ctx.fillRect(this.node.x, this.node.y - 4, this.structure, 2);

        // ctx.strokeRect(this.node.wordx, this.node.wordy, this.node.w, this.node.h);
        // ctx.beginPath();
    }

    fire() {
        let bulletNode = sk.node('bullet', ['Bullet', 'Collider']);
        bulletNode.x = this.node.x;
        bulletNode.y = this.node.y;
        let bullet = <Bullet>bulletNode.getComponent("Bullet")
        bullet.plane = this;
        this.node.app.root.addNode(bulletNode);
    }

    /**
 * 当碰撞产生的时候调用
 * @param  {Collider} other 产生碰撞的另一个碰撞组件
 * @param  {Collider} self  产生碰撞的自身的碰撞组件
 */
    onCollisionEnter(other: Collider, self: Collider): void {
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