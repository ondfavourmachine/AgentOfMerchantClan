
<template>
  <div>
    <VueSlickCarousel :arrows="true" v-bind="setting">
      <div class="my-div">1</div>
      <div class="my-div">2</div>
      <div class="my-div">3</div>
      <!-- <div class="my-div">4</div> -->
    </VueSlickCarousel>
  </div>
</template>

<script  >
import Vue from "vue";
// import 'vue-slick-carousel/dist/slick.css'
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  components: { VueSlickCarousel },

  data() {
    return {
      pageLoaded: true,
      setting: {
        dots: true,
        arrows: false,
        dotsClass: "slick-dots custom-dot-class",
        edgeFriction: 0.35,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    };
  },

  // head() {
  //   return {
  //     script: [
  //       {
  //         vmid: "carousel",
  //         src: "https://unpkg.com/vue-slick-carousel",
  //         callback: () => {
  //           this.pageLoaded = true;
  //         }
  //         // Changed after script load
  //       }
  //     ]
  //   };
  // },

  methods: {}
};
</script>

<style scoped>
.my-div {
  height: 200px;

  background: black;
  color: white;
  border: 1px solid white;
}

.my-div:first-child {
  margin-right: 20px;
}
</style>