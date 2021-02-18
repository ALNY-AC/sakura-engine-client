import Component from '@/model/core/Component';
import Event from '@/model/core/Event';
import sk from '@/model/core/sk';

@sk.skclass
export default class SnakeMain extends Component {

    timeCount = 0;

    start() {
        let snakeNode = sk.node('snakeHeader', ["Body", 'Player', "Collider"]);
        this.node.app.root.addNode(snakeNode);

        let foodNode = sk.node('food', ['Food', "Collider"]);
        this.node.app.root.addNode(foodNode);
    }

    update(dt: number) {


    }

    render(ctx: CanvasRenderingContext2D) {

    }

}