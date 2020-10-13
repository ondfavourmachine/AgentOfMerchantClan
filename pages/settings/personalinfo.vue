<template>
  <div class="main-container">
    <div class="parent">
      <div class="child-one">
        <div class="heading">
          <Header />
        </div>
      </div>

      <div class="child-two">
        <p class="heading-title">Personal Details</p>
        <b-form>
          <b-form-group id="input-group-2" label-for="input-2">
            <b-form-input id="input-2" v-model="title" required placeholder="Title eg: Mr/Mrs/Miss"></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="first_name"
              type="email"
              required
              placeholder="First name: eg Tosin"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="last_name"
              required
              placeholder="Last name:eg Chukwuma"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Gender">
            <b-form-radio v-model="gender" name="some-radios-1" value="1">Male</b-form-radio>
            <b-form-radio v-model="gender" name="some-radios-2" value="2">Female</b-form-radio>
          </b-form-group>

          <div>
            <label for="example-datepicker">Date of birth</label>
            <b-form-datepicker id="example-datepicker" v-model="date_of_birth" class="mb-2"></b-form-datepicker>
          </div>

          <div>
            <label for="example-datepicker-1">Start Date</label>
            <b-form-datepicker id="example-datepicker-1" v-model="start_date" class="mb-2"></b-form-datepicker>
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
        </b-form>
      </div>
    </div>
    <Spinner v-if="myApiCall" />
  </div>
</template>




<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import Header from "~/components/Header.vue";
import Spinner from "~/components/Spinner.vue";

interface PersonalData {
  first_name: string;
  last_name: string;
  gender: string;
  title: string;
  date_of_birth: string;
  start_date: string;
}

export default Vue.extend({
  components: {
    Header,
    Spinner
  },
  created() {},
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
  computed: {
    ...mapState({
      myApiCall: "apiCall",
      currentUser: "user",
      agentUrl: "url"
    })
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
      console.log(this.currentUser);
      // this.$store.dispatch("setNextStage", "address");
      this.$store.dispatch("setApiCallState", true);
      const formData = new FormData();

      for (let key in this.currentUser) {
        formData.append(`${key}`, this.currentUser[key]);
      }
      try {
        const response = await fetch(`${this.agentUrl}agent/settings`, {
          body: formData,
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
  /* border-radius: 5px; */
  max-width: 100%;
}

.btn-primary,
.btn-primary.disabled,
.btn-primary:disabled {
  width: 26%;
}
.custom-control {
  display: inline-block;
}
</style>

