
<template>
    <section id="agence" class="aboutHome">
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
          <div class="aboutHome__blocProcess__blocAnim">
            <div class="tournage__box">
              
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 180 180" enable-background="new 0 0 180 180" xml:space="preserve">
                  <g class="outer">
                <circle stroke="#202123" stroke-width="7" stroke-miterlimit="10" cx="90" cy="90" r="85.5"/>
                <path fill="none" stroke="#202123" stroke-width="4" stroke-miterlimit="10" d="M17.9,71.7C23.9,47.4,42,28,65.3,19.8 M154,127.2
                  c-5.7,9.6-13.4,18-22.6,24.2"/>
                  </g>
                  <g class="mid">
                <circle stroke="#202123" stroke-width="11" stroke-miterlimit="10" cx="90" cy="90" r="59.8"/>
                <path fill="none" stroke-width="3" stroke-miterlimit="10" d="M109.3,33.4c15.8,5.4,28.7,17.2,35.4,32.5 M61.5,142.6c-7.8-4.2-14.7-10.3-19.9-17.5"/>
                  </g>
                  <g class="inner">
                <circle stroke="#202123" stroke-miterlimit="10" cx="90" cy="90" r="18"/>
                  </g>
                  <g class="lens-flare">
                <circle fill="#FFFFFF" cx="108.6" cy="66.2" r="19.9"/>
                <circle fill="#FFFFFF" cx="73.9" cy="112.5" r="10.9"/>
                  </g>
                </svg>
             
            </div>
            
          </div>
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
  //TODO eclaircir les bande de post production
  import jsonData from '../../data/home.json';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import chroma from 'chroma-js';


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
    delay: 0.5,
    scrollTrigger: {
    trigger: traits[0],
    start: 'top center', // Ajustez ce déclencheur selon vos besoins
    toggleActions: 'play none none reverse',
  },
});

const combinedTL = gsap.timeline({
    repeat: -1,
    repeatDelay: 2,
    yoyo: true, // Pour faire jouer l'animation en avant puis en arrière
    scrollTrigger: {
        trigger: traits[0],
        start: 'top center',
        toggleActions: 'play none none reverse',
    }
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


combinedTL.addLabel("rectangleAnim");
combinedTL.to(rectangle, {
    duration: 2, 
    ease: "power3.out",
    y: 0,
}, "rectangleAnim");
combinedTL.to(rectangle, {
    duration: 1, 
    ease: "power3.in",
    backgroundColor: "#3a3a3a",
}, "rectangleAnim");

combinedTL.addLabel("boxRectangleAnim");
combinedTL.to(boxRectangle, {
    duration: 1, 
    ease: "power3.in",
    backgroundColor: "#3a3a3a",
}, `-=110%`);

// Sélectionnez l'élément SVG
const svgElement = document.querySelector('.tournage__box');

// Couleurs (remplacez par vos valeurs)
const primaryColor = "#202123"; // Remplacez par la valeur de votre $primary-color

const lensTL = gsap.timeline({
    repeat: -1,
    repeatDelay: 1,
    yoyo: true, // Pour faire jouer l'animation en avant puis en arrière
    scrollTrigger: {
        trigger: traits[0],
        start: 'top center',
        toggleActions: 'play none none reverse',
    }
});

// Animation pour g.outer
lensTL
  .to(svgElement.querySelector('g.outer'), {
    duration: 1,
    ease: "elastic",
    scale: 0.95,
     transformOrigin: "50% 50%",
    yoyo: true
  })
  .to(svgElement.querySelector('g.outer'), {
    duration: 0.5,
    rotation: 45,
    ease: "power3.inOut",
     transformOrigin: "50% 50%",
    yoyo: true
  }, "-=0.3"); // Commencez en même temps que la première animation

// Animation pour g.inner
lensTL
  .to(svgElement.querySelector('g.inner'), {
    duration: 0.8,
    ease: "power3.inOut",
    fill: chroma(primaryColor).brighten(0.3).hex(),
    scale: 1.2,
     transformOrigin: "50% 50%",
    yoyo: true,
    strokeWidth: 25
  },"<");

// Animation pour g.lens-flare
lensTL
  .to(svgElement.querySelector('g.lens-flare'), {
    duration: 1,
    ease: "power3.inOut",
    opacity: 0.8,
    scale: 1.25,
     transformOrigin: "50% 50%",
    yoyo: true
  }, "<");

this.$store.commit('setHomeAboutReady', true);
    },
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
          will-change: transform;
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
          height: 33px;
          border: 2px solid #3a3a3a;
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

      .tournage {
        & .aboutHome__blocProcess__blocAnim{
          transform: translateY(-50%);
          scale: 0.4;
        }
        &__box {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }

      h4 {
        font-size: 24px;
        font-weight: 700;
      }
      @-moz-document url-prefix() {
    h4 {
        font-weight: 500;
    }
}

      .tournage__box svg {
  width: auto;
  overflow: visible;
  transition: all .3s ease-in-out;
  g.outer {
    fill: $primary-color;
    transition: fill .5s ease-in;
  }
  g.outer, g.mid, g.inner, g.lens-flare {
    transform-origin: 50% 50%;
  }
  g.mid {
    fill: darken($primary-color, 25%);
    transition: fill .5s ease-in;
    path {
      stroke: darken($primary-color, 25%);
    }
  }
  g.inner {
    stroke-width: 20;
    fill: darken($primary-color, 25%);
    transition: stroke-width .5s ease-in, fill .5s ease-in;
  }
  g.lens-flare {
    opacity: .6;
    transition: opacity 1s ease-in;
  }
}


</style>