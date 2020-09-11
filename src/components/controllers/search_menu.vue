<template>
  <div
    ref="menu"
    :style="draggingStyle"
    class="draggable_menu_root animate_animated"
    :class="[
      anchorValign,
      { hidden: hidden },
      { animate__zoomIn: !hidden },
      { animate__zoomOut: hidden },
      { dragging: dragging },
    ]"
    draggable
    @dragstart.capture="startDrag($event)"
    @drag="Drag($event)"
    @dragend="stopDrag($event)"
  >
    <div class="menu_wrapper">
      <div
        class="burger_wrapper"
        @click="hidden = !hidden"
        :class="[{ hidden }, { dragging }, anchorHalign]"
      >
        <b-icon icon="eye-off" size="is-medium" v-if="!hidden"></b-icon>
        <b-icon icon="eye" size="is-medium" v-if="hidden"></b-icon>
      </div>
    </div>
    <transition
      :class="[
        'trans',
        { hidden },
        { animate__zoomIn: !hidden },
        { animate__zoomOut: hidden },
      ]"
    >
      <!-- Profiles -->
      <template> </template>
      <!-- Plans -->
      <template></template>
      <!-- Activities -->
      <template></template>
      <!-- Restaurants -->
      <template></template>
    </transition>
    <b-button
      :class="[
        'trans',
        { hidden },
        { animate__zoomIn: !hidden },
        { animate__zoomOut: hidden },
      ]"
      type="is-primary is-light"
      expanded
      rounded
      @click="emit_search"
      >Search</b-button
    >
  </div>
</template>

<script>
import * as _ from "lodash";
export default {
  props: {
    tabRoute: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hidden: false,
      dragging: false,
      anchorValign: "top",
      anchorHalign: "left",
      dragStartX: -1,
      dragSartY: -1,
      dragPositionX: -1,
      dragPositionY: -1,
    };
  },
  methods: {
    async startDrag(e) {
      this.dragging = true;
      const boundingBox = e.path[0].getBoundingClientRect();
      e.dataTransfer.setDragImage(
        document.createElement("dragging", "div"),
        0,
        0
      );
      this.dragPositionX = e.pageX - boundingBox.width / 2;
      this.dragPositionY = e.pageY - boundingBox.height / 2;
    },
    Drag: _.throttle(async function(e) {
      const boundingBox = e.path[0].getBoundingClientRect();
      e.dataTransfer.setDragImage(
        document.createElement("dragging", "div"),
        0,
        0
      );
      if (e.pageX !== 0 && e.pageY !== 0) {
        this.dragPositionX = e.pageX - boundingBox.width / 2;
        this.dragPositionY = e.pageY - boundingBox.height / 2;
      }
    }, 27),
    async stopDrag(e) {
      const boundingBox = e.path[0].getBoundingClientRect();
      e.dataTransfer.setDragImage(
        document.createElement("dragging", "div"),
        0,
        0
      );
      if (e.pageX !== 0 && e.pageY !== 0) {
        this.dragPositionX = e.pageX - boundingBox.width / 2;
        this.dragPositionY = e.pageY - boundingBox.height / 2;
        this.dragStartX = this.dragPositionX;
        this.dragStartY = this.dragPositionY;
      }
      this.dragging = false;

      const ParentBox = this.$parent.$el.getBoundingClientRect();

      if (e.clientX < ParentBox.width / 2) {
        this.anchorHalign = "left";
      } else {
        this.anchorHalign = "right";
      }
      if (e.y < ParentBox.height / 2) {
        this.anchorValign = "top";
      } else {
        this.anchorValign = "bottom";
      }
    },
    emit_search() {
      this.$emit("search");
    },
  },
  computed: {
    draggingStyle: {
      get() {
        let StyleObject = {};
        // Todo, implement time based LERP to go from dragged position to hover position.
        if (this.dragging) {
          StyleObject.top = this.dragPositionY + "px";
          StyleObject.left = this.dragPositionX + "px";
        } else {
          // This is why when i leave the company my address will be redacted from the database.
          this.anchorHalign === "left"
            ? (StyleObject["left"] = "1.5rem")
            : (StyleObject["right"] = "1.5rem");
          this.anchorValign === "top"
            ? (StyleObject["top"] = "1.5rem")
            : this.anchorHalign === "left"
            ? (StyleObject["bottom"] = "1.5rem") &&
              (StyleObject["left"] = "3rem")
            : (StyleObject["right"] = "1.5rem") &&
              (StyleObject["bottom"] = "1.5rem");
        }
        return StyleObject;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../variables";
#dragging {
  cursor: grabbing;
}
.draggable_menu_root {
  cursor: grab;
  transition: 0.3s;
  &.dragging {
    transition: 0.1s;
    cursor: grabbing;
  }
  background-color: rgba($primary, 0.3);
  &.hidden {
    background-color: rgba($primary, 0);
  }
  width: 250px;
  height: 500px;
  position: absolute;
  &.bottom {
    position: fixed;
    &.dragging {
      position: absolute;
    }
  }

  z-index: 10;
}

.trans {
  transition: 0.3s;
  &.hidden {
    display: none;
  }
}

.menu_wrapper {
  position: relative;
  height: 44px;
}

.burger_wrapper {
  transition: 0.1s;
  color: $primary;

  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
  &.hidden {
    &.dragging {
      margin: auto;
      left: 0;
      right: 0;
    }
    width: 44px;
    height: 44px;
    display: grid;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: rgba($WT_background, 0.6);
    border: solid rgba($light, 0.6) 3px;
  }
  @include desktop {
    position: absolute;
  }
  @include tablet {
    position: absolute;
  }

  @include mobile {
    position: relative;
    display: block;
  }
}
</style>
