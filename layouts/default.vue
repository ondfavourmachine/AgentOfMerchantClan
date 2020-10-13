<template>
  <div style="position: relative">
    <b-alert
      style="margin-bottom: -5px; z-index: 10;"
      v-model="showDismissibleAlert"
      :max="dismissSecs"
      :variant="variant"
      dismissible
    >{{ message }}</b-alert>

    <b-button @click="showDismissibleAlert=true" hidden variant="info" class="m-1"></b-button>

    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      dismissSecs: 10,
      message: "",
      showDismissibleAlert: false,
      variant: "success"
    };
  },

  created() {
    this.$nuxt.$on("RegistrationError", (e: any) => {
      this.message = e;
      this.showDismissibleAlert = true;

      // this.$store.dispatch("fetchAllBanks");
      // this.$store.dispatch("fetchAllStates");
    });

    this.$nuxt.$on("LoginError", (e: any) => {
      this.message = e;
      this.showDismissibleAlert = true;
    });

    this.$nuxt.$on("NotConnectedToInternet", (e: string) => {
      this.message = e;
      this.showDismissibleAlert = true;
    });

    this.$nuxt.$on(
      "GeneralError",
      (e: { message: string; variant: string }) => {
        this.message = e.message;
        this.variant = e["variant"];
        this.showDismissibleAlert = true;
      }
    );

    this.$nuxt.$on("SwitchOffNotification", () => {
      this.showDismissibleAlert = false;
    });

    this.$nuxt.$on(
      "SuccessNotification",
      (e: { message: string; variant: string }) => {
        this.showDismissibleAlert = true;
        this.variant = e["variant"];
        this.message = e["message"];
      }
    );
  },

  watch: {
    $route(to, from) {
      this.showDismissibleAlert = false;
    }
  },

  beforeDestroy() {
    this.$nuxt.$off("RegistrationError");
    this.$nuxt.$off("LoginError");
    this.$nuxt.$off("NotConnectedToInternet");
    this.$nuxt.$off("GeneralError");
    this.$nuxt.$off("SwitchOffNotification");
    this.$nuxt.$off("SuccessNotification");
  }
});
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
