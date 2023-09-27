<template>
  <section id="services" class="servicesHome" ref="services">
    <h2>{{ jsonData.title }}</h2>
    <div class="servicesBloc">
      <router-link
        class="servicesBloc__item"
        v-for="(item, index) in jsonData.services"
        :key="item.id"
        :to="`/services/${item.id}`"
        :style="{ width: itemWidth, left: leftPosition(index) }"
        @mouseover="isMobile ? handleMobileMouseOver($event) : hoverPreview($event)"
  @mouseleave="isMobile ? handleMobileMouseLeave($event) : leavePreview($event)"

      >
        <div class="servicesBloc__item__cache"></div>
        <video :src="getImage(item)" muted loop playsinline ref="videoRef"></video>
        <div class="servicesBloc__item__title">
          <text>Vidéos</text>
          <h3>{{ item.title }}</h3>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
import { gsap, CustomEase } from "gsap/all";
import videoCorpo from "@/assets/videos/loop_video_corpo.mp4";
import videoCuli from "@/assets/videos/loop_video_culinaire.mp4";
import videoImmo from "@/assets/videos/loop_video_immo.mp4";
import videoSport from "@/assets/videos/loop_video_sport.mp4";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CustomEase, ScrollTrigger);
const myCustomEase = CustomEase.create(
  "custom",
  "M0,0 C0.532,0 0.392,0.51 1,0.988"
);

import jsonData from "../../data/services.json";

export default {
  name: "HomeServices",
  data() {
    return {
      jsonData,
      duration: 0.5,
      hoverDelay: null,
      cacheFinished: false,
      isMobile: false,
      videoPlayDelay: null,
      isVideoPlaying: false
    };
  },
  computed: {
    itemWidth() {
      return "calc(0.5px + " + 100 / this.jsonData.services.length + "%)";
    }
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    const caches = document.querySelectorAll(".servicesBloc__item__cache");
    caches.forEach((roulette, index) => {
      gsap.to(roulette, {
        scrollTrigger: {
          trigger: roulette,
          start: "center bottom",
          onEnter: () =>
            gsap.to(roulette, {
              delay: index * 0.1,
              duration: 3,
              ease: "power3.out",
              y: "-100%",
              onComplete: () => {
                this.cacheFinished = true;
              }
            }),
          toggleActions: "play none none none"
        }
      });
    });
    this.checkMobile();
    window.addEventListener("resize", this.checkMobile);
    this.$store.commit("setHomeServicesReady", true);
    const videoElements = this.$refs.videoRef;
  if (videoElements) {
    videoElements.forEach((video) => {
      video.pause();
    });
  }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkMobile);
  },
  methods: {
    checkMobile() {
  this.isMobile = window.innerWidth <= 1250;
},
handleMobileMouseOver(e) {
  const currentTarget = e.currentTarget;
  const videoElement = currentTarget.querySelector("video");

  if (videoElement && !this.isVideoPlaying) {
    videoElement.play().then(() => {
      this.isVideoPlaying = true;
    }).catch(error => {
      console.error("Erreur de lecture vidéo:", error);
    });
  }
},

handleMobileMouseLeave(e) {
  const currentTarget = e.currentTarget;
  const videoElement = currentTarget.querySelector("video");

  if (videoElement && this.isVideoPlaying) {
    videoElement.pause();
    this.isVideoPlaying = false;
  }
},

hoverPreview(e) {
  if (!this.cacheFinished) return;
  clearTimeout(this.hoverDelay);
  const currentTarget = e.currentTarget;

  const allItems = document.querySelectorAll(".servicesBloc__item");
  allItems.forEach((item) => {
    gsap.to(item, {
      duration: this.duration,
      filter: "brightness(0.5)",
      ease: myCustomEase
    });
  });

  this.hoverDelay = setTimeout(() => {
    gsap.to(currentTarget, {
      duration: this.duration,
      width: "calc(" + this.itemWidth + " + 20%)",
      filter: "brightness(1)",
      ease: myCustomEase
    });

    const videoElement = currentTarget.querySelector("video");
    if (videoElement && !this.isVideoPlaying) {
      videoElement.play().then(() => {
        this.isVideoPlaying = true;
      });
    }
  }, 150);
},

leavePreview(e) {
  clearTimeout(this.hoverDelay);
  const currentTarget = e.currentTarget;

  const allItems = document.querySelectorAll(".servicesBloc__item");
  allItems.forEach((item) => {
    gsap.to(item, {
      duration: this.duration,
      filter: "brightness(1)",
      ease: myCustomEase
    });
  });

  gsap.to(currentTarget, {
    duration: this.duration,
    width: this.itemWidth,
    ease: myCustomEase
  });

  const videoElement = currentTarget.querySelector("video");
  if (videoElement && this.isVideoPlaying) {
    videoElement.pause();
    this.isVideoPlaying = false;
  }
},
    leftPosition(index) {
      return (100 / this.jsonData.services.length) * index + "%";
    },
    getImage(item) {
      switch (item.title) {
        case "corporate":
          return videoCorpo;
        case "immobilières":
          return videoImmo;
        case "culinaires":
          return videoCuli;
        case "sportives":
          return videoSport;
        default:
          return null;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../css/variables.scss";
@import "../../css/global.scss";

.servicesBloc {
  width: 70%;
  height: 70vh;
  box-sizing: border-box;
  padding: 0 5%;
  display: flex;
  position: relative;
  justify-content: space-between;

  &__item {
    height: 70vh;
    position: absolute;
    transform-origin: center;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: brightness(1);
    &__cache {
      width: 100%;
      height: 100%;
      border-bottom: 4px solid $gray-bg;
      background: $primary-color;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 5;
    }
    & video {
      height: 100%;
    }
    &:nth-child(1) {
      z-index: 5;
    }
    &:nth-child(2) {
      z-index: 4;
    }
    &:nth-child(3) {
      z-index: 3;
    }
    &:nth-child(4) {
      z-index: 2;
    }
    &__title {
      position: absolute;
      bottom: 0;
      height: 30%;
      display: flex;
      flex-direction: column;
      width: 100% !important;
      background: rgba(0, 0, 0, 0.5);
      padding: 27px 14px;
      box-sizing: border-box;
      pointer-events: none;
      & text {
        color: $primary-color;
        font-size: $font-size-explainText;
        font-weight: 300;
        text-transform: capitalize;
      }
      & h3 {
        color: $primary-color;
        font-size: $font-size-explainText;
        font-weight: 700;
        text-transform: capitalize;
      }
    }
  }
}
@media screen and (max-width: 800px) {
  .servicesBloc__item__title {
    height: 30% !important;
    padding: 10px 15px !important;
    & text {
      font-size: $font-size-explainText-mobile !important;
    }
    & h3 {
      font-size: $font-size-explainText-mobile !important;
    }
  }
  .servicesBloc {
    width: 100% !important;
  }
}
@media screen and (max-width: 1250px) {
.servicesBloc {
    flex-direction: column !important;
    align-items: center;
    height: 100%;
  }
  .servicesBloc__item {
    position: inherit !important;
    width: 100% !important;
    left: 0 !important;
    height: 100%;
    margin-top: 50px;
    & video {
      height: inherit !important;
      width: 100%;
    }
    &__title {
      height:20%;
    }
  }
}
</style>
