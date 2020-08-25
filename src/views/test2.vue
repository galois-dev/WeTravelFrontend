<template>
  <div v-if="!loading">
    <travel_book_calendar :IEvents="experiences" />
  </div>
</template>

<script>
import travel_book_calendar from "../components/travel_book_calendar";
import {
  ExpTypeToEventType,
  EventTypeToExpType,
} from "../utils/experienceService";
export default {
  components: {
    travel_book_calendar,
  },
  // Base event type of vue-cal
  //   _eid:"14_1"
  // allDay:false
  // background:false
  // class:""
  // content:""
  // daysCount:1
  // deletable:true
  // deleting:false
  // draggable:true
  // dragging:false
  // draggingStatic:false
  // end:Thu Aug 20 2020 11:15:00 GMT+0200 (Central European Summer Time)
  // endTimeMinutes:675
  // focused:false
  // repeat:null
  // resizable:true
  // resizing:false
  // segments:null
  // split:null
  // start:Thu Aug 20 2020 08:00:00 GMT+0200 (Central European Summer Time)
  // startTimeMinutes:480
  // title:""
  // titleEditable:true

  /*
    start: '2018-11-19 10:35',
    end: '2018-11-19 11:30',
    title: 'Doctor appointment'
  */
  /**
   *  start: '2018-11-19 12:00', // Required.
      end: '2018-11-19 14:00', // Required.
      // Instead of formatted dates, you can also provide Javascript Date objects:
      // start: new Date(2018, 11 - 1, 19, 12, 0),
      // end: new Date(2018, 11 - 1, 19, 14, 0),
      title: {String}, // Optional.
      content: {String}, // Optional.
      class: {String}, // Optional - space-separated css classes.
      background: {Boolean} // Optional. (Event type not CSS property)
      split: {Number|String} // Optional.
      allDay: {Boolean} // Optional.
      deletable: false // optional - force undeletable when events are editable.
      resizable: false // optional - force unresizable when events are editable.
   */
  mounted() {
    const EXP = this.experiences;
    ExpTypeToEventType(EXP).then((res) => {
      this.experiences = res;
      this.loading = false;
      EventTypeToExpType(res).then((e) => {
        console.log(e);
      });
    });
  },
  data() {
    return {
      loading: true,
      experiences: [
        {
          time: "2020-08-26T11:00:00Z",
          duration: 1.0,
          description: "Trip to ankara",
          restaurant: {
            name: "Ankara",
            description: "This is a turkish restaurant",
            score: 2.0,
            website: "http://ankara.com",
            address: "",
            email: "this@ankara.com",
            image:
              "https://d47btxtba30un.cloudfront.net/media/restaurant/a489477a-7c7a-4fd7-850c-fa30ac708696.jpg",
            pricing: 3.0,
            pictures: [],
            tags: [],
          },
          activity: null,
          pk: 1,
          title: "",
        },
        {
          time: "2020-08-29T06:00:00Z",
          duration: 1.0,
          description: "Morning coffee",
          restaurant: {
            name: "The Horizon",
            description: "A beautiful birds-eye view",
            score: 3.0,
            website: "http://horizon.com",
            address: "",
            email: "this@horizon.com",
            image:
              "https://d47btxtba30un.cloudfront.net/media/restaurant/07b44182-5425-46b1-bf15-d1f29368876c.jpg",
            pricing: 3.0,
            pictures: [],
            tags: [],
          },
          activity: null,
          pk: 2,
          title: "",
        },
      ],
    };
  },
};
</script>

<style></style>
