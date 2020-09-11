<template>
  <div class="activities_list_root">
    <activity_card
      v-for="(data, i) in activities"
      :key="i"
      :name="data.name"
      :description="data.description"
      :likes="data.likes"
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
import activity_card from "./activity_card";
export default {
  components: { activity_card },
  props: {
    activities: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
