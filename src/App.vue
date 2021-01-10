<template>
  <component v-bind:is="component"></component>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route, RouterOptions } from "vue-router";

@Component({
  components: {},
})
export default class App extends Vue {
  component: string = "layout-default";
  @Watch("$route")
  route(route: Route) {
    if (typeof route.meta.layout != "undefined") {
      this.component = "layout-" + route.meta.layout;
    }
  }
}
</script>


<style lang="scss">
</style>
