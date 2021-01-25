// 碰撞检测
import Color from '@/model/core/Color';
import sk from '@/model/core/sk';
import Component from '../../core/Component';
import CollisionManager from './CollisionManager';
// getCollisionManager




@sk.skclass
export default class Collider extends Component {

    /**碰撞次数 */
    // collisionCount: number = 0;
    /**
     * 当前已发生碰撞的对象
     */
    activeColliders: Collider[] = [];

    start() {
        CollisionManager.add(this);
    }

    update(dt: number) {

    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = new sk.Color(255, 0, 0).rgb;
        ctx.strokeRect(this.node.wordx, this.node.wordy, this.node.w, this.node.h);
        ctx.beginPath();
    }


}