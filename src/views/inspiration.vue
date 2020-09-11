<template>
  <div>
    <h3>Discover the World</h3>
    <hr />
    <b-field id="search-outer">
      <b-input
        :style="{ display: 'inline' }"
        :placeholder="'search'"
        expanded
        v-on:enter="search"
        v-model="searchString"
      />
      <b-input
        :style="{ display: 'inline' }"
        :placeholder="'locationn'"
        expanded
        v-on:enter="search"
        v-model="locationString"
      />
    </b-field>
    <section id="tabs-outer">
      <div class="tabs-wrapper">
        <search_menu :tabRoute="currentTab" @search="search" />
        <b-tabs position="is-centered" expanded @input="updateCurrentTab">
          <b-tab-item
            expanded
            label="Profiles"
            value="profiles"
            v-if="!loading"
          >
            <feed_list_profiles :profiles="QProfiles" />
          </b-tab-item>
          <b-tab-item
            expanded
            label="Travel Plans"
            value="plans"
            v-if="!loading"
          >
            <feed_list_trips :trips="QTrips" />
          </b-tab-item>
          <b-tab-item
            expanded
            label="Activities"
            value="activities"
            v-if="!loading"
          >
            <activity_list />
          </b-tab-item>
          <b-tab-item
            expanded
            label="Restaurants"
            value="restaurants"
            v-if="!loading"
          >
            <feed_list_restaurants />
          </b-tab-item>
        </b-tabs>
      </div>
    </section>
  </div>
</template>

<script>
import * as AService from "../utils/adventureService";
import { inspireView, buildComputedProperty } from "../utils/translations";
import feed_list_restaurants from "../components/feed_list_restaurants";
import feed_list_profiles from "../components/feed_list_profiles";
import activity_list from "../components/controllers/activity_list";
import search_menu from "../components/controllers/search_menu";
import feed_list_trips from "../components/feed_list_trips";
export default {
  components: {
    feed_list_restaurants,
    feed_list_profiles,
    feed_list_trips,
    activity_list,
    search_menu,
  },
  data() {
    return {
      searchString: "",
      locationString: "",

      loading: false,
      currentTab: "profiles",
      QProfiles: [], // Return value holder
      PProfiles: 0, // Page
      NProfiles: "", // Next page url
      FProfiles: Object, // Filter model object

      QActivities: [], // -- ^ --
      PActivities: 0,
      NActivities: "",
      FActivities: Object,

      QTrips: [],
      PTrips: 0,
      NTrips: "",
      FTrips: Object,

      QRestaurants: [],
      PRestaurants: 0,
      NRestaurants: "",
      FRestaurants: Object,
      // -- -.- --
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
    updateCurrentTab(value) {
      this.currentTab = value;
    },
    applyFilters(filters) {
      if (this.searchString) {
        filters["search"] = this.searchString;
      }
      if (this.locationString) {
        filters["location"] = this.locationString;
      }
      return filters;
    },
    async search() {
      const TAB = this.currentTab;
      switch (TAB) {
        case "profiles":
          let filters = this.FProfiles;
          filters = this.applyFilters(filters);
          let page = this.PProfiles;
          filters;
          AService.getProfiles(filters, page)
            .then((e) => {
              if (e.data.results.length > 0) {
                this.QProfiles.push(...e.data.results);
                this.PProfiles += 1;
              }
            })
            .catch((e) => {
              console.log(e);
              this.$buefy.toast.open({
                message: "query error",
                type: "is-danger",
              });
            });
          break;

        case "plans":
          filters = this.FTrips;
          filters = this.applyFilters(filters);
          page = this.FTrips;
          AService.getTrips(filters, page).then((e) => {
            if (e.data.results.length > 0) {
              this.QTrips.push(...e.data.results);
              this.PTrips += 1;
            }
          });
          break;

        case "activities":
          filter = this.FActivities;
          filters = this.applyFilters(filters);
          page = this.FActivities;
          AService.getActivities(filters, page)
            .then((e) => {
              if (e.data.results.length > 0) {
                this.QActivities.push(...e.data.results);
                this.PActivities += 1;
              }
            })
            .catch((e) => {
              this.$buefy.toast.open({
                message: `Query error: ${e.statusText}`,
                type: "is-danger",
              });
            });
          break;

        case "restaurants":
          filter = this.FRestaurants;
          filters = this.applyFilters(filters);
          page = this.FRestaurants;
          AService.getRestaurants(filters, page)
            .then((e) => {
              if (e.data.results.length > 0) {
                this.QRestaurants.push(...e.data.results);
                this.PRestaurants += 1;
              }
            })
            .catch((e) => {
              this.$buefy.toast.open({
                message: `Query error: ${e.statusText}`,
                type: "is-danger",
              });
            });
          break;
        default:
          break;
      }
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
  position: relative;
  margin-top: 1.2rem;
  min-height: 100vh;
  .b-checkbox {
    margin-top: 0.5rem;
  }
}
.search-inner {
  display: inline-grid;
  width: 100%;
}
</style>
