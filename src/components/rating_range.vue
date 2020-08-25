<template>
  <div class="Star">
    <b-icon
      class="Startags material-icons"
      v-for="i in [1, 2, 3, 4, 5]"
      :key="i"
      icon="grade"
      :size="'is-' + size"
    ></b-icon>
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
    size: {
      type: String,
      required: false,
      default: "medium",
      validator: function(value) {
        return ["small", "medium", "large"].indexOf(value) !== -1;
      },
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
.Star {
  display: inline-flex;
}
.Startags {
  display: inline;
  margin: 5px;
  margin-bottom: 2px;
  margin-top: -4px;
  font-size: 24px;
  font-weight: 600;
}
</style>
