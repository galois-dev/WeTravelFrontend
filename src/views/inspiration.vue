<template>
  <div>
    <h3>Discover the World</h3>
    <hr />
    <section id="search-outer">
      <b-input :placeholder="searchLabel" v-model="queryString" rounded>
      </b-input>
    </section>
    <section id="tabs-outer">
      <div class="tabs-wrapper">
        <b-tabs position="is-centered" expanded>
          <b-tab-item expanded label="Profiles" v-if="!loading">
            <feed_list_profiles />
          </b-tab-item>
          <b-tab-item expanded label="Trips" v-if="!loading">
            <feed_list_trips />
          </b-tab-item>
          <b-tab-item expanded label="Activities" v-if="!loading">
            <feed_list_activities />
          </b-tab-item>
          <b-tab-item expanded label="Restaurants" v-if="!loading">
            <feed_list_restaurants />
          </b-tab-item>
        </b-tabs>
      </div>
    </section>
  </div>
</template>

<script>
import { getAdventuresByMode } from "../utils/adventureService";
import { inspireView, buildComputedProperty } from "../utils/translations";
import feed_list_restaurants from "../components/feed_list_restaurants";
import feed_list_profiles from "../components/feed_list_profiles";
import feed_list_activities from "../components/feed_list_activities";
import feed_list_trips from "../components/feed_list_trips";
export default {
  components: {
    feed_list_restaurants,
    feed_list_profiles,
    feed_list_trips,
    feed_list_activities,
  },
  data: function() {
    return {
      queryString: "",
      cbProfiles: false,
      cbPlaces: false,
      cbTrips: false,
      cbActivities: false,
      cbFollowing: false,
      loading: false,
    };
  },
  computed: {
    searchLabel: {
      get() {
        return buildComputedProperty(
          this.$store,
          inspireView,
          "searchPlaceholderLabel"
        );
      },
    },
  },
  methods: {
    async getByMode(mode) {
      return await getAdventuresByMode(mode);
    },
    async getBySettings() {
      // get by all selected modes adevntures
      return await getByMode("Travels");

      // get by all selected modes
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";
hr {
  background-color: $primary;
}
h3 {
  color: $primary;
}

.tabs-wrapper {
  margin-top: 1.2rem;
  min-height: 100vh;
  .b-checkbox {
    margin-top: 0.5rem;
  }
}
</style>
