<template>
  <div class="container">
    <div class="BForm">
      <div class="form-lhs">
        <img src="../assets/santorini.jpeg" />
        <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#FFFFFF"
            d="M12.1,-19.5C20.4,-7.5,35,-8.1,35.5,-6.1C36,-4.1,22.4,0.5,14.5,3C6.7,5.4,4.4,5.7,1.3,9.5C-1.9,13.3,-6,20.6,-17.6,26.1C-29.3,31.6,-48.4,35.3,-51.8,29.7C-55.3,24.2,-43,9.4,-40.1,-7.1-37.2,-23.5,-43.7,-41.7,-38.6,-54.2C-33.4,-66.8,-16.7,-73.7,-7.4,-64.9C1.9,-56.1,3.9,-31.5,12.1,-19.5Z"
            transform="translate(70 25)"
          />
        </svg>
      </div>

      <div class="form-rhs">
        <div class="inputs">
          <h1><b>Lorem Ipsum</b></h1>
          <h4>
            Aenean porttitor laoreet ipsum, nec ullamcorper ligula hendrerit et.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            accumsan auctor luctus. Praesent id sodales nisi.
          </h4>
          <div class="input_shape">
            <label>Username</label>
            <input v-model="formData.uname" class="input" type="text" />
            <span class="underline"></span>
          </div>
          <div class="input_shape">
            <label>Password</label>
            <input v-model="formData.password" class="input" type="password" />
            <span class="underline"></span>
          </div>
          <div class="input_shape">
            <button @click="onSubmit" id="submitbutton" type="submit">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "buefy/dist/buefy.css";

export default {
  name: "BForm",
  components: {},
  data() {
    return {
      formData: {
        uname: null,
        password: null,
      },
    };
  },
  methods: {
    onSubmit: function() {
      window.alert(JSON.stringify(this.formData));
    },
  },
};
</script>
<style lang="sass" scoped>
.BForm
  border-radius: 10px

#submitbutton
  min-width: 250px
  height: 48px
  background-color: rgba(219, 134, 80, 1);
  border-radius: 5px
  border-width: 0px;

.container
  display: block
  border-radius: 10px

.input_shape
  input, .underline, button
    width: 100%

    min-width: 250px
  min-width: 250px
  max-width: 432px !important
  width: 100%
  display: grid
  grid-template-rows: auto 1fr
  grid-template-areas: "input""label"
  margin-top: 10px
  margin-bottom: 10px

  input
    grid-area: "input"
  label
    grid-area: "label"

.inputs
  bottom: 150px
  margin: auto
  position: absolute
  h1
    color: black !important
input, label
  display: block;

.BForm
  background: white
  z-index: 1000 !important
  margin: auto
  display: grid
  grid-template-columns: 1fr 1fr
  grid-template-rows: 100%
  grid-template-areas: "left right"
  max-width: 864px
  height: 667px
  bottom: 4rem;

.form-lhs
  grid-area: left
  position: relative
  img, svg
    width: auto;
    height: 100%;
    position: absolute
    border-radius: 10px


.form-rhs
  grid-area: right
</style>
<style lang="scss" scoped>
.input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  color: #555;
  box-sizing: border-box;
  font-family: "Arvo";
  height: 50px;
  position: relative;
  width: 200px;

  &:focus {
    outline: none;
  }
}

input::-webkit-input-placeholder {
  color: #aaa;
}

input:focus::-webkit-input-placeholder {
  color: dodgerblue;
}

.input:focus + .underline {
  transform: scale(1);
}

.underline {
  background-color: rgba(219, 134, 80, 1);
  display: inline-block;
  height: 2px;
  -webkit-transform: scale(0, 1);
  transform: scale(0, 1);
  -webkit-transition: all 0.1s linear;
  transition: all 0.1s linear;
  width: 202px;
}
</style>
