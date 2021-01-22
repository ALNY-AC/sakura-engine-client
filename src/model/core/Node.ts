import App from "./App";
import Color from "./Color"
import Component from "./Component"
import Event from "./Event";
import sk from "./sk";

interface IPosition {
    x: number
    y: number
}

interface Size {
    w: number
    h: number
}


export default class Node {
    id: number = Math.random();

    name: string = "";
    /**定位s */
    position: IPosition = { x: 0.00, y: 0.00 }
    /**大小 */
    size: Size = { w: 0.00, h: 0.00 }
    /**颜色 */
    color: Color = new Color()
    /**透明度 */
    opacity: number = 1
    /**旋转 */
    rotation: number = 0;
    /**激活状态 */
    active: boolean = true;

    components: Component[] = [];
    nodes: Node[] = [];
    app: App;
    parent: Node;

    isDestroy: boolean = false;

    get x(): number {
        return this.position.x;
    }
    set x(x: number) {
        this.position.x = x;
    }

    get y(): number {
        return this.position.y;
    }
    set y(y: number) {
        this.position.y = y;
    }

    get wordx(): number {
        if (this.parent) {
            return this.parent.wordx + this.x;
        } else {
            return this.x;
        }
    }

    get wordy(): number {
        if (this.parent) {
            return this.parent.wordy + this.y;
        } else {
            return this.y;
        }
    }

    get w(): number {
        return this.size.w;
    }
    set w(w: number) {
        this.size.w = w;
    }

    get h(): number {
        return this.size.h;
    }
    set h(h: number) {
        this.size.h = h;
    }

    addComponent(className: any | string): Component {
        let comp: Component;
        if (typeof className == 'string') {
            comp = new sk.script[className]();
            comp.name = className
        } else {
            comp = <Component>new className();
            comp.name = className.prototype.constructor.name;
        }
        comp.node = this;
        comp.start();
        this.components.push(comp);
        return comp;
    }
    getComponent(name: string | Component | any): Component {
        if (typeof name == 'string') {
            return this.components.find(comp => comp.name == name);
        } else {
            return this.components.find(comp => comp instanceof name);
        }
    }
    removeComponentf(name: string | Component | any) {
        if (typeof name == 'string') {
            this.components = this.components.filter(comp => comp.name != name);
        } else {
            this.components = this.components.filter(comp => !(comp instanceof name));
        }
    }

    addNode(node: Node) {
        node.app = this.app;
        node.parent = this;
        this.nodes.push(node);
        node.start();
    }
    findNode(name: string): Node[] {
        return this.nodes.filter(node => node.name == name);
    }
    removeNode(targetNode: Node) {
        this.nodes = this.nodes.filter(node => node.id != targetNode.id);
    }
    start() { }

    // events: any = [];
    on(name: string, fun: Function) {
        // this.events.push({ name: name, fun: fun });
        Event.on(name, (e: any) => {
            if (name.includes('key')) {
                fun(e);
            } else {

                let x = Event.mouse.x;
                let y = Event.mouse.y;
                if (
                    (x > this.x && x < this.y + this.w) &&
                    (y > this.y && y < this.y + this.h)
                ) {
                    // console.warn(Event.mouse.move);
                    // 判断，确实是在元素内发生的
                    fun(e);
                }
            }

        });
    }
    off(name: string, fun: Function) {

    }
    destroy() {
        this.isDestroy = true
    }
}