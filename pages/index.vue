<template>
  <div class="container">
    <div class="mx-auto my-4">
      <b-tabs content-class="mt-3" fill>
        <b-tab title="Personal" :active="false">
          <PersonalInfo />
        </b-tab>
        <b-tab title="Address" :active="true">
          <AddressInfo />
        </b-tab>
        <b-tab title="Acc Info">
          <BankDetails />
        </b-tab>
        <b-tab title="Next Of Kin">
          <NextOfKin />
        </b-tab>
      </b-tabs>
    </div>

    <div>
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PersonalInfo from "~/components/PersonalInfo.vue";
import AddressInfo from "~/components/AddressInfo.vue";
import BankDetails from "~/components/BankDetails.vue";
import NextOfKin from "~/components/NextOfKin.vue";

export default Vue.extend({
  components: {
    PersonalInfo,
    AddressInfo,
    BankDetails,
    NextOfKin
  },
  mounted() {
    this.toggleModal();
  },

  methods: {
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      (this.$refs["my-modal"] as any).toggle("#toggle-btn");
    },

    hideModal() {
      (this.$refs["my-modal"] as any).hide();
    }
  }
});
</script>

<style>
.btn-secondary {
  width: 50%;
  background-color: white;
  color: rgba(20, 0, 204, 0.789);
  text-align: left;
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

/* .btn-secondary::before {
  content: "";
  position: absolute;
  width: 0%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background: rgba(20, 0, 204, 0.789);
  transform-origin: center;
  transition: all 0.5s ease-in-out;
} */

/* .btn-secondary:hover::before {
  transform: translateX(50px);
  background: rgba(20, 0, 204, 0.789) !important;
  width: 100%;
} */

.sub-main {
  padding-left: 10px;
  color: white;
}
.heading h1 {
  font-size: 3rem;
  line-height: 2.5;
  letter-spacing: 2px;
}

.child-one {
  padding: 1.5rem 0;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
}

.child-one span {
  line-height: 1.1;
  padding: 1rem 0;
  text-align: left;
  letter-spacing: 1px;
  font-size: 1.7rem;
}

.child-one span:last-child {
  font-size: 1.3rem;
}

.modal-content {
  /* transform: translateY(45%); */

  background-image: url(../assets/css/images/smiling-agent3.png);
  background-position: 100px 0;
  background-position: -269px;
  background-size: cover;
  background-repeat: no-repeat;
  /* padding: 0;
  margin: 0; */
}
.modal-body {
  padding: 0;
}

.main {
  min-height: 80vh;
  max-height: 85vh;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  background: linear-gradient(rgba(53 50 76 / 79%), rgba(44 42 62 / 79%));
}
/* .sub-main {
  
} */

.heading,
.child-one,
.footer {
  min-height: 5rem;
}
.modal-header {
  display: none;
  border-bottom: none !important;
}
.modal-footer {
  border-top: none;
  display: none;
}
.close {
  display: none;
}

.footer {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-end;
}

.nav-tabs .nav-link {
  padding: 0.1rem 0.25rem;
}

/* .container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
} */

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
