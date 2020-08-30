<template>
  <div class="TBList-root">
    <div class="TBList-content" v-if="!loading">
      <template v-for="travel in loaded_travel_books">
        <div
          :key="travel.pk"
          class="TB-element animate__animated animate__zoomInUp"
        >
          <b-carousel class="TB-images" :autoplay="false">
            <b-carousel-item v-for="(image, i) in travel.images" :key="i">
              <img :src="image.url" />
            </b-carousel-item>
          </b-carousel>
          <!-- <div class="TB-images">
            <img
              v-for="image in travel.images"
              :key="image.pk"
              :src="image.url"
            />
          </div> -->
          <div class="TB-data">
            <div class="TB-title">
              <h4 class="TBTitleWrapper">{{ travel.title }}</h4>
            </div>
            <div class="TB-location">
              <b-icon icon="map-marker"></b-icon>{{ travel.location }}
            </div>
            <div class="TB-owner">
              <b-icon icon="account"></b-icon>Created by {{ travel.owner }}
            </div>
            <div class="TB-pricing">
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
      <b-skeleton width="500px" height="500px"></b-skeleton>
      <b-skeleton width="500px" height="500px"></b-skeleton>
      <b-skeleton width="500px" height="500px"></b-skeleton>
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

@include mobile {
  $width: 200px;
}
$height: 500px;
$picturegrid_gap: 4px;

.TBList-root {
  @include phone {
    min-width: 0px;
    max-width: 95%;
  }
  min-width: $width;
}
.TBList-content {
  @include desktop {
    width: 100%;
  }
  @include tablet {
    width: 100%;
  }
  @include phone {
    max-width: 95%;
  }
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax($width, 1fr));
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
  grid-template-rows: 3fr 2fr;
  grid-auto-columns: 1fr;
  grid-template-areas:
    "pictures"
    "data";
  --animate-duration: 0.5s;
  width: $width;
  height: $height;
  @include phone {
    margin-left: 0;
    margin-right: 0;
    grid-template-rows: 1fr 1fr;
    grid-row-gap: 1rem;
    height: $height * 1.2;
    width: 100vw;
    max-width: 100vw;
    justify-self: start;
    align-self: start;
  }
}
.TB-pricing {
  margin-top: -5px;
  margin-left: 5px;
}
.TB-location {
  font-family: "Unna";

  padding: 2px;
  font-size: 18px;
  font-weight: 400;
  color: $WT_gray1;
}
.TB-owner {
  font-family: "Unna";

  padding: 2px;
  font-size: 18px;
  color: $WT_gray1;
}
.TB-images {
  margin: 0.5rem;
  grid-area: pictures;
  display: grid;
}
.carousel-items {
  align-self: center;
  justify-self: center;
}
.carousel-item {
  img {
    margin: auto;
    left: 0;
    right: 0;
    object-fit: cover;

    height: 300px !important;
    max-height: 300px !important;
    width: auto;
  }
}
// .TB-images {
//   margin: $picturegrid_gap;
//   grid-area: pictures;
//   display: grid;
//   @include phone {
//     justify-self: center;
//     grid-template-columns: 150px 150px;
//     grid-template-rows: repeat(auto-fit, minmax(150px, 1fr));
//   }
//   grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
//   grid-template-rows: 150px 150px;
//   gap: 0px $picturegrid_gap;
//   img {
//     object-fit: cover;
//     justify-self: center;
//     align-self: center;
//     width: 150px;
//     height: 150px;
//   }
// }

.TBTitleWrapper {
  font-family: "Roboto";
  font-weight: 600;
  font-size: 1.1rem;
  color: $primary;
  margin-bottom: -0.5rem;
  margin-left: 6px;
}
.TB-data {
  grid-area: data;
  margin: $picturegrid_gap;
  margin-top: -6px;
  margin-bottom: 0;
  margin-left: 5px;
}
</style>
