<template>
  <div>
    <h1>ADVENTURE TEST PAGE</h1>

    <calendarWeek :events="payload" v-if="!loading" />
  </div>
</template>

<script>
import Vue from "vue";
import calendarWeek from "../components/calendarWeek";
import * as adventureService from "../utils/adventureService";
export default {
  name: "adventure",
  components: {
    calendarWeek,
  },
  mounted() {
    this.loading = true;
    adventureService
      .getCalendarSerialsedAdventure(this.$route.params.pk)
      .then((data) => {
        //this.payload = data;
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
      payload: [
        {
          from: d,
          to: d_p1,
          title: "experience_test1",
          banner: {
            url:
              "https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1825&q=80",
            alt: "test picture",
          },
        },
        {
          from: d,
          to: d_p2,
          title: "experience_test2",
          banner: {
            url:
              "https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1825&q=80",
            alt: "test picture",
          },
        },
        {
          from: d_p1,
          to: d_p3,
          title: "experience_test3",
          banner: {
            url:
              "https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1825&q=80",
            alt: "test picture",
          },
        },
      ],
    };
  },
};
</script>

<style></style>
