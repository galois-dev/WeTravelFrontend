<template>
  <div class="adventurelist_root" v-if="adventures_list !== undefined">
    <!-- <adventure_card
      v-for="adventure in adventures_list"
      :key="adventure.pk"
      :location="adventure.location"
      :title="adventure.title"
      :tags="adventure.tags"
      :pk="adventure.pk"
      :travellers="adventure.travellers"
      :creator="adventure.creator"
      :travel_start="adventure.start"
      :travel_end="adventure.end"
    /> -->

    <adventure_card
      :title="'mock card'"
      :location="'London'"
      v-bind:travellers="[
        {
          url:
            'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          alt: 'user picture',

          pk: 1,
        },
        {
          url:
            'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          alt: 'user picture',
          pk: 2,
        },
        {
          url:
            'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
          alt: 'user picture',
          pk: 4,
        },
      ]"
      :banner="{
        url:
          'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        alt: 'london bridge',
      }"
      :tags="[]"
      :travel_start="'2020/08/30'"
      :travel_end="'2020/09/29'"
      :creator="'myself?'"
      :pk="'IDONOTEXIST'"
    />
  </div>
</template>

<script>
import adventure_card from "./adventure_card";
import { getAdventuresByMode } from "../utils/adventureService";
export default {
  name: "adventure_list",
  components: { adventure_card },
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      adventures_list: [],
    };
  },
  methods: {
    update_self() {
      let res = getAdventuresByMode(this.$props.mode).then((data) => {
        this.adventures_list = data.data.adventures;
      });
    },
  },
  mounted() {
    this.update_self();
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";
.adventurelist_root {
  max-width: $max-content-width;
  width: 100%;
  vertical-align: middle;
}
</style>
