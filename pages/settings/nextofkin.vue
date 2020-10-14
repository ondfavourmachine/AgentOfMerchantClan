<template>
  <div class="main-container">
    <div class="parent">
      <div class="child-one">
        <div class="heading">
          <Header />
        </div>
      </div>

      <div class="child-two">
        <p class="heading-title">Next of Kin Information</p>
        <b-form @submit.prevent="onSubmitForm">
          <b-form-group id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="nok_name"
              required
              placeholder="Name eg: John Ciroma"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model.lazy="nok_relationship"
              required
              placeholder="Relationship: eg Sister"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="nok_address"
              required
              placeholder="Addess eg: 13, St John Street Ijesha"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-16" label-for="input-16">
            <b-form-input
              id="input-16"
              v-model="nok_suburb"
              required
              placeholder="Suburb eg: Somolu"
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-select v-model="nok_state" :options="options"></b-form-select>
          </b-form-group>

          <b-form-group id="input-group-17" label-for="input-17">
            <b-form-input
              id="input-17"
              v-model="nok_postcode"
              required
              placeholder="Post code: eg 10020"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-18" label-for="input-18">
            <b-form-input
              id="input-18"
              v-model.number="nok_home_phone"
              required
              placeholder="Home phone: eg 08033445059"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-19" label-for="input-19">
            <b-form-input
              id="input-19"
              v-model.number="nok_mobile"
              required
              placeholder="Mobile no: eg 090334567890"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model.lazy="nok_work"
              required
              placeholder="Work: eg Banker"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model.lazy="employee_signature"
              placeholder="Signature: eg nuc@sahwn.com"
            ></b-form-input>
          </b-form-group>

          <div>
            <label for="example-datepicker-5">Date Signed</label>
            <b-form-datepicker id="example-datepicker-5" v-model="date_signed" class="mb-2"></b-form-datepicker>
          </div>

          <b-button class="mt-3" type="submit" variant="primary">
            Submit
            <span class="btn-child"></span>
          </b-button>
        </b-form>
      </div>
    </div>
    <Spinner v-if="apiCall" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "~/components/Header.vue";
import Spinner from "~/components/Spinner.vue";
import { mapState } from "vuex";

export default Vue.extend({
  components: {
    Header,
    Spinner
  },
  data() {
    return {
      nok_name: "",
      nok_relationship: "",
      nok_address: "",
      nok_suburb: "",
      nok_state: null,
      options: [{ value: null, text: "Please select a state" }],
      nok_postcode: "",
      nok_home_phone: "",
      nok_mobile: "",
      nok_work: "",
      employee_signature: "",
      date_signed: ""
    };
  },

  computed: {
    ...mapState(["apiCall"])
  },

  methods: {
    onSubmitForm(e: Event) {
      console.log(e);
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

.btn-primary,
.btn-primary.disabled,
.btn-primary:disabled {
  width: 26%;
}
</style>