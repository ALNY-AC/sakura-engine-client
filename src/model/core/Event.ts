export default class Event {
    static downCount = 0;
    static keyList: any = {};
    static keyCount: any = {};
    static keyChars: any = {};
    static mouse = { x: 0, y: 0, down: false, downCount: 0, move: false, };
    static oldMouse = { x: 0, y: 0, down: false, downCount: 0, move: false, };
    static key: string;
    static keyCode: number;
    static keydown: Boolean;
    static $el: HTMLCanvasElement;
    static init(elId: string) {
        let $el = <HTMLCanvasElement>document.getElementById(elId);
        for (let i = 0; i < 256; i++) {
            Event.keyList[i] = false;
            Event.keyCount[i] = 0;
        }
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            Event.keyList[e.keyCode] = true;
            Event.key = e.key;
            Event.keyCode = e.keyCode;
            Event.keyChars[e.key] = true;
            // e.preventDefault();

            Event.events.filter(el => el.name == 'keydown').forEach((el) => el.callback(e));
        });
        window.addEventListener('keyup', (e) => {
            Event.keyList[e.keyCode] = false;
            Event.keyChars[e.key] = false;
            // e.preventDefault();
            Event.events.filter(el => el.name == 'keyup').forEach((el) => el.callback(e));
        });
        $el.addEventListener('mousemove', (e) => {
            Event.mouse.x = e.offsetX;
            Event.mouse.y = e.offsetY;
            this.mouse.move = true;

            Event.events.filter(el => el.name == 'mousemove').forEach((el) => el.callback(e));
            e.preventDefault();
        });
        $el.addEventListener('mousewheel', (e) => {
            Event.events.filter(el => el.name == 'mousewheel').forEach((el) => el.callback(e));
            e.preventDefault();
        });
        $el.addEventListener('mousedown', (e: MouseEvent) => {
            Event.mouse.down = true;
            Event.events.filter(el => el.name == 'mousedown').forEach((el) => el.callback(e));
            e.preventDefault();
        });

        $el.addEventListener('mouseup', (e: MouseEvent) => {
            Event.mouse.down = false;
            Event.events.filter(el => el.name == 'mouseup').forEach((el) => el.callback(e));
            e.preventDefault();
        });
        Event.$el = $el;
    }

    static events: any[] = [];
    static on(name: string, callback: Function) {
        Event.events.push({ name: name, callback: callback });
    }

    static off(name: string, callback: Function) {
    }

    static loop() {
        // 


        let keyList = Object.keys(this.keyList);
        keyList.map(el => Event.keyList[el]);
        keyList.forEach(key => {
            if (Event.keyList[key]) {
                Event.keyCount[key]++;
            } else {
                Event.keyCount[key] = 0;
            }
        });

        let list = keyList.filter(el => Event.keyList[el]);
        if (list.length > 0) {
            Event.keydown = true;
            Event.downCount++;
        } else {
            Event.keydown = false;
            Event.downCount = 0;
        }
        if (Event.mouse.down) {
            Event.mouse.downCount++;
        } else {
            Event.mouse.downCount = 0;
        }
    }
    static input(key: number | string): Boolean {
        if (typeof key == 'string') {
            return !!Event.keyChars[key];
        } else {
            return !!Event.keyList[key];
        }

    }
    static getKeys(): Array<string> {
        let list = Object.keys(Event.keyList).filter(k => Event.keyList[k]);
        return list;
    }
    static getCount(key: number): number {
        return Event.keyCount[key];
    }
}