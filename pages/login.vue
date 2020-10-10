

<template>
  <div>
    <p class="heading-title">Sign in</p>
    <b-form>
      <!-- Username -->
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

      <!-- password -->
      <b-form-group id="input-group-5" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model.lazy="bank_branch"
          required
          placeholder="Bank branch: eg Victoria Island"
        ></b-form-input>
      </b-form-group>

      <!--   :disabled="!bank_name || !account_number || !account_name || !bank_branch"  -->
      <b-button class="mt-3" type="button" variant="primary">
        Sign in
        <!-- <span class="btn-child"></span> -->
      </b-button>
    </b-form>

    <!-- <pre class="mt-3 mb-0">{{ $data }}</pre> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      bank_branch: "",
      account_number: ""
    };
  }
});
</script>

<style>
</style>