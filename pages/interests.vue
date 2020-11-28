

<template>
  <div class="main-container">
    <div class="parent">
      <div class="child-one">
        <div class="heading">
          <nuxt-link to="/login">
            <a class="signin">Sign in</a>
          </nuxt-link>
        </div>
      </div>

      <no-ssr>
        <div class="child-two">
          <p class="heading-title-paragraph">What are you interested in?</p>
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
      </no-ssr>
      <div class="child-three">
        <div class="img-background">
          <span @click="addInterests" v-if="statusArray.length > 0" class="join-us">
            Next
            <span></span>
          </span>
          <img src="../assets/css/images/modified-character-6.svg" alt />
        </div>
      </div>
    </div>
    <!-- Welcome modal    @click="showModal($event)" -->
    <div>
      <b-button ref="modalCtrl" v-b-modal.modal-lg variant="primary" hidden>lg modal</b-button>

      <b-modal ref="infoModal" hide-footer id="modal-lg" size="lg" title>
        <VueSlickCarousel style="margin: 1px;" v-bind="setting">
          <div style>
            <div class="row pl-3">
              <div class="col-12">
                <div style>
                  <img
                    class="img-fluid"
                    style="max-width: 200px;"
                    src="../assets/css/images/welcome-1.svg"
                    alt
                  />

                  <h4 class="title mt-5 font-weight-bold text-center">Welcome</h4>
                  <p
                    class="text-center mb-3"
                    style="max-width: 400px; margin: auto; "
                  >Joining our agent program can be very lucative!. Swipe to see how you can be part of this amazing program.</p>
                </div>
              </div>
            </div>
          </div>
          <div style>
            <div class="row pl-3">
              <div class="col-12">
                <div style>
                  <img
                    class="img-fluid"
                    style="max-width: 150px;"
                    src="../assets/css/images/select-task.svg"
                    alt
                  />

                  <h4 class="title mt-5 font-weight-bold text-center">Make your choice!</h4>
                  <p
                    class="text-center mb-3"
                    style="max-width: 400px; margin: auto; "
                  >Select your preferred interest. You can opt to participate an AVS, Merchant acquisition or Collections agents. You can choose all options too!</p>
                </div>
              </div>
            </div>
          </div>
          <div style>
            <div class="row pl-3">
              <div class="col-12">
                <div style>
                  <img class="img-fluid" src="../assets/css/images/register.svg" alt />

                  <h4 class="title mt-5 font-weight-bold text-center">Register with us</h4>
                  <p
                    class="text-center mb-3"
                    style="max-width: 400px; margin: auto; "
                  >Enter a few details so that we can get to know you more.</p>
                </div>
              </div>
            </div>
          </div>
          <div style>
            <div class="row pl-3">
              <div class="col-12">
                <div style>
                  <img class="img-fluid" src="../assets/css/images/Ready-lets-go.svg" alt />

                  <h4 class="title mt-5 font-weight-bold text-center">Ready to join us?</h4>
                  <p
                    class="text-center mb-3"
                    style="max-width: 400px; margin: auto; "
                  >When you are ready click the button below</p>

                  <button
                    @click.once.stop="hideModal($event)"
                    class="btn btn-block custom-btn-color mt-1"
                  >Continue</button>
                </div>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
      </b-modal>
    </div>
  </div>
</template>

<script  >
import Vue from "vue";
import { mapState } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
// import BottomNav from '~/components/BottomNav.vue';

export default {
  components: {
    VueSlickCarousel
  },
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
    this.showModal();
  },

  beforeUpdate() {},

  data() {
    return {
      setting: {
        dots: true,
        arrows: false,
        dotsClass: "slick-dots custom-dot-class",
        edgeFriction: 0.35,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        adaptiveHeight: true
      },
      pageLoaded: true,
      showTutorial: true,
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
    hideModal(event) {
      this.$refs["infoModal"].hide();
    },
    showModal(event) {
      this.$refs["infoModal"].show();
    },
    async addInterests(e) {
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
  position: relative;
}

div.child-two {
  grid-row: 2/3;
  padding: 12px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  grid-gap: 5px;
}
.heading-title-paragraph {
  position: absolute;
  top: 9%;
  text-align: center;
  left: 3%;
  width: 100%;
  font-size: 1.2rem;
  font-weight: bold;
}

div.child-two .sub-one,
div.child-two .sub-two,
div.child-two .sub-three {
  color: rgba(20, 0, 204, 1);
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

h4 {
  color: #1400cc;
}

.custom-btn-color {
  background-color: #cad2e1;
  color: #1400cc;
  cursor: pointer;
}
</style>
