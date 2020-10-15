
<template>
  <!-- ../assets/css/images/settings.svg -->
  <div class="main-container">
    <div class="parent">
      <div class="child-one">
        <Header />

        <div class="other-stuff" style>
          <p>My Merchants</p>
          <p>
            <button class="view">View</button>
          </p>
          <div>
            <img src="../assets/css/images/seller.svg" alt />
          </div>

          <!-- <div class="settings">
            
            <div @click="routeToSettings" class="holder">
              <span class="settings-img">
                <img src="../assets/css/images/settings-colored.svg" alt />
              </span>
              <span class="text">Settings</span>
            </div>
          </div>-->
          <!-- <div class="my-merchant">
            <div class="holder">
              <span class="seller-img">
                <img src="../assets/css/images/seller.svg" alt />
              </span>
              <span class="text">My Merchants</span>
            </div>
          </div>-->
        </div>
      </div>
      <div class="child-two">
        <div class="child-two-parent">
          <!-- <div class="sub-one">
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
          </div>-->

          <VueSlickCarousel :dots="true" v-bind="setting">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </VueSlickCarousel>
        </div>
      </div>
      <div class="child-three">
        <!-- <h3 class="recent">Recent Activities</h3>
        <div class="my-table-container">
          <div>
            <b-table striped hover :items="items"></b-table>
          </div>
        </div>-->
      </div>

      <div class="child-four"></div>
    </div>
  </div>
</template>

<script >
import Vue from "vue";
import Header from "~/components/Header.vue";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  components: {
    Header,
    VueSlickCarousel
  },

  middleware: "authenticated",
  data() {
    return {
      setting: {
        dots: true,
        arrows: false,
        dotsClass: "slick-dots custom-dot-class",
        edgeFriction: 0.35,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    };
  },

  methods: {
    routeToSettings() {
      this.$router.push("/settings");
    }
  }
};
</script>

<style scoped>
.holder {
  cursor: pointer;
}
</style>