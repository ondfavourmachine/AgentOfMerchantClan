

<template>
  <div class="heading">
    <div class="left">
      <div v-html="getInitials" class="avatar"></div>
    </div>
    <div class="right">
      <div class="hamburger">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <!-- <img src="../assets/css/images/notification-bell.svg" alt /> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  computed: {
    ...mapState({
      currentUser: "user"
    }),

    getInitials() {
      let userName: string | Array<string> = this.currentUser.full_name;
      userName = (userName as string).split(" ");
      userName = (userName as string[]).map(element => element.substring(0, 1));
      return userName.join("").toUpperCase();
    }
  }
});
</script>

<style>
</style>