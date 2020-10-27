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
        <search_menu :tabRoute="currentTab" @search="search(true)" />
        <b-tabs
          ref="tabs"
          position="is-centered"
          expanded
          @input="updateCurrentTab"
        >
          <b-tab-item
            expanded
            class="generic_tab"
            label="Profiles"
            value="profiles"
          >
            <feed_list_profiles :profiles="QProfiles" />
          </b-tab-item>
          <b-tab-item
            expanded
            class="generic_tab"
            label="Travel Plans"
            value="plans"
          >
            <travel_book_list :travel_books="QTrips" v-if="QTrips.length > 0" />
          </b-tab-item>
          <b-tab-item
            expanded
            class="generic_tab"
            label="Activities"
            value="activities"
          >
            <activity_list />
          </b-tab-item>
          <b-tab-item
            expanded
            class="generic_tab"
            label="Restaurants"
            value="restaurants"
          >
            <feed_list_restaurants />
          </b-tab-item>
          <bread_crumbs :loading="loading" />
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
import travel_book_list from "../components/travel_book_list";
import bread_crumbs from "../components/bread_crumbs";
export default {
  components: {
    feed_list_restaurants,
    feed_list_profiles,
    travel_book_list,
    activity_list,
    search_menu,
    bread_crumbs,
  },
  mounted() {
    let ref = this.$parent.$el.children[0];

    this.$parent.$el.children[0].onscroll = () => {
      if (ref.scrollTop > this.scroll_progress) {
        this.scroll_progress += 100;
        this.search(false);
      }
    };
  },
  data() {
    return {
      searchString: "",
      locationString: "",
      scroll_progress: 0,

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
    async search(replacement = false) {
      const TAB = this.currentTab;
      this.loading = true;
      switch (TAB) {
        case "profiles":
          let filters = this.FProfiles;
          filters = this.applyFilters(filters);
          let page = this.PProfiles;
          filters;
          if (page > 0 && this.NProfiles === "") {
            this.loading = false;
            break;
          }
          AService.getProfiles(filters, page)
            .then((e) => {
              this.loading = false;
              if (e.data.results.length > 0) {
                if (replacement) {
                  this.QProfiles = e.data.results;
                } else {
                  this.QProfiles.push(...e.data.results);
                }
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
          page = this.PTrips;
          if (page > 0 && this.NTrips === "") {
            this.loading = false;

            break;
          }
          AService.getTrips(filters, page).then((e) => {
            this.loading = false;
            if (e.data.results.length > 0) {
              if (replacement) {
                this.QTrips = e.data.results;
              } else {
                this.QTrips.push(...e.data.results);
              }
              this.PTrips += 1;
            }
          });
          break;

        case "activities":
          filter = this.FActivities;
          filters = this.applyFilters(filters);
          page = this.PActivities;
          if (page > 0 && this.NActivities === "") {
            this.loading = false;
            break;
          }
          AService.getActivities(filters, page)
            .then((e) => {
              this.loading = false;
              if (e.data.results.length > 0) {
                if (replacement) {
                  this.QActivities = e.data.results;
                } else {
                  this.QActivities.push(...e.data.results);
                }
                this.PActivities += 1;
              }
            })
            .catch((e) => {
              this.loading = false;
              this.$buefy.toast.open({
                message: `Query error: ${e.statusText}`,
                type: "is-danger",
              });
            });
          break;

        case "restaurants":
          filter = this.FRestaurants;
          filters = this.applyFilters(filters);
          page = this.PRestaurants;
          if (page > 0 && this.NRestaurants === "") {
            this.loading = false;

            break;
          }
          AService.getRestaurants(filters, page)
            .then((e) => {
              this.loading = false;
              if (e.data.results.length > 0) {
                if (replacement) {
                  this.QRestaurants = e.data.results;
                } else {
                  this.QRestaurants.push(...e.data.results);
                }
                this.PRestaurants += 1;
              }
            })
            .catch((e) => {
              this.loading = false;
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
  handleScroll(e) {
    console.log("triggered");
    console.log(e);
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
