<template>
  <div class="TIL-root" v-if="Travellers !== undefined">
    <template v-for="traveller in Travellers">
      <div
        :key="traveller.pk"
        class="follower_icon"
        style="padding-top:0px;height:28px;"
      >
        <img
          :key="traveller.pk"
          style="margin-left:auto;margin-right:auto;width:28px;height:28px;"
          :src="travller.url"
          :alt="travller.alt"
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
      required: true,
    },
  },
  data() {
    let TRAVELLERS = this.$props.travellers;
    return { Travellers: TRAVELLERS };
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.TIL-root {
  height: 28px;
  width: auto;
}
</style>
