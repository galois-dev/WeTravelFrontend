<template>
  <div>
    <h1>ADVENTURE TEST PAGE</h1>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import Vue from "vue";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
      },
    };
  },
};
</script>

<style></style>
