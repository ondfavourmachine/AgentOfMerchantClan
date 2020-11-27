<template>
  <div class="position-fixed fixed-bottom w-100" style>
    <div class="row justify-content-center primary-background py-2">
      <div class="col-4 text-center border-right d-flex flex-column justify-content-center">
        <nuxt-link to="/dashboard">
          <div title="dashboard" class="text-capitalize text-white">
            <i class="fa fa-th-large fa-2x"></i>
            <small>Dashboard</small>
          </div>
        </nuxt-link>
      </div>
      <div class="col-4 text-center border-right d-flex flex-column justify-content-center">
        <nuxt-link to="/merchant">
          <div title="merchant" class="text-capitalize text-white">
            <i class="fa fa-users fa-2x"></i>
            <small class="d-block">My merchants</small>
          </div>
        </nuxt-link>
      </div>
      <div class="col-4 text-center d-flex flex-column justify-content-center">
        <nuxt-link to="/settings">
          <div title="settings" class="text-capitalize text-white">
            <i class="fa fa-cog fa-2x"></i>
            <small class="d-block">Settings</small>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style>
.primary-background {
  background-color: rgba(20, 0, 204, 1);
}
</style>


