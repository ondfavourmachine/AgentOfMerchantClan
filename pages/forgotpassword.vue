

<template>
  <div class="container">
    <div class="picture-container">
      <img src="../assets/css/images/character 14.svg" style="width: 80%;" alt />
    </div>

    <div class="content-page">
      <div class="welcome-section">
        <div class="company-logo"></div>

        <div class="welcome-text" v-if="formToshow == 'email'">
          <p class="heading-title signin">Enter email</p>
          <b-form>
            <b-form-group class="spinnerParent" id="input-group-5" label-for="input-5">
              <!-- <div v-if="apiCall" class="text-right spinner">
                <b-spinner label="Spinning"></b-spinner>
              </div>-->
              <b-form-input
                id="input-5"
                type="email"
                v-model.lazy="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>

            <div class="d-flex justify-content-between">
              <b-button
                class="mt-3"
                type="button"
                variant="primary"
                :disabled="!email"
                :class="!email ? '': 'join-us'"
                @click="submitLoginForm"
              >Get reset code</b-button>

              <span class="align-self-end pb-2 goback">
                <nuxt-link to="/login">
                  <a>Back to login</a>
                </nuxt-link>
              </span>
            </div>
          </b-form>
        </div>

        <div class="welcome-text" v-if="formToshow == 'reset'">
          <p class="heading-title signin">Enter reset code</p>
          <b-form>
            <b-form-group class="spinnerParent" id="input-group-5" label-for="input-5">
              <b-form-input
                id="input-5"
                type="text"
                v-model.lazy="token"
                required
                placeholder="Enter reset token"
              ></b-form-input>
            </b-form-group>

            <b-form-group class="spinnerParent" id="input-group-5" label-for="input-5">
              <b-form-input
                id="input-5"
                type="password"
                v-model.lazy="password"
                required
                placeholder="Enter new password"
              ></b-form-input>
            </b-form-group>

            <div class="d-flex justify-content-between">
              <b-button
                class="mt-3"
                type="button"
                variant="primary"
                :disabled="!token || !password "
                @click="resetMyPassword"
                :class="!token || !password? '': 'join-us'"
              >Reset my password</b-button>

              <span class="align-self-end pb-2 goback">
                <nuxt-link to="/login">
                  <a>Back to login</a>
                </nuxt-link>
              </span>
            </div>
          </b-form>
        </div>
      </div>
    </div>
    <Spinner v-if="apiCall" />
  </div>
</template>



<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import Spinner from "~/components/Spinner.vue";

interface resetData {
  email: string;
  formToshow: string;
  token: string;
  password: string;
}

export default Vue.extend({
  components: {
    Spinner
  },

  data(): resetData {
    return {
      email: "",
      formToshow: "email",
      token: "",
      password: ""
    };
  },

  computed: {
    ...mapState(["apiCall", "user"])
  },

  methods: {
    async resetMyPassword() {
      const formToSubmit = {
        identity: this.email,
        type: 1,
        table: "agents",
        token: this.token,
        password: this.password
      };
      this.$store.dispatch("setApiCallState", true);
      try {
        const response = await this.$axios.$post(
          "reset/password",
          formToSubmit
        );
        const { message } = response;
        this.$nuxt.$emit("resetCodeSent", {
          message,
          variant: "success"
        });

        this.$store.dispatch("setApiCallState", false);
        setTimeout(() => {
          this.$router.replace("/login");
        }, 2000);
      } catch (error) {
        const { message } = error.response.data;
        this.$nuxt.$emit("LoginError", { message, variant: "danger" });
        setTimeout(() => {
          this.$nuxt.$emit("SwitchOffNotification");
        }, 2500);
      }
    },
    async submitLoginForm() {
      const formToSubmit = { identity: this.email, type: 1, table: "agents" };
      this.$store.dispatch("setApiCallState", true);
      try {
        const response = await this.$axios.$post("reset/code", formToSubmit);
        const { message } = response;
        this.$nuxt.$emit("resetCodeSent", {
          message,
          variant: "success"
        });
        this.formToshow = "reset";
        this.$store.dispatch("setApiCallState", false);
        setTimeout(() => {
          this.$nuxt.$emit("SwitchOffNotification");
        }, 2500);
      } catch (error) {
        const { message } = error.response.data;
        this.$nuxt.$emit("LoginError", { message, variant: "danger" });
        setTimeout(() => {
          this.$nuxt.$emit("SwitchOffNotification");
        }, 2500);
      }
    }
  }
});
</script>


<style scoped>
.heading-title {
  font-size: 2rem;
}
.company-logo {
  min-width: 90vw;
  width: 100%;
}

.welcome-text {
  min-width: 90vw;
  line-height: unset;
  font-size: unset;
}

.form-control {
  /* background-color: #e5e5e5; */
  border-radius: 0px;
}

button.join-us {
  background-color: transparent;
  color: #6562cf;
}

.btn:not(:disabled):not(.disabled) {
  width: unset;
}

.btn-primary.disabled,
.btn-primary:disabled {
  width: fit-content !important;
}

.goback a {
  text-decoration: underline;
  letter-spacing: -1px;
  color: #6562cf;
}
</style>