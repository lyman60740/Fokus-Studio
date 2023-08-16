<template>
  <div>
    <transition v-if="isLoading">
      <div ref="loaderContainer">
        <LoaderView />
      </div>
    </transition>
    <transition v-else>
      <div>
        <NavBar />
        <transition 
          name="fade" 
          mode="out-in"
          @enter="enterAnimation"
          @leave="leaveAnimation"
        >
          <router-view></router-view>
        </transition>
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

import imgBanner from './assets/images/placeholder-home.png';
import corporateImage1 from '@/assets/images/corporate_1.png';
import corporateImage2 from '@/assets/images/corporate_2.png';
import culinairesImage1 from '@/assets/images/culinaires_1.png';
import culinairesImage2 from '@/assets/images/culinaires_2.png';
import immobilieresImage1 from '@/assets/images/immobilieres_1.png';
import immobilieresImage2 from '@/assets/images/immobilieres_2.png';
import sportivesImage1 from '@/assets/images/sportives_1.png';
import sportivesImage2 from '@/assets/images/sportives_2.png';

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
        gsap.to(this.$refs.loaderContainer, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        this.isLoading = false;
      }
    });
      }, 2000);
      
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
    gsap.fromTo(el, 
      { opacity: 0 }, 
      { 
        opacity: 1, 
        duration: 2, 
        ease: "power2.out",
        onComplete: done 
      }
    );
  },
  leaveAnimation(el, done) {
    gsap.fromTo(el, 
      { opacity: 1 }, 
      { 
        opacity: 0, 
        duration: 2, 
        ease: "power2.in",
        onComplete: done 
      }
    );
  },
  async loadResources() {
      // Ici, chargez toutes vos ressources. Par exemple :
      const imagesToLoad = [
        imgBanner,
        corporateImage1,
        corporateImage2,
        culinairesImage1,
        culinairesImage2,
        immobilieresImage1,
        immobilieresImage2,
        sportivesImage1,
        sportivesImage2
      ];

      const promises = imagesToLoad.map(imgUrl => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = imgUrl;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      await Promise.all(promises);
    }
}
}
</script>

<style>



</style>
