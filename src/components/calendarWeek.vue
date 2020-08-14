<template>
  <div class="calendar-root">
    <div class="calendar-container">
      <div class="whitespace"></div>
      <div class="timetable">
        <div
          v-for="i in Array(24).keys()"
          :key="String(i)"
          :class="'TBhour' + i"
          :style="weekday_grid_columns(i)"
        >
          <p>{{ String(i).length === 1 ? "0" + i + ":00" : i + ":00" }}</p>
        </div>
      </div>
      <div class="CW_Header"></div>

      <div
        v-for="day in [
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday,',
          'saturday',
          'sunday',
        ]"
        :key="String(day)"
        :class="'weekday ' + day"
      >
        <div class="WeekdayDisplay">
          <h3>{{ day }}</h3>
        </div>
        <div
          v-for="i in Array(24).keys()"
          :key="String(i)"
          :class="'hour' + i"
          @mouseover="setDraggingTargetMe(day + i)"
          :style="weekday_grid_columns(i)"
        >
          <template v-if="isKeyExistant(day + String(i))">
            <experience_calendarWidget
              @dragstart="isDraggingEvent = true"
              v-for="n in hashMap_events[day + String(i)]"
              :key="n.title"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import experience_calendarWidget from "./experience_calendarWidget";

export default {
  components: { experience_calendarWidget },

  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  watch: {
    Events(to, from) {
      console.log({ to: JSON.stringify(to), from: JSON.stringify(from) });
    },
  },
  data() {
    return {
      Events: [],
      cleaned_events: [],
      loading: true,
      hashMap_events: {},
      hashMap_calendarWidths: {},
      isDraggingEvent: false,
      dragTarget: "",
    };
  },
  mounted() {
    this.Events = this.$props.events;
    this.clean_events(this.Events);
    this.loading = false;
  },
  methods: {
    isKeyExistant(key) {
      return (
        this.hashMap_events[key.toLowerCase()] !== undefined &&
        this.hashMap_events[key.toLowerCase()].length > 0
      );
    },
    setDraggingTargetMe(e) {
      if (this.isDraggingEvent === true) {
        this.dragTarget = e;
      }
    },
    weekday_grid_columns(n) {
      let d = new Date();
      d.setHours(n);
      if (!this.loading) {
        let n = this.get_calendar_width_by_dateTime(d);
        return {
          display: "grid",
          gridTemplateRows: "1fr",
          gridTemplateColumns: "1fr ".repeat(n),
        };
      }
      return "";
    },

    clean_events: function(events) {
      let res_events = events;
      for (let i = 0; i < res_events.length; i++) {
        const element = res_events[i];
        res_events[i]["_calWidth"] = this.get_calendar_width_by_dateTime(
          element.from
        );
      }
      let res_hashmap = {};
      res_events.forEach((event) => {
        console.log(event);
        const d = new Date(event.from);
        const key =
          String(d.toLocaleString("default", { weekday: "long" })) +
          String(d.getHours()).toLowerCase();
        console.log(Object.keys(res_hashmap).includes(key));
        if (Object.keys(res_hashmap).includes(key)) {
          let arr = res_hashmap[key];
          arr.push(event);
          res_hashmap[key] = arr;
          this.$set(this.hashMap_events, key.toLowerCase(), arr);
        } else {
          let arr = [];
          arr.push(event);
          res_hashmap[key] = arr;
          this.$set(this.hashMap_events, key.toLowerCase(), arr);
        }
      });
      this.cleaned_events = res_events;
      return res_events;
    },

    get_date: function(n, day) {
      return Date();
    },

    get_calendar_width_by_dateTime: function(date) {
      if (this.hashMap_calendarWidths[String(date)] !== undefined) {
        return this.hashMap_calendarWidths[String(date)];
      }
      //console.log(date);
      if (this.Events !== undefined) {
        // Sort events by day and time
        let sortedEvents = this.Events;
        sortedEvents = sortedEvents.sort((a, b) => (a.to > b.to ? 1 : -1));
        let min = new Date(date),
          max = min,
          n_width = 0;
        let usedEvents = {};
        sortedEvents.forEach((i) => {
          //console.log(i);
          for (let j = 0; j < sortedEvents.length; j++) {
            if (usedEvents[j] === undefined) {
              let Ax = sortedEvents[j];
              Ax.to = new Date(Ax.to);
              Ax.from = new Date(Ax.from);
              //console.log(Ax);
              if (
                (Ax.from <= max && Ax.to >= min) || // Full body is in
                (Ax.from <= min && Ax.to >= min) || // Just the foot
                (Ax.from <= max && Ax.to >= max) // Just the head
              ) {
                //console.log(Ax);
                // Redefine search boundaries
                if (Ax.from < min) {
                  min = Ax.from;
                }
                if (Ax.to > max) {
                  max = Ax.to;
                }
                n_width += 1; // Increment registered searchspace occupancy by
                usedEvents[j] = j;
              }
            }
          }
        });
        this.hashMap_calendarWidths[String(date)] = n_width;
        return n_width;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";

$day_width: 280px;
$hour_height: 64px;
$day_height: $hour_height * 24;
.calendar-root {
  margin-bottom: 100px;
}
.calendar-container {
  @include mobile {
    width: 100vw;
  }
  display: grid;
  grid-template-rows: 100px $day_height;
  grid-template-columns: 50px repeat(7, $day_width);
  grid-template-areas:
    "whitespace CW_Header CW_Header CW_Header CW_Header CW_Header CW_Header CW_Header"
    "timetable monday tuesday wednesday thursday friday saturday sunday";
  gap: 0.7rem 1rem;
}
// 0 is reserved for title space
$timetable: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23, 24;
@each $i in $timetable {
  .TBhour#{$i} {
    justify-content: center;
    justify-self: center;
    justify-items: center;
    grid-area: #{$i};
    height: $hour_height;
    p {
      height: 20px;
      margin: auto;
      text-align: center;
    }
  }
  .hour#{$i} {
    grid-area: #{$i};
    height: $hour_height;
  }
}
.WeekdayDisplay {
  position: absolute;
  color: $primary;
  width: 100%;
  top: -58px;
  text-align: center;
}

.weekday {
  position: relative;
  border-radius: $border-radius-xs;
  width: $day_width;
  height: $day_height;
  background-color: $WT_grayl;
  display: grid;
  grid-template-rows: repeat(24, 1fr);
  grid-template-columns: auto;
  grid-template-areas: $timetable;
  height: $day_height;
}
.timetable {
  display: grid;
  grid-template-rows: repeat(24, 1fr);
  grid-template-columns: auto;
  grid-template-areas: $timetable;
  height: $day_height;
}

.monday {
  grid-area: monday;
}
.tuesday {
  grid-area: tuesday;
}
.wednesday {
  grid-area: wednesday;
}
.thursday {
  grid-area: thursday;
}
.friday {
  grid-area: friday;
}
.saturday {
  grid-area: saturday;
}
.sunday {
  grid-area: sunday;
}
.whitespace {
  grid-area: whitespace;
}
.timetable {
  grid-area: timetable;
}
.CW_Header {
  grid-area: CW_Header;
}
</style>
