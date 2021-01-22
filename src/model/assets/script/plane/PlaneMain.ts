import Component from '@/model/core/Component';
import Event from '@/model/core/Event';
import sk from '@/model/core/sk';
import Control from './Control';
import Plane from './plane';

@sk.skclass
export default class PlaneMain extends Component {

    timeCount = 0;

    start() {
        let playerNode = sk.node('playerNode', ['Plane', 'Control', 'Player', 'Collider']);
        playerNode.x = 500 / 2;
        playerNode.y = 500 * 0.8;
        this.node.addNode(playerNode);
    }


    update(dt: number) {

        this.timeCount = parseFloat((this.timeCount + dt).toFixed(3));


        if (this.timeCount >= 0.2) {
            this.timeCount = 0;
            let npcNode = sk.node('playerNode', ['Plane', 'Npc']);
            this.node.addNode(npcNode);
        }

    }

    render(ctx: CanvasRenderingContext2D) {
        // ctx.strokeStyle = new sk.Color(255, 255, 255).rgb;
        // ctx.strokeRect(500 / 2, 0, 0.1, 500);
        // ctx.strokeRect(0, 500 / 2, 500, 0.1);
        // ctx.beginPath();
    }

}