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
import PersonalInfo from "~/components/PersonalInfo.vue";
import AddressInfo from "~/components/AddressInfo.vue";
import BankDetails from "~/components/BankDetails.vue";
import NextOfKin from "~/components/NextOfKin.vue";
import { mapState, mapActions } from "vuex";
// import axios from "@nuxtjs/axios";

interface Bank {
  bank_id: string;
  bank_name: string;
}
export default Vue.extend({
  created() {
    this.$store.dispatch("fetchAllBanks");
    this.$store.dispatch("fetchAllStates");
  },
  components: {
    PersonalInfo,
    AddressInfo,
    BankDetails,
    NextOfKin
  },

  computed: {
    ...mapState({
      tabToShow: "currentState"
    })
  },
  mounted() {
    // this.toggleModal();
  },

  methods: {
    ...mapActions({
      closeAndBegin: "setNextStage"
    }),
    gotoInterests() {
      this.$router.push("interests");
    },
    // toggleModal() {
    //   // We pass the ID of the button that we want to return focus to
    //   // when the modal has hidden
    //   (this.$refs["my-modal"] as any).toggle("#toggle-btn");
    // },

    setTabToShow(e: Event) {
      const textContent: any = (e.target as HTMLLIElement).textContent;
      if ((textContent as string).toLowerCase() == "personal") {
        this.$store.commit("changeCurrentState", "personal");
      }

      if ((textContent as string).toLowerCase() == "address") {
        this.$store.commit("changeCurrentState", "address");
      }

      if ((textContent as string).toLowerCase() == "acc info") {
        this.$store.commit("changeCurrentState", "bank-details");
      }

      if ((textContent as string).toLowerCase() == "next of kin") {
        this.$store.commit("changeCurrentState", "next-of-kin");
      }
    },

    async hideModal() {
      try {
        await this.closeAndBegin("personal");
        (this.$refs["my-modal"] as any).hide();
      } catch (err) {
        console.log(err);
      }
    }
  }
});
</script>

<style>
</style>
