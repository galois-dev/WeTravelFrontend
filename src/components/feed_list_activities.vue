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
  data() {
    return {
      activities: [
        {
          name: "Big Ben",
          description:
            "This is big ben a awesome clockwork This is big ben a awesome clockwork This is big ben a awesome clockwork This is big ben a awesome clockwork This is big ben a awesome clockwork This is big ben a awesome clockwork This is big ben a awesome clockwork This is big ben a awesome clockwork ",
          likes: "4.2k",
          website: "www.bigben.it",
          address: "Norrington street 7",
          email: null,
          pricing: 0.0,
          pictures: [
            {
              alt: "",
              url:
                "https://d47btxtba30un.cloudfront.net/media/activity/5dcbe087-6bdc-488b-af83-12ff7d2937f6.jpg",
            },
            {
              alt: "Picture from Big Ben",
              url:
                "https://d47btxtba30un.cloudfront.net/media/activity/161ce943-c44a-4cd7-834d-01eff35dc05c.jpg",
            },
            {
              alt: "Picture from Big Ben",
              url:
                "https://d47btxtba30un.cloudfront.net/media/activity/f00eb327-5f78-46d2-a61f-eb7069dda349.jpg",
            },
          ],
          tags: [
            {
              name: "Scenic",
              color: "#AAAA",
              pk: 1,
            },
            {
              name: "Monument",
              color: "#AAAA",
              pk: 2,
            },
          ],
          pk: 1,
          location: "London",
          is_saved: false,
        },
      ],
    };
  },
};
</script>

<style></style>
