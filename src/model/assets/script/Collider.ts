// 碰撞检测
import Color from '@/model/core/Color';
import sk from '@/model/core/sk';
import Component from '../../core/Component';
import CollisionManager from './CollisionManager';
// getCollisionManager


@sk.skclass
export default class Collider extends Component {

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