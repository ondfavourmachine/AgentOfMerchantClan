<template>
  <div>
    <p class="heading-title">Bank Account Details</p>
    <b-form>
      <!-- Bank Name -->
      <b-form-group>
        <b-form-select v-model="bank_name">
          <b-form-select-option selected value>Please select your bank</b-form-select-option>
          <b-form-select-option
            v-for="nigerianBank in computedBanks"
            :key="nigerianBank.bank_id"
            :value="nigerianBank.bank_name"
          >{{ nigerianBank.bank_name }}</b-form-select-option>
        </b-form-select>
      </b-form-group>

      <!-- account number -->
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

      <!-- branch name -->
      <b-form-group id="input-group-5" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model.lazy="bank_branch"
          required
          placeholder="Bank branch: eg Victoria Island"
        ></b-form-input>
      </b-form-group>

      <!-- account name -->

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
        Next
        <span
          :class="!bank_name || !account_number || !account_name || !bank_branch ? '': 'btn-child'"
        ></span>
      </b-button>
    </b-form>

    <!-- <pre class="mt-3 mb-0">{{ $data }}</pre> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "@nuxtjs/axios";
import { mapState, mapActions } from "vuex";

interface Bank {
  bank_id: string;
  bank_name: string;
}

interface BankDetailsData {
  bank_name: null | string;
  account_name: string;
  account_number: null | string;
  bank_branch: string;
  allBanks: Bank[];
  fetching: boolean;
}

export default Vue.extend({
  data(): BankDetailsData {
    return {
      bank_name: null,
      account_name: "",
      account_number: null,
      bank_branch: "",
      allBanks: [],
      fetching: false
    };
  },

  computed: {
    ...mapState({
      banks: "NigerianBanks"
    }),
    computedBanks(): Bank[] {
      this.allBanks = [...this.banks];
      return this.allBanks;
    }
  },

  watch: {
    account_number(oldValue: string, newValue: string) {
      if (oldValue.length < 10) return;
      this.fetching = true;
    }
  },

  methods: {
    ...mapActions({
      saveBankDetailsInStore: "setBankDetails"
    }),
    async submitBankDetailsToStore(e: Event): Promise<any> {
      console.log(e.target);
      //   const {
      //     bank_name,
      //     account_name,
      //     bank_branch,
      //   } = this.$data;
      //   await this.saveBankDetailsInStore({
      //     bank_name,
      //     account_name,
      //     bank_branch,
      //   });
      //   this.$store.dispatch("setNextStage", "next-of-kin");
    },
    async sendStoreToFetchBankDetails() {
      // const response = await
    }
  }
});
</script>

<style scoped>
.spinnerParent {
  position: relative;
}

.spinnerParent .spinner {
  position: absolute;
  right: 0;
  top: 0;
}
</style>