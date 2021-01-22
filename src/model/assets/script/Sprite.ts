import Color from '../../core/Color';
import Component from '../../core/Component'
import sk from '../../core/sk';

@sk.skclass
export default class Sprite extends Component {
    start() {
        // this.node.size.w = 20;
        // this.node.size.h = 20;
        // this.node.color = new Color(255, 255, 255);
    }
    update(dt: number) {
    }
    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.node.color.rgb
        ctx.fillRect(
            this.node.wordx,
            this.node.wordy,
            this.node.size.w,
            this.node.size.h
        );
    }
}