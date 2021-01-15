
<template>
  <div id="game">
    <canvas :id="id" :width="w" :height="h"></canvas>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Event from "../model/core/Event";
import App from "../model/core/App";
import Node from "@/model/core/Node";
import Player from "../model/script/Player";
import Sprite from "../model/script/Sprite";
import build from "../model/build";


@Component
export default class game extends Vue {
  id: string = 'canvas_' + parseInt((Math.random() * 1000).toFixed(0));
  w: number = 400
  h: number = 400

  mounted() {
    let app = new App();
    app.setSize(this.w, this.h);

    let nodes: Node[] = build();
    // let node = new Node();
    // node.addComponent(Sprite);
    // app.nodes.push(node);
    app.nodes = nodes;
    console.warn(nodes);

    app.run(this.id);
  }

}
</script>
<style lang="scss" scoped>
#game {
  width: 100vw;
  height: 100vh;
  background-color: rgb(38, 38, 38);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>