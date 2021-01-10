<template>
  <div id="user">
    user
    <router-link to="/">go home</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class User extends Vue {}
</script>
