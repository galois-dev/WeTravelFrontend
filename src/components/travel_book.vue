<template>
  <div class="travel-book-root" v-if="!loading">
    <div class="TBLHS">
      <div class="Location">
        <h3>{{ location }}</h3>

        <!-- saving and editing field -->
        <span
          class="edit-field"
          v-if="owner && !editing"
          @click="editing = !editing"
        >
          edit
          <b-icon class="material-icons" size="is-small" icon="launch"
            >launch</b-icon
          >
        </span>
        <span v-else class="edit-field">
          <span>
            save
            <b-icon class="material-icons" size="is-small" icon="lock"
              >lock</b-icon
            ></span
          >
          <span>
            close
            <b-icon class="material-icons" size="is-small" icon="errorOutline"
              >errorOutline</b-icon
            >
          </span>
        </span>
      </div>
      <div class="Time">
        <template v-if="!editing">
          {{ prettyPrintTime(travel_start) }} -
          {{ prettyPrintTime(travel_end) }}
        </template>
        <template v-else>
          <section>
            <b-field label="Select a date" grouped>
              <b-datepicker
                v-model="travel_start_selected"
                :mobile-native="false"
              >
                <template v-slot:trigger>
                  <b-button icon-left="calendar-today" type="is-primary" />
                </template>
              </b-datepicker>
              {{ prettyPrintTime(travel_start_selected) }} </b-field
            ><b-field label="Select a date" grouped>
              <b-datepicker
                v-model="travel_end_selected"
                :mobile-native="false"
              >
                <template v-slot:trigger>
                  <b-button icon-left="calendar-today" type="is-primary" />
                </template>
              </b-datepicker>
              {{ prettyPrintTime(travel_end_selected) }}
            </b-field>
          </section>
        </template>
      </div>
      <div class="Travellers" v-if="travellers && travellers.length > 0">
        <travellers_icon_list :travellers="travellers" />
        <!-- add the 'add more' travellers button on editing --->
      </div>
      <div class="Creator">
        <span class="Time">
          Creator:
        </span>
        <span class="Owner">
          {{ owner }}
        </span>
      </div>
      <div class="Pricing">
        <template v-if="editing">
          <pricing_range
            :rating="pricing_selected"
            @selected="handlePricingSelect"
          />
        </template>
        <template v-else>
          <pricing_range :rating="pricing" @selected="handlePricingSelect" />
        </template>
      </div>
      <div class="Tags">
        <template v-if="editing">
          <tags_list
            :tags="tags ? tags : []"
            :editing="editing"
            :typeOfTag="'tag'"
          />
        </template>
        <template v-else>
          <tags_list
            :tags="tags ? tags : []"
            :editing="editing"
            :typeOfTag="'tag'"
          />
        </template>
      </div>
      <div class="Description">
        <template v-if="editing">
          <b-field label="Description">
            <b-input type="textarea" v-model="description_selected"></b-input>
          </b-field>
        </template>
        <template v-else>
          {{ description }}
        </template>
      </div>
    </div>
    <div class="TBRHS">
      <div class="image-grid">
        <img
          v-for="(image, i) in images"
          :src="image.url"
          :key="i"
          height="150"
          width="150"
        />
        <div class="UploadSquare content has-text-centered">
          <p>
            <b-icon icon="upload" size="is-large"> </b-icon>
          </p>
          <p>Drop your files here or click to upload</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tags_list from "../components/tags_list";
import pricing_range from "../components/pricing_range";
import travellers_icon_list from "../components/travellers_icon_list";
import "@mdi/font/css/materialdesignicons.css";

export default {
  components: { tags_list, pricing_range, travellers_icon_list },
  props: {
    travel_start: String,
    location: String,
    travel_end: String,
    travellers: Array,
    owner: String,
    tags: Array,
    description: String,
    pricing: Number,
    images: Array,
  },
  watchers: {},
  data() {
    return {
      loading: true,
      editing: false,
      travel_start_selected: "",
      travel_end_selected: "",
      pricing_selected: -1,
      tags_selected: [],
    };
  },
  mounted() {
    this.travel_start_selected = new Date(this.$props.travel_start);
    this.travel_end_selected = new Date(this.$props.travel_end);
    this.pricing_selected = new Date(this.$props.pricing);
    this.description_selected = this.$props.description;
    this.tags_selected = this.$props.tags;

    this.loading = false;
  },
  methods: {
    gotoProfile(pk) {},
    prettyPrintTime(ISOString) {
      const date = new Date(ISOString);
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    },
    handlePricingSelect(i) {
      this.pricing_selected = i;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";
$image_size: 150px;
.travel-book-root {
  grid-gap: 2rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "lhs rhs";
  @include mobile {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas: "lhs" "rhs";
    align-content: center;
  }
}
.TBLHS {
  grid-area: "lhs";
}
.TBRHS {
  grid-area: "rhs";
}

.Location {
  display: inline-flex;
  margin-top: -18px;
  h3 {
    font-weight: 500;
    margin: 0;
    padding: 0;
  }
}
.Owner {
  font-size: 18px;
  font-weight: 500;
}
.Time {
  color: $WT_gray1;
  font-size: 20px;
  font-weight: 500;
  margin-top: -10px;
}
.edit-field {
  color: $primary;
  margin: auto;
  bottom: 0;
  margin-left: 10px;
  margin-bottom: 15px;
}

.UploadSquare {
  height: $image_size;
  width: $image_size;
  background-color: rgba($WT_grayd, 0.3);
  border-radius: $border-radius-xs;
}

.image-grid {
  grid-template-columns: repeat(auto-fill, minmax($image_size, 1fr));
  grid-template-rows: repeat(auto-fill, minmax($image_size, 1fr));
  display: grid;
  grid-gap: 0.1rem 0.1rem;
  img {
    display: block;
    max-width: $image_size;
    max-height: $image_size;
    width: auto;
    height: auto;
  }
}
</style>
