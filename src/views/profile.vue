<template>
  <div class="profile-root">
    <!-- --- PROFILE NAME --- -->

    <div class="name-container">
      <div class="name-wrapper">
        <span class="username-text-container">
          <div v-if="!loading">
            <h3 class="orangeText">{{ profile_data.name }}</h3>
            <b-icon icon="verified"></b-icon>
          </div>
          <div v-else>
            <b-skeleton
              :active="loading"
              height="40px"
              width="250px"
            ></b-skeleton>
          </div>
        </span>

        <!-- --- Edit, save and report buttons --- -->

        <span class="edit-button-container" v-if="isOwner">
          <b-button
            :type="edit_mode ? 'is-danger' : 'is-warning is-light'"
            rounded
            @click="edit_mode = !edit_mode"
            >{{ edit_mode ? "Back" : "Edit" }}</b-button
          >
          <b-button
            v-if="edit_mode"
            type="is-success"
            class="animate__animated animate__fadeInUp"
            :style="{ transition: '0.5s' }"
            rounded
            @click="uploadChanges"
            >Save</b-button
          >
        </span>
      </div>
      <hr />
    </div>

    <!-- --- BIO CONTAINER --- -->

    <div class="bio-container">
      <div class="left-column">
        <div class="occupation-field">
          <span v-if="!loading && isAmbassador">
            <b class="occupationText">Occupation: </b>
            <span class="blackBioRight">{{
              profile_data.ambassador
            }}</span> </span
          ><span v-else>
            <b-skeleton :active="loading" width="90%"></b-skeleton>
          </span>
        </div>

        <!-- --- Follower lists --- -->

        <div class="follower-lists">
          <div class="followers" @click="getFollowerList">
            <span v-if="!loading">
              <span class="grayBioLeft">Followers: </span>
              <span class="blackBioRight">{{ profile_data.nfollowers }}</span>
            </span>
            <span v-else
              ><b-skeleton :active="loading" width="75%"></b-skeleton
            ></span>
          </div>
          <div class="following" @click="getFollowingList">
            <span v-if="!loading"
              ><span class="grayBioLeft">Following: </span>
              <span class="blackBioRight">{{
                profile_data.nfollowing
              }}</span> </span
            ><span v-else
              ><b-skeleton :active="loading" width="78%"></b-skeleton
            ></span>
          </div>
        </div>

        <!-- --- Country --- -->

        <div class="country-field">
          <span v-if="!loading">
            <span class="grayBioLeft">Country: </span>
            <b-tooltip :label="profile_data.country">
              <span class="blackBioRight">{{
                getFlag(profile_data.country)
              }}</span>
            </b-tooltip>
          </span>
          <span v-else>
            <b-skeleton :active="loading" width="35%"></b-skeleton>
          </span>
        </div>

        <!-- --- Age --- -->

        <div class="age-field">
          <span v-if="!loading">
            <span class="grayBioLeft">Age: </span>
            <span class="blackBioRight">{{
              calcAge(profile_data.birthday)
            }}</span>
          </span>
          <span v-else>
            <b-skeleton :active="loading" width="47%"></b-skeleton>
          </span>
        </div>

        <!-- --- Interests tag list --- -->

        <div class="tags-lists">
          <div class="interests-list">
            <span v-if="!loading">
              <tags_list
                :tags="profile_data.interests"
                :editing="edit_mode"
                :typeOfTag="'Interest'"
              />
            </span>
            <span v-else>
              <b-skeleton
                :active="loading"
                height="60px"
                width="65%"
              ></b-skeleton>
            </span>
          </div>
          <!-- --- Tastes tag list --- -->

          <div class="pallete-list">
            <span v-if="!loading">
              <tags_list
                :tags="profile_data.tastes"
                :editing="edit_mode"
                :typeOfTag="'Taste'"
              />
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

      <!-- --- Right bio column --- -->

      <div class="right-column">
        <div class="title-field">
          <h4 v-if="!loading" class="grayText">About me</h4>
          <h4 v-else>
            <b-skeleton :active="loading" height="40px"></b-skeleton>
          </h4>
        </div>

        <!-- --- Description --- -->

        <div class="description-field">
          <p v-if="!loading && !edit_mode">
            {{ profile_data.description }}
          </p>
          <b-input
            type="textarea"
            v-else-if="edit_mode"
            :value="profile_data.description"
            v-model="inputDescription"
            class="animate__animated animate__fadeInUp"
          ></b-input>
          <p v-else>
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

    <!-- --- Profile picture --- -->

    <div class="picture-container" v-if="!loading">
      <div
        v-if="!loading"
        class="picture-wrapper"
        :style="profile_picture_style"
      >
        <b-upload
          v-model="imgFile"
          drag-drop
          v-if="edit_mode"
          @input="uploadProfilePic"
          class="picture-container"
        >
          <section class="section">
            <div class="content has-text-centered">
              <p :style="{ color: 'white' }">
                <b-icon icon="upload" size="is-large"> </b-icon>
              </p>
              <p :style="{ color: 'white' }">
                {{
                  imgFile.name ||
                    "Drop your profile picture here or click to upload"
                }}
              </p>
            </div>
          </section>
        </b-upload>
      </div>
      <b-button
        v-if="!isOwner"
        :type="isFollowing ? 'is-primary is-light' : 'is-primary'"
        @click="handleFollowButton"
        >{{ isFollowing ? "Unfollow" : "Follow" }}</b-button
      >
    </div>
    <div v-else class="picture-wrapper">
      <b-skeleton circle width="250px" height="250px"></b-skeleton>
    </div>

    <!-- --- Travel plans list--- -->

    <div class="travelplans-container">
      <h3 class="orangeText">Travel Plans</h3>
      <hr />
      <br />
      <div v-if="!loading">
        <travel_book_list :travel_books="profile_data.adventures" />
      </div>
      <div class="travelplans-grid" v-else>
        <template>
          <b-skeleton
            v-for="i in [1, 2, 3]"
            :key="i"
            width="500px"
            height="500px"
            style="margin: auto;"
          ></b-skeleton>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as userService from "../utils/userService";
