<template>
  <div class="travellist_root">
    <div class="listview-wrapper">
      <h4>{{ UpcommingAdventuresTitle }}</h4>
      <hr />
      <adventure_list :mode="'planned'" />

      <h4>{{ DreamVacationsTitle }}</h4>
      <hr />
      <adventure_list :mode="'dreams'" />
    </div>
    <div class="createplan-wrapper">
      <h5>{{ _GetStarted }}</h5>
      <hr />
      <div
        class="gradient-wrapper"
        @mouseover="CreateButtonHover = true"
        @mouseleave="CreateButtonHover = false"
        :class="CreateButtonHover ? 'animate__animated animate__pulse' : ''"
      >
        <p>{{ _CreateYour }}</p>
        <p>{{ _TravelPlan }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getAdventuresByMode } from "../utils/adventureService";
import { buildComputedProperty, travelListView } from "../utils/translations";
import adventure_list from "../components/adventure_list";
export default {
  computed: {
    // Translations
    UpcommingAdventuresTitle: {
      get() {
        return buildComputedProperty(
          this.$store,
          travelListView,
          "UpcommingAdventuresTitle"
        );
      },
    },
    DreamVacationsTitle: {
      get() {
        return buildComputedProperty(
          this.$store,
          travelListView,
          "DreamVacationsTitle"
        );
      },
    },
    _CreateYour: {
      get() {
        return buildComputedProperty(
          this.$store,
          travelListView,
          "_CreateYour"
        );
      },
    },
    _TravelPlan: {
      get() {
        return buildComputedProperty(
          this.$store,
          travelListView,
          "_TravelPlan"
        );
      },
    },
    _GetStarted: {
      get() {
        return buildComputedProperty(
          this.$store,
          travelListView,
          "_GetStarted"
        );
      },
    },
  },
  components: {
    adventure_list,
  },
  data() {
    return {
      CreateButtonHover: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";
.travellist_root {
  height: 100vh;
  overflow-y: auto;
  display: grid;
  @include tablet {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    grid-template-areas: "list " "create";
  }
  @include phone {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    grid-template-areas: "list " "create";
  }
  @include desktop {
    grid-template-columns: auto 120px 280px;
    grid-template-rows: auto;
    grid-template-areas: "list gap create";
  }
}

.listview-wrapper {
  grid-area: list;
  h4,
  hr {
    @include phone {
      text-align: center;
    }
    color: $primary;
  }
}
.gradient-wrapper {
  animation-duration: 0.2s; /* don't forget to set a duration! */
  margin: auto;
  left: 0;
  right: 0;
  position: absolute;
  width: 185px;
  @include phone {
    width: 80%;
  }
  background: rgb(21, 65, 105);
  background: linear-gradient(
    270deg,
    rgba(21, 65, 105, 1) 0%,
    rgba(11, 79, 144, 1) 49%,
    rgba(0, 92, 176, 1) 100%
  );

  padding: 2rem;
  height: auto;
  border-radius: $border-radius-xs;
}
.createplan-wrapper {
  position: relative;
  grid-area: create;
  p {
    font-size: 22px;
    text-align: center;
    font-weight: 500;
    color: $white;
  }
  h5,
  hr {
    text-align: center;
    font-weight: 500;
    color: $primary;
  }
}

hr {
  background-color: $primary;
}

#checkboxes-outer {
  display: grid;
}

.checkboxes-wrapper {
  justify-self: center;
  .b-checkbox {
    margin: 1rem;
  }
}
</style>
