


<template>
  <div class="main-container position-relative">
    <div class="parent">
      <div class="child-one">
        <Header />
      </div>

      <div class="child-two">
        <div class="row">
          <div class="col-12 py-2 mb-1 myborder">
            <div class="mb-2 font-weight-bold d-flex justify-content-between">
              Gabriel Spencer
              <h5>
                <b-badge pill variant="primary">view</b-badge>
              </h5>
            </div>
            <div class="d-flex justify-content-between font-weight-bold">
              <span>
                <b-icon icon="telephone-fill" class="mr-2"></b-icon>04817123882
              </span>
              <span>
                <b-icon icon="mailbox" class="mr-2"></b-icon>ondfavour@yahoo.com
              </span>
            </div>
          </div>
          <!-- <div class="col-12 py-2 mb-1"></div>
          <div class="col-12 py-2 mb-1"></div>-->
        </div>
      </div>
    </div>
    <BottomNav />
  </div>
</template>

<script>
import Vue from "vue";
import Header from "~/components/Header.vue";
import BottomNav from "~/components/BottomNav.vue";
import { BIcon } from "bootstrap-vue";

export default Vue.extend({
  components: {
    Header,
    BottomNav,
    BIcon
  },
  middleware: "authenticated"
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
  /* display: grid;
  grid-template-rows: repeat(5, 1fr);
  align-items: center;
  grid-gap: 5px; */
}

.myborder {
  border: 1px solid rgba(101, 98, 207, 0.2);
  box-shadow: 2px 10px 12px rgba(101, 98, 207, 0.2);
}
</style>