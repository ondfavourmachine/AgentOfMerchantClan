

<template>
  <div class="container">
    <div class="picture-container" style="display: none;">
      <img src="../assets/css/images/character 14.svg" style="width: 100%; height: 100%;" alt />
    </div>

    <div class="content-page">
      <div class="welcome-section" style="
    overflow: scroll;
">
        <div class="company-logo">
          <span style>
            <img src alt />
          </span>
          <nuxt-link to="/login">
            <a class="signin">Sign in</a>
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
                @change="checkNumber"
                required
                placeholder="mobile eg: 09033456789"
              ></b-form-input>
              <small v-html="phoneValidationMessage" style="color: tomato; font-size: 0.7rem;"></small>
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
                @input="emailCheck"
                placeholder="Email eg: cee@cee.com"
              ></b-form-input>
              <small v-html="emailValidationMessage" style="color: tomato; font-size: 0.7rem;"></small>
            </b-form-group>

            <b-form-group label id="input-group-5" label-for="input-5">
              <b-form-input
                id="input-5"
                v-model="address"
                required
                placeholder="Enter your Address eg: 21, Somolu street"
              ></b-form-input>
            </b-form-group>
            <b-form-group label id="input-group-5" label-for="input-5">
              <b-form-input
                id="input-5"
                v-model="nearest_bustop"
                required
                placeholder="Nearest Bustop eg: Fadeyi Bustop"
              ></b-form-input>
            </b-form-group>

            <b-form-group label>
              <b-form-select id="address-state-select" v-model="state">
                <b-form-select-option value>Please select a state</b-form-select-option>
                <b-form-select-option
                  v-for="computedState in computedNigerianStates"
                  :key="computedState.id"
                  :value="computedState.id"
                >{{ computedState.value }}</b-form-select-option>
              </b-form-select>
            </b-form-group>

            <!-- Password -->

            <b-form-group class="spinnerParent" id="input-group-10" label-for="input-10">
              <b-form-input
                id="input-5"
                type="password"
                v-model.lazy="password"
                required
                placeholder=" Enter a password"
              ></b-form-input>
            </b-form-group>

            <b-button
              :disabled="!$data.address || !$data.state || !$data.nearest_bustop || !$data.date_of_birth || !$data.full_name || !$data.mobile || !$data.email || !$data.gender || !$data.password "
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
  state: string;
  nearest_bustop: string;
  address: string;
  password: string;
  nigerianStates: Array<any>;
  message: string;
  showDismissibleAlert: boolean;
  alertType: string;
  phoneValidationMessage: string;
  emailValidationMessage: string;
  emailRegex: RegExp;
}
import Vue from "vue";
import Spinner from "~/components/Spinner.vue";
import { mapState } from "vuex";
import { NigerianStates } from "~/models/states";
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
      address: "",
      state: "",
      nearest_bustop: "",
      nigerianStates: [],
      password: "",
      message: "",
      showDismissibleAlert: false,
      alertType: "",
      phoneValidationMessage: "",
      emailValidationMessage: "",
      emailRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    };
  },

  computed: {
    ...mapState(["apiCall", "agentsInterest", "justRegistered"]),
    computedNigerianStates(): any[] {
      this.nigerianStates = [...NigerianStates()];
      return this.nigerianStates;
    }
  },

  methods: {
    async submitRegisterForm() {
      const {
        full_name,
        date_of_birth,
        mobile,
        email,
        gender,
        password,
        state,
        nearest_bustop,
        address
      } = this.$data;

      const formToSubmit = {
        full_name,
        date_of_birth,
        mobile,
        email,
        gender,
        password,
        state,
        nearest_bus_stop: nearest_bustop,
        address,
        interests: Array.from(this.agentsInterest).join(",")
      };
      // console.log(formToSubmit);
      this.$store.dispatch("setApiCallState", true);
      try {
        const response = await this.$axios.$post<{
          data: Record<string, any>;
          message: string;
          status: boolean;
        }>("agent", formToSubmit);
        const { data } = response;
        this.$store.dispatch("setApiCallState", false);
        this.$router.push("/dashboard");
        this.$store.dispatch("setJustRegistered");
      } catch (error) {
        const { message } = error.response.data;
        if ((message as string).includes("SQLSTATE")) {
          this.$nuxt.$emit("RegistrationError", {
            message: `Sorry we couldn't register you at this time. Please try again later!`,
            variant: "danger"
          });
          this.$store.dispatch("setApiCallState", false);

          return;
        }

        this.$nuxt.$emit("RegistrationError", { message, variant: "danger" });
        this.$store.dispatch("setApiCallState", false);
      }
    },

    checkNumber(event: string) {
      if (event.length < 11 || event.length > 11) {
        this.phoneValidationMessage = "The mobile number must be 11 digits.";
        return;
      }
      this.phoneValidationMessage = "";
    },

    emailCheck(event: string) {
      if (this.emailRegex.test(event)) {
        this.emailValidationMessage = "";
        return;
      }

      this.emailValidationMessage = "The email you entered is not valid!";
    }
  }
});
</script >

<style   scoped>
.welcome-section {
  background-color: transparent;
  grid-template-rows: 50px 650px;
  width: 95vw;
  height: 95vh;
  grid-gap: 20px;
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

.custom-control {
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