<template>
  <div class="TBList-root">
    <div v-if="!loaded"></div>
    <template v-else>
      <b-skeleton width="300px" height="300px"></b-skeleton>
      <b-skeleton width="300px" height="300px"></b-skeleton>
      <b-skeleton width="300px" height="300px"></b-skeleton>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    travel_books: [],
  },
  mounted() {
    this.loading = false;
    this.load();
    this.loading = true;
  },
  methods: {
    load: function() {},
  },
  data() {
    return {
      loaded_travel_books,
      loading: true,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";
$width: 300px;
.TBList-root {
  min-width: $width;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>
