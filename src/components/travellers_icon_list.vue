<template>
  <div class="travellers-icons" v-if="travellers.length > 0">
    <ul class="follower_icon">
      <li
        v-for="(traveller, i) in travellers"
        :key="i"
        @click="gotoProfile(traveller.pk)"
      >
        <b-tooltip :label="traveller.name" position="is-right">
          <img
            :key="traveller.pk"
            :src="traveller.image.url"
            :alt="traveller.image.alt"
          />
        </b-tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    travellers: Array,
    parent_pk: {
      type: String,
      required: false,
    },
  },
  data() {
    return { Travellers: [] };
  },
  methods: {
    gotoProfile(pk) {
      this.$router.push({
        name: "profile",
        params: { pk },
      });
    },
  },
  mounted() {
    this.Travellers = this.$props.travellers;
  },
};
</script>

<style lang="scss" scoped>
.TIL-root {
  height: 48px;
  width: auto;
}

.travellers-icons {
  margin: 0;
  padding: 0;
  overflow: hidden;
  list-style-type: none;
  display: flex;
  height: 48px;
}
.travellers-icons {
  img {
    border-radius: 50%;
    height: 48px;
    width: 48px;
    margin: 0;
    overflow: hidden;
  }
  li {
    margin: 0;
    height: 48px;
    width: 48px;
    margin-left: 2px;
    float: left;
  }
}
</style>
