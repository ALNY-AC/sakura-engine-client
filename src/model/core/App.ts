import CollisionManager from "../assets/script/CollisionManager";
import Event from "./Event";
import FPS from "./FPS";
import Node from "./Node";
import Scene from "./Scene";
import { Timer } from "./Timer";

export default class App {

    constructor() {
        this.init();
    }
    init() {
        CollisionManager.colliders = [];
        CollisionManager.collidersing = [];
    }
    w: number = 0
    h: number = 0
    ctx: CanvasRenderingContext2D;
    frame: number = 0;
    fps: FPS = new FPS();
    oldtime = new Date().valueOf();
    dt = 0;
    scene: HTMLCanvasElement = null;
    canvasId: string;
    timer: Timer = new Timer();

    rootNode: Node;
    get root(): Node {
        return this.rootNode;
    }

    setSize(w: number, h: number) {
        this.w = w;
        this.h = h;
    }
    setId(canvasId: string) {
        this.canvasId = canvasId;
        this.initCanvas(canvasId);
        this.initEvent();
    }
    initCanvas(canvasId: string): CanvasRenderingContext2D {
        this.scene = <HTMLCanvasElement>(document.getElementById(canvasId));
        this.ctx = <CanvasRenderingContext2D>this.scene.getContext('2d');
        return this.ctx;
    }
    loadAssets() {
        let requireComponent = require.context("@/model/assets", true, /\.ts$/);
        requireComponent.keys().forEach(fileName => {
            requireComponent(fileName);
        })
    }
    runThread() {
        this.timer.nodes = [this.rootNode];
        this.timer.ctx = this.ctx;
        this.timer.app = this;
        this.timer.run();
    }
    initEvent() {
        Event.init(this.canvasId);
    }
    run() {
        this.rootNode = new Node();
        this.rootNode.app = this;
        this.rootNode.w = this.w;
        this.rootNode.h = this.h;
        this.runThread();
    }

}