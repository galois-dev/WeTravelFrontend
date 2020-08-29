<template>
  <div class="adventure-root" v-if="!loading">
    <div class="adventure-header">
      <div class="adventure-header-info">
        <h2>{{ adventureTitle }}</h2>
        <b-dropdown
          class="adventure-header-options-button"
          aria-role="list"
          type="is-top-left"
          paddingless
        >
          <b-button
            class="button is-primary"
            slot="trigger"
            slot-scope="{ active }"
            inverted
            rounded
          >
            <span>Options</span>
            <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
          </b-button>

          <b-dropdown-item aria-role="listitem">Share</b-dropdown-item>
          <b-dropdown-item aria-role="listitem">Change Dates</b-dropdown-item>
          <b-dropdown-item aria-role="listitem">Get Support</b-dropdown-item>
          <b-dropdown-item aria-role="listitem"
            >Delete Travel Plan</b-dropdown-item
          >
        </b-dropdown>
      </div>
      <div class="adventure-header-tabs">
        <b-tabs position="is-centered" expanded>
          <b-tab-item
            expanded
            label="Calendar"
            icon="calendar-today"
            v-if="!loading"
          >
            <travel_book_calendar
              :IEvents="payload.experiences ? payload.experiences : []"
              @save_calendar="handleSaveCal"
            />
          </b-tab-item>
          <b-tab-item
            label="Travel Book"
            icon="book"
            v-if="!(TBPayload.pk === null || TBPayload.pk === undefined)"
          >
            <travel_book
              :travel_start="TBPayload.travel_start"
              :travel_end="TBPayload.travel_end"
              :location="TBPayload.location"
              :owner="TBPayload.owner"
              :travellers="TBPayload.travellers"
              :tags="TBPayload.tags"
              :description="TBPayload.description"
              :pricing="TBPayload.pricing"
              :images="TBPayload.images"
            />
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import travel_book from "../components/travel_book";
import travel_book_calendar from "../components/travel_book_calendar";
import * as adventureService from "../utils/adventureService";
import {
  EventTypeToExpType,
  updateExperience,
} from "../utils/experienceService";
import axios from "axios";

export default {
  name: "adventure",
  components: {
    travel_book_calendar,
    travel_book,
  },
  mounted() {
    this.loading = true;
    adventureService
      .getCalendarSerialsedAdventure(this.$route.params.pk)
      .then((data) => {
        console.log(data);
        this.payload = data.data;
        this.adventureTitle = data.data.title;
      });

    adventureService
      .getTravelBookByAdventure(this.$route.params.pk)
      .then((data) => {
        this.TBPayload = data.data;
      });

    this.loading = false;
  },

  data() {
    let d = new Date();
    let d_p1 = new Date(d).setHours(d.getHours() + 1);
    let d_p2 = new Date(d).setHours(d.getHours() + 2);
    let d_p3 = new Date(d).setHours(d.getHours() + 3);
    return {
      loading: true,
      adventureTitle: "...",
      payload: [],
      TBPayload: {},
    };
  },

  methods: {
    handleSaveCal: async function(eventsList) {
      const Persistables = await EventTypeToExpType(eventsList);
      const PK = this.$route.params.pk;
      let SavePromises = [];
      let Failed = false;
      Persistables.forEach(async (event) => {
        SavePromises.push(updateExperience(PK, event.pk, event));
      });
      if ((await Promise.all(SavePromises)) && SavePromises.length > 0) {
        this.$buefy.toast.open({
          message: `Saved!`,
          duration: 1000,
          type: "is-success",
        });
      } else if (SavePromises.length > 0) {
        this.$buefy.toast.open({
          message: `Not Saved!`,
          duration: 3000,
          type: "is-danger",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";

.adventure-root {
  height: 100%;
}
.adventure-header-info {
  h2 {
    margin-left: 2rem;
  }
  margin-top: 0px;
  display: inline-flex;
  width: 100%;
}

.adventure-header-options-button {
  margin: auto;
  margin-right: 1rem;
  margin-bottom: 0px;
}
</style>
