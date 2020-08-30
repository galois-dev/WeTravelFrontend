<template>
  <div class="profile-card-wrapper">
    <div class="shadow-bar"></div>
    <div class="profile-pimage-container">
      <div class="picture-wrapper" :style="profile_picture_style"></div>
    </div>
    <div class="profile-infobar-wrapper">
      <div class="profile-descriptions">
        <div class="profile-name">{{ name }}</div>
        <div class="profile-ambassador-or-travel"></div>
        <div class="profile-age">Age: {{ calcAge(birthday) }}</div>
        <div class="profile-country">Nationality: {{ country }}</div>
        <div class="profile-nfollowers">Followers: {{ nfollowers }}</div>
        <div class="profile-bottom-bar">
          <div class="profile-tags">
            <tags_list :tags="tags" :editing="false" />
          </div>
          <div class="profile-follow_button">
            <b-button
              v-if="pk !== $store.state.UserSettings.pk"
              type="is-primary is-light"
              size="is-small"
              @click="handleFollowSignal(pk, is_followed)"
              >{{ is_followed ? "unfollow" : "follow" }}</b-button
            >
          </div>
        </div>
      </div>
      <div class="profile-picture-gallery">
        <img
          class="gallery-image"
          v-for="(image, i) in pictures"
          :key="i"
          :src="image.url"
        />
      </div>
    </div>
  </div>
</template>

<script>
import tags_list from "./tags_list";
import * as userService from "../utils/userService";
function _calculateAge(birthday) {
  // birthday is a date
  const bday = new Date(birthday);
  var ageDifMs = Date.now() - bday;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
export default {
  components: { tags_list },
  props: {
    pk: { type: Number, required: true },
    name: { type: String, required: true },
    birthday: { type: String, required: true },
    country: { type: String, required: true },
    nfollowers: { type: Number, required: true },
    is_followed: { type: Boolean, required: true },
    ambassador: { type: Array, required: false },
    image: { type: Object, required: true },
    pictures: { type: Array, required: false },
    tags: { type: Array, required: true },
    last_travel: { type: String, required: false },
  },
  methods: {
    calcAge(bday) {
      if (bday) return _calculateAge(bday);
    },
    handleFollowSignal(pk, is_following) {},
  },
  computed: {
    profile_picture_style: {
      get() {
        if (true) {
          const url = "url(" + this.image.url + ")" + " 50%, 50%, no-repeat";
          return {
            background: [url],
          };
        }
        return "";
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";
$image_size: 48px;
$image_scaling: 4;

$image_scaling: 3;

.shadow-bar {
  position: absolute;
  box-shadow: 4px 3px 6px 2px hsl(0, 0%, 85%), 0 0 0 3px hsl(0, 0%, 95%);
  height: 145px;
  @include mobile {
    width: 86%;
  }
  width: 90%;
  right: 0;
  border-radius: $border-radius-xs;
}

.profile-card-wrapper {
  display: grid;
  grid-template-columns: $image_scaling * $image_size 1fr;
  @include mobile {
    grid-template-columns: 3 * $image_size 1fr;
  }

  grid-template-rows: 1fr;
  grid-template-areas: "picture profile";
  align-items: center;
  position: relative;
  margin: 10px;
  max-width: 850px;
  padding-right: 0.5em;
}

.profile-descriptions {
  height: 145px;
}

.profile-infobar-wrapper {
  grid-area: profile;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  height: 148px;
}
.profile-name {
  margin-left: -0.2em;
  color: $WT_grayd;
  font-size: 1.2em;
}
.profile-age {
  font-size: 0.75em;
  font-weight: 500;
}
.profile-country {
  font-size: 0.75em;
  font-weight: 500;
  margin-left: 0.2em;
}
.profile-nfollowers {
  font-size: 0.75em;
  font-weight: 500;
}

.profile-pimage-container {
  display: block;
  grid-area: picture;
  @include mobile {
    height: $image_size * 3;
    width: $image_size * 3;
  }
  height: $image_size * $image_scaling;
  width: $image_size * $image_scaling;
  position: relative;
}

.profile-picture-gallery {
  @include mobile {
    display: none;
  }
  margin: 0.5em;
  margin-right: 0;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0.5em;
  align-items: center;
  img {
    width: 96px;
    height: 96px;
    object-fit: stretch;
  }
}
.profile-follow_button {
  margin-top: -0.3em;
}
.picture-wrapper {
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  @include mobile {
    height: $image_size * 3;
    width: $image_size * 3;
  }
  width: $image_size * $image_scaling;
  height: $image_size * $image_scaling;
  object-fit: stretch;
  img {
    object-fit: stretch;
  }
}

.profile-bottom-bar {
  margin-left: -0.4em;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr;
}
.profile-tags {
  max-height: 30px;
  overflow: hidden;
}
</style>
