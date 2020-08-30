<template>
  <div class="travel-book-root" v-if="!loading">
    <div class="TBLHS">
      <div class="Location">
        <h3>{{ location }}</h3>

        <!-- saving and editing field -->
        <span
          class="edit-field animate__animated animate__fadeInLeft"
          v-if="owner && !editing"
          @click="editing = !editing"
        >
          edit
          <b-icon class="material-icons" size="is-small" icon="launch"
            >launch</b-icon
          >
        </span>
        <span v-else class="edit-field animate__animated animate__fadeInRight">
          <b-button
            type="is-success"
            icon-right="check"
            size="is-small"
            v-if="editing"
            @click="handleSaveChanges"
          />
          <b-button
            type="is-danger"
            size="is-small"
            icon-right="delete"
            v-if="editing"
            @click="editing = !editing"
          />
        </span>
      </div>
      <div class="Time">
        <template
          v-if="!editing"
          class="fastAnimated animate__animated animate__fadeInUp"
        >
          {{ prettyPrintTime(travel_start) }} -
          {{ prettyPrintTime(travel_end) }}
        </template>
        <template v-else>
          <div class="fastAnimated animate__animated animate__fadeInDown">
            <b-field label="Select a start date" grouped>
              <b-datepicker v-model="dates" :mobile-native="false" inline range>
                <template v-slot:trigger>
                  <b-button icon-left="calendar-today" type="is-primary" />
                </template>
              </b-datepicker>
            </b-field>
          </div>
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
        <div class="UploadSquare" v-for="(image, i) in images" :key="i">
          <img height="150" width="150" :src="image.url" />
          <b-button
            type="is-danger"
            icon-right="delete"
            v-if="editing"
            @click="handleRemoveImage(image.pk)"
          />
        </div>
        <div class="UploadSquare content has-text-centered">
          <b-upload
            class="ImageSquare"
            v-model="dropFiles"
            multiple
            drag-drop
            expanded
          >
            <p>
              <b-icon icon="upload" size="is-large"> </b-icon>
            </p>
            <p :style="{ fontSize: '14px' }">
              Drop your images here or click to upload
            </p>
          </b-upload>
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
      dates: [],
      pricing_selected: -1,
      tags_selected: [],
      dropFiles: [],
    };
  },
  mounted() {
    this.travel_start_selected = new Date(this.$props.travel_start);
    this.travel_end_selected = new Date(this.$props.travel_end);
    this.dates.push(this.travel_start_selected);
    this.dates.push(this.travel_end_selected);
    this.pricing_selected = this.$props.pricing;
    this.description_selected = this.$props.description;
    this.tags_selected = this.$props.tags;

    this.loading = false;
  },
  methods: {
    prettyPrintTime(ISOString) {
      const date = new Date(ISOString);
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    },
    handlePricingSelect(i) {
      this.pricing_selected = i;
    },
    handleRemoveImage(pk) {},
    handleSaveChanges() {},
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";

$image_size: 150px;
.travel-book-root {
  display: grid;
  grid-gap: 2rem;
  grid-template-areas: "lhs rhs";
  @include tablet {
    grid-template-columns: auto 1fr;
  }
  @include desktop {
    grid-template-columns: auto 1fr;
  }
  @include mobile {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas: "lhs" "rhs";
    align-content: center;
  }
}
.TBLHS {
  @include desktop {
    max-width: 564px;
  }
  @include tablet {
    max-width: 564px;
  }
  grid-area: "lhs";
}
.TBRHS {
  grid-area: "rhs";
}

.Location {
  display: inline-flex;
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
  margin-bottom: 5px;
}
.edit-field {
  animation-duration: 150ms;
  color: $primary;
  margin: auto;
  bottom: 0;
  margin-left: 10px;
  margin-bottom: 15px;
  button {
    margin: 2px;

    & + button {
      margin: 2px;
    }
  }
}

.UploadSquare {
  justify-self: end;
  align-self: end;
  position: relative;
  height: $image_size;
  width: $image_size;
  background-color: rgba($WT_grayd, 0.3);
  border-radius: $border-radius-xs;
  img {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    margin: auto;
  }
}

.imageSquare {
  height: auto;
  width: auto;
  background-color: rgba($WT_grayd, 0.3);
  border-radius: $border-radius-xs;
  display: block;
}

.image-grid {
  grid-template-columns: repeat(auto-fit, minmax($image_size, $image_size));

  display: grid;
  margin: auto;
  margin-right: 0;
  width: auto;
  grid-gap: 1.1rem 1.1rem;
  justify-content: end;
  justify-items: end;
  align-content: end;
  align-items: end;
}
.fastAnimated {
  animation-duration: 150ms;
}
</style>
