

<template>
  <div class="heading">
    <div class="left">
      <div class="avatar">{{getInitials}}</div>
    </div>
    <div class="right">
      <div @click="showSideBar" class="hamburger">
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
  methods: {
    showSideBar() {
      const sideBar = document.querySelector(".side-bar") as HTMLElement;
      sideBar.classList.add("show");
    }
  },
  computed: {
    ...mapState(["user"]),

    getInitials() {
      let userName: string | Array<string> = this.user.full_name;
      if (!userName) return "mc".toUpperCase();
      if (userName.length < 1) return "mc".toUpperCase();
      try {
        userName = (userName as string).split(" ");
        userName = (userName as string[]).map(element =>
          element.substring(0, 1)
        );
        return userName.join("").toUpperCase();
      } catch (error) {
        return "mc".toUpperCase();
      }
    }
  }
});
</script>

<style>
</style>