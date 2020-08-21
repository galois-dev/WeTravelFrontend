<template>
  <div class="followerListRoot modal-card">
    <div class="FLElement" v-for="(traveller, i) in travellers" :key="i">
      <div class="IKHolder">
        <div class="ProfilePicIcon" :style="profile_picture_style(i)" />
      </div>
      <div class="profiledata">
        <div class="name-holder">{{ traveller.name }}</div>
        <div class="ageLoc-holder">
          {{ getAge(traveller.birthday) }}, {{ _flag(traveller.country) }}
        </div>
      </div>
      <div class="actions">
        <b-button
          v-if="traveller.pk !== $store.state.UserSettings.pk"
          type="is-primary is-light"
          @click="emitHandleFollowSignal(traveller.pk, traveller.is_followed)"
          >{{ traveller.is_followed ? "unfollow" : "follow" }}</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { calculateAge } from "../utils/util";
import flag from "country-code-emoji";

export default {
  props: {
    travellers: {
      type: Array,
      required: true,
    },
  },
  methods: {
    emitHandleFollowSignal(pk, is_following) {
      this.$emit("handleFollow", { pk, is_following });
    },
    emitLoadMoreData() {
      this.$emit("update");
    },
    getAge(bday) {
      return calculateAge(bday);
    },
    profile_picture_style(i) {
      const url =
        "url(" + this.travellers[i].image.url + ")" + " 50%, 50%, no-repeat";
      return {
        background: [url],
      };
      return "";
    },
    _flag(country) {
      return flag(country);
    },
  },
};
</script>

<style lang="scss" scoped>
.followerListRoot {
  width: auto;
  background: whitesmoke;
  min-width: 250px;
}

.FLElement {
  margin: 0.5rem;
  min-width: 250px;
  width: 30vw;
  display: inline-flex;
}
.profiledata {
  margin: auto;
  grid-area: profiLe;
  width: 100%;
}
.IKHolder {
  grid-area: icon;
  margin: 6px;
  margin-right: 16px;
  margin-left: 16px;
  width: 64px;
  height: 64px;
}
.actions {
  grid-area: test;
  margin: auto;
}
.ProfilePicIcon {
  width: 32px;
  height: 32px;
  transform: scale(2);
  border-radius: 50%;
  margin: auto;
  margin-top: 16px;

  right: 0;
  bottom: 0;
}
</style>
