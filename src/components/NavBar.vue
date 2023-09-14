<template>
  <div class="navBar" ref="navbar">
    <router-link to="/">
      <div class="navBar__logo">
        <img
          src="../assets/logo/logo_complet_noir.svg"
          alt="logo"
          class="logo_complet_noir"
        />
      </div>
    </router-link>
    <div class="navBar__links">
      <button @click="handleServicesClick" v-show="!isTabletView">
        Nos services
      </button>
      <router-link to="/contact" v-show="!isMobileView">
        <ContactButton />
      </router-link>
      <button @click="handleAgenceClick" v-show="!isTabletView">
        L'Agence
      </button>
    </div>
    <div class="navBar__reseaux">
      <a
        href="#"
        ref="link1"
        @mouseover="hoverSocialLink"
        @mouseleave="leaveSocialLink"
        ><img src="../assets/icons/facebook.svg" alt="facebook"
      /></a>
      <a
        href="#"
        ref="link2"
        @mouseover="hoverSocialLink"
        @mouseleave="leaveSocialLink"
        ><img src="../assets/icons/instagram.svg" alt="instagram"
      /></a>
      <a
        href="#"
        ref="link3"
        @mouseover="hoverSocialLink"
        @mouseleave="leaveSocialLink"
        ><img src="../assets/icons/youtube.svg" alt="youtube"
      /></a>
      <a
        href="#"
        ref="link4"
        @mouseover="hoverSocialLink"
        @mouseleave="leaveSocialLink"
        ><img src="../assets/icons/linkedin.svg" alt="linkedin"
      /></a>
    </div>
    <div class="navBar__burger" @click="toggleMenu" v-show="isTabletView">
      <div ref="crossTop"></div>
      <div ref="crossBot"></div>
    </div>

    <BurgerMenu
      v-if="isMenuOpen"
      @animation-finished="handleAnimationFinished"
      ref="burgerMenuComponent"
      @menu-item-clicked="toggleMenu"
    />
  </div>
</template>

<script>
import ContactButton from "./ContactButton.vue";
import BurgerMenu from "./BurgerMenu.vue";
import { gsap } from "gsap";

