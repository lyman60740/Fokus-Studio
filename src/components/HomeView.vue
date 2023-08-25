<template>
  <div class="container">
    <section class="heroBanner">
      <div class="video-background">
        <video ref="videoRef" playsinline muted loop autoplay>
          <source src="../assets/videos/bande_demo_fokus-studio.webm" type="video/mp4">
        </video>
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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//TODO : debugger l'erreur sur la video en auto play quand on revient sur la page d'acceuil ( vu que le scroll trop bug)
gsap.registerPlugin(ScrollTrigger);

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
    };
  },
  mounted() {
    this.setupScrollTrigger();
  },
  methods: {
    setupScrollTrigger() {
      const videoElement = this.$refs.videoRef;

      ScrollTrigger.create({
        trigger: videoElement,
        start: "top bottom", // Quand le haut de la vidéo touche le bas de la fenêtre d'affichage
        end: "bottom top", // Quand le bas de la vidéo touche le haut de la fenêtre d'affichage
        onEnter: () => videoElement.play(),
        onLeave: () => videoElement.pause(),
        onEnterBack: () => videoElement.play(),
        onLeaveBack: () => videoElement.pause()
      });
    }
  }
};

</script>

  <style lang="scss" scoped>
  @import '../css/variables.scss';

.heroBanner {
  & video {
    width: 100%;
    height: 100vh;
  }
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
  