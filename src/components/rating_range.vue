<template>
  <div class="RRStar">
    <span @click="handleSelect(i)" v-for="i in [1, 2, 3, 4, 5]" :key="i">
      <b-icon
        class="Startags material-icons"
        icon="star"
        :size="'is-' + size"
        :style="dollarsign_style(i)"
        >star</b-icon
      >
    </span>
  </div>
</template>
<script>
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

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
      if (i <= this.$props.rating) {
        return {
          color: "#db8653", // ORANGE THIS BIT
        };
      }
      return {
        color: "#858b97", // Gray 1 or 2 idk, the standard non-primary text color
      };
    },
    handleSelect: function(i) {
      console.log(i);
      this.$emit("selected", i);
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
  margin-bottom: 2px;
  margin-top: -4px;
}
</style>
