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
    <div class="side-bar">
      <p class="closeBtn-parent">
        <span @click="closeSideBar" ref="closeUp" class="closeBtn">+</span>
      </p>
      <ul class="link-parent">
        <li class="li">
          <a @click="routeToDashBoard">Dashboard</a>
        </li>
        <li class="li">
          <a @click="routeToSettings">Settings</a>
        </li>
        <li class="li">
          <a @click="routeToEarnings">Earnings</a>
        </li>
        <li class="li">
          <a @click="routeToLogin">Logout</a>
        </li>
      </ul>
    </div>

    <div v-if="false" class="floating-icon">
      <img src="../assets/css/images/activity-white.svg" alt />
    </div>
    <nuxt />
    <b-button id="show-btn" @click="showModal" hidden>Open Modal</b-button>
    <!-- <b-button id="toggle-btn" @click="toggleModal">Toggle Modal</b-button> -->

    <b-modal ref="my-modal" hide-footer>
      <div class="d-block text-center">
        <div class="alert-image">
          <img src="../assets/css/images/alert.svg" alt />
        </div>

        <div
          class="warning-message"
        >Your account is under review and you will be notified when your account has been verified.</div>
      </div>
      <b-button class="mt-3" variant="outline-info" block @click="hideModal">Ok</b-button>
      <!-- <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button> -->
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  computed: {
    ...mapState(["justRegistered"])
  },
  methods: {
    showModal() {
      (this.$refs["my-modal"] as any).show();
    },
    hideModal() {
      (this.$refs["my-modal"] as any).hide();
      // this.$store.dispatch("setJustRegisteredBackToDefaultValue");
    },
    closeSideBar() {
      const sideBar = document.querySelector(".side-bar") as HTMLElement;
      sideBar.classList.remove("show");
    },

    routeToDashBoard() {
      this.$router.push("/dashboard");
      (this.$refs.closeUp as HTMLElement).click();
    },

    routeToSettings() {
      this.$router.push("/settings");
      (this.$refs.closeUp as HTMLElement).click();
    },

    routeToEarnings() {
      this.$router.push("/earnings");
      (this.$refs.closeUp as HTMLElement).click();
    },

    routeToLogin() {
      (this.$refs.closeUp as HTMLElement).click();
      this.$store.dispatch("resetStore");
      this.$router.push("/login");
    }
  },
  data() {
    return {
      dismissSecs: 10,
      message: "",
      showDismissibleAlert: false,
      variant: "success",
      showFloating: true
    };
  },

  created() {
    this.$nuxt.$on(
      "RegistrationError",
      (e: { message: string; variant: string }) => {
        this.message = e.message;
        this.variant = e["variant"];
        this.showDismissibleAlert = true;

        // this.$store.dispatch("fetchAllBanks");
        // this.$store.dispatch("fetchAllStates");
      }
    );

    this.$nuxt.$on("LoginError", (e: { message: string; variant: string }) => {
      // console.log(e);
      this.message = e.message;
      this.variant = e["variant"];
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

    this.$nuxt.$on(
      "resetCodeSent",
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
      if (
        this.justRegistered &&
        (to.name as string).toLowerCase() == "dashboard"
      ) {
        // console.log("i am here");
        this.showModal();
      }

      // this.showModal();
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

.side-bar {
  position: absolute;
  width: 100vw;
  z-index: 1050;
  background-color: rgba(20, 0, 204, 0.888);
  backdrop-filter: blur(2px);
  height: 100vh;
  transform: translateX(-100%);
  transform-origin: left center;
  padding: 10px;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

/* .side-bar {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  border: 1px solid white;
  display: flex;
  justify-content: flex-end;
} */

.side-bar .closeBtn-parent {
  width: 100%;
  height: 100px;
  margin: 10px 5px;
  display: flex;
  padding: 5px;
  justify-content: flex-end;
}

.side-bar .closeBtn-parent span {
  font-size: 55px;
  font-weight: 300;
  color: white;
  padding: 6px;
  transform: rotate(44deg);
}

.side-bar .link-parent {
  height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  padding: 10px;
}

.side-bar .link-parent li {
  padding: 7px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  border: 7px;
}

.side-bar .link-parent li:hover {
  background: #35495e;
}

.side-bar .link-parent li:hover a {
  color: white;
}

.side-bar .link-parent li a {
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
}

.side-bar.show {
  transform: translateX(0);
}

.floating-icon {
  top: 75%;
  right: 10px;
  position: absolute;
  height: 65px;
  width: 65px;
  z-index: 30;
  border-radius: 50%;
  border: 1px solid rgb(229, 229, 229, 0.3);
  background-color: rgba(20, 0, 204, 0.888);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 10px 12px rgba(20, 0, 204, 0.2);
}

.floating-icon img {
  width: 50%;
  object-fit: contain;
}

div.alert-image {
  height: 100px;
  margin: 10px 0px 28px 0px;
}

div.alert-image img {
  height: 100%;
  object-fit: cover;
}

div.warning-message {
  line-height: 1.5;
  font-size: 1.6rem;
  color: #343a40;
  font-weight: 400;
}

.close {
  visibility: hidden;
}
</style>
