
<template>
  <div id="home">
    <div class="nav">
      <div class="nav-item">users:{{users.length}}</div>
      <div class="nav-item">{{Math.abs(pings[1] - pings[0])}}ms</div>
      <div class="nav-item">{{frame}}fps</div>
      <div class="nav-item">
        server:
        <template>
          <span v-if="!socket" class="state-icon error"></span>
          <template v-else>
            <span v-if="socket.connected" class="state-icon success"></span>
            <span v-if="!socket.connected" class="state-icon warn"></span>
          </template>
        </template>

        <template>
          <span v-if="!socketDown" class="state-icon error"></span>
          <template v-else>
            <span v-if="socketDown.connected" class="state-icon success"></span>
            <span v-if="!socketDown.connected" class="state-icon warn"></span>
          </template>
        </template>
      </div>
    </div>
    <!-- <router-link to="/user">go user</router-link> -->
    <div class="view-panel">
      <canvas :width="w" :height="w" id="scene"></canvas>
    </div>
    <div></div>
    <!-- <div>keylist:{{keylist}}</div> -->
    <div>
      <div class="user-color" :style="{backgroundColor:`rgb(${rgb.join(',')})`}"></div>
    </div>
    <p>
      <button @click="open()">open</button>
    </p>
    <!-- <div class="msg-box">
      <pre>{{serverUser}}</pre>
      <pre>{{newmsg}}</pre>
    </div>-->
    <canvas id="qrcode"></canvas>
  </div>
</template>


<script lang="ts">
import qrcode from "qrcode";
import { Component, Vue } from "vue-property-decorator";
import Event from "../model/core/Event";
import { io, Socket } from 'socket.io-client';

@Component({

})
export default class Home extends Vue {
  msg: any = "";
  newmsg: string = "";
  id: number = parseInt((Math.random() * 1000).toFixed(0));
  users: [] = [];

  ctx!: CanvasRenderingContext2D;
  pings: number[] = [0, 0];

  rgb: number[] = [
    parseInt((Math.random() * 255).toFixed(0)),
    parseInt((Math.random() * 255).toFixed(0)),
    parseInt((Math.random() * 255).toFixed(0)),
  ]
  frame: number = 0;
  keylist: Array<string> = [];

  get w(): number {
    return 200;
    // return 
  }

  user: any = {};
  userold: any = {};

  socket: Socket = null;
  socketDown: Socket = null;

  get serverUser(): any {
    return this.users.filter((el: any) => el.id == this.id);
  }

  mounted() {
    this.user = {
      id: this.id,
      rgb: this.rgb,
      keylist: [],
      keyCount: {},
      mouse: {},
      zd: [],
    }
    // this.open();
    this.initScene();
    this.initEvent();
    this.initQrcode();
  }

  renderUser() {
    let ctx = this.ctx;

    Event.loop();

    this.user.mouse = Event.mouse;

    this.user.keylist = Event.getKeys();

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.clearRect(0, 0, this.w, this.w);
    ctx.fillRect(0, 0, this.w, this.w);
    ctx.beginPath();

    this.users.forEach((user: any) => {
      let rgb = user.rgb;
      ctx.fillStyle = `rgb(${rgb.join(',')})`;
      ctx.arc(user.x, user.y, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();


      if (user.zd) {
        user.zd.forEach((zd: any) => {
          ctx.arc(zd[0], zd[1], 3, 0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
        });

      }


    });
  }
  async initScene() {
    await this.$nextTick();
    let scene: HTMLCanvasElement = <HTMLCanvasElement>(document.getElementById("scene"));
    this.ctx = <CanvasRenderingContext2D>scene.getContext('2d');
    let ctx = this.ctx;

    let oldtime = new Date().valueOf();
    let frame = 0;


    setTimeout(() => {
      setInterval(() => {
        frame++;
        if (new Date().valueOf() >= oldtime + 1000) {
          oldtime = new Date().valueOf();
          this.frame = frame;
          frame = 0;
        }

        this.renderUser();
      }, 0);

    }, 30);


  }
  initQrcode() {
    let canvas = document.getElementById("qrcode");
    qrcode.toCanvas(canvas, window.location.href, {
      width: 200,
    });
  }
  async initEvent() {

    await this.$nextTick();
    Event.init('scene');
    window.addEventListener('touchstart', () => {
      location.reload();
    })
  }
  open() {

    try {

      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }

      if (this.socketDown) {
        this.socketDown.close();
        this.socketDown = null;
      }

      let socket = io('ws://192.168.0.6:22211', { transports: ['websocket'], });
      let socketDown = io('ws://192.168.0.6:22200', { transports: ['websocket'], });

      // let socket = io('ws://47.103.96.190:22211', { transports: ['websocket'] });
      // let socketDown = io('ws://47.103.96.190:22200', { transports: ['websocket'] });

      // let socket = io('ws://47.100.218.109:22211', { transports: ['websocket'] });
      // let socketDown = io('ws://47.100.218.109:22200', { transports: ['websocket'] });

      // 

      // let socket = io('ws://8.133.181.174:22211', { transports: ['websocket'], });
      // let socketDown = io('ws://8.133.181.174:22200', { transports: ['websocket'], });



      this.socket = socket;
      this.socketDown = socketDown;

      socket.on("connect", () => {
        socket.emit('create user', this.user);
      });

      socket.on('create success', (data: any) => {
        // // 循环发送数据
        setInterval(() => {
          if (JSON.stringify(this.user) != JSON.stringify(this.userold)) {
            socket.emit('sync user', this.user);
          }
          this.userold = JSON.parse(JSON.stringify(this.user));
          this.pings[0] = new Date().valueOf();
        }, 0);
      });


      socketDown.on('connect', () => {

        socketDown.emit('link user', { id: this.id });
      })

      socketDown.on('sync all', (data: any) => {
        this.newmsg = data;
        this.users = data;
        this.pings[1] = new Date().valueOf();
      });


      socket.on('disconnect', () => {
        socket.close();
        socketDown.close();
      });

      socketDown.on('disconnect', () => {
        socket.close();
        socketDown.close();
      });
    } catch (error) {
      console.error(error);
    }

  }
  beforeDestroy() {
    this.socket.close();
  }
}
</script>

<style lang="scss" scoped>
#qrcode {
}
.user-color {
  width: 30px;
  height: 30px;
}
#view {
  width: 300px;
  height: 300px;
  background-color: rgb(38, 38, 38);
  position: relative;
  .item {
    position: absolute;
    left: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background-color: #ffffff;
  }
}
.msg-box {
  display: flex;

  pre {
    width: 50%;
    border-right: solid 1px #ddd;
    background-color: #000;
    color: #fff;
    // font-size: 14px;
    padding: 10px;
  }
}
.nav {
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 5px 0;
  .nav-item {
    border-left: 1px #aaa solid;
    padding: 0 10px;
  }
}
.state-icon {
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 100%;
  &.success {
    background-color: #0f0;
  }
  &.warn {
    background-color: #ff0;
  }
  &.error {
    background-color: #f00;
  }
}
.view-panel {
  width: 100vw;
  padding: 10% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(38, 38, 38);
}
</style>