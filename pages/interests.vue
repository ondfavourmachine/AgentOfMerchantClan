

<template>
  <div class="main">
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
      <!-- <div class="my-div">4</div> -->
    </VueSlickCarousel>

    <div class="img-background">
      <span @click="addInterests" v-if="statusArray.length > 0" class="join-us">
        Next
        <span></span>
      </span>
      <!-- <img src="../assets/css/images/character 6.svg" alt /> -->
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
          e.target.closest(".child").classList.add("selected");
        } else {
          e.target.closest(".child").classList.remove("selected");
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
        console.log(element);
        this.$store.dispatch("setAgentInterests", element);
      });

      this.$router.push("register");
    }
  }
};
</script>

<style >
.main {
  overflow: hidden;
  background: #e5e5e5;
  height: 100vh;
}

.general-parent .sign-in {
  align-self: flex-end;
}

.general-parent .text-home {
  align-self: flex-start;
}

.general-parent {
  width: 92%;
  height: 100px;
  padding: 6px;
  margin: 10px;

  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: center;
}

.text-home {
  width: 99%;
  font-size: 1.3rem;
  padding: 23px 3px 0 11px;
  /* line-height: 3.1; */
  transform: translateY(30px);
}
.my-div {
  height: 200px;
  padding: 15px;
  color: white;
}

.my-div .child {
  border: 1px solid rgba(101, 98, 207, 0.2);
  border-radius: 5px;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: space-between;
  box-shadow: 2px 10px 12px rgb(101, 98, 207, 0.2);
  padding: 2px 4px 0px 4px;
}
.child-inner-first {
  align-self: flex-end;
}

.child-inner-second {
  position: relative;
  height: 70%;
  width: 100%;
  font-weight: 600;
  font-size: 1.05rem;
  color: rgba(101, 98, 207, 1);
  overflow: hidden;
  display: flex;
  flex-direction: row;
}

.child-inner-second img {
  object-fit: contain;
  width: 60%;
  height: 60%;
  position: absolute;
  top: 24px;
  right: -45px;
}

.child-inner-second span {
  align-self: flex-end;
  padding-bottom: 18px;
  font-size: 1.2rem;
}

/* .my-div:first-child {
  margin-right: 20px;
} */

.slick-dots {
  bottom: -14px !important;
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
  top: 2%;
  left: 5%;
  padding: 10px;
}

.img-background .join-us .btn-child {
  top: 11px;
}

.child.selected {
  border: 2px solid rgba(101, 98, 207, 0.6);
  /* padding: 15px; */
}
</style>
