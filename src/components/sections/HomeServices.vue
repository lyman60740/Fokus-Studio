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
        @mouseover="hoverPreview($event)"
        @mouseleave="leavePreview($event)"
      >
        <div class="servicesBloc__item__cache"></div>
        <video :src="getImage(item)" muted loop playsinline></video>
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

gsap.registerPlugin(CustomEase);
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
    };
  },
  computed: {
    itemWidth() {
      return "calc(0.5px + " + 100 / this.jsonData.services.length + "%)";
    },
  },
  mounted() {
    // Sélectionnez tous les éléments que vous voulez animer
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
              },
            }),
          toggleActions: "play none none none",
        },
      });
    });
    this.$store.commit("setHomeServicesReady", true);
  },
  methods: {
    leftPosition(index) {
      return (100 / this.jsonData.services.length) * index + "%";
    },
    getImage(item) {
      // Vous pouvez utiliser un switch ou des conditions pour retourner l'image correcte
      switch (item.title) {
        case "corporate":
          return videoCorpo;
        case "immobilières":
          return videoImmo;
        case "culinaires":
          return videoCuli;
        case "sportives":
          return videoSport;
        // ... autres cas
        default:
          return null; // ou une image par défaut
      }
    },

    hoverPreview(e) {
      if (!this.cacheFinished) return;

      clearTimeout(this.hoverDelay);
      const currentTarget = e.currentTarget;

      // Assombrir tous les éléments .servicesBloc__item
      const allItems = document.querySelectorAll(".servicesBloc__item");
      allItems.forEach((item) => {
        gsap.to(item, {
          duration: this.duration,
          filter: "brightness(0.5)",
          ease: myCustomEase,
        });
      });

      this.hoverDelay = setTimeout(() => {
        gsap.to(currentTarget, {
          duration: this.duration,
          width: "calc(" + this.itemWidth + " + 20%)",
          filter: "brightness(1)", // Remettre l'opacité de l'élément survolé à 1
          ease: myCustomEase,
        });

        const videoElement = currentTarget.querySelector("video");
        if (videoElement) {
          videoElement.play();
        }
      }, 150); // J'ai ajouté un délai ici pour garantir l'ordre d'exécution
    },
    leavePreview(e) {
      clearTimeout(this.hoverDelay);
      const currentTarget = e.currentTarget;

      // Restaurer le brightness pour tous les éléments .servicesBloc__item
      const allItems = document.querySelectorAll(".servicesBloc__item");
      allItems.forEach((item) => {
        gsap.to(item, {
          duration: this.duration,
          filter: "brightness(1)",
          ease: myCustomEase,
        });
      });

      gsap.to(currentTarget, {
        duration: this.duration,
        width: this.itemWidth,
        ease: myCustomEase,
      });

      const videoElement = currentTarget.querySelector("video");
      if (videoElement) {
        videoElement.pause();
      }
    },
  },
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
</style>
