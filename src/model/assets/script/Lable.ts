import sk from '@/model/core/sk';
import Component from '../../core/Component'

@sk.skclass
export default class Label extends Component {

    text: string = '';
    fontSize: number = 12;

    start() {

    }

    update(dt: number) {

    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.font = `${this.fontSize} px`;
        ctx.fillText(this.text, this.node.x, this.node.y);
    }


}