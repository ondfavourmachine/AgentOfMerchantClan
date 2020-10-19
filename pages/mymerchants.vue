

<template>
  <div>
    <Spinner v-if="apiCall" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  created() {
    // this.fetchAllAgentsMerchants();
  },

  computed: {
    // ...mapState(["apiCall"])
  },
  methods: {}
});
</script>

<style>
</style>