
<template>
    <section class="aboutHome">
        <img src="../../assets/logo/logo_titrage_noir.svg" alt="" class="logo-letter">
        <div class="aboutHome__boxContent">
          <div class="aboutHome__boxContent__bloc" 
            v-for="item in jsonData.about.blocs" 
            :key="item.title" >
            <div class="aboutHome__boxContent__bloc__large" >
              <div class="aboutHome__boxContent__title" >
                <h3>{{ item.title }}</h3>
              </div>
            <div class="aboutHome__boxContent__paragraph" 
              v-for="(paragraph, index) in item.paragraphs" 
              :key="index" >
            <p>{{ paragraph }}</p>
            
            </div>
            
          </div>
          <img src="../../assets/logo/roulette.svg" alt="">
        </div>
      </div>
    </section>
  </template>
  
  <script>
  //TODO: ajouter les données dynamique du json de la section about et (boucler pour pouvoir ajouter des paragaphes)
  import jsonData from '../../data/home.json';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  export default {
    name: 'HomeAbout',
    data() {
    return {
      jsonData
    };
    },
    mounted() {
    // Sélectionnez tous les éléments que vous voulez animer
    gsap.registerPlugin(ScrollTrigger);
    const elements = document.querySelectorAll('.aboutHome__boxContent__bloc h3, .aboutHome__boxContent__bloc p');
    const roulettes = document.querySelectorAll('.aboutHome__boxContent__bloc img');

    elements.forEach(element => {
      this.$store.dispatch('animateElement', element);
    });

    roulettes.forEach((roulette, index) => {
    // Si l'index est pair, on utilise "+=135", sinon on utilise "-=135"
    const rotationValue = index % 2 === 0 ? "+=135" : "-=135";
    gsap.to(roulette, {
      scrollTrigger: {
        trigger: roulette,
        start: 'bottom bottom',
        end: 'bottom center',
        toggleActions: 'play none none reverse',
        scrub: 1,
      },
      rotation: rotationValue, // Effectuez une rotation de 360 degrés
      duration: 2,
      ease: "power3.out",
    });
    });

  },
    methods: {
       
    }
    
}
  </script>

<style lang="scss" >
  @import '../../css/variables.scss';
  @import '../../css/global.scss';

  .aboutHome {
    padding: 0 10%;
    box-sizing: border-box;
    
    overflow-x: hidden;
    &__boxContent {
      width: 100%;
      display: flex;
      flex-direction: column;
      &__bloc {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 200px;
        width: 100%;
        &__large {
          max-width: 60vw;
        }
        
        &:nth-child(1){
        & img {
          position: absolute;
          right: calc(-10% - 188px);
          transform: rotate(90deg);
        }
      }
        &:nth-child(2){
          justify-content: flex-end;
        & img {
          position: absolute;
          left: calc(-10% - 188px);
          transform: rotate(180deg);
        }
      }
      }
    }
    & img {
        width: 300px;
    }
  }
.logo-letter {
  margin-bottom: 200px;
}

 p, h3 {
  transform: translateY(103%);
  margin: 0 !important;
  opacity: 0;
}
.aboutHome__boxContent__paragraph, .aboutHome__boxContent__title {
  overflow: hidden;
  margin-bottom: 20px;

}
</style>