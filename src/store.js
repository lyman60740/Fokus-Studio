import { createStore } from 'vuex';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default createStore({
    state: {
      homeServicesReady: false,
      homeAboutReady: false,
    },
    mutations: {
      setHomeServicesReady(state, value) {
        state.homeServicesReady = value;
      },
      setHomeAboutReady(state, value) {
        state.homeAboutReady = value;
      },
    },
    actions: {
        animateElement(_, element) {
          gsap.to(element, {
            scrollTrigger: {
              trigger: element,
              start: 'top 70%', 
              toggleActions: 'play none none reverse',
            },
            duration: 1,
            y: -2,
            opacity: 1,
            ease: "power3.out",
          });
        }
      },
    getters: {
      // Vos getters ici
    }
  });
  