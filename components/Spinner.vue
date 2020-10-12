
<template>
  <div class="my-overlay" style>
    <div class="overlay-child" style>
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.my-overlay {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.overlay-child {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  backdrop-filter: blur(1px);
}
</style>