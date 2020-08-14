<template>
  <div id="app" :class="hovered_nav ? 'NAVhovered' : 'NAVnothovered'">
    <div :class="hovered_nav ? 'navbar NAVhovered' : 'navbar NAVnothovered'">
      <Navigation v-show="show_nav" @showChanged="handleShowChanged" />
    </div>
    <div class="main-view">
      <transition
        name="view"
        appear
        enter-active-class="animate__animated animate__backInLeft"
        leave-active-class="animate__animated animate__backOutRight"
      >
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script>
import Navigation from "./components/Navigation.vue";
import Home from "./views/Home.vue";
export default {
  name: "app",
  components: { Navigation },
  methods: {
    handleShowChanged: function(e) {
      this.hovered_nav = e;
    },
  },
  created() {
    this.$store.dispatch("init_settings");
  },
  computed: {
    show_nav: function() {
      return this.$route.path !== "/";
    },
  },
  data() {
    return {
      show: false,
      hovered_nav: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "variables";

.navbar {
  grid-area: nav;
  @include mobile {
    background-color: rgba(0, 0, 0, 0);
  }
  @include desktop {
    margin: auto;
    bottom: 0;
    margin-bottom: 0;
  }
  @include tablet {
    margin: auto;
    bottom: 0;
    margin-bottom: 0;
  }
}
.navbar.NAVnothovered {
  @include desktop {
    border-top-right-radius: $border-radius-m;
  }
  @include tablet {
    border-top-right-radius: $border-radius-m;
  }
}

html,
body,
*::-webkit-scrollbar {
  display: none;
  height: 100vh;
}

#app {
  background-color: $WT_background;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  @include desktop {
    display: grid;
    &.NAVhovered {
      transition: 0.5s;
      grid-template-columns: auto 100vw;
      grid-template-rows: 100vh;
      grid-template-areas: "nav app";
    }
    &.NAVnothovered {
      transition: 0.5s;

      grid-template-columns: $width-nav-hidden calc(100vw-$width-nav-hidden);
      grid-template-rows: 100vh;
      grid-template-areas: "nav app";
    }
  }
  @include tablet {
    display: grid;
    &.NAVhovered {
      transition: 0.5s;
      grid-template-columns: auto 1fr;
      grid-template-rows: 100vh;
      grid-template-areas: "nav app";
    }
    &.NAVnothovered {
      transition: 0.5s;

      grid-template-columns: $width-nav-hidden 1fr;
      grid-template-rows: 100vh;
      grid-template-areas: "nav app ";
    }
  }
  @include mobile {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto 58px;
    grid-template-areas:
      "app"
      "nav";
  }
}

.main-view {
  grid-area: app;
  overflow: auto;
  height: 100vh;
  @include mobile {
    padding-left: 0;
  }
  animation-delay: 0.5s;
  --animate-duration: 0.8s;
}
</style>
