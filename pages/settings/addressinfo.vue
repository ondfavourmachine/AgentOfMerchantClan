<template>
  <div class="main-container position-relative">
    <div class="parent">
      <div class="child-one">
        <div class="heading">
          <Header />
        </div>
      </div>

      <div class="child-two" style="overflow-y: scroll">
        <p class="heading-title">Address Details</p>
        <b-form>
          <b-form-group label="Address" id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="address"
              required
              placeholder="eg: 21, Somolu street"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Suburb" id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="suburb"
              required
              placeholder="Suburb: eg Victoria Island"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="State of origin">
            <b-form-select id="address-state-select" v-model="state">
              <b-form-select-option value>Please select a state</b-form-select-option>
              <b-form-select-option
                v-for="computedState in computedNigerianStates"
                :key="computedState.id"
                :value="computedState.id"
              >{{ computedState.value }}</b-form-select-option>
            </b-form-select>
          </b-form-group>

          <b-form-group label="Post code" id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="postcode"
              required
              placeholder="Post code: eg 10020"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Home phone" id="input-group-5" label-for="input-5">
            <b-form-input
              type="number"
              id="input-5"
              v-model="home_phone"
              @input="checkPhone"
              required
              placeholder="Home phone: eg 08033445059"
            ></b-form-input>
            <small v-html="homePhoneNumberValidation" style="color: tomato; font-size: 0.7rem;"></small>
          </b-form-group>

          <b-form-group label="Mobile" id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              type="number"
              v-model="mobile"
              @input="checkMobile"
              required
              placeholder="Mobile no: eg 090334567890"
            ></b-form-input>
            <small v-html="mobilePhoneValidation" style="color: tomato; font-size: 0.7rem;"></small>
          </b-form-group>

          <b-button
            :disabled="!$data.address || !$data.state || !$data.suburb || !$data.home_phone 
             || !$data.postcode || !$data.mobile "
            class="mt-3"
            @click="submitAddressForm"
            type="button"
            variant="primary"
          >Save and continue to bank details ➡</b-button>
        </b-form>
      </div>
    </div>
    <Spinner v-if="myApiCall" />
    <BottomNav />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import Header from "~/components/Header.vue";
import BottomNav from "~/components/BottomNav.vue";
import Spinner from "~/components/Spinner.vue";
import { NigerianStates } from "~/models/states.ts";

interface AddressData {
  address: string;
  state: null | string;
  suburb: string;
  home_phone: string;
  postcode: string;
  email: string;
  mobile: string;
  nigerianStates: any[];
  mobilePhoneValidation: string;
  homePhoneNumberValidation: string;
}

export default Vue.extend({
  components: {
    Header,
    Spinner,
    BottomNav
  },

  middleware: "authenticated",
  mounted() {
    this.address = this.currentUser.address;
    let selectedstate = NigerianStates().find(
      (element: any) => element.id == this.currentUser.state
    );
    this.state = selectedstate ? selectedstate.id : "";
    this.suburb = this.currentUser.suburb;
    this.postcode = this.currentUser.postcode;
    this.home_phone = this.currentUser.home_phone;
    this.mobile = this.currentUser.mobile;
  },
  data(): AddressData {
    return {
      address: "",
      state: "",
      suburb: "",
      home_phone: "",
      postcode: "",
      email: "",
      mobile: "",
      nigerianStates: [],
      mobilePhoneValidation: "",
      homePhoneNumberValidation: ""
    };
  },

  computed: {
    ...mapState({
      stateFromServer: "states",
      myApiCall: "apiCall",
      currentUser: "user"
    }),

    computedNigerianStates(): any[] {
      this.nigerianStates = [...NigerianStates()];
      // console.log(this.nigerianStates);
      return this.nigerianStates;
    }
  },

  methods: {
    ...mapActions({
      saveAddressInStore: "setAddress"
    }),
    async submitAddressForm() {
      const {
        address,
        state,
        suburb,
        home_phone,
        postcode,
        mobile
      } = this.$data;
      if (home_phone.length < 11 || home_phone.length > 11) {
        this.homePhoneNumberValidation = "";
        this.homePhoneNumberValidation = "The mobile number must be 11 digits.";
        return;
      }
      if (mobile.length < 11 || mobile.length > 11) {
        this.mobilePhoneValidation = "";
        this.mobilePhoneValidation = "The mobile number must be 11 digits.";
        return;
      }

      await this.saveAddressInStore({
        address,
        state,
        suburb,
        home_phone,
        postcode,

        mobile
      });

      // console.log(this.currentUser);
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
          message: "Address details updated successfully!",
          variant: "success"
        });
        setTimeout(() => {
          this.$router.push("/settings/bankdetails");
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

    checkMobile(event: string) {
      if (event.length < 11 || event.length > 11) {
        this.mobilePhoneValidation = "The mobile number must be 11 digits.";
        return;
      }
      this.mobilePhoneValidation = "";
    },
    checkPhone(event: string) {
      if (event.length < 11 || event.length > 11) {
        this.homePhoneNumberValidation =
          "The home phone number must be 11 digits.";
        return;
      }
      this.homePhoneNumberValidation = "";
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
  color: black !important;
  border-radius: 5px;
  padding: 2px;
  max-width: 100%;
}

.btn-primary,
.btn-primary.disabled,
.btn-primary:disabled {
  width: 100%;
}

/* legend,
label {
  color: black !important;
} */
</style>