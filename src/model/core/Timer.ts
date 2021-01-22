import App from "./App";
import Event from "./Event";
import FPS from "./FPS";
import Node from "./Node";

/**
 * 计时器
 */
export class Timer {

    /**
     * 是否循环逻辑帧
     */
    isLogic: boolean = true;
    /**
     * 是否循环渲染帧
     */
    isRender: boolean = true;
    fps: FPS = new FPS();
    dt: number = 0;
    oldtime: number = new Date().valueOf();

    nodes: Node[] = [];
    ctx: CanvasRenderingContext2D;
    app: App;

    lodingDestroy: Node[] = [];

    run() {
        setTimeout(() => {
            setInterval(() => {
                Event.loop();
                let nowtime = new Date().valueOf();
                this.dt = (nowtime - this.oldtime) / 1000;

                this.oldtime = nowtime;
                this.fps.makeFPS();

                if (this.isLogic) {
                    this.update(this.dt, this.nodes);
                }

                this.restartCanvas(this.ctx);
                if (this.isRender) {
                    this.render(this.ctx, this.nodes);
                }
                this.renderDebug(this.ctx);
                this.destroyNode();

            }, 16)
        }, 30);
    }


    restartCanvas(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.clearRect(0, 0, this.app.w, this.app.h);
        ctx.fillRect(0, 0, this.app.w, this.app.h);
        ctx.beginPath();
    }

    renderDebug(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "12px normal";
        ctx.fillText("FPS " + parseInt(this.fps.nowFPS.toFixed(0)), 10, 30);
        ctx.fillText("DT " + this.dt, 10, 42);
        ctx.fillText("keys " + Event.getKeys(), 10, 54);
    }

    update(dt: number = 0, nodes: Node[]) {
        nodes.forEach(node => {
            if (node.isDestroy) this.lodingDestroy.push(node);
            if (!node.active) return;
            node.components.forEach(comp => {
                comp.update(this.dt);
            });
            if (node.nodes.length > 0) {
                this.update(dt, node.nodes);
            }
        });
    }

    render(ctx: CanvasRenderingContext2D, nodes: Node[]) {


        nodes.forEach(node => {
            if (!node.active) return;
            ctx.save();

            ctx.fillStyle = node.color.rgb;
            ctx.strokeStyle = node.color.rgb;
            let x = node.x + (node.w / 2);//获得中心点
            let y = node.y + (node.h / 2);//获得中心点
            ctx.translate(x, y);
            ctx.rotate(Math.PI / 180 * node.rotation);
            ctx.translate(-x, -y);
            node.components.forEach(comp => {
                comp.render(ctx);
            });
            ctx.restore();

            if (node.nodes.length > 0) {
                this.render(ctx, node.nodes);
            }
        });
    }

    destroyNode() {
        // throw new Error("Method not implemented.");
        this.lodingDestroy.forEach((node) => {
            if (node.parent) {
                node.parent.removeNode(node);
            }
            node.parent = null;
        });
        this.lodingDestroy = [];
    }

}