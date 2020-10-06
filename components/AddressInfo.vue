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
        <b-form-select v-model="state" :options="options"></b-form-select>
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

    <!-- <pre class="mt-3 mb-0">{{ text }}</pre> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      address: "",
      state: null,
      suburb: "",
      home_phone: "",
      postcode: "",
      phone: "",
      email: "",
      mobile: "",
      options: [{ value: null, text: "Please select a state" }]
    };
  }
});
</script>

<style>
</style>