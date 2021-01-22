import Collider from "./Collider";
import Node from "../../core/Node";

export default class CollisionManager {
    /**
     * 所有的collider，所有的对撞机
     */
    static colliders: Collider[] = [];

    static add(collider: Collider) {
        CollisionManager.colliders.push(collider);
    }



    static update() {
        let colliders = CollisionManager.colliders;
        colliders = colliders.filter(el => !el.node.isDestroy);

        CollisionManager.next(colliders, 500, 500);

    }

    static next(colliders: Collider[], w: number, h: number) {

        let dw = w / 2;
        let dh = h / 2;

        // 第一象限
        let a = colliders.filter(c => {
            if (
                (c.node.x > dw && c.node.x < w) &&
                (c.node.y < h / 2 && c.node.y > 0)
            ) {
                console.warn('象限1');
                return true;
            } else {
                return false;
            }
        })


    }
}