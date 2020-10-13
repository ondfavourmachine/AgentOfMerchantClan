<template>
  <div>
    <p class="heading-title">Personal Details</p>
    <b-form>
      <!-- title -->
      <b-form-group id="input-group-2" label-for="input-2">
        <b-form-input id="input-2" v-model="title" required placeholder="Title eg: Mr/Mrs/Miss"></b-form-input>
      </b-form-group>
      <!-- first name -->
      <b-form-group id="input-group-1" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="first_name"
          type="email"
          required
          placeholder="First name: eg Tosin"
        ></b-form-input>
      </b-form-group>
      <!-- Last Name -->
      <b-form-group id="input-group-2" label-for="input-2">
        <b-form-input id="input-2" v-model="last_name" required placeholder="Last name:eg Chukwuma"></b-form-input>
      </b-form-group>
      <!-- Gender -->
      <b-form-group label="Gender">
        <b-form-radio v-model="gender" name="some-radios-1" value="1">Male</b-form-radio>
        <b-form-radio v-model="gender" name="some-radios-2" value="2">Female</b-form-radio>
      </b-form-group>
      <!--  Date of Birth -->
      <div>
        <label for="example-datepicker">Date of birth</label>
        <b-form-datepicker id="example-datepicker" v-model="date_of_birth" class="mb-2"></b-form-datepicker>
        <!-- <p>Value: '{{ dateOfBirth }}'</p> -->
      </div>

      <!-- Start Date -->
      <div>
        <label for="example-datepicker-1">Start Date</label>
        <b-form-datepicker id="example-datepicker-1" v-model="start_date" class="mb-2"></b-form-datepicker>
        <!-- <p>Value: '{{ startDate }}'</p> -->
      </div>

      <b-button
        class="mt-1"
        :disabled="!$data.date_of_birth || !$data.first_name || !$data.last_name || !$data.gender || !$data.title || !$data.start_date "
        @click="handleSubmitOfPersonalInfo"
        type="button"
        variant="primary"
      >
        Next
        <span
          :class="!$data.date_of_birth 
        || !$data.first_name || 
        !$data.last_name || 
        !$data.gender || !$data.title || !$data.start_date  ? '': 'btn-child'"
        ></span>
      </b-button>
      <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
       <pre class="m-0">{{ form }}</pre> 
    </b-card>-->
  </div>
</template>




<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

interface PersonalData {
  first_name: string;
  last_name: string;
  gender: string;
  title: string;
  date_of_birth: string;
  start_date: string;
}

export default Vue.extend({
  data(): PersonalData {
    return {
      first_name: "",
      last_name: "",
      gender: "",
      title: "",
      date_of_birth: "",
      start_date: ""
    };
  },

  methods: {
    ...mapActions({
      savePersonalDetailsInStore: "setPersonalDetails"
    }),

    async handleSubmitOfPersonalInfo(e: Event) {
      const {
        date_of_birth,
        start_date,
        first_name,
        last_name,
        title,
        gender
      } = this.$data;
      await this.savePersonalDetailsInStore({
        date_of_birth,
        start_date,
        first_name,
        last_name,
        title,
        gender
      });
      this.$store.dispatch("setNextStage", "address");
    }
  }
});
</script>

<style>
.custom-control {
  display: inline-block;
}

.btn-primary {
  background-color: white;
  color: rgba(20, 0, 204, 0.789);
  text-align: left;
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
}
</style>

