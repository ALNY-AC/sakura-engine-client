<template>
  <div class="layout-default">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class LayoutDefault extends Vue {}
</script>

<style lang="scss" scoped>
.layout-default {
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
</style>