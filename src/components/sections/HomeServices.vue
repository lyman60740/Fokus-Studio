<template>
    <section id="services" class="servicesHome">
     <h2>{{ jsonData.title }}</h2>
     <div class="servicesBloc">
        <router-link
        class="servicesBloc__item" 
        v-for="(item, index) in jsonData.services" 
        :key="item.id" 
        :to="`/services/${item.id}`"
        :style="{ backgroundImage: `url(${getImage(item)})`, width: itemWidth, left: leftPosition(index) }" 
        @mouseover="hoverPreview($event)"
        @mouseleave="leavePreview($event)"
        >
            <div class="servicesBloc__item__title"  >
                <text>Vidéos</text>
                <h3>{{ item.title }}</h3>
            </div>
          </router-link>
        </div>
     
    </section>
  </template>
  
  <script>
import { gsap, CustomEase } from 'gsap/all';

import corporateImage from '@/assets/images/corporate_1.png';
import corporateImage2 from '@/assets/images/placeholder-corporate.png';
import culinairesImage2 from '@/assets/images/placeholder-culinaires.png';
import immobilieresImage2 from '@/assets/images/placeholder-immobilieres.png';
import sportivesImage from '@/assets/images/placeholder-sportives.png';
gsap.registerPlugin(CustomEase);
const myCustomEase = CustomEase.create("custom", "M0,0 C0.532,0 0.392,0.51 1,0.988");
import jsonData from '../../data/services.json';
  export default {
    name: 'HomeServices',
    data() {
    return {
      jsonData,
      corporateImage,
      duration: 0.5,
      hoverDelay: null,
    };
    },
    computed: {
  itemWidth() {
    return 'calc(0.5px + '+ 100 / this.jsonData.services.length + '%)';
  }
},
    methods: {
        leftPosition(index) {
    return (100 / this.jsonData.services.length) * index + '%';
  },
    getImage(item) {
      // Vous pouvez utiliser un switch ou des conditions pour retourner l'image correcte
      switch (item.title) {
        case 'corporate':
          return corporateImage2;
        case 'immobilières':
          return immobilieresImage2;
          case 'culinaires':
          return culinairesImage2;
        case 'sportives':
          return sportivesImage;
        // ... autres cas
        default:
          return null; // ou une image par défaut
      }
    },
    
 hoverPreview(e) {
      // Annule le délai précédent si l'utilisateur sort du survol avant 0.5 seconde
      clearTimeout(this.hoverDelay);

      // Définit un délai de 0.5 seconde avant de déclencher l'animation
      this.hoverDelay = setTimeout(() => {
        gsap.to(e.target, {
          duration: this.duration,
          width: "calc(" + this.itemWidth + " + 10%)",
          ease: myCustomEase,
        });
      }, 300);
    },
    leavePreview(e) {
      clearTimeout(this.hoverDelay);
      gsap.to(e.target, {
        duration: this.duration,
        width: this.itemWidth,
        ease: myCustomEase,
      });
    },
  
  }
}
  </script>

  
  
  <style lang="scss" scoped>
  @import '../../css/variables.scss';
  @import '../../css/global.scss';
  
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
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        transform-origin: center;
        cursor: pointer;
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
            background: rgba(0, 0, 0, 0.50);
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

  </style>
  