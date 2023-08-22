<template>
  <div>
    <transition 
  name="fade" 
  mode="out-in"
  @enter="enterAnimation"
  @leave="leaveAnimation"
>
  <div v-if="isLoading" ref="loaderContainer">
    <LoaderView />
  </div>
  <div v-else>
    <NavBar />
    <router-view v-slot="{ Component }">
      <transition 
        name="fade" 
        mode="out-in"
        @enter="enterAnimation"
        @leave="leaveAnimation"
      >
        <component :is="Component" />
      </transition>
    </router-view>
    <FooterBloc />
  </div>
</transition>
  </div>
</template>


<script>
import NavBar from './components/NavBar.vue'
import './css/global.scss'
import './css/variables.scss'
import './css/reset.scss'
import FooterBloc from './components/FooterBloc.vue'
import jsonData from './data/meta.json';
import { gsap } from 'gsap';
import LoaderView from './components/LoaderView.vue';

import allAssets from '@/assets/preloadAssets';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterBloc,
    LoaderView
  },
  data() {
  return {
    isLoading: true  // Ajoutez ceci
  };
},
  mounted() {
    this.loadResources().then(() => {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
      
    });
    document.title = jsonData.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', jsonData.description);
  },
  methods: {
  enterAnimation(el, done) {
    console.log('enter');
    gsap.fromTo(el, 
      { opacity: 0 }, 
      { 
        opacity: 1, 
        duration: 0.7, 
        ease: "power2.out",
        onComplete: done 
      }
    );
  },
  leaveAnimation(el, done) {
    console.log('leave');
    gsap.fromTo(el, 
      { opacity: 1 }, 
      { 
        opacity: 0, 
        duration: 0.7, 
        ease: "power2.in",
        onComplete: done 
      }
    );
  },
  async loadResources() {
      // Si vous préchargez également des vidéos, ajustez cette fonction pour gérer les vidéos.
      const promises = allAssets.map(assetUrl => {
        if (assetUrl.endsWith('.mp4') || assetUrl.endsWith('.webm') || assetUrl.endsWith('.ogg')) {
          // Gérez la précharge de vidéos si nécessaire
          return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.src = assetUrl;
            video.onloadeddata = resolve;
            video.onerror = reject;
          });
        } else {
          // Pour les images et autres types de fichiers
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = assetUrl;
            img.onload = resolve;
            img.onerror = reject;
          });
        }
      });

      await Promise.all(promises);
    }
}
}
</script>

<style>



</style>
