

<template>
  <div class="container">
    <div class="picture-container" style="display: none;">
      <img src="../assets/css/images/character 14.svg" style="width: 100%; height: 100%;" alt />
    </div>

    <!-- <b-alert v-model="showDismissibleAlert" :variant="alertType" dismissible>Dismissible Alert!</b-alert>
    <b-button hidden @click="showDismissibleAlert=!showDismissibleAlert" variant="info" class="m-1"></b-button>-->
    <div class="content-page">
      <div class="welcome-section">
        <div class="company-logo">
          <span style>
            <img src alt />
          </span>
          <nuxt-link to="/login">
            <a>Sign in</a>
          </nuxt-link>
        </div>

        <div class="welcome-text">
          <h3 style="color: #495057" class="py-3">Finally, register</h3>
          <b-form>
            <!-- Full Name -->
            <b-form-group class="spinnerParent" id="input-group-10" label-for="input-10">
              <!-- <div class="text-right spinner">
                <b-spinner label="Spinning"></b-spinner> 
              </div>-->
              <b-form-input
                id="input-5"
                type="text"
                v-model.lazy="full_name"
                required
                placeholder="Full Name eg: Ciroma Haruna"
              ></b-form-input>
            </b-form-group>

            <!-- Mobile number -->
            <b-form-group id="input-group-5" label-for="input-5">
              <b-form-input
                id="input-5"
                type="number"
                v-model.lazy="mobile"
                required
                placeholder="mobile eg: 09033456789"
              ></b-form-input>
            </b-form-group>

            <b-form-group class="gender">
              <b-form-radio v-model="gender" name="some-radios-1" value="1">Male</b-form-radio>
              <b-form-radio v-model="gender" name="some-radios-2" value="2">Female</b-form-radio>
            </b-form-group>
            <!--  Date of Birth -->
            <div>
              <!-- <label for="example-datepicker">Date of birth</label> -->
              <b-form-datepicker
                id="example-datepicker"
                placeholder="Select your date of birth"
                v-model="date_of_birth"
                class="mb-2"
              ></b-form-datepicker>
              <!-- <p>Value: '{{ dateOfBirth }}'</p> -->
            </div>

            <!-- email -->
            <b-form-group class="spinnerParent" id="input-group-10" label-for="input-10">
              <b-form-input
                id="input-5"
                type="email"
                v-model.lazy="email"
                required
                placeholder="Email eg: cee@cee.com"
              ></b-form-input>
            </b-form-group>

            <!-- Password -->

            <b-form-group class="spinnerParent" id="input-group-10" label-for="input-10">
              <b-form-input
                id="input-5"
                type="password"
                v-model.lazy="password"
                required
                placeholder="password"
              ></b-form-input>
            </b-form-group>

            <b-button
              :disabled="!$data.date_of_birth || !$data.full_name || !$data.mobile || !$data.email || !$data.gender || !$data.password "
              class="mt-3"
              type="button"
              variant="primary"
              @click="submitRegisterForm"
            >Become an agent</b-button>
          </b-form>
        </div>
      </div>
    </div>

    <Spinner v-if="apiCall" />
  </div>
</template>

<script lang="ts">
interface RegistrationData {
  full_name: string;
  date_of_birth: string;
  mobile: string;
  email: string;
  gender: string;
  password: string;
  message: string;
  showDismissibleAlert: boolean;
  alertType: string;
}
import Vue from "vue";
import Spinner from "~/components/Spinner.vue";
import { mapState } from "vuex";
export default Vue.extend({
  components: {
    Spinner
  },
  data(): RegistrationData {
    return {
      full_name: "",
      date_of_birth: "",
      mobile: "",
      email: "",
      gender: "",
      password: "",
      message: "",
      showDismissibleAlert: false,
      alertType: ""
    };
  },

  computed: {
    ...mapState(["apiCall"])
  },
  methods: {
    async submitRegisterForm() {
      const {
        full_name,
        date_of_birth,
        mobile,
        email,
        gender,
        password
      } = this.$data;
      const formToSubmit = {
        full_name,
        date_of_birth,
        mobile,
        email,
        gender,
        password
      };
      this.$store.dispatch("setApiCallState", true);
      console.log(this.apiCall);
      try {
        const response = await this.$axios.$post<{
          data: Record<string, string>;
          message: string;
          status: boolean;
        }>("agent", formToSubmit);
        //   const { message } = response;
        this.$store.dispatch("setApiCallState", false);
        this.$router.push("/dashboard");
      } catch (error) {
        console.log(error);
        this.$nuxt.$emit("RegistrationError", error);
      }
    }
  }
});
</script >

<style   scoped>
.welcome-section {
  background-color: transparent;
  grid-template-rows: 50px 650px;
  width: 95vw;
  height: 90vh;
  grid-gap: 30px;
  overflow: hidden;
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

.custom-control {
  background-color: #e5e5e5;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 2rem;
  color: #495057;
}

.btn-primary.disabled,
.btn-primary:disabled {
  width: 57%;
}
</style>