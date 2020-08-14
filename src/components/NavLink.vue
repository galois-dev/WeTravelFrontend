<template>
  <li @click="clicked">
    <div class="halfcircle" :class="selected ? 'selected' : ''"></div>
    <div class="fullblock" :class="selected ? 'selected' : ''">
      <img
        :src="require('@/assets/' + (selected ? iconSelected : icon) + '')"
      />
      <span :class="selected ? 'selected' : ''">{{ displayName }}</span>
    </div>
  </li>
</template>

<script>
import router from "../router/index";

export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    iconSelected: {
      type: String,
      required: true,
    },
    ordering: {
      type: Number,
      required: true,
    },
    selected: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    clicked() {
      // Use path or name routing depending on size of 'path'
      if (this.path.split("/").length > 1) {
        this.$router.replace({ path: this.path });
      } else {
        this.$router.replace({ name: this.path });
      }
      this.$emit("selected", this.ordering);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables.scss";
$height_mobile: 9vh;
$image_width: calc(100vw / 7);
$width_mobile: $height_mobile;
$height_desktop: 58px;
$width_desktop: 100%;

$select_background_color: $light;

.selected {
  color: $primary;
}

.halfcircle {
  width: $height_desktop;
  height: $height_desktop;
  transition-delay: 0.2s;
  transition: 0.3s;
  &.selected {
    background: $select_background_color;
  }
  display: inline-block;
  margin: 0;
  border-bottom-left-radius: $height_desktop * 2;
  border-top-left-radius: $height_desktop * 2;

  @include phone {
    display: none;
  }
}

li {
  &:hover,
  &.selected {
    .halfcircle,
    .fullblock {
      @include phone {
        background: $dark;
      }
      @include desktop {
        background: $select_background_color;
      }
      @include tablet {
        background: $select_background_color;
      }
    }
  }
  @include phone {
    border-radius: 5rem;
    display: block;
    flex: 0 1 auto; /* Default */
    list-style-type: none;
    margin-left: 15px;
    margin-right: 15px;
  }
}
li:last-child {
  @include phone {
    margin-right: 0;
    padding-right: 0;
  }
}
img {
  @include phone {
    width: $image_width;
    height: 80%;
    align-self: center;
    margin: auto;
  }
  @include tablet {
    width: $height_desktop;
    height: $height_desktop;
  }
  @include desktop {
    width: $height_desktop;
    height: $height_desktop;
  }
}
span {
  font-weight: 600 !important;
  color: $light;
  top: 0;
  margin-top: 0;
  padding-top: 0;
  @include phone {
    display: none;
  }
}
a,
a:visited {
  @include phone {
    padding: 0;
  }
  color: $light;
  text-align: center;
  vertical-align: middle;
  line-height: 4;
  padding-left: 0.4rem;
}

.fullblock {
  @include phone {
    border-radius: 9px;
    height: $image_width;
    width: $image_width;
  }
  display: flex;
  @include desktop {
    height: $height_desktop;
    width: 100%;
  }
  @include tablet {
    height: $height_desktop;
    width: 100%;
  }
  align-items: center;
  &.selected,
  &:hover {
    @include phone {
      background: $dark;
    }
    background: $select_background_color;
    transition-delay: 0.2s;
    transition: 0.3s;
  }
}

li {
  float: left;
  @include desktop {
    display: flex;
    flex-grow: column;
    height: $height_desktop + 8px;
    width: $width_desktop;
  }
  @include tablet {
    display: flex;
    flex-grow: column;
    height: $height_desktop + 8px;

    width: $width_desktop;
  }
  @include phone {
    height: $image_width;
  }
  a {
    @include phone {
      height: $image_width;
      text-decoration: none;
      display: block;
      justify-content: space-between;
    }
  }
}
</style>
