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
  props: {
    trips: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.trips_list_root {
  margin-top: 1em;
}
</style>
