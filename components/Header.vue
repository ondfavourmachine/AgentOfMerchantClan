

<template>
  <div class="heading">
    <div class="left">
      <div class="avatar">{{getInitials}}</div>
    </div>
    <div class="right d-flex justify-content-center">
      <div
        class="notification-bell h4 mr-3 position-relative"
        v-if="unopened_notifications_ids.length > 0"
      >
        <b-icon icon="bell"></b-icon>
        <h5 @click="gotoNotificationsPage" class="bell position-absolute" style>
          <b-badge pill variant="warning">{{ unopened_notifications_ids.length }}</b-badge>
        </h5>
      </div>
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
import { mapState, mapActions } from "vuex";

import { BIcon } from "bootstrap-vue";
export default Vue.extend({
  components: {
    BIcon
  },
  created() {
    this.$store.dispatch("getAssignedTasks");
  },
  methods: {
    showSideBar() {
      const sideBar = document.querySelector(".side-bar") as HTMLElement;
      sideBar.classList.add("show");
    },

    gotoNotificationsPage() {
      this.$router.push("/notifications");
    }
  },
  computed: {
    ...mapState(["user", "unopened_notifications_ids"]),

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
.bell {
  top: -13px;
  left: 11px;
}
</style>