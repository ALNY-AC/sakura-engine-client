import Component from '../../core/Component'

export default class Test extends Component {
    start() {
        this.node.size.w = 30;
        this.node.size.h = 30;

        this.node.size.w = Math.random() * 100;
        this.node.size.h = Math.random() * 100;
        this.node.position.x = Math.random() * 100;
        this.node.position.y = Math.random() * 100;
        this.node.color.r = parseInt((Math.random() * 255).toFixed(0));
        this.node.color.g = parseInt((Math.random() * 255).toFixed(0));
        this.node.color.b = parseInt((Math.random() * 255).toFixed(0));

    }
    update(dt: number) {

        // let x = this.node.position.x + 300 * dt;
        // let y = this.node.position.y + 300 * dt;

        // if (x > 400) {
        //     x = 0;
        // }
        // if (y >= 400) {
        //     y = 0;
        // }

        // this.node.position.x = x;
        // this.node.position.y = y;
    }
    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.node.color.rgb

        ctx.fillRect(
            this.node.position.x,
            this.node.position.y,
            this.node.size.w,
            this.node.size.h
        );
        ctx.beginPath();


    }
}