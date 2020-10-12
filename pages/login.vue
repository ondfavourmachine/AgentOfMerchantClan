

<template>
  <div class="container">
    <div class="picture-container">
      <img src="../assets/css/images/character 14.svg" style="width: 100%; height: 100%;" alt />
    </div>

    <div class="content-page">
      <div class="welcome-section">
        <div class="company-logo"></div>

        <div class="welcome-text">
          <p class="heading-title">Sign in</p>
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
                placeholder="email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-5" label-for="input-5">
              <b-form-input id="input-5" v-model.lazy="password" required placeholder="Password"></b-form-input>
            </b-form-group>

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
  username: "";
  password: "";
}
export default Vue.extend({
  components: {
    Spinner
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },

  computed: {
    ...mapState(["apiCall"])
  },
  methods: {
    async submitLoginForm() {
      // console.log(this.apiCall);
      const { email, password } = this.$data;
      const formToSubmit = {
        email,
        password
      };
      this.$store.dispatch("setApiCallState", true);
      // console.log(this.apiCall);
      try {
        // const response = await this.$axios.$post<{
        //   data: Record<string, string>;
        //   message: string;
        //   status: boolean;
        // }>("agent", formToSubmit);
        // //   const { message } = response;
        // this.$store.dispatch("setApiCallState", false);
        setTimeout(() => {
          this.$store.dispatch("setApiCallState", false);
          this.$router.push("/dashboard");
        }, 1500);
      } catch (error) {
        // console.log(error);
        // this.$nuxt.$emit("RegistrationError", error);
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
  background-color: #e5e5e5;
}

button.join-us {
  background-color: transparent;
  color: #6562cf;
}

.btn-primary.disabled,
.btn-primary:disabled {
  width: 30%;
}
</style>