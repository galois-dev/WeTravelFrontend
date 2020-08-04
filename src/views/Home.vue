<template>
  <div ref="wrapbox" id="wrapper" class="home">
    <div id="gradientOrangeWrapper-outer">
      <div ref="bg4" id="gradientOrangeWrapper-inner"></div>
    </div>
    <div id="bgwrapper-inner" class="fullscreen">
      <img
        ref="bg1"
        id="bg1"
        class="fullscreen"
        alt=""
        src="../assets/StarrySky.png"
      />
    </div>
    <div id="duneswrapper-inner" class="fullscreen">
      <img
        ref="bg2"
        id="bg2"
        class="fullscreen"
        alt=""
        src="../assets/SandDunes.png"
      />
    </div>
    <div id="title-inner" ref="title" class="fullscreen">
      <h1>WeTravel</h1>
    </div>
    <div id="manwrapper-inner" class="fullscreen">
      <img id="bg3" ref="bg3" alt="" src="../assets/ManOnHill.png" />
    </div>
    <div id="fullOrangeWrapper-inner">
      <div class="fromwrapper-inner">
        <Login />
      </div>
    </div>
  </div>
</template>

<script>
import Login from "../components/Login";
const ScrollMagic = require("scrollmagic");
import { TweenMax } from "gsap";

export default {
  name: "Home",
  data() {
    return {
      controller: null,
      tween: null,
      scene: null,
    };
  },
  components: { Login },
  mounted: function() {
    document.addEventListener("scroll", this.applyAnim);
  },
  methods: {
    applyAnim: function(evt) {
      const scrollY = window.scrollY;
      const progress =
        scrollY / window.innerHeight ? scrollY / window.innerHeight : 0;
      const breakpoint1 = 0.0,
        breakpoint2 = 0.8,
        breakpoint3 = 1.0;
      let bg1Y = 0,
        bg2Y = 0,
        bg3Y = 0,
        bg4Y = 0,
        title = 0;

      if (progress > breakpoint1) {
        const scrollGap = window.innerHeight * breakpoint2;
        const adjustBy = Math.min(scrollY, scrollGap);
        bg2Y += adjustBy * 0.03;
        title += adjustBy * 1.2;
        if (progress > breakpoint2) {
          title += scrollY - window.innerHeigt * breakpoint2;
          bg3Y -= scrollY - window.innerHeigt * breakpoint2;
        }
      }

      this.$refs.title.style.transform = "translate(0px," + title + "px)";
      this.$refs.bg2.style.transform = "translate(0px," + bg2Y + "px)";
      this.$refs.bg3.style.transform = "translate(0px," + bg3Y + "px)";
      this.$refs.bg4.style.transform = "translate(0px," + bg4Y + "px)";
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../variables";
h1 {
  #title-inner {
    @include phone {
      font-size: 300%;
    }
    @include tablet {
      font-size: 400%;
    }
    @include desktop {
      font-size: 500%;
    }
  }
}
</style>
<style lang="sass" scoped>
.fromwrapper-inner
  .container
    top: calc(10vh+100px)
  height: 100vh
  margin: auto
  position: relative

.bgground
  position: d-inline

h1, #title-inner

  display: block
  padding-top: 10px !important
  text-align: center !important
  color: white


.fullscreen
  height: 100vh
  width: 100vw
  position: absolute;
  margin: auto;
  top: 0;

  #bg2
    min-width: 100vw !important
    max-height: 60vh !important
    width: auto !important
    height: auto! important
    top: auto !important
    bottom: 0 !important
    right: 0 !important
    left: 0 !important

  // #bg3
  //   width: 60vw !important
  //   max-width: 100vw !important;
  //   height: auto !important
  //   top: auto !important
  //   bottom: 0 !important
  //   left: 0 !important


#gradientOrangeWrapper-outer
  height: 100vh
  width: 100vw
  min-width: 100vw;
  display: block
  #gradientOrangeWrapper-inner

    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255,255,255,0) 80%, rgba(219,134,80,1) 95%, rgba(219,134,80,1) 100%);

    position: absolute
    width: 100%
    min-width: 100vw;
    max-width: 100vw;
    height: 100%
    z-index: 500 !important

#fullOrangeWrapper-inner
  height: 120vh
  width: 100vw
  display: grid
  background: rgba(219,134,80,1)

#duneswrapper-inner
  z-index: 1

#manwrapper-inner
  img
    max-width: 100vw !important
  z-index: 2

#bgwrapper-inner img
  height: 100vh
  #bg1 img
    width: auto !important
    height: 100vh !important
#bg2
  z-index: -3 !important
</style>
