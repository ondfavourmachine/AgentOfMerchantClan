<template>
  <div class="container">
    <!-- <div class="mx-auto my-4">
      <b-tabs content-class="mt-3" fill>
        <b-tab
          @click="setTabToShow"
          class="personal"
          title="Personal"
          :active="tabToShow == 'personal'"
        >
          <PersonalInfo />
        </b-tab>
        <b-tab title="Address" @click="setTabToShow" id="address" :active="tabToShow == 'address'">
          <AddressInfo />
        </b-tab>
        <b-tab
          title="Acc Info"
          @click="setTabToShow"
          id="bank-details"
          :active="tabToShow == 'bank-details'"
        >
          <BankDetails />
        </b-tab>
        <b-tab
          title="Next Of Kin"
          @click="setTabToShow"
          id="next-of-kin"
          :active="tabToShow == 'next-of-kin'"
        >
          <NextOfKin />
        </b-tab>
      </b-tabs>
    </div>-->

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

          <span class="join-us">
            Join Us
            <span class="btn-child"></span>
          </span>
        </div>
      </div>
    </div>

    <!-- <div>
      <b-button v-b-modal.modal-center @click="toggleModal" hidden>Launch centered modal</b-button>

      <b-modal ref="my-modal" id="modal-center" centered title>
        <div class="main">
          <div class="sub-main">
            <div class="heading">
              <h1>Welcome</h1>
            </div>

            <div class="child-one">
              <span>We are happy to help you become an agent on MerchantClan.</span>
              <br />

              <span>Please click the button below to continue.</span>
            </div>

            <p class="footer">
              <b-button @click="hideModal">
                Continue
                <span class="btn-child"></span>
              </b-button>
            </p>
          </div>
        </div>
      </b-modal>
    </div>-->
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
.container {
  height: 100vh;
  width: 100vw;
  position: relative;
  background-color: #e5e5e5;
}
.picture-container {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 395px;
  width: 207px;

  /* background-repeat: no-repeat;
  background-size: cover;
  background-position: 70% 100%; */
}

.picture-container img {
  object-fit: cover;
}
/* .picture-container .content-page {
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  width: 100%;
} */

.welcome-section {
  position: absolute;
  display: grid;
  height: 90vw;
  padding: 10px;
  /* border: 1px solid white; */
  grid-template-rows: 90px 300px 150px;
  justify-content: start;
  z-index: 10;
}

.company-logo {
  grid-row: 1/2;
  padding: 10px 7px 10px 7px;
  display: flex;
  justify-content: space-between;
}

.welcome-text {
  grid-row: 2/3;
  padding: 10px 7px 10px 7px;
  font-size: 2rem;
  color: white;
  line-height: 1.2;
}

.welcome-text p {
  color: #6562cf;
}

.welcome-text span {
  font-size: 1.25rem;
  line-height: 0.5;
  color: black;
}

.welcome-text small {
  font-size: 1.1rem;
  line-height: 0.5;
  color: black;
}

.join-us {
  width: 150px;
  border: 1px solid black;
  position: relative;
  padding: 15px 50px 15px 10px;
  border-radius: 29px;
  cursor: pointer;
}

.company-logo a {
  cursor: pointer;
}

@keyframes continuousSlide {
  0% {
    transform: translateY(10px) translateX(-6px);
  }
  50% {
    transform: translateY(10px) translateX(0px);
  }
  100% {
    transform: translateY(10px) translateX(7px);
  }
}
</style>
