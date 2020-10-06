<template>
  <div>
    <p class="heading-title">Bank Account Details</p>
    <b-form>
      <!-- Bank Name -->
      <b-form-group>
        <b-form-select v-model="bank_name" :options="options"></b-form-select>
      </b-form-group>

      <!-- account number -->
      <b-form-group id="input-group-5" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model.number="account_number"
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
          v-model.number="account_name"
          required
          disabled
          readonly
          placeholder="Account name"
        ></b-form-input>
      </b-form-group>

      <b-button class="mt-3" type="button" variant="primary">
        Next
        <span class="btn-child"></span>
      </b-button>
    </b-form>

    <!-- <pre class="mt-3 mb-0">{{ text }}</pre> -->
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      bank_name: null,
      account_name: "",
      account_number: "",
      bank_branch: "",
      options: [{ value: null, text: "Please select a bank" }]
    };
  }
});
</script>

<style scoped>
</style>