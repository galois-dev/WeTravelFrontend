<template>
  <div
    :v-if="!loading && tags !== undefined && tags.length > 0"
    class="TLTags-root"
  >
    <span
      v-for="tag in tags"
      :key="tag.pk"
      :style="genGradient(tag.color)"
      class="TLtag"
    >
      {{ tag.name }}
    </span>
    <b-tooltip label="add" position="is-top">
      <span v-if="editing" class="edit-button">
        <b-button rounded size="is-small" @click="editTags">+</b-button>
      </span>
    </b-tooltip>
  </div>
</template>

<script>
import tags_list_edit from "./tags_list_edit";

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

  return "rgba(" + r + "," + b + "," + g + ",0.2)";
}

export default {
  name: "tags_list",
  props: {
    tags: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    editing: {
      type: Boolean,
      required: true,
    },
    typeOfTag: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      loading: true,
      editAbleTags: [],
    };
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    genGradient(color) {
      const col1 = color;
      const col2 = LightenDarkenColor(color, 20 - Math.random() * 10);
      const col3 = LightenDarkenColor(color, 30 + Math.random() * 10);
      const val =
        "linear-gradient(to bottom right," +
        col2 +
        "," +
        col1 +
        "," +
        col3 +
        ")";
      return {
        "background-image": val,
      };
    },
    async editTags() {
      console.log(this.$props.tags);
      this.$buefy.modal.open({
        parent: this,
        component: tags_list_edit,
        props: {
          ITags: this.$props.tags,
          typeOfTag: this.$props.typeOfTag,
        },
        events: {
          save: this.persistChanges,
        },
        hasModalCard: true,
        trapFocus: true,
      });
    },
    persistChanges(tags) {
      console.log(tags);
      this.$emit("save", tags);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";
.TLtag {
  font-family: "Unna";

  color: $dark;
  font-size: 18px;
  font-weight: 500;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 4px;
  padding-right: 4px;
  margin: 4px;
  line-height: 1.9rem;
  border-radius: $border-radius-xs / 2;
}

.TLTags-root {
  max-height: 60px;
  overflow-x: hidden;
  overflow-y: hidden;
  @include phone {
    max-width: 350px;
  }
}
</style>
