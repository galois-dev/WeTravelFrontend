<template>
  <div :class="'modal-card is-primary '" v-if="!loading">
    <header class="modal-card-head">
      <h4 class="modal-card-title">{{ this.$props.typeOfTag }}</h4>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section :class="'modal-card-body'">
      <b-taginput
        v-model="selected_tags"
        :data="input_tags"
        autocomplete
        :allow-new="false"
        icon="label"
        field="name"
        placeholder="Add a tag"
        size="is-medium"
        rounded
        @typing="getFilteredTags"
      >
      </b-taginput>
    </section>
    <footer class="modal-card-foot">
      <b-button type="is-success" expanded inverted @click="persistChanges"
        >Save</b-button
      >
    </footer>
  </div>
</template>

<script>
import { tags_list } from "./tags_list";
import * as tagsService from "../utils/tagsService";

export default {
  props: {
    ITags: {
      type: Array,
      required: true,
    },
    typeOfTag: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // tags that we have currently or previously selected
      selected_tags: [],
      // Tags from which we can select
      input_tags: [],
      // Tags from which we can select given the current search input
      filterd_input_tags: [],
      // Loading state flag
      loading: true,
    };
  },
  mounted() {
    this.selected_tags = this.ITags;
    this.getTagOptions();
    this.loading = false;
  },
  methods: {
    async getTagOptions() {
      const MyType = this.$props.typeOfTag;
      switch (MyType) {
        case "Interest":
          this.input_tags = await tagsService.getInterests();
          break;
        case "Adventure":
          this.input_tags = await tagsService.getTravels();
          break;
        case "Taste":
          this.input_tags = await tagsService.getTastes();
          break;
        default:
          break;
      }
    },
    persistChanges() {
      this.$emit("save", this.selected_tags);
    },
    getFilteredTags(text) {
      this.filterd_input_tags = this.input_tags.filter((option) => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-card {
  min-height: 60vh;
}
</style>
