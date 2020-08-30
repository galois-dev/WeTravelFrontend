<template>
  <div class="restaurant_card_root">
    <div class="restaurant_card_header">
      <div class="restaurant_card_titles">
        <div class="restaurant_card_name">{{ name }}</div>
        <div class="restaurant_card_location">{{ location }}</div>
      </div>
      <div class="restaurant_card_saved_icon">
        <Favourite class="icon-2x" :size="48" v-if="is_saved" />
        <FavouriteBorder class="icon-2x" :size="48" v-if="!is_saved" />
      </div>
    </div>
    <div class="restaurant_card_pictures">
      <b-carousel :indicator-inside="false" :autplay="false">
        <b-carousel-item v-for="(item, i) in pictures" :key="i">
          <span class="image">
            <img :src="item.url" />
          </span>
        </b-carousel-item>
      </b-carousel>
    </div>
    <div class="restaurant_card_static_fields">
      <div class="restaurant_card_description">
        <p>{{ description }}</p>
      </div>
      <div class="restaurant_card_foreign_fields">
        <span class="restaurant_card_rating_fields">
          <div class="restaurant_card_rating">
            <pricing_range :rating="pricing" :size="'medium'" />
          </div>
          <div class="restaurant_card_pricing">
            <rating_range :rating="score" :size="'small'" />
          </div>
        </span>
        <div class="restaurant_card_tags">
          <tags_list :tags="tags" :editing="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pricing_range from "./pricing_range";
import rating_range from "./rating_range";
import tags_list from "./tags_list";
import Favourite from "vue-material-design-icons/Heart.vue";
import FavouriteBorder from "vue-material-design-icons/HeartOutline.vue";
export default {
  components: {
    pricing_range,
    rating_range,
    Favourite,
    FavouriteBorder,
    tags_list,
  },
  props: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    score: { type: Number, required: true },
    pricing: { type: Number, required: true },
    website: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: false },
    pictures: { type: Array, required: false },
    tags: { type: Array, required: true },
    pk: { type: Number, required: true },
    location: { type: String, required: true },
    is_saved: { type: Boolean, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";
$height: 620px;
$width: 350px;
.restaurant_card_root {
  box-shadow: 4px 3px 6px 2px hsl(0, 0%, 85%), 0 0 0 3px hsl(0, 0%, 95%);
  margin: 18px;
  margin-left: auto;
  margin-right: auto;
  padding: 8px;
  width: $width;
  height: $height;
  display: grid;
  border-radius: $border_radius_xs;
  grid-template-rows: 48px auto auto;
  grid-template-columns: auto;
  grid-template-areas:
    "header"
    "body"
    "footer";
}
.restaurant_card_titles {
  grid-area: header;
  width: 100%;
}
.restaurant_card_pictures {
  grid-area: body;
  margin: 1rem;
  margin-top: 20px;
  height: 260px;
}
.carousel-items {
  align-self: center;
  justify-self: center;
}
.carousel-item {
  img {
    border-radius: $border_radius_xs;
    margin: auto;
    left: 0;
    right: 0;
    object-fit: cover;
    height: 300px !important;
    max-height: 300px !important;
    width: auto;
  }
}
.restaurant_card_static_fields {
  grid-area: footer;
}
.restaurant_card_foreign_fields {
  height: 125px;
  margin-bottom: -40px;
  overflow: auto;
}
.restaurant_card_header {
  width: 100%;
  display: inline-flex;
}
.restaurant_card_saved_icon {
  float: right;
  align-self: flex-end;
  span {
    height: 40px;
    width: 40px;
  }
  height: 40px;
  width: 40px;
  padding: -10px;
}
.restaurant_card_pricing {
  margin-top: -6px;
}
.restaurant_card_description {
  p {
    font-family: "unna";
    overflow: auto;

    text-overflow: ellipsis;
    max-height: 82px;
    font-size: 16px;
    line-height: 1.2rem;
  }
}
.restaurant_card_name {
  color: $WT_grayd;
  font-size: 1.4rem;
}
.restaurant_card_location {
  color: $WT_grayd;
  font-size: 1.2rem;
}
.restaurant_card_rating_fields {
  display: inline-block;
  width: 100%;
  justify-content: stretch;
  .restaurant_card_rating {
    float: right;
  }
  .restaurant_card_pricing {
    float: left;
    margin-top: 1px;
  }
}

.material-design-icon.icon-2x > .material-design-icon__svg {
  height: 2.5em;
  width: 2.5em;
}
</style>
