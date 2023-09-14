<template>
  <section class="clientsHome">
    <h2>{{ jsonData.clients.title }}</h2>

    <div class="blocCarousel" v-if="windowWidth <= 1250">
      <div class="carousel">
        <div
          class="carousel__logoBox__item"
          v-for="(item, index) in jsonData.clients.list"
          :key="index"
          :class="item"
        >
          <img :src="getImage(item)" :alt="item" />
        </div>
      </div>
      <div class="carousel">
        <div
          class="carousel__logoBox__item"
          v-for="(item, index) in jsonData.clients.list"
          :key="index"
          :class="item"
        >
          <img :src="getImage(item)" :alt="item" />
        </div>
      </div>
      <div class="carousel">
        <div
          class="carousel__logoBox__item"
          v-for="(item, index) in jsonData.clients.list"
          :key="index"
          :class="item"
        >
          <img :src="getImage(item)" :alt="item" />
        </div>
      </div>
    </div>

    <div class="clientsHome__logoBox" v-else>
      <div
        class="clientsHome__logoBox__item"
        v-for="(item, index) in jsonData.clients.list"
        :key="index"
        :class="item"
      >
        <img :src="getImage(item)" :alt="item" />
      </div>
    </div>
  </section>
</template>

<script>
import microsoftLogo from "@/assets/logo/microsoft.svg";
import demoozLogo from "@/assets/logo/demooz.svg";
import axaLogo from "@/assets/logo/axa.svg";
import nestleLogo from "@/assets/logo/nestle.svg";
import warner_brosLogo from "@/assets/logo/warner_bros.svg";
import jsonData from "../../data/home.json";
import { debounce } from "lodash";

export default {
  name: "HomeClients",
  data() {
    return {
      jsonData,
      windowWidth: window.innerWidth,
      debouncedHandleResize: null,
    };
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    getImage(item) {
      switch (item) {
        case "Microsoft":
          return microsoftLogo;
        case "Axa":
          return axaLogo;
        case "Demooz":
          return demoozLogo;
        case "Nestlé Waters":
          return nestleLogo;
        case "Warner Bros":
          return warner_brosLogo;
        // ... autres cas
        default:
          return null; // ou une image par défaut
      }
    },
  },
  mounted() {
    this.debouncedHandleResize = debounce(this.handleResize, 200);
    window.addEventListener("resize", this.debouncedHandleResize);
    this.handleResize(); // pour initialiser windowWidth dès le montage

    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach((carousel) => {
      const items = carousel.querySelectorAll(".carousel__logoBox__item");
      const itemWidth = items[0].offsetWidth; // Supposons que tous les items aient la même largeur
      const listWidth = itemWidth * items.length; // Largeur de la liste originale

      carousel.addEventListener("transitionend", () => {
        // Lorsque la première liste sort de l'écran
        if (parseInt(carousel.style.transform.split("(")[1]) <= -listWidth) {
          // Supprimer la première liste
          for (let i = 0; i < items.length; i++) {
            carousel.removeChild(items[i]);
          }

          // Ajouter une copie de la liste à la fin
          items.forEach((item) => {
            const clone = item.cloneNode(true);
            carousel.append(clone);
          });

          // Réinitialiser la position
          carousel.style.transform = `translateX(${
            parseInt(carousel.style.transform.split("(")[1]) + listWidth
          }px)`;
        }
      });
    });
  },
  beforeMount() {
    window.removeEventListener("resize", this.debouncedHandleResize);
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 1250;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../css/variables.scss";
@import "../../css/global.scss";

.clientsHome {
  width: 100%;
  overflow: hidden;
  &__logoBox {
    width: 100%;
    background: rgba(46, 46, 46, 0.08);
    display: flex;
    justify-content: space-between;
    padding: 50px 10%;
    box-sizing: border-box;
    &__item {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & img {
      height: 90px;
    }
    & .Microsoft img {
      height: 50px !important;
    }
    & .Demooz img {
      height: 50px !important;
    }
  }
}

.carousel {
  display: flex;
  & img {
    height: 50px;
  }
}
@media (max-width: 1250px) {
  .blocCarousel {
    display: flex;
    animation: scroll 20s linear infinite;
  }
  .carousel {
    width: 1100px !important;
    justify-content: space-between !important;

    white-space: nowrap;
    margin-right: 100px;
  }
  .carousel__logoBox__item {
    display: inline-block;
  }
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-33.33%);
    }
  }
}
</style>
