<template>
  <div id="start">
    <div class="LPcontainer">
      <div class="shape" id="shape1"></div>
      <div class="shape" id="shape2"></div>
      <div class="shape" id="shape3"></div>
    </div>
    <div class="LPwrapper" id="LPwrapper" ref="wrapBox">
      <div class="LPwrapper-inner" id="LPwrapper-inner">
        <h2></h2>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenMax, TimelineMax } from "gsap";

export default {
  name: "landingPage",
  mounted() {
    const wrapScene = this.$scrollmagic
      .scene({
        triggerElement: "#start",
        triggerHook: 0.15,
        duration: "50%",
      })
      .setTween(
        TweenMax.from("#LPwrapper", 1, {
          css: {
            left: "-100%",
            overflowY: "hidden",
          },
        })
      )
      .addIndicators();
    const timeline = new TimelineMax();
    timeline.add([
      TweenMax.to("#shape1", 1, {
        css: {
          top: "95%",
          marginTop: "-50px",
          borderRadius: "50%",
          scale: "0.5",
        },
      }),
      TweenMax.fromTo(
        "#shape2",
        1,
        {
          scale: "0.2",
        },
        {
          scale: "1.8",
          borderWidth: 0,
        }
      ),
      TweenMax.to("#shape3", 1, {
        css: {
          bottom: "95%",
          marginBottom: "-50px",
          borderRadius: "50%",
          scale: "0.5",
        },
      }),
    ]);
    const shapeScene = this.$scrollmagic
      .scene({
        triggerElement: "#start",
        triggerHook: 0,
        duration: "100%",
      })
      .setTween(timeline)
      .addIndicators();
    // add scenes to window scrollmagic controller
    this.$scrollmagic.addScene([wrapScene, shapeScene]);
    const timeline2 = new TimelineMax();
    timeline2.add([
      TweenMax.to("#LPwrapper", 1, {
        css: {
          boxShadow:
            "0 8px 9px -5px rgba(0,0,0,0.2), 0 15px 22px 2px rgba(0,0,0,0.14), 0 6px 28px 5px rgba(0,0,0,0.12)",
        },
      }),
      TweenMax.to(".LPcontainer", 1, {
        css: {
          opacity: 0.1,
        },
      }),
    ]);
    const wrapScene2 = this.$scrollmagic
      .scene({
        triggerElement: "#LPwrapper-inner",
        triggerHook: 0,
        duration: "100%",
      })
      .setTween(timeline2)
      .addIndicators();
    // attach scrollmagic controller to element
    this.$scrollmagic.attachTo(this.$refs.wrapBox);
    // add scene to element scrollmagic controller
    this.$refs.wrapBox.$scrollmagic.addScene(wrapScene2);
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#start {
  height: 200vh;
  display: flex;
  background-color: #f5f5f5;
}
.LPcontainer {
  width: 100%;
  height: 100%;
  background-color: #027be3;
}
#LPwrapper {
  position: fixed;
  top: 25vh;
  left: 10vw;
  width: 55vw;
  height: 50vh;
  background-color: #e0e0e0;
  z-index: 10;
  overflow-y: scroll;
}
#LPwrapper-inner {
  width: 100%;
  height: 100vh;
}
.shape {
  position: fixed;
  width: 100px;
  height: 100px;
  opacity: 0.8;
}
#shape1 {
  top: 5%;
  left: 50%;
  background-color: #d84315;
}
#shape2 {
  left: 75%;
  top: 50%;
  margin-top: -50px;
  margin-left: -50px;
  background-color: #cddc39;
  border-radius: 50%;
  border: 50px solid #21ba45;
}
#shape3 {
  right: 5%;
  bottom: 5%;
  background-color: #006064;
}
</style>
