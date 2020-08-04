<template>
  <div class="login-form">
    <div class="photo-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 600">
        <!-- <path
          fill="#f3f4f5"
          fill-opacity="1"
          d="M 200 0 Q 100 50 100 100 C 50 200 150 250 50 300 C 150 350 50 400 100 500 Q 100 550 200 600 L 250 600 L 250 0 L 200 0"
        ></path> -->
        <!-- <path
          fill="#f3f4f5"
          fill-opacity="1"
          d="M 200 0 Q 150 0 10 100 C 50 250 100 150 100 300 C 150 400 100 350 150 450 Q 150 600 200 600 L 250 600 L 250 0 L 200 0 "
        ></path> -->

        <path
          fill="#f3f4f5"
          fill-opacity="1"
          d="M 250 0 C 167 10 125 26 123 81 C 124.5 168 202 174 172 251 C 136 198 89 141 105 302 C 73 416 238 147 131 402 C 56 502 170.5 425.5 172 465 C 141 530 243 463 182 531 Q 188 595 350 600 L 350 0 "
        ></path>
      </svg>
      <img src="../assets/santorini.jpeg" />
    </div>
    <div class="form-container">
      <section>
        <h3>
          Discover all the unique experiences of the world
        </h3>
        <h5>Log in so we can help you get the best out of your travels.</h5>
      </section>
      <br />
      <form class="animate__animated animate__bounce" @keypress.enter="_login">
        <section>
          <b-field label="Email">
            <b-input
              v-model="username"
              :loading="loading ? true : false"
            ></b-input>
          </b-field>

          <b-field
            :label="labelPassword"
            :type="isinvalid_password ? 'is-danger' : ''"
          >
            <b-input
              type="password"
              minlength="6"
              v-model="password"
              password-reveal
              :loading="loading ? true : false"
            >
            </b-input>
          </b-field>

          <b-button
            style="height: 3.5rem; margin-top: 3rem;"
            expanded
            rounded
            type="is-primary"
            :loading="loading ? true : false"
            @click="_login"
            >Login</b-button
          >
        </section>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from "../utils/userService";

export default {
  name: "Login",
  computed: {
    labelPassword: {
      get() {
        const lang = this.$store.state.renderingHints.lang;
        switch (lang) {
          case "EN":
            return "Password";
            break;
          case "DK":
            return "Kodeord";
          default:
            return "Missing Translation";
            break;
        }
      },
    },
  },
  data() {
    return {
      username: "",
      password: "",
      issuccess_username: false,
      isinvalid_username: false,
      isinvalid_password: false,
      loading: true,
    };
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    _login: async function() {
      this.loading = true;
      const res = await login(this.username, this.password).catch((err) => {
        this.$buefy.toast.open({
          message: String(err),
          type: "is-danger",
          position: "is-top",
        });
        this.password = "";
        this.loading = false;
      });
      if (res) {
        this.$store.dispatch("login", {
          access: res.data.access,
          refresh: res.data.refresh,
        });
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables.scss";
$maxHeight: 700px;
$fill-color: #f3f4f5;
$border-radius: 1rem;

.photo-container {
  position: relative;
  display: block;
  max-height: $maxHeight;
}

img {
  border-radius: $border-radius;
  height: $maxHeight;
}
svg {
  border-radius: $border-radius;
  position: absolute;
  height: $maxHeight;
  width: auto;
  @include tablet {
    transform: translateX(-50px);
  }
  transform: translateX(200px);
  path {
    right: 0;
    margin: auto;
  }
}

.form-container {
  @include desktop {
    margin: 2rem;
  }
  @include tablet {
    margin: 1.5rem;
  }
  @include phone {
    margin: 1rem;
  }
  align-self: center;
}

.login-form {
  -moz-box-shadow: 5px 5px 3px rgba(68, 68, 68, 0.6);
  -webkit-box-shadow: 5px 5px 3px rgba(68, 68, 68, 0.6);
  box-shadow: 5px 5px 3px rgba(68, 68, 68, 0.6);

  background-color: #f3f4f5;
  border-radius: $border-radius;
  display: grid;
  grid-template-rows: 700px;
  max-height: $maxHeight;
  @include desktop {
    max-width: 1000px;
    grid-template-columns: 1fr 1fr;
  }
  @include tablet {
    max-width: 700px;
    grid-template-columns: 1fr 2fr;
  }
  @include phone {
    max-width: 540px;
    grid-template-columns: 100%;
    .photo-container {
      display: none;
    }
  }
}
</style>
