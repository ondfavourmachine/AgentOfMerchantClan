

<template>
  <div class="container">
    <div class="picture-container">
      <img src="../assets/css/images/character 14.svg" style="width: 80%;" alt />
    </div>

    <div class="content-page">
      <div class="welcome-section">
        <div class="company-logo"></div>

        <div class="welcome-text">
          <p class="heading-title signin">Sign in</p>
          <b-form>
            <b-form-group class="spinnerParent" id="input-group-5" label-for="input-5">
              <!-- <div v-if="apiCall" class="text-right spinner">
                <b-spinner label="Spinning"></b-spinner>
              </div>-->
              <b-form-input
                id="input-5"
                type="text"
                v-model.lazy="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-5" label-for="input-5">
              <b-form-input
                id="input-5"
                type="password"
                v-model.lazy="password"
                required
                placeholder="Enter password"
                @keydown.enter="submitLoginForm"
              ></b-form-input>
            </b-form-group>

            <div class="d-flex justify-content-between">
              <b-button
                class="mt-3"
                type="button"
                variant="primary"
                :disabled="!email || !password "
                :class="!email || !password ? '': 'join-us'"
                @click="submitLoginForm"
              >
                Sign in
                <span class :class="!email || !password ? '': 'btn-child'"></span>
              </b-button>

              <span class="align-self-end pb-2 reset-password">
                <nuxt-link to="/forgotpassword">
                  <a>reset password</a>
                </nuxt-link>
              </span>
            </div>

            <div class="no-account">
              <span>Not an agent?</span>,
              <nuxt-link to="/">
                <a>Sign up now</a>
              </nuxt-link>
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

interface LoginData {
  email: "";
  password: "";
}

export default Vue.extend({
  components: {
    Spinner
  },

  data(): LoginData {
    return {
      email: "",
      password: ""
    };
  },

  computed: {
    ...mapState(["apiCall", "user"])
  },

  methods: {
    async submitLoginForm(event: Event) {
      if (!window.navigator.onLine) {
        this.$nuxt.$emit(
          "NotConnectedToInternet",
          `Please check your internet and try again!`
        );
        return;
      }
      const { email, password } = this.$data;
      if (event && event instanceof KeyboardEvent && (!email || !password)) {
        return;
      }
      const formToSubmit = {
        email,
        password
      };
      this.$store.dispatch("setApiCallState", true);
      try {
        const response = await this.$axios.$post<{
          data: Record<string, string>;
          token: string;
          user: boolean;
        }>("agent/login", formToSubmit);
        const { user, token } = response;

        this.$store.dispatch("setApiCallState", false);
        // console.log(user);
        this.$store.dispatch("setLoggedInUser", user);
        // console.log(this.user);

        this.$store.dispatch("setToken", token);
        this.$router.push("/dashboard");
      } catch (error) {
        const { message } = error.response.data;

        if ((message as string).includes("SQLSTATE")) {
          this.$nuxt.$emit(
            "LoginError",
            `Sorry we couldn't Log you in at this time. Please try again later!`
          );
          this.$store.dispatch("setApiCallState", false);
          return;
        }

        this.$nuxt.$emit("LoginError", { message, variant: "danger" });
        this.$store.dispatch("setApiCallState", false);
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
  width: 29%;
}

.no-account {
  margin-top: 16px;
  color: black;
}
.no-account span {
  font-size: 1.05rem;
}

.no-account a,
.reset-password a {
  text-decoration: underline;
  letter-spacing: -1px;
  color: #6562cf;
}
</style>
