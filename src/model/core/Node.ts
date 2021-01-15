import Color from "./Color"
import Component from "./Component"
import Player from "../script/Player"
import Sprite from "../script/Sprite"

let compList: any = {
    "Player": Player,
    "Sprite": Sprite,
};

interface IPosition {
    x: number
    y: number
}

interface Size {
    w: number
    h: number
}


export default class Node {
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

    components: Component[] = [];
    nodes: Node[] = [];

    addComponent(className: any | string) {
        let comp: Component;

        if (typeof className == 'string') {
            comp = new compList[className]();
            comp.name = className
        } else {
            comp = <Component>new className();
            comp.name = className.prototype.constructor.name;
        }

        if (!comp.name) {
        }
        comp.node = this;
        comp.start();
        this.components.push(comp)
    }
    queryComponent(name: string | Component | any) {
        if (typeof name == 'string') {
            return this.components.find(comp => comp.name == name);
        } else {
            return this.components.find(comp => comp instanceof name);
        }
    }
    start() { }
    update(dt: number) {

        this.nodes.forEach(comp => {
            comp.update(dt);
        })
        this.components.forEach(comp => {
            comp.update(dt);
        })
    }
    render(ctx: CanvasRenderingContext2D) {
        this.components.forEach(comp => {
            comp.render(ctx);
        })
    }
}