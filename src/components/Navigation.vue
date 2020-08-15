<template>
  <div
    v-if="!loading"
    class="navigation-bar"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="hover ? 'NAVshow' : 'NAVhidden'"
  >
    <div class="navigation-inner">
      <div class="profile-wrapper">
        <img :src="require('@/assets/IMG_5618.jpg')" />
        <p>Hi, Benjamin</p>
      </div>
      <div class="links-wrapper">
        <ul>
          <NavLink
            v-for="_path in paths"
            :key="_path.key"
            :ordering="_path.key"
            :selected="current_path === _path.key ? true : false"
            :path="_path.path"
            :displayName="_path.text"
            :icon="_path.icon"
            :iconSelected="_path.iconSelected"
            @selected="handleSelect"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import NavLink from "./NavLink";

export default {
  components: { NavLink },
  watch: {
    "$route.path"(to, from) {
      this.routerChange(to);
    },
    hover(bool) {
      this.$emit("showChanged", bool);
    },
  },
  async mounted() {
    this.loading = true;
    await this.buildPathsWithState();
    this.loading = false;
  },
  methods: {
    handleSelect(e) {},
    async buildPathsWithState() {
      const PROFILE_PATH =
        "profile/" + (await this.$store.state.UserSettings.pk) + "/";
      const paths = [
        {
          key: 0,
          path: "travelList",
          text: "Travel",
          icon: "Plane_white.svg",
          iconSelected: "Plane_orange.svg",
        },
        {
          key: 1,
          path: "Inspiration",
          text: "Inspiration",
          icon: "White_lightbulb.svg",
          iconSelected: "Lightbulb_gradiant_orange.svg",
        },
        {
          key: 2,
          text: "Profile",
          path: PROFILE_PATH,
          icon: "User_white.svg",
          iconSelected: "User_gradient.svg",
        },
        {
          key: 3,
          path: "travelDiary",
          text: "Travel Diary",
          icon: "Diary_white.svg",
          iconSelected: "Diary_gradient_Orange.svg",
        },
        {
          key: 4,
          path: "settings",
          text: "Settings",
          icon: "Cogwheel_White.svg",
          iconSelected: "Cogwheel_gradient_Yellow.svg",
        },
      ];
      this.paths = paths;
    },
    routerChange(to) {
      if (this.paths) {
        this.current_path = -1;
        for (let i = 0; i < this.paths.length; i++) {
          const element = this.paths[i];
          if ("/" + element.path == to) {
            this.current_path = element.key;
          }
        }
      }
    },
  },
  data() {
    return {
      hover: false,
      current_path: -1,
      loading: true,
      paths: [],
    };
  },
};
</script>

<style lang="scss" scoped>
$mobile_height: 58px;
$mobile_width: 100vw;
$height: 90vh;
$width: 296px;

@import "../variables.scss";
ul {
  @include phone {
    display: flex;
    align-items: center; /* Default */
    justify-content: center;
    width: $mobile_width;
    margin: 0;
    padding: 0;
  }
}
.profile-wrapper {
  @include phone {
    display: none;
  }
  @include tablet {
    display: grid;
  }
  @include desktop {
    display: grid;
  }

  padding-top: 2rem;
  padding-bottom: 1rem;
  p {
    font-size: 75%;
    color: $light;
    text-align: center;
    justify-self: top;
  }
  img {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    justify-self: center;
  }
}
.links-wrapper {
  @include phone {
    width: 90%;
  }
  max-height: 500px;
  height: 100%;
  justify-self: center;
  @include desktop {
    margin-left: 2rem;
  }
  @include tablet {
    margin-left: 2rem;
  }
}

.navigation-bar {
  @include desktop {
    transition: 0.5s;

    &.NAVshow {
      transition: 0.5s;
      width: auto;
    }
    &.NAVhidden {
      transition: 0.5s;

      border-top-right-radius: $border-radius-m;

      width: $width-nav-hidden;
      overflow: hidden;
    }
  }
  @include tablet {
    transition: 0.5s;

    &.NAVshow {
      transition: 0.5s;
      width: auto;
    }
    &.NAVhidden {
      transition: 0.5s;
      width: $width-nav-hidden;
      overflow: hidden;
      border-top-right-radius: $border-radius-m;
    }
  }
  @include phone {
    width: $mobile_height;
    height: $mobile_height;
    left: 0;
    right: 0;
    bottom: 0px;
    padding: 0;
  }

  height: $height;
  width: $width;
  justify-content: center;
  align-items: center;
  .navigation-inner {
    @include phone {
      width: $mobile_width;
      height: $mobile_height;
      padding: 0px;
      -webkit-box-shadow: 10px 10px 34px -6px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 10px 10px 34px -6px rgba(0, 0, 0, 0.75);
      box-shadow: 10px 10px 34px -6px rgba(0, 0, 0, 0.75);
      border-radius: 9px;
    }
    height: $height;
    width: $width;
    border-top-right-radius: $border-radius-big;
    padding-top: 1rem;
    padding-left: 0.2rem;
    padding-right: 0rem;
    background-color: $primary;
  }
}
</style>
