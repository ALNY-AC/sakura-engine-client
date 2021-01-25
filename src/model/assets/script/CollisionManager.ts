import Collider from "./Collider";
import Node from "../../core/Node";
import Component from "@/model/core/Component";
import ICollider from "./ICollider";

export default class CollisionManager {
    /**
     * 所有的collider，所有的对撞机
     */
    static colliders: Collider[] = [];
    /**当前已经碰撞的对撞机 */
    static collidersing: Collider[] = [];

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

        let quadrants: Collider[][] = new Array(4).fill('').map(() => []);



        // 第一象限
        colliders.forEach(c => {
            if (
                (c.node.x > dw && c.node.x < w) &&
                (c.node.y < dh && c.node.y > 0)
            ) {
                // 象限1
                // console.warn('象限1');
                quadrants[0].push(c);
            }

            if (
                (c.node.x > 0 && c.node.x < dw) &&
                (c.node.y < dh && c.node.y > 0)
            ) {
                // 象限2
                // console.warn('象限2');
                quadrants[1].push(c);
            }


            if (
                (c.node.x > 0 && c.node.x < dw) &&
                (c.node.y > dh && c.node.y < h)
            ) {
                // 象限3
                // console.warn('象限3');
                quadrants[2].push(c);
            }


            if (
                (c.node.x > dw && c.node.x < w) &&
                (c.node.y > dh && c.node.y < h)
            ) {
                // 象限4
                // console.warn('象限4');
                quadrants[3].push(c);
            }
        });

        quadrants.forEach(csList => {

            csList.forEach(self => {

                let top1 = self.node.wordy;
                let left1 = self.node.wordx;
                let right1 = self.node.wordx + self.node.w;
                let bottom1 = self.node.wordy + self.node.h;

                csList.forEach(other => {
                    if (other.node.id == self.node.id) {
                        return;
                    }

                    let top2 = other.node.wordy;
                    let left2 = other.node.wordx;
                    let right2 = other.node.wordx + other.node.w;
                    let bottom2 = other.node.wordy + other.node.h;

                    if (bottom1 < top2 || left1 > right2 || top1 > bottom2 || right1 < left2) {// 表示没碰上
                        let isActive = self.activeColliders.some(el => el.node.id == other.node.id);
                        if (isActive) {
                            //存在，应该取消碰撞
                            self.node.components.forEach((comp: any) => {
                                if (typeof comp.onCollisionExit == 'function') {
                                    comp.onCollisionExit(other, self);
                                }
                            });
                            self.activeColliders = self.activeColliders.filter(el => el.node.id != other.node.id);
                        }
                    } else {
                        // 是否已存在，如果不存在，就代表第一次碰撞，如果存在，就是多次碰撞
                        let isActive = self.activeColliders.some(el => el.node.id == other.node.id);


                        if (!isActive) {
                            self.activeColliders.push(other);
                        }
                        self.node.components.forEach((comp: any) => {
                            if (typeof comp.onCollisionEnter == 'function') {
                                // 如果isActive为true，就代表已经存在，不能触发此事件，如果isActive为false，就代表没存在，可以触发
                                if (!isActive) {
                                    comp.onCollisionEnter(other, self);
                                }
                            }
                            if (typeof comp.onCollisionStay == 'function') {
                                comp.onCollisionStay(other, self);
                            }
                        });

                    }
                });
            });
        })
    }
}