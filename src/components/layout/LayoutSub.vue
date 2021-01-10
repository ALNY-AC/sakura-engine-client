<template>
  <div class="layout-sub">
    layout-sub
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class LayoutSub extends Vue {}
</script>


<style lang="scss" scoped>
.layout-sub {
  width: 100vw;
  height: 100px;
  background-color: #f00;
  color: #000;
}
</style>