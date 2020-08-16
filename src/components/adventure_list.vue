<template>
  <div class="adventurelist_root" v-if="adventures_list !== undefined">
    <adventure_card
      v-for="adventure in adventures_list"
      :key="adventure.pk"
      :location="adventure.location"
      :title="adventure.title"
      :tags="adventure.tags"
      :banner="adventure.banner"
      :pk="String(adventure.pk)"
      :travellers="adventure.travellers"
      :creator="adventure.owner"
      :travel_start="adventure.start"
      :travel_end="adventure.end"
    />
  </div>
</template>

<script>
import adventure_card from "./adventure_card";
import { getAdventuresByMode } from "../utils/adventureService";
export default {
  name: "adventure_list",
  components: { adventure_card },
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      adventures_list: [],
    };
  },
  methods: {
    update_self(hasRun = false) {
      let res = getAdventuresByMode(this.$props.mode)
        .then((data) => {
          if (!data.data) {
            console.log(data);
            this.$buefy.toast.open({
              message:
                "error code: 500 - Server unavaliable to send data for adventures.",
              type: "is-danger",
              position: "is-top",
            });
          } else {
            this.adventures_list = data.data.adventures;
          }
        })
        .catch((err) => {
          this.$store.dispatch("refreshLogin");
          if (!hasRun) {
            this.update_self(true);
          }
        });
    },
  },
  mounted() {
    this.update_self();
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";
.adventurelist_root {
  max-width: $max-content-width;
  width: 100%;
  vertical-align: middle;
}
</style>
