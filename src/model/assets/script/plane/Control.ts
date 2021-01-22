import Component from '@/model/core/Component';
import Event from '@/model/core/Event';
import sk from '@/model/core/sk';

@sk.skclass
export default class Control extends Component {

    speed = 50;
    events: any = [];

    update(dt: number) {

        if (Event.input(87)) {
            this.node.y -= this.speed * dt;
        }
        if (Event.input(83)) {
            this.node.y += this.speed * dt;
        }
        if (Event.input(65)) {
            this.node.x -= this.speed * dt;
        }
        if (Event.input(68)) {
            this.node.x += this.speed * dt;
        }

        // this.events.
        let keys = Event.getKeys();
        keys.forEach(k => {
            this.events.filter((el: any) => el.key == k).forEach((el: any) => el.callback());
        })
    }

    on(key: string, callback: Function) {
        this.events.push({ key: key, callback: callback });
    }

}