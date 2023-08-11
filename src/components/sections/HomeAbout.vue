
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
      <div class="aboutHome__blocProcess">
        <div class="aboutHome__blocProcess__part preProd">
          <div class="aboutHome__blocProcess__blocAnim">
            <div class="preProd__trait"></div>
            <div class="preProd__trait"></div>
            <div class="preProd__trait"></div>
            <div class="preProd__trait"></div>
            <div class="preProd__trait"></div>
          </div>
          <div class="aboutHome__blocProcess__content">
            <div class="aboutHome__blocProcess__content">
              <h4><strong>{{ jsonData.about.animations.firstBloc.title }}</strong></h4>
              <p>{{ jsonData.about.animations.firstBloc.texte }}</p>
            </div>
          </div>
        </div>
        <div class="aboutHome__blocProcess__part tournage">
          <div class="aboutHome__blocProcess__blocAnim"></div>
          <div class="aboutHome__blocProcess__content">
            <div class="aboutHome__blocProcess__content">
              <h4><strong>{{ jsonData.about.animations.secondBloc.title }}</strong></h4>
              <p>{{ jsonData.about.animations.secondBloc.texte }}</p>
            </div>
          </div>
        </div>
        <div class="aboutHome__blocProcess__part postProd">
          <div class="aboutHome__blocProcess__blocAnim">
            <div class="postProd__box">
              <div class="postProd__rectangle"></div>
              <div class="postProd__rectangle"></div>
              <div class="postProd__rectangle"></div>
              <div class="postProd__rectangle"></div>
            </div>
          </div>
          <div class="aboutHome__blocProcess__content">
            <div class="aboutHome__blocProcess__content">
              <h4><strong>{{ jsonData.about.animations.thirdBloc.title }}</strong></h4>
              <p>{{ jsonData.about.animations.thirdBloc.texte }}</p>
            </div>
          </div>
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
    // const parent = document.querySelector('.aboutHome__blocProcess__blocAnim');
    const traits = document.querySelectorAll('.preProd__trait');
    const rectangle = document.querySelectorAll('.postProd__rectangle');
    const boxRectangle = document.querySelector('.postProd__box');

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

    const tl = gsap.timeline({
  repeat: -1, // Répéter indéfiniment
  repeatDelay: 1,
  scrollTrigger: {
    trigger: traits[0],
    start: 'top center', // Ajustez ce déclencheur selon vos besoins
    toggleActions: 'play none none reverse',
  },
});

// Bouclez sur les traits pour la première phase (de -100% à 0%)
traits.forEach((trait) => {
  tl.to(trait, {
    x: '0%', 
    duration: 1, 
    ease: "power3.out",
  }, `-=50%`); // Commencez chaque animation avec un décalage négatif de 30% de la durée totale
});

// Bouclez sur les traits pour la deuxième phase (de 0% à 100%)
traits.forEach((trait) => {
  tl.to(trait, {
    x: '100%', 
    duration: 1, 
    ease: "power3.out",
  }, `-=70%`); // Utilisez le même décalage négatif que dans la première phase
});
tl.to(rectangle, {
    duration: 1, 
    ease: "power3.out",
    y: 0,
  },"<"); // Utilisez le même décalage négatif que dans la première phase
  tl.to(rectangle, {
    duration: 0.3, 
    ease: "power3.out",
    opacity: 0,
  }); // Utilisez le même décalage négatif que dans la première phase


  tl.to(boxRectangle, {
    duration: 0.3, 
    ease: "power3.out",
    borderColor: "#1B1B1B",
  borderWidth: "1px"
  },"<"); // Utilisez le même décalage négatif que dans la première phase

//TODO inverser l'animation post prod et optimiser les animations avec des .reverse etc

  },
    methods: {
       
    }
    
}
  </script>

<style lang="scss" scoped >
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
 p:not(.aboutHome__blocProcess__content p), h3 {
  transform: translateY(103%);
  margin: 0 !important;
  opacity: 0;
}
.aboutHome__boxContent__paragraph, .aboutHome__boxContent__title {
  overflow: hidden;
  margin-bottom: 20px;
}
.aboutHome__blocProcess {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 200px;
  &__part {
    width: 400px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & p {
      margin-top: 15px;
    }
    &__blocAnim {
      height: 200px;
      margin-bottom: 130px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
}

.preProd {
  & .aboutHome__blocProcess__blocAnim {
    margin: 0 90px 130px 90px;
    box-sizing: border-box;
    overflow: hidden;
  }
        &__trait {
          width: 100%;
          height: 2px;
          background-color: $secondary-color;
          margin-bottom: 30px;
          transform: translateX(-100%);
        }
      }

      .postProd {
        &__box {
            height: 37.5px;
            width: 100%;
            display: flex;
            border-style: solid;
            border-radius: 5px;
            opacity: 1;

          }
        &__rectangle {
          height: 37.5px;
          border: 1px solid $secondary-color;
          border-radius: 5px;
          
          &:nth-child(1) {
            width: 120px;
            transform: translate(0, -100%);
          }
          &:nth-child(2) {
            width: 86px;
            transform: translate(0, 200%);
          }
          &:nth-child(3) {
            width: 65px;
            transform: translate(0 ,-200%);
          }
          &:nth-child(4) {
            width: 120px;
            transform: translate(0, 100%);
          }
        }
      }

      h4 {
        font-size: 24px;
        font-weight: 700;
      }
</style>