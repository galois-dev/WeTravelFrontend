<template>
  <div class="TBList-root">
    <div class="TBList-content" v-if="!loading">
      <template v-for="travel in loaded_travel_books">
        <div
          :key="travel.pk"
          class="TB-element animate__animated animate__zoomInUp"
        >
          <div class="TB-images">
            <img
              v-for="image in travel.images"
              :key="image.pk"
              :src="image.url"
            />
          </div>
          <div class="TB-data">
            <div class="TB-title">
              <h4>{{ travel.title }}</h4>
            </div>
            <div class="TB-location">
              <b-icon icon="map-marker"></b-icon>{{ travel.location }}
            </div>
            <div class="TB-owner">
              <b-icon icon="account"></b-icon> {{ travel.creator }}
            </div>
            <div class="TB-pricing">
              Pricing:
              <pricing_range :rating="3" />
            </div>
            <div class="TB-tags" :v-if="travel.tags">
              <tags_list :tags="travel.tags" :editing="false" />
            </div>
          </div>
        </div>
      </template>
    </div>
    <template v-else>
      <b-skeleton width="300px" height="300px"></b-skeleton>
      <b-skeleton width="300px" height="300px"></b-skeleton>
      <b-skeleton width="300px" height="300px"></b-skeleton>
    </template>
  </div>
</template>

<script>
import pricing_range from "../components/pricing_range";
import tags_list from "../components/tags_list";
export default {
  components: {
    pricing_range,
    tags_list,
  },
  props: {
    travel_books: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.loading = true;
    this.load();
    this.loading = false;
  },
  methods: {
    load: function() {
      this.loaded_travel_books = this.$props.travel_books;
    },
  },
  data() {
    return {
      loaded_travel_books: [],
      loading: true,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";
$width: 500px;
$height: 500px;
$picturegrid_gap: 8px;

.TBList-root {
  min-width: $width;
}
.TBList-content {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
}
.TB-element {
  justify-self: center;
  align-self: center;
  -webkit-box-shadow: 2px 2px 53px -22px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 2px 53px -22px rgba(0, 0, 0, 0.75);
  box-shadow: 2px 2px 53px -22px rgba(0, 0, 0, 0.75);
  border-radius: $border-radius-s;
  margin: $picturegrid_gap;
  display: grid;
  grid-template-rows: 300px 200px;
  grid-auto-columns: 1fr;
  grid-template-areas:
    "pictures"
    "data";
  --animate-duration: 0.5s;
  width: $width;
  height: $height;
}

.TB-images {
  margin: $picturegrid_gap;
  margin-bottom: -10px;
  grid-area: pictures;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-template-rows: 150px 150px;
  gap: 0px $picturegrid_gap;
  img {
    object-fit: cover;
    justify-self: center;
    border-radius: $border-radius-xs;
    align-self: center;
    height: 150px;
    width: 150px;
    margin: 0;
    padding: 0;
  }
}

h4 {
  color: $primary;
  margin: 0;
  padding: 0;
}
.TB-data {
  grid-area: data;
  margin: $picturegrid_gap;
  margin-top: 0;
}
</style>
