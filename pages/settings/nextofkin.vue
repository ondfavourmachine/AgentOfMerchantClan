<template>
  <div class="main-container position-relative">
    <div class="parent">
      <div class="child-one">
        <div class="heading">
          <Header />
        </div>
      </div>

      <div class="child-two" style="overflow-y: scroll">
        <p class="heading-title">Next of Kin Information</p>
        <b-form @submit.prevent="onSubmitForm">
          <b-form-group label="Name" id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="nok_name"
              required
              placeholder="Name eg: John Ciroma"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Relationship" id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model.lazy="nok_relationship"
              required
              placeholder="Relationship: eg Sister"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Address" id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="nok_address"
              required
              placeholder="Addess eg: 13, St John Street Ijesha"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Suburb" id="input-group-16" label-for="input-16">
            <b-form-input
              id="input-16"
              v-model="nok_suburb"
              required
              placeholder="Suburb eg: Somolu"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="State of origin">
            <b-form-select v-model="nok_state">
              <b-form-select-option value>Please select a state</b-form-select-option>
              <b-form-select-option
                v-for="computedState in computedNigerianStates"
                :key="computedState.id"
                :value="computedState.id"
              >{{ computedState.name }}</b-form-select-option>
            </b-form-select>
          </b-form-group>
          <!-- <b-form-group>
            <b-form-select
              v-model="nok_state"
              v-for="computedState in computedNigerianStates"
              :key="computedState.id"
              :value="computedState.name"
            ></b-form-select>
          </b-form-group>-->

          <b-form-group label="Post code" id="input-group-17" label-for="input-17">
            <b-form-input
              id="input-17"
              v-model="nok_postcode"
              required
              placeholder="Post code: eg 10020"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Home phone" id="input-group-18" label-for="input-18">
            <b-form-input
              id="input-18"
              v-model="nok_home_phone"
              required
              type="tel"
              @input="checkNumber"
              placeholder="Home phone: eg 08033445059"
            ></b-form-input>
            <small v-html="homePhoneValidationMessage" style="color: tomato; font-size: 0.7rem;"></small>
          </b-form-group>

          <b-form-group label="Mobile" id="input-group-19" label-for="input-19">
            <b-form-input
              id="input-19"
              type="number"
              v-model="nok_mobile"
              required
              @input="checkMobile"
              placeholder="Mobile no: eg 090334567890"
            ></b-form-input>
            <small v-html="mobilePhoneValidation" style="color: tomato; font-size: 0.7rem;"></small>
          </b-form-group>

          <b-form-group label="Work" id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model.lazy="nok_work"
              required
              placeholder="Work: eg Banker"
            ></b-form-input>
          </b-form-group>

          <div>
            <label for="example-datepicker-5">Date Signed</label>
            <b-form-datepicker id="example-datepicker-5" v-model="date_signed" class="mb-2"></b-form-datepicker>
          </div>

          <!--:disabled="!$data.nok_name || !$data.nok_relationship 
              || !$data.nok_address || !$data.nok_suburb 
             || !$data.state || !$data.nok_postcode 
             || !$data.nok_home_phone 
          || !$data.nok_mobile || !$data.date_signed"-->

          <b-button
            class="mt-3 btn btn-block"
            type="submit"
            variant="primary"
          >Save and continue to photo ➡</b-button>
        </b-form>
      </div>
    </div>
    <Spinner v-if="apiCall" />
    <BottomNav />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "~/components/Header.vue";
import Spinner from "~/components/Spinner.vue";
import BottomNav from "~/components/BottomNav.vue";
import { mapState } from "vuex";
import { NigerianStates } from "~/models/states.ts";

interface NOKDATA {
  nok_name: string;
  nok_relationship: string;
  nok_address: string;
  nok_suburb: string;
  nok_state: string;
  nok_postcode: string;
  nok_home_phone: string;
  nok_mobile: string;
  nok_work: string;

  date_signed: string;
  nigerianStates: any[];
  options: any[];
  homePhoneValidationMessage: string;
  mobilePhoneValidation: string;
}

