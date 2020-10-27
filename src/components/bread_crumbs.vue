<template>
  <div class="BC_root">
    <div class="image_size" v-show="!loading">
      <img :src="require('@/assets/Logo_blue.svg')" />
      <p>Wetravel planner</p>
    </div>
    <div class="image_size" v-show="loading">
      <img :src="require('@/assets/60fps_logo_spinner_rough.gif')" />
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";
.BC_root {
  margin: 1rem;
}
.image_size {
  height: 78px;
  width: 78px;
  margin: auto;
  p {
    font-size: 0.6em;
    text-align: center;
  }
  color: $WT_grayd;
}
</style>
