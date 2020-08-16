<template>
  <div class="AC-root" @click="gotoAdventure">
    <div class="AC-Description-side">
      <div class="left-major">
        <div class="travellers" v-if="travellers.length > 0">
          <ul class="travllers-icons">
            <li
              v-for="traveller in travellers"
              :key="traveller.pk"
              @click.stop="gotoProfile(traveller.pk)"
            >
              <b-tooltip :label="'traveller.name'">
                <img :src="traveller.image.url" :alt="traveller.image.alt"
              /></b-tooltip>
            </li>
          </ul>
        </div>
        <div class="location">
          <p>{{ _location }}</p>
        </div>
      </div>
      <div class="right-major">
        <div class="date">
          <template v-if="new Date(_travel_start) >= new Date()">
            {{ _travel_start }}
          </template>
          <template v-else>
            <br />
            {{ _travel_end }}
          </template>
        </div>
      </div>
    </div>
    <div class="AC-Image-side">
      <img :src="banner.url" :style="picture_blobify" />
    </div>
  </div>
</template>

<script>
export default {
  name: "adventure_card",
  props: {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    travellers: {
      type: Array, // has member properties of image.url&.alt and pk
      required: false,
      default: () => {
        return [
          {
            image: {
              url:
                "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
              alt: "user picture",
            },
            pk: 1,
          },
        ];
      },
    },
    banner: {
      type: Object, // has alt and url properties
      required: true,
    },
    tags: {
      type: Array, // has member properties of name, color(hex) and pk
      required: true,
    },
    travel_start: {
      type: String,
      required: false,
    },
    travel_end: {
      type: String,
      required: false,
    },
    creator: {
      type: String,
      required: true,
    },
    pk: {
      type: String,
      requried: true,
    },
  },
  data() {
    return {
      flat_travellers: [],
    };
  },
  methods: {
    parse_iconlist() {
      let Travllers = this.$props.travellers;
      let flat_list = [];
      for (let i = 0; i < Travllers.length; i++) {
        Travllers[i]
          ? flat_list.push({
              pk: Travllers[i].pk,
              url: Travllers[i].url,
              alt: Travllers[i].alt,
            })
          : flat_list.push({
              pk: Travllers[i].pk,
              url: Travllers[i].url,
              alt: Travllers[i].alt,
            });
      }
      this.flat_travellers = flat_list;
    },
    gotoAdventure() {
      const props = this.$props;
      const pk = String(props.pk);
      this.$router.push({
        name: "adventure",
        params: { pk },
      });
    },
    gotoProfile(pk) {
      this.$router.push({
        name: "profile",
        params: { pk },
      });
    },
  },
  computed: {
    // Getters for props for rendering purposes.
    _title: {
      get() {
        return this.$props.title;
      },
    },
    _location: {
      get() {
        return this.$props.location;
      },
    },
    _travellers: {
      get() {
        return this.$props.travellers;
      },
    },
    _travel_start: {
      get() {
        return this.$props.travel_start;
      },
    },
    _travel_end: {
      get() {
        return this.$props.travel_end;
      },
    },
    _tags: {
      get() {
        return this.$props.tags;
      },
    },
    picture_blobify: {
      get() {
        const SCSS_BORDER_M = "2rem";
        const percentage1 = 2 + Math.random() * 98;
        const percentage2 = 2 + Math.random() * 98;
        const percentage3 = 2 + Math.random() * 98;
        const percentage4 = 2 + Math.random() * 98;
        var percentage11 = 100 - percentage1;
        var percentage21 = 100 - percentage2;
        var percentage31 = 100 - percentage3;
        var percentage41 = 100 - percentage4;
        var borderRadius = `${percentage1}% ${SCSS_BORDER_M} ${SCSS_BORDER_M} ${percentage2}% / ${percentage3}% ${SCSS_BORDER_M} ${SCSS_BORDER_M} ${percentage31}%`;
        return { "border-radius": borderRadius };
      },
    },
  },
};
</script>

<style lang="scss">
@import "../variables";
$max-height: 126px;
img {
  width: 100%;
  max-height: $max-height;
  display: block;
}
.AC-root {
  height: $max-height;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: $WT_grayl;
  display: grid;
  border-radius: $border-radius-m;
  @include desktop {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "left right";
  }
  @include tablet {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "left right";
  }
  @include phone {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "left right";
  }
}
.travllers-icons {
  padding-top: 0.8rem;
  padding-left: 1.2rem;
  list-style-type: none;
  display: flex;
}
.travllers-icons {
  img {
    border-radius: 50%;
    height: 32px;
    width: 32px;
    margin: 0;
    overflow: hidden;
  }
  li {
    margin: 0;
    height: 32px;
    width: 32px;
    margin-left: 2px;
  }
}
.AC-Description-side {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left right";
  .left-major {
    display: grid;
    grid-area: left;
  }
  .right-major {
    grid-area: right;
    display: grid;
  }
}
.date {
  color: $gray;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  padding-top: 10px;
}
.location {
  position: relative;
  p {
    margin: auto;
    bottom: 5px;
    left: 15px;
    position: absolute;
  }
  justify-self: start;
  text-align: left;
  color: $gray;
  font-size: 32px;
  font-weight: 400;
}
</style>
