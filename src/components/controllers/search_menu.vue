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
      <h3 :style="{ textAlign: 'center' }" v-show="!hidden">{{ tabRoute }}</h3>
    </div>
    <hr v-show="!hidden" />

    <!-- Profiles -->
    <template>
      <div
        class="form-inner-wrapper-generic"
        v-show="tabRoute === 'profiles' && !hidden"
      >
        <b-field label="Search by" :label-position="'On-border'">
          <b-radio-button
            v-model="profiles_SearchBy"
            native-value="profile"
            type="is-primary"
          >
            <b-icon icon="account"></b-icon>
          </b-radio-button>

          <b-radio-button
            v-model="profiles_SearchBy"
            native-value="description"
            type="is-primary"
          >
            <b-icon icon="clipboard-text"></b-icon>
          </b-radio-button>

          <b-radio-button
            v-model="profiles_SearchBy"
            native-value="any"
            type="is-primary"
          >
            <b-icon icon="note-multiple-outline"></b-icon>
          </b-radio-button>
        </b-field>
        <b-field label="From country" :label-position="'On-border'">
          <b-select
            placeholder="Country"
            icon="earth"
            v-model="profile_country"
            :selected="profile_country"
          >
            <option
              v-for="(option, i) in Countries"
              :value="option['code']"
              :key="i"
              :selected="profile_country"
              >{{ option["code"] }}</option
            >
          </b-select>
        </b-field>
        <b-field label="Filter by tags">
          <tags_list
            :typeOfTag="'Interest'"
            :editing="true"
            :tags="profile_tags"
          />
        </b-field>
      </div>
    </template>
    <!-- Plans -->
    <template>
      <div
        class="form-inner-wrapper-generic"
        v-show="tabRoute === 'plans' && !hidden"
      >
        <b-field label="Search by" :label-position="'On-border'">
          <b-radio-button
            v-model="trips_SearchBy"
            native-value="profile"
            type="is-primary"
          >
            <b-icon icon="account"></b-icon>
          </b-radio-button>

          <b-radio-button
            v-model="trips_SearchBy"
            native-value="description"
            type="is-primary"
          >
            <b-icon icon="clipboard-text"></b-icon>
          </b-radio-button>

          <b-radio-button
            v-model="trips_SearchBy"
            native-value="any"
            type="is-primary"
          >
            <b-icon icon="note-multiple-outline"></b-icon>
          </b-radio-button>
        </b-field>
        <b-field label="From country" :label-position="'On-border'">
          <b-select
            placeholder="Country"
            icon="earth"
            v-model="trips_country"
            :selected="trips_country"
          >
            <option
              v-for="(option, i) in Countries"
              :value="option['code']"
              :key="i"
              :selected="trips_country"
              >{{ option["code"] }}</option
            >
          </b-select>
        </b-field>
        <b-field label="Filter by tags">
          <tags_list
            :typeOfTag="'Adventure'"
            :editing="true"
            :tags="trips_tags"
          />
        </b-field>
        <b-field label="By member name" :label-position="'inside'">
          <b-input rounded v-model="trips_member_name"
            >names sepearted by ,</b-input
          >
        </b-field>
      </div>
    </template>
    <!-- Activities -->
    <template>
      <div
        class="form-inner-wrapper-generic"
        v-show="tabRoute === 'activities' && !hidden"
      >
        <b-field label="Filter by tags">
          <tags_list
            :typeOfTag="'Adventure'"
            :editing="true"
            :tags="trips_tags"
          />
        </b-field>
        <b-field label="rating">
          <b-slider
            :min="0"
            :max="5"
            :step="0.5"
            ticks
            size="is-large"
            :value="activity_slider"
          >
          </b-slider>
        </b-field>
      </div>
    </template>
    <!-- Restaurants -->
    <template>
      <div
        class="form-inner-wrapper-generic"
        v-show="tabRoute === 'restaurants' && !hidden"
      >
        <b-field label="Filter by tags">
          <tags_list
            :typeOfTag="'Taste'"
            :editing="true"
            :tags="restaurant_tags"
          />
        </b-field>
        <b-field label="Price">
          <b-slider
            :min="0"
            :max="5"
            :step="0.5"
            ticks
            size="is-large"
            :value="restaurant_slider"
          >
          </b-slider>
        </b-field>
      </div>
    </template>

    <hr v-show="!hidden" />

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
import tags_list from "../tags_list";
export default {
  props: {
    tabRoute: {
      type: String,
      required: true,
    },
  },
  components: {
    tags_list,
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

      profiles_SearchBy: "",
      profile_country: "",
      profile_tags: [],
      trips_SearchBy: "",
      trips_country: "",
      trips_tags: [],
      trips_member_name: "",
      activity_tags: [],
      activity_slider: [0, 5],
      restaurant_tags: [],
      restaurant_slider: [0, 5],
      Countries: [
        { name: "Afghanistan", code: "AF" },
        { name: "Åland Islands", code: "AX" },
        { name: "Albania", code: "AL" },
        { name: "Algeria", code: "DZ" },
        { name: "American Samoa", code: "AS" },
        { name: "AndorrA", code: "AD" },
        { name: "Angola", code: "AO" },
        { name: "Anguilla", code: "AI" },
        { name: "Antarctica", code: "AQ" },
        { name: "Antigua and Barbuda", code: "AG" },
        { name: "Argentina", code: "AR" },
        { name: "Armenia", code: "AM" },
        { name: "Aruba", code: "AW" },
        { name: "Australia", code: "AU" },
        { name: "Austria", code: "AT" },
        { name: "Azerbaijan", code: "AZ" },
        { name: "Bahamas", code: "BS" },
        { name: "Bahrain", code: "BH" },
        { name: "Bangladesh", code: "BD" },
        { name: "Barbados", code: "BB" },
        { name: "Belarus", code: "BY" },
        { name: "Belgium", code: "BE" },
        { name: "Belize", code: "BZ" },
        { name: "Benin", code: "BJ" },
        { name: "Bermuda", code: "BM" },
        { name: "Bhutan", code: "BT" },
        { name: "Bolivia", code: "BO" },
        { name: "Bosnia and Herzegovina", code: "BA" },
        { name: "Botswana", code: "BW" },
        { name: "Bouvet Island", code: "BV" },
        { name: "Brazil", code: "BR" },
        { name: "British Indian Ocean Territory", code: "IO" },
        { name: "Brunei Darussalam", code: "BN" },
        { name: "Bulgaria", code: "BG" },
        { name: "Burkina Faso", code: "BF" },
        { name: "Burundi", code: "BI" },
        { name: "Cambodia", code: "KH" },
        { name: "Cameroon", code: "CM" },
        { name: "Canada", code: "CA" },
        { name: "Cape Verde", code: "CV" },
        { name: "Cayman Islands", code: "KY" },
        { name: "Central African Republic", code: "CF" },
        { name: "Chad", code: "TD" },
        { name: "Chile", code: "CL" },
        { name: "China", code: "CN" },
        { name: "Christmas Island", code: "CX" },
        { name: "Cocos (Keeling) Islands", code: "CC" },
        { name: "Colombia", code: "CO" },
        { name: "Comoros", code: "KM" },
        { name: "Congo", code: "CG" },
        { name: "Congo, The Democratic Republic of the", code: "CD" },
        { name: "Cook Islands", code: "CK" },
        { name: "Costa Rica", code: "CR" },
        { name: 'Cote D"Ivoire', code: "CI" },
        { name: "Croatia", code: "HR" },
        { name: "Cuba", code: "CU" },
        { name: "Cyprus", code: "CY" },
        { name: "Czech Republic", code: "CZ" },
        { name: "Denmark", code: "DK" },
        { name: "Djibouti", code: "DJ" },
        { name: "Dominica", code: "DM" },
        { name: "Dominican Republic", code: "DO" },
        { name: "Ecuador", code: "EC" },
        { name: "Egypt", code: "EG" },
        { name: "El Salvador", code: "SV" },
        { name: "Equatorial Guinea", code: "GQ" },
        { name: "Eritrea", code: "ER" },
        { name: "Estonia", code: "EE" },
        { name: "Ethiopia", code: "ET" },
        { name: "Falkland Islands (Malvinas)", code: "FK" },
        { name: "Faroe Islands", code: "FO" },
        { name: "Fiji", code: "FJ" },
        { name: "Finland", code: "FI" },
        { name: "France", code: "FR" },
        { name: "French Guiana", code: "GF" },
        { name: "French Polynesia", code: "PF" },
        { name: "French Southern Territories", code: "TF" },
        { name: "Gabon", code: "GA" },
        { name: "Gambia", code: "GM" },
        { name: "Georgia", code: "GE" },
        { name: "Germany", code: "DE" },
        { name: "Ghana", code: "GH" },
        { name: "Gibraltar", code: "GI" },
        { name: "Greece", code: "GR" },
        { name: "Greenland", code: "GL" },
        { name: "Grenada", code: "GD" },
        { name: "Guadeloupe", code: "GP" },
        { name: "Guam", code: "GU" },
        { name: "Guatemala", code: "GT" },
        { name: "Guernsey", code: "GG" },
        { name: "Guinea", code: "GN" },
        { name: "Guinea-Bissau", code: "GW" },
        { name: "Guyana", code: "GY" },
        { name: "Haiti", code: "HT" },
        { name: "Heard Island and Mcdonald Islands", code: "HM" },
        { name: "Holy See (Vatican City State)", code: "VA" },
        { name: "Honduras", code: "HN" },
        { name: "Hong Kong", code: "HK" },
        { name: "Hungary", code: "HU" },
        { name: "Iceland", code: "IS" },
        { name: "India", code: "IN" },
        { name: "Indonesia", code: "ID" },
        { name: "Iran, Islamic Republic Of", code: "IR" },
        { name: "Iraq", code: "IQ" },
        { name: "Ireland", code: "IE" },
        { name: "Isle of Man", code: "IM" },
        { name: "Israel", code: "IL" },
        { name: "Italy", code: "IT" },
        { name: "Jamaica", code: "JM" },
        { name: "Japan", code: "JP" },
        { name: "Jersey", code: "JE" },
        { name: "Jordan", code: "JO" },
        { name: "Kazakhstan", code: "KZ" },
        { name: "Kenya", code: "KE" },
        { name: "Kiribati", code: "KI" },
        { name: 'Korea, Democratic People"S Republic of', code: "KP" },
        { name: "Korea, Republic of", code: "KR" },
        { name: "Kuwait", code: "KW" },
        { name: "Kyrgyzstan", code: "KG" },
        { name: 'Lao People"S Democratic Republic', code: "LA" },
        { name: "Latvia", code: "LV" },
        { name: "Lebanon", code: "LB" },
        { name: "Lesotho", code: "LS" },
        { name: "Liberia", code: "LR" },
        { name: "Libyan Arab Jamahiriya", code: "LY" },
        { name: "Liechtenstein", code: "LI" },
        { name: "Lithuania", code: "LT" },
        { name: "Luxembourg", code: "LU" },
        { name: "Macao", code: "MO" },
        { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
        { name: "Madagascar", code: "MG" },
        { name: "Malawi", code: "MW" },
        { name: "Malaysia", code: "MY" },
        { name: "Maldives", code: "MV" },
        { name: "Mali", code: "ML" },
        { name: "Malta", code: "MT" },
        { name: "Marshall Islands", code: "MH" },
        { name: "Martinique", code: "MQ" },
        { name: "Mauritania", code: "MR" },
        { name: "Mauritius", code: "MU" },
        { name: "Mayotte", code: "YT" },
        { name: "Mexico", code: "MX" },
        { name: "Micronesia, Federated States of", code: "FM" },
        { name: "Moldova, Republic of", code: "MD" },
        { name: "Monaco", code: "MC" },
        { name: "Mongolia", code: "MN" },
        { name: "Montserrat", code: "MS" },
        { name: "Morocco", code: "MA" },
        { name: "Mozambique", code: "MZ" },
        { name: "Myanmar", code: "MM" },
        { name: "Namibia", code: "NA" },
        { name: "Nauru", code: "NR" },
        { name: "Nepal", code: "NP" },
        { name: "Netherlands", code: "NL" },
        { name: "Netherlands Antilles", code: "AN" },
        { name: "New Caledonia", code: "NC" },
        { name: "New Zealand", code: "NZ" },
        { name: "Nicaragua", code: "NI" },
        { name: "Niger", code: "NE" },
        { name: "Nigeria", code: "NG" },
        { name: "Niue", code: "NU" },
        { name: "Norfolk Island", code: "NF" },
        { name: "Northern Mariana Islands", code: "MP" },
        { name: "Norway", code: "NO" },
        { name: "Oman", code: "OM" },
        { name: "Pakistan", code: "PK" },
        { name: "Palau", code: "PW" },
        { name: "Palestinian Territory, Occupied", code: "PS" },
        { name: "Panama", code: "PA" },
        { name: "Papua New Guinea", code: "PG" },
        { name: "Paraguay", code: "PY" },
        { name: "Peru", code: "PE" },
        { name: "Philippines", code: "PH" },
        { name: "Pitcairn", code: "PN" },
        { name: "Poland", code: "PL" },
        { name: "Portugal", code: "PT" },
        { name: "Puerto Rico", code: "PR" },
        { name: "Qatar", code: "QA" },
        { name: "Reunion", code: "RE" },
        { name: "Romania", code: "RO" },
        { name: "Russian Federation", code: "RU" },
        { name: "RWANDA", code: "RW" },
        { name: "Saint Helena", code: "SH" },
        { name: "Saint Kitts and Nevis", code: "KN" },
        { name: "Saint Lucia", code: "LC" },
        { name: "Saint Pierre and Miquelon", code: "PM" },
        { name: "Saint Vincent and the Grenadines", code: "VC" },
        { name: "Samoa", code: "WS" },
        { name: "San Marino", code: "SM" },
        { name: "Sao Tome and Principe", code: "ST" },
        { name: "Saudi Arabia", code: "SA" },
        { name: "Senegal", code: "SN" },
        { name: "Serbia and Montenegro", code: "CS" },
        { name: "Seychelles", code: "SC" },
        { name: "Sierra Leone", code: "SL" },
        { name: "Singapore", code: "SG" },
        { name: "Slovakia", code: "SK" },
        { name: "Slovenia", code: "SI" },
        { name: "Solomon Islands", code: "SB" },
        { name: "Somalia", code: "SO" },
        { name: "South Africa", code: "ZA" },
        { name: "South Georgia and the South Sandwich Islands", code: "GS" },
        { name: "Spain", code: "ES" },
        { name: "Sri Lanka", code: "LK" },
        { name: "Sudan", code: "SD" },
        { name: "Suriname", code: "SR" },
        { name: "Svalbard and Jan Mayen", code: "SJ" },
        { name: "Swaziland", code: "SZ" },
        { name: "Sweden", code: "SE" },
        { name: "Switzerland", code: "CH" },
        { name: "Syrian Arab Republic", code: "SY" },
        { name: "Taiwan, Province of China", code: "TW" },
        { name: "Tajikistan", code: "TJ" },
        { name: "Tanzania, United Republic of", code: "TZ" },
        { name: "Thailand", code: "TH" },
        { name: "Timor-Leste", code: "TL" },
        { name: "Togo", code: "TG" },
        { name: "Tokelau", code: "TK" },
        { name: "Tonga", code: "TO" },
        { name: "Trinidad and Tobago", code: "TT" },
        { name: "Tunisia", code: "TN" },
        { name: "Turkey", code: "TR" },
        { name: "Turkmenistan", code: "TM" },
        { name: "Turks and Caicos Islands", code: "TC" },
        { name: "Tuvalu", code: "TV" },
        { name: "Uganda", code: "UG" },
        { name: "Ukraine", code: "UA" },
        { name: "United Arab Emirates", code: "AE" },
        { name: "United Kingdom", code: "GB" },
        { name: "United States", code: "US" },
        { name: "United States Minor Outlying Islands", code: "UM" },
        { name: "Uruguay", code: "UY" },
        { name: "Uzbekistan", code: "UZ" },
        { name: "Vanuatu", code: "VU" },
        { name: "Venezuela", code: "VE" },
        { name: "Viet Nam", code: "VN" },
        { name: "Virgin Islands, British", code: "VG" },
        { name: "Virgin Islands, U.S.", code: "VI" },
        { name: "Wallis and Futuna", code: "WF" },
        { name: "Western Sahara", code: "EH" },
        { name: "Yemen", code: "YE" },
        { name: "Zambia", code: "ZM" },
        { name: "Zimbabwe", code: "ZW" },
      ],
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
  hr {
    margin-top: 2px;
    margin-bottom: 1em;
  }
  padding: 1em;
  border-radius: $border-radius-m;
  cursor: grab;
  transition: 0.3s;
  &.dragging {
    transition: 0.1s;
    cursor: grabbing;
  }
  background-color: rgba($WT_grayl, 0.75);
  &.hidden {
    background-color: rgba($primary, 0);
  }
  width: 280px;
  height: auto;
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
.form-inner-wrapper-generic {
  display: grid;
  align-items: center;
  width: 100%;
  .field {
    width: 100%;
  }
  .b-field  {
    width: 100%;
  }
  div {
    align-self: center;
    justify-self: center;
  }
}
</style>
