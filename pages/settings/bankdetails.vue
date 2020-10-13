<template>
  <!-- <p class="heading-title">Bank Account Details</p> -->

  <div class="main-container">
    <div class="parent">
      <div class="child-one">
        <div class="heading">
          <Header />
        </div>
      </div>

      <div class="child-two">
        <p class="heading-title">Bank Account Details</p>
        <b-form>
          <b-form-group>
            <b-form-select @change="modify($event)" v-model="bank_name">
              <b-form-select-option selected value></b-form-select-option>
              <b-form-select-option
                v-for="nigerianBank in computedBanks"
                :key="nigerianBank.id"
                :value="nigerianBank.bank_code"
              >{{ nigerianBank.name }}</b-form-select-option>
            </b-form-select>
          </b-form-group>

          <b-form-group class="spinnerParent" id="input-group-5" label-for="input-5">
            <div v-if="fetching" class="text-right spinner">
              <b-spinner label="Spinning"></b-spinner>
            </div>
            <b-form-input
              id="input-5"
              type="number"
              v-model.lazy="account_number"
              required
              placeholder="Account number: eg 08033445059"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model.lazy="bank_branch"
              required
              placeholder="Bank branch: eg Victoria Island"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="account_name"
              required
              disabled
              readonly
              placeholder="Account name"
            ></b-form-input>
          </b-form-group>

          <b-button
            :disabled="!bank_name || !account_number || !account_name || !bank_branch"
            @click="submitBankDetailsToStore"
            class="mt-3"
            type="button"
            variant="primary"
          >
            Submit
            <!-- <span
              :class="!bank_name || !account_number || !account_name || !bank_branch ? '': 'join-us'"
            ></span>-->
          </b-button>
        </b-form>
      </div>
    </div>
    <Spinner v-if="myApiCall" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "@nuxtjs/axios";

import Header from "~/components/Header.vue";
import Spinner from "~/components/Spinner.vue";
import { mapState, mapActions } from "vuex";

interface Bank {
  id: string;
  bank_code: string;
  name: string;
}

interface BankDetailsData {
  bank_name: null | string;
  account_name: string;
  account_number: null | string;
  bank_branch: string;
  allBanks: Bank[];
  fetching: boolean;
  bank_code: string;
}

export default Vue.extend({
  components: {
    Header,
    Spinner
  },

  data(): BankDetailsData {
    return {
      bank_name: "Please select a bank",
      account_name: "",
      account_number: null,
      bank_branch: "",
      allBanks: [],
      bank_code: "",
      fetching: false
    };
  },

  computed: {
    ...mapState({
      banks: "NigerianBanks",
      currentUser: "user",
      myApiCall: "apiCall"
    }),
    computedBanks(): Bank[] {
      this.allBanks = [...this.banks];
      // console.log(this.allBanks);
      return this.allBanks;
    }
  },

  watch: {
    account_number(oldValue: string, newValue: string) {
      if (oldValue.length < 10) return;
      this.fetching = true;
      this.confirmBankDetails();
      // console.log(this.allBanks);
    }
  },

  methods: {
    ...mapActions({
      saveBankDetailsInStore: "setBankDetails"
    }),
    modify(e: string) {
      this.bank_code = e;
    },
    async submitBankDetailsToStore(e: Event): Promise<any> {
      const {
        account_name,
        account_number,
        bank_branch,
        bank_name
      } = this.$data;
      const nameOfBank = this.allBanks.filter(
        element => element.bank_code == (this.bank_name as string).trim()
      );
      await this.saveBankDetailsInStore({
        bank_name: nameOfBank[0].name,
        account_name,
        account_number,
        bank_branch
      });

      this.$store.dispatch("setApiCallState", true);

      try {
        let url =
          "https://covidreliefbackend.covidrelief.com.ng/merchantclan/public/index.php/api/agent/settings";
        const response = await fetch(url, {
          body: JSON.stringify(this.currentUser),
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        });

        console.log(response);
        this.$store.dispatch("setApiCallState", false);
        this.$nuxt.$emit(
          "SuccessNotification",
          "Bank Details updated successfully"
        );
      } catch (error) {
        this.$nuxt.$emit("GeneralError", "Could not update your Bank Details");
        setTimeout(() => {
          this.$nuxt.$emit("SwitchOffNotification");
        }, 3000);
      }
    },
    async sendStoreToFetchBankDetails() {
      // const response = await
    },

    async confirmBankDetails() {
      try {
        let url = "https://mobile.creditclan.com/webapi/v1/account/resolve";
        // "x-api-key": "z2BhpgFNUA99G8hZiFNv77mHDYcTlecgjybqDACv"
        let obj = {
          account_number: this.account_number,
          bank_code: this.bank_code
        };
        let response: any = await fetch(url, {
          body: JSON.stringify(obj),
          method: "POST",
          headers: {
            "x-api-key": "z2BhpgFNUA99G8hZiFNv77mHDYcTlecgjybqDACv"
          }
        });

        response = await response.json();
        this.fetching = false;
        if (response.hasOwnProperty("data")) {
          this.account_name = response.data.account_name;
        } else {
          throw new Error("Account number not found!");
        }
      } catch (error) {
        this.$nuxt.$emit("GeneralError", "Account number not found!");
        setTimeout(() => {
          this.$nuxt.$emit("SwitchOffNotification");
        }, 3000);
      }
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
  border-radius: 5px;
  padding: 2px;
  max-width: 100%;
}

.spinnerParent {
  position: relative;
}

.spinnerParent .spinner {
  position: absolute;
  right: 0;
  top: 0;
}

.btn-primary,
.btn-primary.disabled,
.btn-primary:disabled {
  width: 26%;
}
</style>