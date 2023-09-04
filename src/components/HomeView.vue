<template>
  <div class="container">
    <section class="heroBanner">
      <div class="video-background">
        <video ref="videoRef" playsinline muted loop>
          <source src="../assets/videos/bande_demo_fokus-studio.webm" type="video/webm">
        </video>
    <router-link to="/contact">
    <h1>{{ jsonData.title }}</h1>
    </router-link>
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
    window.scrollTo(0, 0);

    this.$nextTick(() => {
      if (this.$route.hash) {
        const element = document.querySelector(this.$route.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
},
  methods: {
    setupScrollTrigger() {
      const videoElement = this.$refs.videoRef;

      ScrollTrigger.create({
        trigger: videoElement,
        start: "top bottom", 
        end: "bottom top", 
        onEnter: () => {
          videoElement.play().catch(error => console.error("Play error:", error));
        },
        onLeave: () => {
          videoElement.pause();
        },
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
  & a {
    width: 617px;
    height: 63px;
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
      z-index: 1;
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
  