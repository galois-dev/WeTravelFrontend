<template>
  <div class="profiles_list_root">
    <profile_big_card
      v-for="(profile, i) in profiles"
      :key="i"
      :pk="profile.pk ? profile.pk : {}"
      :name="profile.name ? profile.name : {}"
      :birthday="profile.birthday ? profile.birthday : {}"
      :country="profile.country ? profile.country : {}"
      :nfollowers="profile.nfollowers ? profile.nfollowers : 0"
      :is_followed="profile.is_followed ? profile.is_followed : false"
      :ambassador="profile.ambassador ? profile.ambassador : {}"
      :image="profile.image !== undefined ? profile.image : {}"
      :pictures="profile.pictures ? profile.pictures : {}"
      :tags="profile.interests ? profile.interests : {}"
      :last_travel="profile.last_travel ? profile.last_travel : {}"
    />
  </div>
</template>

<script>
import profile_big_card from "./profile_big_card";

export default {
  components: {
    profile_big_card,
  },
  data() {
    return {
      profiles: [
        {
          pk: 2,
          ambassador: [],
          image: {
            url:
              "https://d47btxtba30un.cloudfront.net/media/profiles/db0f5b16-d1c3-4bdc-af89-a7d5bc0d8360.png",
            alt: "user picture",
          },
          name: "Tester WeTravel",
          birthday: "2000-08-04T21:20:55Z",
          country: "AI",
          is_followed: true,
          nfollowers: 0,
          interests: [
            {
              name: "Adventure",
              color: "#AAAA",
              pk: 3,
            },
            {
              name: "Urban",
              color: "#AAAA",
              pk: 2,
            },
          ],
          pictures: [
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/ff69b835-e9a5-43a9-aaac-92388d6ddd09.png",
              pk: 17,
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/3be1907d-9b1d-422d-bbca-1d52c7a3b690.jpg",
              pk: 18,
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/9ffb63b2-995d-4e93-9218-57f619795732.png",
              pk: 19,
            },
          ],
          last_travel: "London (name or 'no travels')",
        },
        {
          pk: 3,
          ambassador: [],
          image: {
            url:
              "https://d47btxtba30un.cloudfront.net/media/profiles/db0f5b16-d1c3-4bdc-af89-a7d5bc0d8360.png",
            alt: "user picture",
          },
          name: "Tester WeTravel",
          birthday: "2020-08-04T21:20:55Z",
          country: "AI",
          is_followed: true,
          nfollowers: 0,
          interests: [
            {
              name: "Adventure",
              color: "#AAAA",
              pk: 3,
            },
            {
              name: "Urban",
              color: "#AAAA",
              pk: 2,
            },
          ],
          pictures: [
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/ff69b835-e9a5-43a9-aaac-92388d6ddd09.png",
              pk: 17,
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/3be1907d-9b1d-422d-bbca-1d52c7a3b690.jpg",
              pk: 18,
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/9ffb63b2-995d-4e93-9218-57f619795732.png",
              pk: 19,
            },
          ],
          last_travel: "London (name or 'no travels')",
        },
        {
          pk: 5,
          ambassador: [],
          image: {
            url:
              "https://d47btxtba30un.cloudfront.net/media/profiles/db0f5b16-d1c3-4bdc-af89-a7d5bc0d8360.png",
            alt: "user picture",
          },
          name: "Tester WeTravel",
          birthday: "2020-08-04T21:20:55Z",
          country: "AI",
          is_followed: true,
          nfollowers: 0,
          interests: [
            {
              name: "Adventure",
              color: "#AAAA",
              pk: 3,
            },
            {
              name: "Urban",
              color: "#AAAA",
              pk: 2,
            },
          ],
          pictures: [
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/ff69b835-e9a5-43a9-aaac-92388d6ddd09.png",
              pk: 17,
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/3be1907d-9b1d-422d-bbca-1d52c7a3b690.jpg",
              pk: 18,
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/9ffb63b2-995d-4e93-9218-57f619795732.png",
              pk: 19,
            },
          ],
          last_travel: "London (name or 'no travels')",
        },
      ],
    };
  },
};
</script>

<style></style>