export default Vue.extend({
  components: {
    Header,
    Spinner,
    BottomNav
  },
  middleware: "authenticated",
  mounted() {
    this.nok_name = this.user.nok_name;
    this.nok_relationship = this.user.nok_relationship;
    this.nok_address = this.user.nok_address;
    this.nok_suburb = this.user.nok_suburb;
    this.nok_postcode = this.user.nok_postcode;
    this.nok_mobile = this.user.nok_mobile;
    this.nok_work = this.user.nok_work;
    this.nok_home_phone = this.user.nok_home_phone;
    this.nok_state = this.user.nok_state;
    this;
  },
  data(): Partial<NOKDATA> {
    return {
      nok_name: "",
      nok_relationship: "",
      nok_address: "",
      nok_suburb: "",
      nok_state: "",
      options: [{ value: null, text: "Please select a state" }],
      nok_postcode: "",
      nok_home_phone: "",
      nok_mobile: "",
      nok_work: "",
      homePhoneValidationMessage: "",
      mobilePhoneValidation: "",
      date_signed: "",
      nigerianStates: []
    };
  },

  computed: {
    ...mapState(["apiCall", "states", "user"]),

    computedNigerianStates(): any[] {
      this.nigerianStates = [...NigerianStates()];
      return this.nigerianStates;
    }
  },

  methods: {
    async onSubmitForm() {
      const {
        nok_name,
        nok_relationship,
        nok_address,
        nok_suburb,
        nok_state,
        nok_postcode,
        nok_home_phone,
        nok_mobile,
        nok_work,
        date_signed
      } = this.$data;

      if (nok_home_phone.length < 11 || nok_home_phone.length > 11) {
        this.homePhoneValidationMessage = "";
        this.homePhoneValidationMessage =
          "The home phone number must be 11 digits.";
        return;
      }
      if (nok_mobile.length < 11 || nok_mobile.length > 11) {
        this.mobilePhoneValidation = "";
        this.homePhoneValidationMessage =
          "The mobile number must be 11 digits.";
        return;
      }
      this.$store.dispatch("setPersonalDetails", {
        nok_name,
        nok_relationship,
        nok_address,
        nok_suburb,
        nok_state,
        nok_postcode,
        nok_home_phone,
        nok_mobile,
        nok_work,
        date_signed
      });
      this.$store.dispatch("setApiCallState", true);

      try {
        let response: Response | any = await fetch(
          `${this.$store.state.url}agent/settings`,
          {
            body: JSON.stringify(this.$store.state.user),
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
              "Content-Type": "application/json"
            }
          }
        );
        response = await response.json();
        const { data } = response;
        this.$store.dispatch("setLoggedInUser", data);
        this.$store.dispatch("setApiCallState", false);
        this.$nuxt.$emit("SuccessNotification", {
          message: "Next of kin details updated successfully!",
          variant: "success"
        });
        setTimeout(() => {
          this.$router.push("/settings/passportInfo");
        }, 2000);
      } catch (error) {
        this.$nuxt.$emit("GeneralError", {
          message: "Could not update your Next of Kin details!",
          variant: "danger"
        });
        this.$nuxt.$emit("GeneralError", "");
        setTimeout(() => {
          this.$nuxt.$emit("SwitchOffNotification");
        }, 3000);
      }
    },
    checkNumber(event: string) {
      if (event.length < 11 || event.length > 11) {
        this.homePhoneValidationMessage =
          "The home phone number must be 11 digits.";
        return;
      }
      this.homePhoneValidationMessage = "";
    },

    checkMobile(event: string) {
      if (event.length < 11 || event.length > 11) {
        this.mobilePhoneValidation = "The mobile number must be 11 digits.";
        return;
      }
      this.mobilePhoneValidation = "";
    }
  }
});
</script>

<style scoped>
.parent {
  grid-template-rows: 10vh 75vh 1vh;
}

div.child-two {
  grid-row: 2/3;
  padding: 12px;

  align-items: center;
  grid-gap: 5px;
}
div.child-two div,
div.child-two fieldset {
  color: rgba(20, 0, 204, 0.789);

  padding: 2px;
  max-width: 100%;
}

/* .btn-primary,
.btn-primary.disabled,
.btn-primary:disabled {
 
} */
</style>