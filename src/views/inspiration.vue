<template>
  <div>
    <h3>Discover the World</h3>
    <hr />
    <section>
      <b-input :placeholder="searchLabel" v-model="queryString" rounded>
      </b-input>
      <span class="IW_search-button">
        <b-button type="is-primary" @click="getBySettings">{{
          searchLabel
        }}</b-button>
      </span>
    </section>
    <section id="checkboxes-outer">
      <div class="checkboxes-wrapper">
        <b-checkbox v-model="cbProfiles" native-value="Profiles">
          Profiles
        </b-checkbox>
        <b-checkbox v-model="cbPlaces" native-value="Places">
          Places
        </b-checkbox>
        <b-checkbox v-model="cbTrips" native-value="Trips">
          Trips
        </b-checkbox>
        <b-checkbox v-model="cbActivities" native-value="Activities">
          Activities
        </b-checkbox>
        <b-checkbox v-model="cbFollowing" native-value="Following">
          Following
        </b-checkbox>
      </div>
    </section>
  </div>
</template>

<script>
import { getAdventuresByMode } from "../utils/adventureService";
import { inspireView, buildComputedProperty } from "../utils/translations";
export default {
  data: function() {
    return {
      queryString: "",
      cbProfiles: false,
      cbPlaces: false,
      cbTrips: false,
      cbActivities: false,
      cbFollowing: false,
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

#checkboxes-outer {
}

.checkboxes-wrapper {
  display: grid;
  justify-self: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  width: 100%;

  .b-checkbox {
    margin-left: 1rem;
    margin-top: 0.5rem;
  }
}
</style>
