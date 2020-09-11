<template>
  <div class="profiles_list_root">
    <profile_big_card
      v-for="(profile, i) in profiles"
      :key="i"
      :pk="profile.pk ? profile.pk : {}"
      :name="profile.name ? profile.name : {}"
      :birthday="profile.birthday ? profile.birthday : {}"
      :country="profile.country ? profile.country : {}"
      :nfollowers="profile.nfollowers ? profile.nfollowers : 0"
      :is_followed="profile.is_followed ? profile.is_followed : false"
      :ambassador="profile.ambassador ? profile.ambassador : {}"
      :image="profile.image !== undefined ? profile.image : {}"
      :pictures="profile.pictures ? profile.pictures : {}"
      :tags="profile.interests ? profile.interests : {}"
      :last_travel="profile.last_travel ? profile.last_travel : {}"
    />
  </div>
</template>

<script>
import profile_big_card from "./profile_big_card";

export default {
  components: {
    profile_big_card,
  },
  props: {
    profiles: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.profiles_list_root {
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-gap: 0.5em;
}
</style>
