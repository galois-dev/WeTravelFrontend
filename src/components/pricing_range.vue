<template>
  <div class="Price">
    <p
      class="noselect"
      v-for="i in [1, 2, 3, 4, 5]"
      :key="i"
      :style="dollarsign_style(i)"
    >
      $
    </p>
  </div>
</template>
<script>
// Tiny component that takes a rating of 0-5 and displays a correct amunt of
// eg. :rating="4"  --> displays:  $ $ $ >$< $

export default {
  props: {
    rating: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.RATING = this.$props.rating;
    this.loading = false;
  },
  data() {
    return {
      loading: true,
      RATING: -1,
    };
  },
  methods: {
    dollarsign_style: function(i) {
      if (i <= this.RATING) {
        return {
          color: "#db8653", // ORANGE THIS BIT
        };
      }
      return {
        color: "#858b97", // Gray 1 or 2 idk, the standard non-primary text color
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.Price {
  display: inline-flex;
}
p {
  display: inline;
  margin: 2px;
  font-size: 26px;
  font-weight: 600;
}
</style>
