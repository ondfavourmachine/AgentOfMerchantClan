
<template>
  <div class="main-container">
    <div class="parent">
      <div class="child-one">
        <div class="heading">
          <div class="left">
            <h4>Hello</h4>
            <h1>Nebechi</h1>
          </div>
          <div class="right">
            <img src="../assets/css/images/notification-bell.svg" alt />
          </div>
        </div>

        <div class="other-stuff" style>
          <div class="settings">
            <!-- ../assets/css/images/settings.svg -->
            <div class="holder">
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
              <span>Collections</span>
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

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      items: [
        { "m-ID": 40, Type: "Sales", time: "4:23pm" },
        { "m-ID": 42, Type: "Repayment", time: "1:23pm" },
        { "m-ID": 32, Type: "Order", time: "2:23pm" },
        { "m-ID": 62, Type: "Order", time: "1:43pm" }
      ]
    };
  }
});
</script>

<style scoped>
.main-container {
  background-color: white;
  height: 100vh;
  width: 100vw;
  position: relative;
  margin: 0;
  padding: 0;
}

.parent {
  height: 100%;
  position: absolute;
  width: 100%;
  padding: 15px;
  margin: 2px;
  display: grid;
  grid-template-rows: 45vh 20vh 34vh;
  grid-gap: 20px;
}

div.child-one,
div.child-two,
div.child-three {
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 10px 12px rgb(101, 98, 207, 0.2);
}

div.child-one {
  grid-row: 1/2;
}

div.child-two {
  grid-row: 2/3;
}

div.child-three {
  grid-row: 3/4;
  overflow: scroll;
}

.child-one {
  padding: 3px;
  display: flex;
  height: 100%;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
}

.heading {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.12rem solid rgb(229, 229, 229, 0.7);
}

.child-one .heading .right {
  height: 85px;
  width: 85px;
  position: relative;
}

.child-one .heading .left {
  line-height: 0.3;
}

.child-one .heading .left h4 {
  font-size: 1.3rem;
  font-weight: 500;
  padding: 2px;
}

.child-one .heading .left h1 {
  font-size: 2.5rem;
  font-weight: 900;
  line-height: 0.55;
}

.child-one .heading .right img {
  height: 60%;
  width: 60%;
  object-fit: cover;
  position: absolute;
  top: 0px;
  right: 13px;
  transform: rotate(10deg);
}

div.other-stuff {
  width: 100%;
  min-height: 60%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}

.other-stuff div.settings {
  height: 100%;
  width: 89%;
  margin: 3px;
}

.other-stuff div.my-merchant {
  height: 100%;
  width: 89%;
  margin: 3px;
}

.holder {
  padding: 5px;
  display: flex;
  flex-direction: column;
  height: 75%;
  margin-top: 33px;
  border-radius: 5px;
  border: 1px solid rgb(229 229 229 / 0.3);
  box-shadow: 4px 10px 12px #e5e5e5;
}

.holder span {
  display: block;
  height: 50%;
}

.holder .settings-img,
.holder .seller-img {
  width: 50px;
  height: 50px;
}

.settings-img img,
.seller-img img {
  object-fit: contain;
  height: 100%;
}

.holder .text {
  text-align: left;
  margin-top: 30px;
  line-height: 2;
  font-size: 1.15rem;
  font-weight: bold;
  color: #6562cf;
}

.child-two-parent {
  width: 90%;
  margin: 15px;
  height: 82%;

  display: flex;
  flex-direction: row;
}

.child-two-parent .sub-one,
.child-two-parent .sub-two {
  width: 50%;
  margin: 10px;
  height: auto;
  border: 1px solid rgb(229 229 229 / 0.3);
  border-radius: 5px;
  box-shadow: 4px 10px 12px #e5e5e5;
}

.sub-one-holder,
.sub-two-holder {
  display: flex;
  flex-direction: column;
}

.sub-two-holder span:first-child,
.sub-one-holder span:first-child {
  width: 50px;
  height: 50px;
}

.sub-two-holder span:first-child img,
.sub-one-holder span:first-child img {
  object-fit: contain;
  width: 80%;
}

.sub-two-holder span:last-child,
.sub-one-holder span:last-child {
  font-weight: bold;
  font-size: 1.15rem;
}

.recent {
  padding: 3px;
  margin: 5px;
  line-height: 1;
  font-weight: bolder;
}

.my-table-container {
  border: 1px solid rgb(229 229 229 / 0.25);
  border-radius: 5px;
  padding: 7px;
  overflow: auto;
}
</style>