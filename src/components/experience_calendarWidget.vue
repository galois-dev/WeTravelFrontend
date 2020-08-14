<template>
  <div ref="infobox" class="eventWidgetRoot">
    <div class="textContainer"></div>
    <div class="imageContainer"></div>
  </div>
</template>

<script>
export default {
  props: {
    Label: String,
    Name: String,
    ImageUrl: String,
    ImageAlt: String,
  },
};
</script>

<style lang="scss">
@import "../variables.scss";

.eventWidgetRoot {
  transform: scale(0.9);
  border-radius: $border-radius-xs;
  margin: auto;
  height: 100%;
  width: 100%;
  background-color: whitesmoke;
}
</style>
