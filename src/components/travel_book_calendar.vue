<template>
  <div v-if="!loading" class="TBC_container">
    <div class="TBC_save" v-if="madeChanges">
      <b-button @click="saveChanges" type="is-success" inverted rounded
        >Save</b-button
      >
    </div>
    <vue-cal
      :time-from="5 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year']"
      editable-events
      :events="events"
      :snap-to-time="15"
      :timeCellHeight="80"
      cell-contextmenu
      draggable="true"
      :cell-click-hold="false"
      :drag-to-create-event="false"
      @ready="logEvents('ready', $event)"
      @view-change="logEvents('view-change', $event)"
      @cell-click="logEvents('cell-click', $event)"
      @cell-dblclick="logEvents('cell-dblclick', $event)"
      @cell-contextmenu="logEvents('cell-contextmenu', $event)"
      @cell-focus="logEvents('cell-focus', $event)"
      @event-focus="logEvents('event-focus', $event)"
      @event-mouse-enter="logEvents('event-mouse-enter', $event)"
      @event-mouse-leave="logEvents('event-mouse-leave', $event)"
      @event-title-change="logEvents('event-title-change', $event)"
      @event-content-change="logEvents('event-content-change', $event)"
      @event-duration-change="handleDurationChangeEvent($event)"
      @event-drop="handleDropEvent($event)"
      @event-create="logEvents('event-create', $event)"
      @event-drag-create="logEvents('event-drag-create', $event)"
      @event-delete="logEvents('event-delete', $event)"
    >
      <template v-slot:event="{ event, view }" class="VC_event_container">
        <div class="VC_custom_event" v-if="view == 'week'">
          <!-- <div class="vuecal__event-title" v-if="view" v-html="event.title" /> -->
          <div class="VC_event_descriptions">
            <div class="VC_event_type">{{ event.type }}</div>

            <div class="VC_title">{{ event.title }}</div>
          </div>
          <img :src="event.image" />
        </div>
        <div class="VC_custom_event day" v-if="view == 'day'">
          <img class="day" :src="event.image" />
          <div class="VC_event_descriptions day">
            <span class="VC_event_type day">{{ event.type }}</span> ⁄
            <span class="VC_title day">{{ event.title }}</span>
            <div></div>
          </div>
        </div>
        <!-- Or if your events are editable: -->
        <!-- <div
          class="vuecal__event-title vuecal__event-title--edit"
          contenteditable
          @blur="event.title = $event.target.innerHTML"
          v-html="event.title"
        /> -->
      </template>
    </vue-cal>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/drag-and-drop.js";
import { ExpTypeToEventType } from "../utils/experienceService";

export default {
  components: {
    VueCal,
  },
  props: {
    // Initial events (as they 'were' from the database)
    IEvents: {
      type: Array,
      required: true,
    },
  },
  watch: {
    IEvents: function(n, o) {
      console.log(n, o);
      ExpTypeToEventType(n).then((res) => {
        this.events = res;
      });
    },
  },
  mounted() {
    this.events = this.$props.IEvents;
    this.loading = false;
  },
  data() {
    return {
      events: [],
      madeChanges: false,
      loading: true,
    };
  },
  methods: {
    logEvents(event, data) {
      //console.log(event, data);
    },
    handleDropEvent(e) {
      this.madeChanges = true;
      console.log(e);
    },
    handleDurationChangeEvent(e) {
      this.madeChanges = true;
      console.log(e);
    },
    saveChanges() {
      this.madeChanges = false;
      this.$emit("save_calendar", this.events);
    },
    deleteExperience(pk) {
      this.$emit("delete_experience", pk);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../variables";
.TBC_container {
  position: relative;
}
.TBC_save {
  position: absolute;
  margin: auto;
  left: 5px;
  top: 2px;
}
.VC_custom_event {
  width: 100%;
  display: inline-flex;
  span {
    width: 100%;
  }
  img {
    min-width: 20px;
    max-width: 200px;
    height: auto;
    border-radius: 5px;
    margin: 4px;
    right: 0;
    &.day {
      margin: auto;
      right: 0;
    }
  }
}
.VC_event_descriptions {
  display: block;
  margin: 4px;
  &.day {
    margin: auto;
    left: 0;
    top: 0;
  }
}
.VC_event_type {
  color: $WT_grayd;
  font-size: 12px;
  &.day {
    font-size: 22px;
  }
  font-weight: 600;
}
.VC_title {
  color: $WT_gray0;
  &.day {
    font-size: 22px;
  }
  font-size: 14px;
  font-weight: 400;
}
</style>

// NOT-scoped
<style lang="css"></style>
