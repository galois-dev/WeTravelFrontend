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
        <div
          v-for="i in Array(24).keys()"
          :key="String(i)"
          :class="'hour' + i"
          :style="weekday_grid_columns(i)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      hashMap_calendarWidths: {},
    };
  },
  mounted() {
    this.Events = this.$props.events;
    this.clean_events(this.Events);
    this.loading = false;
  },
  methods: {
    weekday_grid_columns(n) {
      let d = new Date();
      d.setHours(n);
      if (!this.loading) {
        console.log(
          "Calling get_calendar_width_by_dateTime from weekday_grid_columns"
        );
        let n = this.get_calendar_width_by_dateTime(d);
        return {
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
                console.log(Ax);
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
$hour_height: 58px;
$day_height: $hour_height * 24;

.calendar-container {
  overflow: scroll;
  @include mobile {
    overflow: hidden;
  }
  height: 80vh;
  display: grid;
  grid-template-rows: 100px repeat(7, $day_height);
  grid-template-columns: 100px repeat(7, $day_width);
  grid-template-areas:
    "whitespace CW_Header CW_Header CW_Header CW_Header CW_Header CW_Header CW_Header"
    "timetable monday tuesday wednesday thursday friday saturday sunday"
    "timetable monday tuesday wednesday thursday friday saturday sunday"
    "timetable monday tuesday wednesday thursday friday saturday sunday"
    "timetable monday tuesday wednesday thursday friday saturday sunday"
    "timetable monday tuesday wednesday thursday friday saturday sunday"
    "timetable monday tuesday wednesday thursday friday saturday sunday"
    "timetable monday tuesday wednesday thursday friday saturday sunday";
  grid-column-gap: 1.2rem;
  grid-row-gap: 0.7rem;
  background-color: rgba(0, 0, 0, 0.199);
}

$timetable: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23;
@each $i in $timetable {
  .TBhour#{$i} {
    grid-area: #{$i};
    height: $hour_height;
  }
  .hour#{$i} {
    grid-area: #{$i};
    height: $hour_height;
  }
}

.weekday {
  width: $day_width;
  height: $day_height;
  border: 2px solid black;
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
