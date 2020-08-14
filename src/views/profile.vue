<template>
  <div class="profile-root">
    <div class="name-container">
      <div>
        <span class="username-text-container">
          <h3 class="orangeText" v-if="!loading">username</h3>
          <div v-else>
            <b-skeleton
              :active="loading"
              height="40px"
              width="250px"
            ></b-skeleton>
          </div>
        </span>
        <span class="edit-button-container" v-if="isOwner">
          <b-button type="is-primary" rounded>Edit</b-button>
        </span>
      </div>
      <hr />
    </div>
    <div class="bio-container">
      <div class="left-column">
        <div class="occupation-field">
          <span v-if="!loading">
            <b class="occupationText">Occupation: </b>
            <span class="blackBioRight">Webshit</span> </span
          ><span v-else>
            <b-skeleton :active="loading" width="90%"></b-skeleton>
          </span>
        </div>
        <div class="follower-lists">
          <div class="followers">
            <span v-if="!loading">
              <span class="grayBioLeft">Followers:</span>
              <span class="blackBioRight">4,2k</span>
            </span>
            <span v-else
              ><b-skeleton :active="loading" width="75%"></b-skeleton
            ></span>
          </div>
          <div class="following">
            <span v-if="!loading"
              ><span class="grayBioLeft">Following:</span>
              <span class="blackBioRight">4,2k</span> </span
            ><span v-else
              ><b-skeleton :active="loading" width="78%"></b-skeleton
            ></span>
          </div>
        </div>
        <div class="country-field">
          <span v-if="!loading">
            <span class="grayBioLeft">Country: </span>
            <span class="blackBioRight">DK </span>
          </span>
          <span v-else>
            <b-skeleton :active="loading" width="35%"></b-skeleton>
          </span>
        </div>
        <div class="age-field">
          <span v-if="!loading">
            <span class="grayBioLeft">Age: </span>
            <span class="blackBioRight">21 </span>
          </span>
          <span v-else>
            <b-skeleton :active="loading" width="47%"></b-skeleton>
          </span>
        </div>

        <div class="tags-lists">
          <div class="interests-list">
            <span v-if="!loading">
              <span class="grayBioLeft">Age: </span>
              <span class="blackBioRight">21 </span>
            </span>
            <span v-else>
              <b-skeleton
                :active="loading"
                height="60px"
                width="65%"
              ></b-skeleton>
            </span>
          </div>
          <div class="pallete-list">
            <span v-if="!loading">
              <span class="grayBioLeft">Age: </span>
              <span class="blackBioRight">21 </span>
            </span>
            <span v-else>
              <b-skeleton
                :active="loading"
                height="60px"
                width="65%"
              ></b-skeleton>
            </span>
          </div>
        </div>
      </div>
      <div class="right-column">
        <div class="title-field">
          <h4 v-if="!loading" class="grayText">About me</h4>
          <h4 v-else>
            <b-skeleton :active="loading" height="40px"></b-skeleton>
          </h4>
        </div>
        <div class="description-field">
          <p v-if="!loading">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            ornare, felis eu tristique hendrerit, dui est lobortis magna, ut
            euismod eros velit vel urna. Proin posuere, eros quis imperdiet
            rutrum, nibh felis rhoncus lacus, id pretium nulla augue in tortor.
            Quisque sed erat enim. Suspendisse potenti. Praesent quis libero
            mattis, euismod felis nec, pulvinar velit. Nullam consequat nunc
            ante, ac fermentum felis accumsan eu. Nunc ac velit nisi. Cras
            gravida neque nisi, tincidunt pellentesque ante luctus sed. Proin eu
            dignissim enim, et pretium lorem. Duis non lacus et ipsum pharetra
            accumsan. Sed pellentesque enim ac molestie tincidunt. Cras
            vulputate rhoncus augue, egestas facilisis velit porta sollicitudin.
            Cras vestibulum nunc leo, et aliquam nisl cursus vitae. In venenatis
            orci et ante tempor vulputate. Fusce posuere ligula sit amet diam
            consequat, et porttitor eros ornare. Cras ullamcorper consectetur mi
            vitae luctus. Praesent quis turpis a sapien rutrum dictum.
            Vestibulum congue sit amet nulla in placerat. Quisque lacinia turpis
            elit, cursus vulputate sapien pharetra id. Maecenas pharetra felis
            eget congue consectetur. Aenean sit amet placerat ipsum.
          </p>
          <p>
            <b-skeleton
              :active="loading"
              width="90%"
              height="360px"
            ></b-skeleton>
          </p>
          <br />
        </div>
      </div>
    </div>
    <div class="picture-container">
      <div v-if="!loading" class="picture-wrapper">
        <img />
      </div>
      <div v-else class="picture-wrapper">
        <b-skeleton circle width="250px" height="250px"></b-skeleton>
      </div>
    </div>
    <div class="travelplans-container">
      <h3 class="orangeText">Travel Plans</h3>
      <hr />
      <br />
      <div class="travelplans-grid">
        <div v-if="!loading">
          <travel_book_list :travel_books="[]" />
        </div>
        <template v-else>
          <b-skeleton width="300px" height="300px"></b-skeleton>
          <b-skeleton width="300px" height="300px"></b-skeleton>
          <b-skeleton width="300px" height="300px"></b-skeleton>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as userService from "../utils/userService";
