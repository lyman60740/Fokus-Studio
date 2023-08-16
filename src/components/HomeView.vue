<template>
  <div class="container">
    <section class="heroBanner">
      <div class="video-background">
    <!-- <video playsinline  muted loop>
      <source src="../assets/videos/theWave.mp4" type="video/mp4">
    </video> -->
    <img :src="imgBanner" alt="">
    <h1>{{ jsonData.title }}</h1>
  </div> 
  </section>
  <HomeServices />
  <HomeClients />
  <HomeAbout />
  <router-link to="/contact">
        <ContactButton />
  </router-link>
  
  </div>
</template>

<script>
import jsonData from '../data/home.json';
import HomeServices from './sections/HomeServices.vue';
import HomeClients from './sections/HomeClients.vue';
import HomeAbout from './sections/HomeAbout.vue';
import ContactButton from './ContactButton.vue';
import imgBanner from '../assets/images/placeholder-home.png';


export default {
  name: 'HomeView',
  components: {
    HomeServices,
    HomeClients,
    HomeAbout,
    ContactButton,
  },
  data() {
    return {
      jsonData,
      imgBanner
    };
  }
};
</script>

  <style lang="scss" scoped>
  @import '../css/variables.scss';

  .container {
    animation: appear 1s forwards ease-out;
    opacity: 0;
  }
  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
.heroBanner {
  // & video {
  //   width: 100%;
  //   height: 100vh;
  // }
  height: 100vh;
  position: relative;
  margin-top: 91px;
  & h1 {
    font-size: $font-size-titleSection;
    color: $primary-color;
    position: absolute;
    font-weight: 700;
  }
}
.video-background {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
      z-index: -1;
      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .video-background video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  </style>
  