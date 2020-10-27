<template>
  <div class="activity_card_root">
    <div class="activity_card_header">
      <div class="activity_card_titles">
        <div class="activity_card_name">{{ name }}</div>
        <div class="activity_card_location">{{ location }}</div>
      </div>
      <div class="activity_card_saved_icon">
        <Favourite class="icon-2x" :size="48" v-if="is_saved" />
        <FavouriteBorder class="icon-2x" :size="48" v-if="!is_saved" />
      </div>
    </div>
    <div class="activity_card_pictures">
      <b-carousel :indicator-inside="false" :autoplay="false">
        <b-carousel-item v-for="(item, i) in pictures" :key="i">
          <span class="image">
            <img :src="item.url" />
          </span>
        </b-carousel-item>
      </b-carousel>
    </div>
    <div class="activity_card_static_fields">
      <div class="activity_card_description">
        <p>{{ description }}</p>
      </div>
      <div class="activity_card_foreign_fields">
        <span class="activity_card_rating_fields">
          <div class="activity_card_rating">
            <pricing_range :rating="pricing" :size="'medium'" />
          </div>
          <div class="activity_card_likes" v-if="likes">
            <span class="activity_likes">{{ likes ? likes : "-1?" }}</span
            ><span class="activity_liked_this"> People Liked This</span>
          </div>
        </span>
        <div class="activity_card_tags">
          <tags_list :tags="tags" :editing="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pricing_range from "./pricing_range";
import tags_list from "./tags_list";
import Favourite from "vue-material-design-icons/Heart.vue";
import FavouriteBorder from "vue-material-design-icons/HeartOutline.vue";
export default {
  components: {
    pricing_range,
    Favourite,
    FavouriteBorder,
    tags_list,
  },
  props: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: String, required: false },
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
.activity_card_root {
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
.activity_card_titles {
  grid-area: header;
  width: 100%;
}
.activity_card_pictures {
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
.activity_card_static_fields {
  grid-area: footer;
}
.activity_card_foreign_fields {
  height: 125px;
  margin-bottom: -40px;
  overflow: auto;
}
.activity_card_header {
  width: 100%;
  display: inline-flex;
}
.activity_card_saved_icon {
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
.activity_card_pricing {
  margin-top: -6px;
}
.activity_card_description {
  p {
    font-family: "unna";
    overflow: auto;

    text-overflow: ellipsis;
    max-height: 94px;
    font-size: 16px;
    line-height: 1.2rem;
  }
}
.activity_card_name {
  color: $WT_grayd;
  font-size: 1.4rem;
}
.activity_card_location {
  color: $WT_grayd;
  font-size: 1.2rem;
}
.activity_card_rating_fields {
  display: inline-block;
  width: 100%;
  justify-content: stretch;
  .activity_card_rating {
    float: right;
  }
  .activity_card_pricing {
    float: left;
    margin-top: 1px;
  }
}
.activity_card_likes {
  margin-top: 0.3em;
}
.activity_likes {
  color: $primary;
  font-size: 0.9rem;
  font-weight: 500;
}
.activity_liked_this {
  font-size: 0.9rem;
  font-weight: 500;
}
.material-design-icon.icon-2x > .material-design-icon__svg {
  height: 2.5em;
  width: 2.5em;
}
</style>
