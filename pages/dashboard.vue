
<template>
  <div class="main-container">
    <div class="parent">
      <div class="child-one">
        <Header />

        <div class="other-stuff" style>
          <div class="settings">
            <!-- ../assets/css/images/settings.svg -->
            <div @click="routeToSettings" class="holder">
              <span class="settings-img">
                <img src="../assets/css/images/settings-colored.svg" alt />
              </span>
              <span class="text">Settings</span>
            </div>
          </div>
          <div class="my-merchant">
            <div class="holder">
              <span class="seller-img">
                <img src="../assets/css/images/seller.svg" alt />
              </span>
              <span class="text">My Merchants</span>
            </div>
          </div>
        </div>
      </div>
      <div class="child-two">
        <div class="child-two-parent">
          <div class="sub-one">
            <div class="sub-one-holder">
              <span>
                <img src="../assets/css/images/collect.svg" alt />
              </span>
              <span>Commissions</span>
            </div>
          </div>
          <div class="sub-two">
            <div class="sub-two-holder">
              <span>
                <img src="../assets/css/images/clipboard.svg" alt />
              </span>
              <span>AVS</span>
            </div>
          </div>
        </div>
      </div>
      <div class="child-three">
        <h3 class="recent">Recent Activities</h3>
        <div class="my-table-container">
          <div>
            <b-table striped hover :items="items"></b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "~/components/Header.vue";

export default Vue.extend({
  components: {
    Header
  },

  middleware: "authenticated",
  data() {
    return {
      items: [
        { "m-ID": 40, Type: "Sales", time: "4:23pm" },
        { "m-ID": 42, Type: "Repayment", time: "1:23pm" },
        { "m-ID": 32, Type: "Order", time: "2:23pm" },
        { "m-ID": 62, Type: "Order", time: "1:43pm" }
      ]
    };
  },

  methods: {
    routeToSettings() {
      this.$router.push("/settings");
    }
  }
});
</script>

<style scoped>
.holder {
  cursor: pointer;
}
</style>