<template>
    <div class="burgerMenu" ref="burgermenu">
        <div class="burgerMenu__nav">
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
        <div class="burgerMenu__reseaux">
            <a href="#" ref="link1" @mouseover="hoverSocialLink" @mouseleave="leaveSocialLink">
                <img src="../assets/icons/facebook.svg" alt="facebook" /></a>
            <a href="#" ref="link2" @mouseover="hoverSocialLink" @mouseleave="leaveSocialLink"><img src="../assets/icons/instagram.svg" alt="instagram" /></a>
            <a href="#" ref="link3" @mouseover="hoverSocialLink" @mouseleave="leaveSocialLink"><img src="../assets/icons/youtube.svg" alt="youtube" /></a>
            <a href="#" ref="link4" @mouseover="hoverSocialLink" @mouseleave="leaveSocialLink"><img src="../assets/icons/linkedin.svg" alt="linkedin" /></a>
        </div>
    </div>
  </template>
  
  <script>
//   import { gsap } from 'gsap';
  
  export default {
    name: 'BurgerMenu',
    
   
  }
  </script>
  
  
  
  <style lang="scss" scoped>
  @import '../css/variables.scss';

  .burgerMenu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    background: $secondary-color;
    height: 500px;
    width: 300px;
    top: -5px;
    right: -5px;
    border-radius: 8px;
    color: $primary-color;
    box-sizing: border-box;
    padding: 30px;
    &__nav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        a {
            font-size: $font-size-xlarge;
            font-weight: 700;
            text-decoration: none;
            color: $primary-color;
        }
    }
    &__reseaux {
        & img {
            color: white;
        }
    }
  }

  
  </style>
  