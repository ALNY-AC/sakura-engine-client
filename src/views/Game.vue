
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
import Scene from "@/model/core/Scene";
import main from "../model/main";


@Component
export default class game extends Vue {
  id: string = 'canvas_' + parseInt((Math.random() * 1000).toFixed(0));
  w: number = 500
  h: number = 500

  mounted() {
    let app = new App();
    app.setSize(this.w, this.h);
    app.setId(this.id);
    app.loadAssets();
    app.run();
    main(app);
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