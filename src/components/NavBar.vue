<template>
  <div class="navBar" ref="navbar">
    <router-link to="/">
    <div class="navBar__logo">
      <img src="../assets/logo/logo_complet_noir.svg" alt="logo" class="logo_complet_noir" />
    </div>
    </router-link>
    <div class="navBar__links">
      
      <router-link :to="{ name: 'HomeView', hash: '#services' }">
        Nos services
      </router-link>
      <router-link to="/contact">
        <ContactButton />
      </router-link>
      <router-link :to="{ name: 'HomeView', hash: '#agence' }">
        L'Agence
      </router-link>
    </div>
    <div class="navBar__reseaux">
      <a href="#" ref="link1" @mouseover="hoverSocialLink" @mouseleave="leaveSocialLink"><img src="../assets/icons/facebook.svg" alt="facebook" /></a>
      <a href="#" ref="link2" @mouseover="hoverSocialLink" @mouseleave="leaveSocialLink"><img src="../assets/icons/instagram.svg" alt="instagram" /></a>
      <a href="#" ref="link3" @mouseover="hoverSocialLink" @mouseleave="leaveSocialLink"><img src="../assets/icons/youtube.svg" alt="youtube" /></a>
      <a href="#" ref="link4" @mouseover="hoverSocialLink" @mouseleave="leaveSocialLink"><img src="../assets/icons/linkedin.svg" alt="linkedin" /></a>
    </div>
    <div class="navBar__burger" @click="toggleMenu">
      <div></div>
      <div></div>
      <BurgerMenu v-if="isMenuOpen"/>
    </div>
    
  </div>
</template>

<script>
import ContactButton from './ContactButton.vue'
import BurgerMenu from './BurgerMenu.vue'
import { gsap } from 'gsap';

export default {
  name: 'NavBar',
  props: {
    msg: String
  },
  components: {
    ContactButton,
    BurgerMenu
  },
  data() {
    return {
      lastScrollTop: 0,
      isMenuOpen: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        if (this.isMenuOpen) {
          document.querySelector('.container').classList.add('blurEffect');
          document.querySelector('.footer').classList.add('blurEffect');
          document.querySelector('.navBar__links').classList.add('blurEffect');
          document.querySelector('.navBar__reseaux').classList.add('blurEffect');
          document.querySelector('.navBar__logo').classList.add('blurEffect');
          document.querySelector('video').pause();
        } else {
          document.querySelector('.container').classList.remove('blurEffect');
          document.querySelector('.footer').classList.remove('blurEffect');
          document.querySelector('.navBar__links').classList.remove('blurEffect');
          document.querySelector('.navBar__reseaux').classList.remove('blurEffect');
          document.querySelector('.navBar__logo').classList.remove('blurEffect');
          document.querySelector('video').play();
        }
        
    },
    hoverSocialLink(event) {
      gsap.to(event.currentTarget, {
        y: -5,
        duration: 0.7,
        ease: 'power1.out'
      });
    },
    leaveSocialLink(event) {
      gsap.to(event.currentTarget, {
        y: 0,
        duration: 0.7,
        ease: 'power1.out'
      });
    },
    handleScroll() {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > this.lastScrollTop) {
        // Si on scroll vers le bas
        gsap.to(this.$refs.navbar, {
          y: '-100%',
          duration: 0.7,
          ease: 'power1.out',
          opacity: 0
        });
      } else {
        // Si on scroll vers le haut
        gsap.to(this.$refs.navbar, {
          y: '0%',
          duration: 0.7,
          ease: 'power1.out',
          opacity: 1
        });
      }
      this.lastScrollTop = st <= 0 ? 0 : st; // Pour les navigateurs mobiles
    }
  }
}
</script>



<style lang="scss" scoped>
@import '../css/variables.scss';
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
  &__links {
    display: flex;
    align-items: center;
    & a {
      font-weight: bold;
    }
    & a:not(:last-child) {
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
.navBar__reseaux, .navBar__logo {
  width: 167px;
}
  .logo_complet_noir {
    width: 48px;
    height: 67px;
  }

  @media screen and (max-width: 1250px) {
  .navBar__burger {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: flex-end;
    & div:not(.burgerMenu) {
      height: 3px;
      width: 30px;
      background: $secondary-color;
      &:nth-child(1) {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
