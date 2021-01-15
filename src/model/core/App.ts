import FPS from "./FPS";
import Node from "./Node";

export default class App {


    w: number = 0
    h: number = 0
    ctx: CanvasRenderingContext2D;
    frame: number = 0;

    nodes: Node[] = []

    fps: FPS = new FPS();


    setSize(w: number, h: number) {
        this.w = w;
        this.h = h;
    }
    initCanvas(canvasId: string): CanvasRenderingContext2D {
        let scene: HTMLCanvasElement = <HTMLCanvasElement>(document.getElementById(canvasId));
        this.ctx = <CanvasRenderingContext2D>scene.getContext('2d');
        return this.ctx;
    }

    runThread() {
        let oldtime = new Date().valueOf();
        let oldtime2 = new Date().valueOf();
        let frame = 0;
        setTimeout(() => {
            setInterval(() => {
                frame++;
                if (new Date().valueOf() >= oldtime + 1000) {
                    oldtime = new Date().valueOf();
                    this.frame = frame;
                    frame = 0;
                }


                this.fps.makeFPS();
                this.nodes.forEach(node => {
                    node.update((new Date().valueOf() - oldtime2) / 1000);
                })

                oldtime2 = new Date().valueOf();

                this.render(this.ctx);
            }, 16);

        }, 30);
    }

    run(canvasId: string) {
        this.initCanvas(canvasId)
        this.runThread();
    }
    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.clearRect(0, 0, this.w, this.h);
        ctx.fillRect(0, 0, this.w, this.h);
        ctx.beginPath();

        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "14px normal";
        ctx.fillText("FPS " + parseInt(this.fps.nowFPS.toFixed(0)), 10, 30);


        this.nodes.forEach(node => {
            let fillStyle = ctx.fillStyle;
            let strokeStyle = ctx.strokeStyle;
            ctx.beginPath();
            node.render(ctx);
            ctx.beginPath();
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
        })
    }
}