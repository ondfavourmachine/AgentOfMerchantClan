<template>
  <div class="container">
    <div class="picture-container">
      <img src="../assets/css/images/working-laptop.svg" style="width: 100%; height: 100%;" alt />
    </div>

    <div class="content-page">
      <div class="welcome-section">
        <div class="company-logo">
          <span style>
            <img src alt />
          </span>
          <nuxt-link to="/login">
            <a>Sign in</a>
          </nuxt-link>
        </div>

        <div class="welcome-text">
          <span>Welcome</span>
          <small>to</small>
          <p>Agents of MerchantClan</p>

          <span @click="gotoInterests" class="join-us">
            Join Us
            <span class="btn-child"></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

interface Bank {
  bank_id: string;
  bank_name: string;
}
export default Vue.extend({
  components: {},

  computed: {
    ...mapState({
      tabToShow: "currentState"
    })
  },

  methods: {
    ...mapActions({
      closeAndBegin: "setNextStage"
    }),
    gotoInterests() {
      this.$router.push("interests");
    }
  }
});
</script>

<style>
</style>
