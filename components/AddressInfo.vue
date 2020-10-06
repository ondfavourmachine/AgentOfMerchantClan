<template>
  <div>
    <p class="heading-title">Address and Contact Information</p>
    <b-form>
      <b-form-group id="input-group-5" label-for="input-5">
        <b-form-input id="input-5" v-model="address" required placeholder="Address"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model.lazy="suburb"
          required
          placeholder="Suburb: eg Victoria Island"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-select v-model="state">
          <b-form-select-option value>Please select a state</b-form-select-option>
          <b-form-select-option
            v-for="computedState in computedNigerianStates"
            :key="computedState.id"
            :value="computedState.name"
          >{{ computedState.name }}</b-form-select-option>
        </b-form-select>
      </b-form-group>

      <b-form-group id="input-group-5" label-for="input-5">
        <b-form-input id="input-5" v-model="postcode" required placeholder="Post code: eg 10020"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model.number="home_phone"
          required
          placeholder="Home phone: eg 08033445059"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model.number="mobile"
          required
          placeholder="Mobile no: eg 090334567890"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model.lazy="email"
          required
          placeholder="Email: eg nuc@sahwn.com"
        ></b-form-input>
      </b-form-group>

      <b-button class="mt-3" type="button" variant="primary">
        Next
        <span class="btn-child"></span>
      </b-button>
    </b-form>

    <!-- <pre class="mt-3 mb-0">{{ stateFromServer }}</pre> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

interface AddressData {
  address: string;
  state: null | string;
  suburb: string;
  home_phone: string;
  postcode: string;
  phone: string;
  email: string;
  mobile: string;
  nigerianStates: any[];
}

export default Vue.extend({
  data(): AddressData {
    return {
      address: "",
      state: "",
      suburb: "",
      home_phone: "",
      postcode: "",
      phone: "",
      email: "",
      mobile: "",
      nigerianStates: []
    };
  },

  computed: {
    ...mapState({
      stateFromServer: "states"
    }),

    computedNigerianStates(): any[] {
      this.nigerianStates = [...this.stateFromServer];
      return this.nigerianStates;
    }
  }
});
</script>

<style>
</style>