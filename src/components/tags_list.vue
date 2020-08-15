<template>
  <div v-if="!loading">
    <div for="tag in TAGS" :key="tag.pk" :style="genGradient(tag.color)">
      {{ tag.name }}
    </div>
  </div>
</template>

<script>
function LightenDarkenColor(col, amt) {
  var usePound = true;
  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
    editing: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      TAGS: [],
    };
  },
  mounted() {
    this.TAGS = this.$props.tags;
    this.loading = false;
  },
  methods: {
    genGradient(color) {
      const col1 = color;
      const col2 = LightenDarkenColor(color, 1.1);
      return {
        "background-image":
          "linear-gradient(to bottom right," + col1 + "," + col2 + ")",
      };
    },
  },
};
</script>

<style></style>
