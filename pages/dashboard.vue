
<template>
  <div class="main-container position-relative">
    <div class="parent">
      <div class="child-one">
        <Header />

        <div class="other-stuff" style>
          <p>My Merchants</p>
          <p>
            <nuxt-link to="/mymerchants">
              <button class="view">View</button>
            </nuxt-link>
          </p>
          <div>
            <img src="../assets/css/images/seller.svg" alt />
          </div>
        </div>
      </div>
      <div class="child-two">
        <VueSlickCarousel style="margin: 1px;" v-bind="setting">
          <div class="one" style>
            <p class="one-child-paragraph">
              <img src="../assets/css/images/block-user.svg" alt />
            </p>
            <p class="one-child-text">Account verification pending</p>
          </div>
          <div class="two" style>
            <p class="two-child-paragraph">
              <img src="../assets/css/images/merchant_1.svg" alt />
            </p>
            <p class="two-child-text">
              <span>{{ dashboardData.onboarded_merchants_count || 0 }}</span>
              <span>Merchants</span>
            </p>
          </div>
          <div class="third" style>
            <p class="third-child-paragraph">
              <img src="../assets/css/images/filled.svg" alt />
            </p>
            <p class="third-child-text">
              <span>{{ formatNumber(dashboardData.merchant_transactions) || 0 }}</span>
              <span>transactions</span>
            </p>
          </div>
          <div class="four" style>
            <p class="fourth-child-paragraph">
              <img src="../assets/css/images/sale_label_1.svg" alt />
            </p>
            <p class="fourth-child-text">
              <span>{{ formatNumber(dashboardData.total_sales_amount) || 0}}</span>
              <span>total sales</span>
            </p>
          </div>
        </VueSlickCarousel>
      </div>
      <div class="child-three">
        <div class="wrapper">
          <div class="first-half">
            <p class="earnings">
              <img src="../assets/css/images/earn-money_1.svg" alt />
            </p>
            <p class="earnings-text">
              <span>My Earnings</span>
            </p>
          </div>
          <div class="second-half">
            <p class="activities">
              <img src="../assets/css/images/new_activity.svg" alt />
            </p>
            <p class="activities-text">
              <span>Activities</span>
            </p>
          </div>
        </div>
      </div>

      <div class="child-four">
        <div class="wrapper">
          <div class="first-half" id="multiple-one">
            <p class="earnings">
              <img src="../assets/css/images/whatsapp.svg" alt />
            </p>
            <p class="earnings-text">
              <span>Chat with merchant</span>
            </p>
          </div>
          <div class="second-half" id="multiple-two">
            <p class="activities">
              <img src="../assets/css/images/open_email.svg" alt />
            </p>
            <p class="activities-text">
              <span>Send us an email</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <BottomNav />
  </div>
</template>

<script >
import Vue from "vue";
import Header from "~/components/Header.vue";
import BottomNav from "~/components/BottomNav.vue";
import { mapState } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default Vue.extend({
  mounted() {
    this.$store.dispatch("fetchAllAgentsMerchants");
  },
  components: {
    Header,
    VueSlickCarousel,
    BottomNav
  },

  middleware: "authenticated",
  data() {
    return {
      setting: {
        dots: false,
        arrows: false,
        dotsClass: "slick-dots custom-dot-class",
        edgeFriction: 0.35,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        adaptiveHeight: true
      }
    };
  },
  computed: {
    ...mapState(["dashboardData", "getDashboardStatus"])
  },

  methods: {
    routeToSettings() {
      this.$router.push("/settings");
    },

    formatNumber(num) {
      return !isNaN(num)
        ? new Intl.NumberFormat("en", {
            signDisplay: "always",
            notation: "compact"
          }).format(num)
        : 0;
    }
  }
});
</script>

<style scoped>
div.child-two {
  padding: 10px 10px 10px 2px;
}
.holder {
  cursor: pointer;
}

#multiple-one {
  background-color: #17a2b8;
  color: white;
  border-radius: 10px;
}

#multiple-two {
  background-color: #dc3545;
  border-radius: 10px;
  color: white;
}

#multiple-one p,
#multiple-two p {
  margin: 1.5rem 0 0.1rem 0 !important;
  line-height: 0.8 !important;
  font-size: 0.85rem;
}

#multiple-one p:nth-child(1),
#multiple-two p:nth-child(1) {
  margin: 0.5rem 0 0.8rem 0 !important;
}

#multiple-one p img,
#multiple-two p img {
  width: 20%;
}
</style>