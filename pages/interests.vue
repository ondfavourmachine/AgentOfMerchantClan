

<template>
  <!-- <div class="main">
    <div class="general-parent">
      <div class="sign-in">
        <nuxt-link to="/login">
          <a style="color: rgba(20, 0, 204, 0.789)">Sign in</a>
        </nuxt-link>
      </div>
      <div class="text-home">What are you interested in?</div>
    </div>

    <VueSlickCarousel style="margin: 10px;" :dots="true" v-bind="setting">
      <div class="my-div">
        <div class="child">
          <div class="child-inner-first">
            <b-form-checkbox
              id="checkbox-1"
              v-model="status"
              name="checkbox-1"
              value="merchant acquisition"
              unchecked-value="not_accepted"
            ></b-form-checkbox>
          </div>

          <div class="child-inner-second">
            <span>Merchant Acquisition</span>
            <img src="../assets/css/images/seller.svg" alt />
          </div>
        </div>
      </div>
      <div class="my-div">
        <div class="child">
          <div class="child-inner-first">
            <b-form-checkbox
              id="checkbox-2"
              v-model="status"
              name="checkbox-2"
              value="collection"
              unchecked-value="not_accepted"
            ></b-form-checkbox>
          </div>

          <div class="child-inner-second">
            <span>Collections</span>
            <img src="../assets/css/images/collect.svg" alt />
          </div>
        </div>
      </div>
      <div class="my-div">
        <div class="child">
          <div class="child-inner-first">
            <b-form-checkbox
              id="checkbox-3"
              v-model="status"
              name="checkbox-3"
              value="avs"
              unchecked-value="not_accepted"
            ></b-form-checkbox>
          </div>

          <div class="child-inner-second">
            <span style="font-size: 1.7rem;">AVS</span>
            <img src="../assets/css/images/clipboard.svg" alt />
          </div>
        </div>
      </div>
    </VueSlickCarousel>

    <div class="img-background">
      <span @click="addInterests" v-if="statusArray.length > 0" class="join-us">
        Next
        <span></span>
      </span>
      <img src="../assets/css/images/character 6.svg" alt />
    </div>
  </div>-->

  <div class="main-container">
    <div class="parent">
      <div class="child-one">
        <div class="heading">
          <nuxt-link to="/login">
            <a style="color: rgba(20, 0, 204, 0.789)">Sign in</a>
          </nuxt-link>
        </div>
      </div>

      <div class="child-two">
        <div class="sub sub-one">
          Merchant Acquisition
          <span>
            <b-form-checkbox
              id="checkbox-1"
              v-model="status"
              name="checkbox-1"
              value="merchant acquisition"
              unchecked-value="not_accepted"
            ></b-form-checkbox>
          </span>
        </div>

        <div class="sub sub-two">
          Collections
          <span>
            <b-form-checkbox
              id="checkbox-2"
              v-model="status"
              name="checkbox-2"
              value="collection"
              unchecked-value="not_accepted"
            ></b-form-checkbox>
          </span>
        </div>

        <div class="sub sub-three">
          Address Verification System
          <span>
            <b-form-checkbox
              id="checkbox-3"
              v-model="status"
              name="checkbox-3"
              value="avs"
              unchecked-value="not_accepted"
            ></b-form-checkbox>
          </span>
        </div>
      </div>
      <div class="child-three">
        <div class="img-background">
          <span @click="addInterests" v-if="statusArray.length > 0" class="join-us">
            Next
            <span></span>
          </span>
          <img src="../assets/css/images/character 6.svg" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script  >
import Vue from "vue";
import { mapState } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  components: { VueSlickCarousel },
  mounted() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(element => {
      element.addEventListener("change", e => {
        if (this.status.indexOf(e.target.value) != -1) {
          e.target.closest(".sub").classList.add("selected");
        } else {
          e.target.closest(".sub").classList.remove("selected");
        }
      });
    });
  },

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
      },
      status: []
    };
  },

  computed: {
    ...mapState({
      selectedInterests: "agentsInterest"
    }),
    statusArray() {
      return this.status;
    }
  },

  methods: {
    async addInterests(e) {
      // console.log(e);
      // const element = document.getElementById(e);
      // console.log(element);
      this.statusArray.forEach(element => {
        if (element == "avs") {
          this.$store.dispatch("setAgentInterests", "1");
        }
        if (element == "collection") {
          this.$store.dispatch("setAgentInterests", "2");
        }
        if (element == "merchant acquisition") {
          this.$store.dispatch("setAgentInterests", "3");
        }
      });

      this.$router.push("register");
    }
  }
};
</script>

<style scoped >
.main {
  overflow: hidden;
  /* background: #e5e5e5; */
  height: 100vh;
}

.parent {
  grid-template-rows: 10vh 40vh 45vh;
}

div.child-two {
  grid-row: 2/3;
  padding: 12px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  grid-gap: 5px;
}
div.child-two .sub-one,
div.child-two .sub-two,
div.child-two .sub-three {
  color: rgba(20, 0, 204, 0.789);
  border-radius: 5px;
  border: 1px solid rgba(101, 98, 207, 0.2);
  box-shadow: 2px 10px 12px rgba(101, 98, 207, 0.2);
  padding: 15px;
  max-width: 100%;
}

div.child-two .sub-one {
  /* justify-content: center; */
  grid-row: 1/2;
  display: flex;
  justify-content: space-between;
}
div.child-two .sub-two {
  grid-row: 2/3;
  display: flex;
  justify-content: space-between;
}
div.child-two .sub-three {
  grid-row: 3/4;
  display: flex;
  justify-content: space-between;
}

div.child-two div span {
  color: rgba(20, 0, 204, 0.789);
}

.img-background {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 10px;
  height: 300px;
}

.img-background .join-us {
  position: absolute;
  width: 67px;
  top: -15px;
  left: 5%;
  padding: 10px;
}

.img-background .join-us .btn-child {
  top: 11px;
}

.sub.selected {
  border: 2px solid rgba(101, 98, 207, 0.6) !important;
  /* padding: 15px; */
}

.heading {
  justify-content: flex-end;
  padding-right: 20px;
  padding-bottom: 10px;
}
</style>
