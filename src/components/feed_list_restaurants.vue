<template>
  <div class="restaurant_cards_root">
    <restaurant_card
      v-for="(data, i) in restaurants"
      :key="i"
      :name="data.name"
      :description="data.description"
      :score="data.score"
      :pricing="data.pricing"
      :address="data.address"
      :email="data.email"
      :website="data.website"
      :pictures="data.pictures"
      :tags="data.tags"
      :pk="data.pk"
      :location="data.location"
      :is_saved="data.is_saved"
    />
  </div>
</template>

<script>
import restaurant_card from "./restaurant_card";

export default {
  components: { restaurant_card },
  props: {
    restaurants: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.restaurant_cards_root {
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  display: grid;
}
</style>
