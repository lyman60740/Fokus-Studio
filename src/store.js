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
              start: 'top 70%', // Vous pouvez ajuster ce déclencheur selon vos besoins
              toggleActions: 'play none none reverse',
            },
            duration: 1,
            y: 0,
            opacity: 1,
            ease: "power3.out",
          });
        }
      },
    getters: {
      // Vos getters ici
    }
  });
  