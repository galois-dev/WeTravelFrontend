<template>
  <div class="ALRoot">
    <feed_list_activities :activities="queryRes" v-if="!loading" />
  </div>
</template>

<script>
import feed_list_activities from "../feed_list_activities.vue";
import * as AService from "../../utils/adventureService";

export default {
  components: {
    feed_list_activities,
  },
  data() {
    return {
      loading: true,
      queryRes: [],
      page: 0,
      next: "",
      filters: Object,
    };
  },
  methods: {
    loadResponseData(data) {
      this.loading = true;
      if (data.status === 200) {
        this.next = data.data.next;
        this.page += 1;
        let resArray = this.queryRes;
        resArray.push(...data.data.results);
        this.queryRes = resArray;
      }
      if (data.status !== 200) {
        this.$buefy.toast.open({
          message: `tried querying for profiles: ${data.statusText}`,
          type: `is-danger`,
        });
      }
      this.loading = false;
    },
  },
  async mounted() {
    this.loading = true;
    let res = AService.getActivities(this.filters, this.page)
      .then((res) => {
        this.loadResponseData(res);
      })
      .catch((e) => {
        this.$buefy.toast.open({
          type: "is-danger",
          message: `${e.statusText}`,
        });
      });
  },
};
</script>

<style lang="scss" scoped>
.ALRoot {
  display: grid;
}
</style>
