import { createStore } from 'vuex';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default createStore({
    state: {
      // Votre état ici
    },
    mutations: {
      // Vos mutations ici
    },
    actions: {
        animateElement(_, element) {
          gsap.to(element, {
            scrollTrigger: {
              trigger: element,
              start: 'top center', // Vous pouvez ajuster ce déclencheur selon vos besoins
              toggleActions: 'play none none reverse',
            },
            duration: 1,
            x: 100,
            y: 100,
            opacity: 1,
            ease: "power3.out",
          });
        }
      },
    getters: {
      // Vos getters ici
    }
  });
  