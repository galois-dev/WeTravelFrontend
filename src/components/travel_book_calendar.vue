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
      :on-event-click="onEventClick"
    >
      <template
        v-slot:event="{ event, view }"
        class="VC_event_container"
        :style="eventTypeColor(event.type)"
      >
        <div
          class="VC_custom_event_week"
          v-if="view == 'week'"
          :style="eventTypeColor(event.type)"
        >
          <div
            class="vuecal__event-title VC_custom_title"
            v-html="event.title"
          />

          <div class="vuecal__event-time VC_custom_time">
            <!-- Using Vue Cal injected Date prototypes -->
            {{ prettyTime(event.start) }} - {{ prettyTime(event.end) }}
          </div>
          <div class="vuecal_event-time VC_custom_icon">
            <FilmstripIcon v-if="event.type.toLowerCase() === 'activity'" />
            <SilverwareIcon
              :size="48"
              v-if="String(event.type).toLowerCase() === 'restaurant'"
            />
          </div>
        </div>
        <!-- <div class="vuecal__event-title" v-if="view" v-html="event.title" /> -->
        <!-- <div class="VC_event_descriptions">
            <div class="VC_event_type">{{ event.type }}</div>

            <div class="VC_title">{{ event.title }}</div>
          </div> -->
        <!-- <img :src="event.image" />
        </div> -->
        <!-- <div class="VC_custom_event_week day" v-if="view == 'day'">
          <img class="day" :src="event.image" />
          <div class="VC_event_descriptions day">
            <span class="VC_event_type day">{{ event.type }}</span> ⁄
            <span class="VC_title day">{{ event.title }}</span>
            <div></div>
          </div>
        </div> -->
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
import "@mdi/font/css/materialdesignicons.css";
import "vue-material-design-icons/styles.css";
import FilmstripIcon from "vue-material-design-icons/Filmstrip.vue";
import SilverwareIcon from "vue-material-design-icons/Silverware.vue";

export default {
  components: {
    VueCal,
    FilmstripIcon,
    SilverwareIcon,
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
      selectedEvent: {},
    };
  },
  methods: {
    logEvents(event, data) {
      //console.log(event, data);
    },
    handleDropEvent(e) {
      this.madeChanges = true;
      for (let i = 0; i < this.events.length; i++) {
        const event = this.events[i];
        if (event.pk === e.event.pk) {
          const duration = event.end.getTime() - event.start.getTime();
          this.events[i].start = e.newDate;
          this.events[i].end = new Date(e.newDate.getTime() + duration);
        }
      }
      console.log(e);
    },
    onEventClick(event, e) {
      console.log(event.pk);
    },
    handleDurationChangeEvent(e) {
      this.madeChanges = true;
      for (let i = 0; i < this.events.length; i++) {
        const event = this.events[i];
        if (event.pk === e.event.pk) {
          this.events[i].start = e.event.start;
          this.events[i].duration =
            (e.event.end.getTime() - e.event.start.getTime()) / (3600 * 1000);
        }
      }
      console.log(e);
    },
    saveChanges() {
      this.madeChanges = false;
      this.$emit("save_calendar", this.events);
    },
    deleteExperience(pk) {
      this.$emit("delete_experience", pk);
    },
    prettyTime(str_date) {
      const jsDate = new Date(str_date);
      if (jsDate) {
        return `${
          jsDate.getHours() < 10 ? "0" + jsDate.getHours() : jsDate.getHours()
        }:${jsDate.getMinutes() === 0 ? "00" : jsDate.getMinutes()}`;
      } else {
        return "--:--";
      }
    },
    getIconType(type) {
      let icon;

      if (type === "Restaurant") {
        icon = "restaurantMenu";
      }
      if (type === "activity") {
        icon = "movieFilter";
      }
      return icon;
    },
    eventTypeColor(type) {
      let color;
      if (type === "Restaurant") {
        color = "#8fe1ff";
      }
      if (type === "activity") {
        color = "#ff8f8f";
      }
      return { backgroundColor: color };
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../variables";

// ==> Custom event styles  <==
.VC_custom_time {
  margin-top: -10px;
  color: $WT_gray2;
  font-size: 12px;
  font-weight: 600;
  line-height: 0.8rem;
  letter-spacing: 0.02rem;
}
.VC_custom_title {
  @include mobile {
    font-size: 11px;
  }
  color: $WT_gray2;
  @include desktop {
    font-size: 20px;
  }
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 5px;
  padding-top: 2px;
  line-height: 0.7rem;
}
.VC_custom_icon {
  $VC_icon_size: 48px;

  @include mobile {
    $VC_icon_size: 32px;
  }
  width: 100%;
  span {
    width: 100%;
    height: 100%;
    position: relative;
    svg {
      width: $VC_icon_size;
      height: $VC_icon_size;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
}

.TBC_container {
  position: relative;
}
.TBC_save {
  position: absolute;
  margin: auto;
  left: 5px;
  top: 2px;
}
.VC_custom_event_week {
  width: 100%;
  height: 100%;
  margin: 0;
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
.vuecal__event-time {
  margin-top: -5px;
}
</style>

// NOT-scoped
<style lang="css"></style>
