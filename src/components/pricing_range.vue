<template>
  <div class="Price">
    <span v-for="i in [1, 2, 3, 4, 5]" :key="i" @click="handleSelect(i)">
      <p class="pricetags noselect" :style="dollarsign_style(i)">
        $
      </p>
    </span>
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
      let FS;
      if (this.$props.size === "small") FS = "18px";
      if (this.$props.size === "medium") FS = "24px";
      if (this.$props.size === "large") FS = "30px";
      if (i <= this.$props.rating) {
        return {
          color: "#db8653", // ORANGE THIS BIT
          fontSize: FS,
        };
      }
      return {
        color: "#858b97", // Gray 1 or 2 idk, the standard non-primary text color
        fontSize: FS,
      };
    },
    handleSelect: function(i) {
      this.$emit("selected", i);
    },
  },
};
</script>

<style lang="scss" scoped>
.Price {
  display: inline-flex;
}
.pricetags {
  display: inline;
  margin: 5px;
  margin-bottom: 2px;
  margin-top: -4px;
  font-weight: 600;
}
</style>
