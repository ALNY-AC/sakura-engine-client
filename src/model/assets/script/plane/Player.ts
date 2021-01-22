import Component from '@/model/core/Component';
import Event from '@/model/core/Event';
import sk from '@/model/core/sk';
import Control from './Control';
import Plane from './plane';

@sk.skclass
export default class Player extends Component {

    start() {

        let control = <Control>this.node.getComponent('Control');
        let plane = <Plane>this.node.getComponent('Plane');
        control.on('32', () => {
            let c = Event.getCount(32);
            if (c == 1 || c % 10 == 0) {
                plane.fire();
            }
        })

    }

    update(dt: number) {



    }
}