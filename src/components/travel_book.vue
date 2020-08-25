<template>
  <div class="travel-book-root" v-if="!loading">
    <div class="TBLHS">
      <div class="Location">{{ location }}</div>
      <div class="Time">
        {{ prettyPrintTime(travel_start) }} -
        {{ prettyPrintTime(travel_end) }}
      </div>
      <div class="Travellers" v-if="travellers && travellers.length > 0">
        <travellers_icon_list :travellers="travellers" />
        <!-- add the 'add more' travellers button on editing --->
      </div>
      <div class="Creator">{{ owner }}</div>
      <div class="Pricing">
        <pricing_range :rating="pricing" />
      </div>
      <div class="Tags">
        <tags_list
          :tags="tags ? tags : []"
          :editing="editing"
          :typeOfTag="'tag'"
        />
      </div>
      <div class="Description">{{ description }}</div>
    </div>
    <div class="TBRHS"></div>
  </div>
</template>

<script>
import tags_list from "../components/tags_list";
import pricing_range from "../components/pricing_range";
import travellers_icon_list from "../components/travellers_icon_list";

export default {
  components: { tags_list, pricing_range, travellers_icon_list },
  props: {
    ITravelBook: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      editing: false,
      travel_start: null,
      location: null,
      travel_end: null,
      travellers: null,
      owner: null,
      tags: null,
      description: null,
      pricing: null,
    };
  },
  mounted() {
    if (this.$props.ITravelBook) {
      const ITBOOK = this.$props.ITravelBook;
      console.log(ITBOOK);
      this.travel_start = ITBOOK.travel_start;
      this.travel_end = ITBOOK.travel_end;
      this.travellers = ITBOOK.travellers;
      this.owner = ITBOOK.owner;
      this.location = ITBOOK.location;
      this.tags = ITBOOK.tags;
      this.description = ITBOOK.description;
      this.pricing = ITBOOK.pricing;
      this.loading = false;
    }
  },
  methods: {
    gotoProfile(pk) {},
    prettyPrintTime(ISOString) {
      const date = new Date(ISOString);
      return `${date.getFullYear()} ${date.getMonth() + 1} ${date.getDate()}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.travel-book-root {
  display: grid;
}
</style>