export default {
  name: "NavBar",
  props: {
    msg: String,
  },
  components: {
    ContactButton,
    BurgerMenu,
  },
  data() {
    return {
      lastScrollTop: 0,
      isMenuOpen: false,
      isTabletView: window.innerWidth < 1250,
      isMobileView: window.innerWidth < 800,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleAnimationFinished() {
      this.isMenuOpen = false;
    },
    handleServicesClick() {
      if (this.$route.name === "HomeView") {
        const element = document.querySelector("#services");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        this.$router.push({ name: "HomeView", hash: "#services" });
      }
    },
    handleAgenceClick() {
      if (this.$route.name === "HomeView") {
        const element = document.querySelector("#agence");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        this.$router.push({ name: "HomeView", hash: "#agence" });
      }
    },
    handleResize() {
      this.isTabletView = window.innerWidth < 1250;
      this.isMobileView = window.innerWidth < 800;

      if (!this.isTabletView && this.isMenuOpen) {
        this.toggleMenu(); // Cela va gérer les animations et enlever le flou
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;

      const elementsToBlur = document.querySelectorAll(
        ".container, .footer, .navBar__links, .navBar__reseaux, .navBar__logo"
      );
      const crossTop = this.$refs.crossTop;
      const crossBottom = this.$refs.crossBot;
      const crossTopTL = gsap.timeline();
      const crossBotTL = gsap.timeline();

      if (this.isMenuOpen) {
        crossTopTL
          .fromTo(
            crossTop,
            {
              y: -6,
              backgroundColor: "#1B1B1B",
            },
            {
              y: 0,
              backgroundColor: "white",
              duration: 0.4,
              ease: "power1.out",
            }
          )
          .to(crossTop, {
            rotate: 45,
            duration: 0.4,
            ease: "power1.out",
          });

        crossBotTL
          .fromTo(
            crossBottom,
            {
              y: 0,
              backgroundColor: "#1B1B1B",
            },
            {
              y: 0,
              backgroundColor: "white",
              duration: 0.4,
              ease: "power1.out",
            }
          )
          .to(crossBottom, {
            rotate: -45,
            duration: 0.4,
            ease: "power1.out",
          });

        crossTopTL.to(
          elementsToBlur,
          {
            duration: 0.7,
            ease: "power1.out",
            filter: "blur(5px) grayscale(100%)",
            pointerEvents: "none",
          },
          0
        );

        if (document.querySelector("video")) {
          document.querySelector("video").pause();
        }
      } else {
        this.isMenuOpen = true;
        this.$refs.burgerMenuComponent.leaveAnimation();
        crossTopTL
          .fromTo(
            crossTop,
            {
              rotate: 45,
              backgroundColor: "white",
            },
            {
              rotate: 0,
              backgroundColor: "#1B1B1B",
              duration: 0.4,
              ease: "power1.out",
            }
          )
          .to(crossTop, {
            y: -6,
            duration: 0.4,
            ease: "power1.out",
          });

        crossBotTL
          .fromTo(
            crossBottom,
            {
              rotate: -45,
              backgroundColor: "white",
            },
            {
              rotate: 0,
              backgroundColor: "#1B1B1B",
              duration: 0.4,
              ease: "power1.out",
            }
          )
          .to(crossBottom, {
            y: 6,
            duration: 0.4,
            ease: "power1.out",
          });

        crossTopTL.to(
          elementsToBlur,
          {
            duration: 0.7,
            ease: "power1.out",
            filter: "blur(0) grayscale(0%)",
            pointerEvents: "auto",
          },
          0
        );

        if (document.querySelector("video")) {
          document.querySelector("video").play();
        }
      }
    },
    hoverSocialLink(event) {
      gsap.to(event.currentTarget, {
        y: -5,
        duration: 0.7,
        ease: "power1.out",
      });
    },
    leaveSocialLink(event) {
      gsap.to(event.currentTarget, {
        y: 0,
        duration: 0.7,
        ease: "power1.out",
      });
    },
    handleScroll() {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > this.lastScrollTop) {
        gsap.to(this.$refs.navbar, {
          y: "-100%",
          duration: 0.4,
          ease: "power1.out",
        });
      } else {
        gsap.to(this.$refs.navbar, {
          y: "0%",
          duration: 0.4,
          ease: "power1.out",
        });
      }
      this.lastScrollTop = st <= 0 ? 0 : st; // Pour les navigateurs mobiles
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/variables.scss";
.navBar {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 2000px;
  padding: 10px 10%;
  box-sizing: border-box;
  background: $primary-color;
  z-index: 99;
  top: 0;
  color: $secondary-color;
  will-change: transform;
  &__links {
    display: flex;
    align-items: center;
    & a {
      font-weight: bold;
    }
    & button {
      font-weight: bold;
    }
    & a:not(:last-child) {
      margin-right: 5vw;
    }
    & button:not(:last-child) {
      margin-right: 5vw;
    }
  }
}
.navBar__reseaux {
  display: flex;
  align-items: center;
  & a {
    display: flex;
    align-items: center;
  }
  & a:not(:last-child) {
    margin-right: 28px;
  }
}
.navBar__reseaux,
.navBar__logo {
  width: 167px;
}
.logo_complet_noir {
  width: 48px;
  height: 67px;
}

.navBar__burger {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  height: 50px;
  width: 40px;
  z-index: 99;
  & div:not(.burgerMenu) {
    height: 3px;
    width: 30px;
    background: $secondary-color;
    transform-origin: 50% 50%;
    position: absolute;
    will-change: transform;
    &:nth-child(1) {
      transform: translateY(-6px);
    }
    &:nth-child(2) {
      transform: translateY(6px);
    }
  }
}
</style>
