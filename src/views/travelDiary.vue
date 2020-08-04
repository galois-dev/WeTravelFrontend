<template>
  <div class="TDtravellist_root">
    <div class="TDlistview-wrapper">
      <h4>{{ SavedVacationsTitle }}</h4>
      <hr />
      <adventure_list :mode="'saved'" />

      <h4>{{ MemoriesVacationsTitle }}</h4>
      <hr />
      <adventure_list :mode="'memories'" />
    </div>
  </div>
</template>

<script>
import adventure_list from "../components/adventure_list";
import { buildComputedProperty, travelListView } from "../utils/translations";

export default {
  components: {
    adventure_list,
  },
  computed: {
    MemoriesVacationsTitle: {
      get() {
        return buildComputedProperty(
          this.$store,
          travelListView,
          "MemoriesVacationsTitle"
        );
      },
    },
    SavedVacationsTitle: {
      get() {
        return buildComputedProperty(
          this.$store,
          travelListView,
          "SavedVacationsTitle"
        );
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";

.TDtravellist_root {
  height: 100vh;
  overflow-y: auto;
  display: grid;
  @include tablet {
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas: "list ";
  }
  @include phone {
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas: "list ";
  }
  @include desktop {
    grid-template-columns: auto 120px;
    grid-template-rows: auto;
    grid-template-areas: "list gap";
  }
}

.TDlistview-wrapper {
  grid-area: list;
  h4,
  hr {
    @include phone {
      text-align: center;
    }
    color: $primary;
  }
}
hr {
  color: $primary;
  background-color: $primary;
}
</style>
