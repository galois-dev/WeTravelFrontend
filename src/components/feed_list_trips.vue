<template>
  <div class="trips_list_root">
    <travel_book_list :travel_books="trips" />
  </div>
</template>

<script>
import travel_book_list from "./travel_book_list";

export default {
  components: {
    travel_book_list,
  },
  data() {
    return {
      trips: [
        {
          title: "Nostalgia",
          location: "London",
          owner: "Tester WeTravel",
          pricing: 0,
          tags: [
            {
              name: "Urban",
              color: "#AAAA",
              pk: 1,
            },
            {
              name: "Instagram",
              color: "#AAAA",
              pk: 2,
            },
          ],
          pk: 4,
          images: [
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/25f0a76a-fefb-4aba-8dde-484c2a6494da.jpg",
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/cad98b31-e0d6-471b-b500-c5f52b7ea3fe.jpg",
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/b890dcc8-452b-4f4b-bd96-3c9f5e66cd8e.jpg",
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/35d117d6-4762-4a10-aa2b-3b7dd4baf396.jpg",
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/b11c2791-4858-4898-8abc-865fa062848b.jpg",
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/f1bca21b-af63-40a0-9911-2558e75c9091.jpg",
            },
          ],
        },
        {
          title: "Nostalgia",
          location: "London",
          owner: "Tester WeTravel",
          pricing: 0,
          tags: [
            {
              name: "Urban",
              color: "#AAAA",
              pk: 1,
            },
            {
              name: "Instagram",
              color: "#AAAA",
              pk: 2,
            },
          ],
          pk: 5,
          images: [
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/25f0a76a-fefb-4aba-8dde-484c2a6494da.jpg",
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/cad98b31-e0d6-471b-b500-c5f52b7ea3fe.jpg",
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/b890dcc8-452b-4f4b-bd96-3c9f5e66cd8e.jpg",
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/35d117d6-4762-4a10-aa2b-3b7dd4baf396.jpg",
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/b11c2791-4858-4898-8abc-865fa062848b.jpg",
            },
            {
              alt: "this is a picture",
              url:
                "https://d47btxtba30un.cloudfront.net/media/photos/f1bca21b-af63-40a0-9911-2558e75c9091.jpg",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.trips_list_root {
  margin-top: 1em;
}
</style>