import travel_book_list from "../components/travel_book_list";
import tags_list from "../components/tags_list";
import flag from "country-code-emoji";
import follower_list from "../components/follower_list";

const tagTypes = {
  Interest: "Interest",
  Adventure: "Adventure",
  Taste: "Taste",
};

function _calculateAge(birthday) {
  // birthday is a date
  const bday = new Date(birthday);
  var ageDifMs = Date.now() - bday;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default {
  components: { travel_book_list, tags_list },
  data() {
    return {
      loading: true,
      edit_mode: false,
      isAmbassador: false,
      profile_data: {},
      inputDescription: "",
      imgFile: {},
      isFollowerModalActive: false,
      follower_list_keeper: [],
      next_follower_page: "",
    };
  },
  async mounted() {
    await this.load();
  },
  methods: {
    load: async function() {
      const PK = this.$route.params.pk;
      if (!PK && this.$store.state.UserSettings.pk) {
        const res = await userService.getProfile(
          this.$store.state.UserSettings.pk
        );
      }
      const res = await userService.getProfile(PK);
      this.profile_data = res;
      this.inputDescription = res.description;
      this.loading = false;
    },
    calcAge(bday) {
      if (bday) return _calculateAge(bday);
    },
    uploadChanges() {},
    async uploadProfilePic(e) {
      let res = await userService.uploadProfilePicture(this.imgFile);
      if (!res.data) {
        this.$buefy.toast.open({
          type: "is-danger",
          message: "image upload failed",
        });
      } else {
        this.$buefy.toast.open({
          type: "is-success",
          message: "image uploaded successfully",
        });
        console.log(res);
        this.profile_data.image.url = res.data.url;
      }
    },
    getFlag(flagCode) {
      if (flagCode) return flag(flagCode);
    },
    async handleFollowButton(e) {
      const PK = this.$route.params.pk;
      const is_following = this.profile_data.is_followed;
      const res = is_following
        ? await userService.unfollowUser(PK)
        : await userService.followUser(PK);
      if (res.data.Success === "Now following") {
        this.profile_data.is_followed = true;
        this.profile_data.nfollowers += 1;
      } else if (res.data.Success === "Unfollowed") {
        this.profile_data.is_followed = false;
        this.profile_data.nfollowers -= 1;
      } else {
        this.$$buefy.toast.open({
          type: "is-danger",
          message: res.data,
        });
      }
    },
    // add error handling
    async getFollowerList() {
      const PK = this.$route.params.pk;
      const followers = await userService.getFollowers(PK);
      console.log(followers);
      this.follower_list_keeper = followers.data.results;
      if (followers.data.next !== null) {
        this.next_follower_page = followers.data.next;
      }
      this.isFollowerModalActive = true;
      this.openFollowerList(this.follower_list_keeper, "Followers");
    },
    async getFollowingList() {
      const PK = this.$route.params.pk;
      const followers = await userService.getFollowing(PK);
      console.log(followers);
      this.follower_list_keeper = followers.data.results;
      if (followers.data.next !== null) {
        this.next_follower_page = followers.data.next;
      }
      this.isFollowerModalActive = true;
      this.openFollowerList(this.follower_list_keeper, "Following");
    },
    async openFollowerList(follow, title) {
      this.$buefy.modal.open({
        parent: this,
        component: follower_list,
        props: {
          travellers: follow,
          title: title,
        },
        events: {
          update: this.handleFollowerListUpdate,
          handleFollow: this.handleFollow,
        },
        hasModalCard: true,
        trapFocus: true,
      });
    },
    async handleFollowerListUpdate() {
      const res = await axios(this.next_follower_page);
      this.follower_list_keeper.push(...res.data);
    },
    async handleFollow(e) {
      const PK = e.pk;
      const is_following = e.is_following;
      console.log(PK);
      const res = is_following
        ? await userService.unfollowUser(PK)
        : await userService.followUser(PK);
      if (res.data.Success === "Now following") {
        this.follower_list_keeper.forEach((traveller) => {
          if (traveller.pk == PK) {
            traveller.is_followed = true;
            this.profile_data.nfollowers += 1;
          }
        });
      } else if (res.data.Success === "Unfollowed") {
        this.follower_list_keeper.forEach((traveller) => {
          if (traveller.pk == PK) {
            traveller.is_followed = false;
            this.profile_data.nfollowers -= 1;
          }
        });
      } else {
        this.$buefy.toast.open({
          type: "is-danger",
          message: res.data,
        });
      }
      // Not nessecarily following but maybe also unfollow depending on the PK
    },
  },
  computed: {
    // check for ownership but i think theres a field for it in
    isOwner() {
      if (!this.loading) {
        if (this.$route.params.pk == this.$store.state.UserSettings.pk) {
          return true;
        }
      }
      return false;
    },
    isFollowing() {
      if (!this.loading) {
        if (
          this.profile_data.is_followed ? this.profile_data.is_followed : false
        ) {
          return true;
        }
      }
      return false;
    },
    profile_picture_style: {
      get() {
        if (!this.loading) {
          const url =
            "url(" + this.profile_data.image.url + ")" + " 50%, 50%, no-repeat";
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
.profile-picture {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 250px;
}

.picture-container {
  margin-top: 1rem;
  @include mobile {
    .picture-wrapper {
      align-self: center;
    }
    justify-items: center;
    width: 100vw;
  }
  grid-area: picture;
  display: grid;
}

.picture-wrapper {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  margin: 10px;
  display: inline-block;
  vertical-align: top;
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
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
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
}

.edit-button-container {
  position: absolute;
  margin: auto;
  right: 25px;
  bottom: 5px;
}
.occupationText {
  color: $primary;
  font-size: 22px;
  font-weight: 400;
}

.orangeText {
  color: $primary;
}

.name-wrapper {
  position: relative;
  width: 100%;
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
