
<template>
  <div class="main-container">
    <div class="parent">
      <div class="child-one">
        <div class="heading">
          <Header />
        </div>
      </div>

      <div class="child-two">
        <nuxt-link to="/settings/personalinfo">
          <div>
            Personal Information
            <span>
              <b-icon-arrow-right></b-icon-arrow-right>
            </span>
          </div>
        </nuxt-link>
        <nuxt-link to="/settings/addressinfo">
          <div>
            Address Information
            <span>
              <b-icon-arrow-right></b-icon-arrow-right>
            </span>
          </div>
        </nuxt-link>

        <nuxt-link to="/settings/bankdetails">
          <div>
            Bank Details
            <span>
              <b-icon-arrow-right></b-icon-arrow-right>
            </span>
          </div>
        </nuxt-link>

        <nuxt-link to="/settings/nextofkin">
          <div>
            Next of Kin
            <span>
              <b-icon-arrow-right></b-icon-arrow-right>
            </span>
          </div>
        </nuxt-link>

        <nuxt-link to="/settings/passportInfo">
          <div>
            Profile Photo
            <span>
              <b-icon-arrow-right></b-icon-arrow-right>
            </span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "~/components/Header.vue";
import {
  BIcon,
  BIconArrowUp,
  BIconArrowDown,
  BIconArrowRight
} from "bootstrap-vue";
export default Vue.extend({
  components: {
    Header,
    BIconArrowRight
  },
  middleware: "authenticated",
  created() {
    this.$store.dispatch("fetchAllStates");
    this.$store.dispatch("fetchAllBanks");
  }
});
</script>

<style scoped>
.parent {
  grid-template-rows: 10vh 65vh 15vh;
  grid-gap: 0px;
}

div.child-two {
  grid-row: 2/3;
  padding: 12px;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  align-items: center;
  grid-gap: 5px;
}
div.child-two div {
  color: rgba(20, 0, 204, 0.789);
  border-radius: 5px;
  border: 1px solid rgba(101, 98, 207, 0.2);
  box-shadow: 2px 10px 12px rgba(101, 98, 207, 0.2);
  padding: 15px;
  max-width: 100%;
}

div.child-two div:nth-child(1) {
  /* justify-content: center; */
  grid-row: 1/2;
  display: flex;
  justify-content: space-between;
}
div.child-two div:nth-child(2) {
  grid-row: 2/3;
  display: flex;
  justify-content: space-between;
}
div.child-two div:nth-child(3) {
  grid-row: 3/4;
  display: flex;
  justify-content: space-between;
}
div.child-two div:nth-child(4) {
  grid-row: 4/5;
  display: flex;
  justify-content: space-between;
}
div.child-two div:nth-child(5) {
  grid-row: 5/6;
  display: flex;
  justify-content: space-between;
}

div.child-two div span {
  color: rgba(20, 0, 204, 0.789);
}
</style>