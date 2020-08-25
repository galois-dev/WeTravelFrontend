<template>
  <div class="TIL-root" v-if="Travellers.length > 0">
    <template v-for="traveller in Travellers">
      <div
        :key="traveller.pk"
        class="follower_icon"
        style="padding-top:0px;height:28px;"
      >
        <img
          :key="traveller.pk"
          style="margin-left:auto;margin-right:auto;width:28px;height:28px;"
          :src="travller.image.url"
          :alt="travller.image.alt"
        />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    travellers: [],
    parent_pk: {
      type: String,
      required: false,
    },
  },
  data() {
    return { Travellers: [] };
  },
  mounted() {
    this.Travellers = this.$props.travellers;
  },
};
</script>

<style lang="scss" scoped>
.TIL-root {
  height: 28px;
  width: auto;
}
</style>