import travel_book_list from "../components/travel_book_list";
export default {
  components: { travel_book_list },
  data() {
    return {
      loading: true,
      edit_mode: false,
    };
  },
  async mounted() {
    await this.load();
  },
  methods: {
    load: async function() {
      console.log(this.$route.params.pk);
      const res = await userService.getProfile(this.$route.params.pk);
      await console.log(res);
    },
  },
  computed: {
    isOwner() {
      if (!this.loading) {
        if (this.$route.params.pk == this.$store.state.UserSettings.pk) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";
.profile-root {
  @include tablet {
    margin: $standard_page_margins;
  }
  @include desktop {
    margin: $standard_page_margins;
  }
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "name picture"
    "bio picture"
    "plans plans";
  @include mobile {
    grid-template-rows: auto auto auto auto auto;
    grid-template-areas:
      "picture"
      "name"
      "bio"
      "plans";
    margin-left: 6px;
    margin-right: 6px;
  }
}
.bio-container {
  margin-top: 12px;
  display: grid;
  grid-area: bio;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "left right";
  @include mobile {
    grid-template-rows: auto auto;
    grid-template-columns: auto;
    grid-template-areas:
      "left"
      "right";
  }
  .left-column {
    grid-area: left;
    .occupation-field {
      margin: 2px;
    }
    .age-field {
      margin: 2px;
    }
    .country-field {
      margin: 2px;
    }
    .tags-lists {
      margin-left: 0.5rem;
      margin-top: 1.5rem;
      .interests-list {
        margin-top: 1rem;
      }
      .pallete-list {
        margin-top: 1rem;
      }
    }
    .follower-lists {
      display: block;
      .followers {
        margin: 2px;
      }
      .following {
        margin: 2px;
      }
    }
  }
  .right-column {
    grid-area: right;
    @include mobile {
      margin-top: 1rem;
    }
    .title-field {
    }
    .description-field {
      margin-top: 8px;
    }
  }
}

.picture-container {
  margin-top: 1rem;
  @include mobile {
    .picture-wrapper {
      align-self: center;
      width: 250px;
    }
    justify-items: center;
    width: 100vw;
  }
  grid-area: picture;
  display: grid;
  width: 250px;
  height: 250px;
}
.travelplans-container {
  grid-area: plans;
  .travelplans-grid {
    display: grid;
    justify-items: center;
    align-items: center;
    @include mobile {
      grid-template-columns: 1fr;
      grid-gap: 0px;
    }
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 10px;
  }
}
span {
  font-size: 18px;
}

div h4 {
  color: $primary;
}
hr {
  margin: 0;
  background-color: $primary;
  height: 2px;
}
.name-container {
  width: 100%;
  grid-area: name;
  div {
    display: inline-flex;
    justify-content: space-between;
  }
  .edit-button-container {
    button {
      bottom: 0;
      margin: auto;
    }
  }
}
.occupationText {
  color: $primary;
  font-size: 22px;
  font-weight: 400;
}

.orangeText {
  color: $primary;
}

.grayBioLeft {
  color: $WT_gray1;
  font-size: 22px;
  font-weight: 500;
}
.blackBioRight {
  color: $black;
  font-size: 22px;
  font-weight: 400;
}
.grayText {
  color: $WT_gray1;
}
</style>
